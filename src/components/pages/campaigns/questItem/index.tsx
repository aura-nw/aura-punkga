import Button from 'components/core/Button/Button'
import Chip from 'components/core/Chip'
import Modal from 'components/core/modal'
import KPImage from 'components/pages/campaigns/assets/ic_Kp.svg'
import XPImage from 'components/pages/campaigns/assets/illus.svg'
import NFTPackage from 'components/pages/campaigns/assets/nft-package.png'
import SFImage from 'components/pages/campaigns/assets/sf.png'
import XPPackage from 'components/pages/campaigns/assets/xp-package.png'
import Popover from 'components/Popover'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { isMobile } from 'react-device-detect'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { claimQuest, getRequestLog } from 'src/services'
import Decor from '../assets/decor.svg'
import RefQuest from './refQuest'
import FreeQuest from './freeQuest'
import QuizQuest from './quizQuest'
export default function QuestItem({ quest, refreshCallback }: { quest: Quest; refreshCallback?: () => void }) {
  const { getProfile } = useContext(Context)
  const [open, setOpen] = useState(false)
  const [openNFTPreview, setOpenNFTPreview] = useState(false)
  const [openClaimSuccessModal, setClaimSuccessModalOpen] = useState(false)
  const [seeMore, setSeeMore] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const limitChar = isMobile ? 20 : 30
  const { t } = useTranslation()
  const { locale } = useRouter()
  const revealResult = async (id: string) => {
    const data = await getRequestLog(id)
    if (data?.status == 'SUCCEEDED') {
      await getProfile()
      refreshCallback()
      setClaimSuccessModalOpen(true)
      setOpen(false)
      setLoading(false)
      return
    }
    if (data?.status == 'FAILED') {
      setOpen(false)
      setLoading(false)
      refreshCallback()
      await getProfile()
      toast('Claim failed. Please try again later.', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      return
    }
    setTimeout(() => revealResult(id), 4000)
  }

  const claimQuestHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await claimQuest(quest.id)
      if (res?.requestId) {
        revealResult(res?.requestId)
      } else {
        toast(res?.errors?.message || 'Claim failed. Please try again later.', {
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
        console.error(res?.errors?.message)
        setOpen(false)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (open) setSeeMore(undefined)
  }, [open])
  const xpImageSrc = quest.pointText == 'KP' ? KPImage : quest.pointText == 'SF' ? SFImage : XPImage
  const xpText = quest.pointText
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <Modal open={openNFTPreview} setOpen={() => setOpenNFTPreview(false)}>
          <div className='p-10 flex flex-col items-center'>
            <Image
              src={quest?.reward?.nft?.img_url}
              width={600}
              height={600}
              alt=''
              className='max-w-[800px] w-[80vw] aspect-square rounded-lg object-contain bg-white'
            />
          </div>
        </Modal>
        <div className='p-5 pt-10 w-[90vw] max-w-[800px] lg:w-[644px] lg:grid-cols-[1fr_130px] lg:grid lg:gap-x-8 lg:grid-rows-[auto_1fr]'>
          <div>
            {quest.repeat == 'Daily' && (
              <Chip color='process' hasLeading variant='skew'>
                {t('Daily')}
              </Chip>
            )}
            <div className='mt-1.5 text-lg leading-[26px] font-semibold'>{quest[locale].name}</div>
            <div className='mt-3 flex flex-col items-center md:hidden'>
              <div
                className={`${
                  quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
                } w-full max-w-[130px] aspect-square rounded-mlg overflow-hidden relative bg-[#191919] flex flex-col items-center`}>
                {quest?.reward?.nft?.nft_name ? (
                  <>
                    <div className='relative aspect-square w-full rounded-lg'>
                      <Image
                        src={quest?.reward?.nft.img_url || NoImage}
                        alt=''
                        layout='fill'
                        objectFit='cover'
                        className='rounded-lg'
                      />
                    </div>
                  </>
                ) : (
                  <Image src={xpImageSrc} width={80} height={80} alt='' className='w-[96px] h-[96px] rounded-lg mt-1' />
                )}
                <div className='absolute bg-neutral-950 bottom-0 inset-x-0 w-full py-1.5 text-xs h-6 text-[#00E160] flex justify-center items-end gap-1'>
                  <div className=' font-bold leading-3'>{`+ ${quest?.reward?.xp} ${xpText}`}</div>
                  {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name && (
                    <Image
                      src={xpImageSrc}
                      width={28}
                      height={28}
                      alt=''
                      className='w-[28px] h-[28px] rounded-lg translate-y-1'
                    />
                  )}
                </div>
              </div>
              {!!quest.reward.slots && (
                <>
                  <div className='flex flex-col items-center text-[10px] text-text-quatenary leading-[13px] lg:text-xs lg:leading-[18px] mt-1.5'>
                    <div>{`${
                      quest.repeat_quests?.[0]?.repeat_quest_reward_claimed == undefined
                        ? quest.quest_reward_claimed
                        : quest.repeat_quests?.[0]?.repeat_quest_reward_claimed
                    }/${quest.reward.slots}`}</div>
                    <div>{t('rewards claimed')}</div>
                  </div>
                </>
              )}
            </div>
            {!!quest[locale].description && (
              <div className={`mt-3 text-text-quatenary text-sm max-h-[120px] overflow-auto`}>
                {ReactHtmlParser(quest[locale].description)}
              </div>
            )}
          </div>
          <div className='mt-5 lg:mt-0 md:flex flex-col items-center row-span-2 hidden'>
            <div
              className={`${
                quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
              } w-full aspect-square rounded-mlg overflow-hidden relative bg-[#191919] flex flex-col items-center`}>
              {quest?.reward?.nft?.nft_name ? (
                <>
                  <div className='relative aspect-square w-full rounded-lg'>
                    <Image
                      src={quest?.reward?.nft.img_url || NoImage}
                      alt=''
                      layout='fill'
                      objectFit='cover'
                      className='rounded-lg'
                    />
                  </div>
                </>
              ) : (
                <Image src={xpImageSrc} width={80} height={80} alt='' className='w-[96px] h-[96px] rounded-lg mt-1' />
              )}
              <div className='absolute bg-neutral-950 bottom-0 inset-x-0 w-full py-1.5 text-xs h-6 text-[#00E160] flex justify-center items-end gap-1'>
                <div className=' font-bold leading-3'>{`+ ${quest?.reward?.xp} ${xpText}`}</div>
                {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name && (
                  <Image
                    src={xpImageSrc}
                    width={28}
                    height={28}
                    alt=''
                    className='w-[28px] h-[28px] rounded-lg translate-y-1'
                  />
                )}
              </div>
            </div>
            {!!quest.reward.slots && (
              <>
                <div className='flex flex-col items-center text-[10px] text-text-quatenary leading-[13px] lg:text-xs lg:leading-[18px] mt-1.5'>
                  <div>{`${
                    quest.repeat_quests?.[0]?.repeat_quest_reward_claimed == undefined
                      ? quest.quest_reward_claimed
                      : quest.repeat_quests?.[0]?.repeat_quest_reward_claimed
                  }/${quest.reward.slots}`}</div>
                  <div>{t('rewards claimed')}</div>
                </div>
              </>
            )}
          </div>
          {['Comment', 'Like', 'Subscribe', 'Read', 'xfollow', 'xrepost', 'dc_join'].includes(quest.type) && (
            <RefQuest quest={quest} loading={loading} claimQuestHandler={claimQuestHandler} />
          )}
          {quest.type == 'Empty' && <FreeQuest quest={quest} loading={loading} claimQuestHandler={claimQuestHandler} />}
          {quest.type == 'Quiz' && (
            <QuizQuest
              quest={quest}
              loading={loading}
              claimQuestHandler={claimQuestHandler}
              open={open}
              setOpen={setOpen}
            />
          )}
        </div>
      </Modal>
      <Modal
        open={openClaimSuccessModal}
        setOpen={() => setClaimSuccessModalOpen(false)}
        className='[&_.static]:!overflow-visible'>
        <div className='w-[547px] hidden lg:block relative'>
          {quest?.reward.nft?.nft_name ? (
            <>
              <div className='absolute -top-[38%] -left-[13%] -bottom-[25%] '>
                <div className='w-[215px] h-[280px] absolute top-1/2 left-1/2 -translate-x-[51%] -translate-y-1/2 -rotate-[7deg] overflow-hidden rounded-lg'>
                  <Image
                    src={quest?.reward.nft.img_url || NoImage}
                    width={240}
                    height={240}
                    alt=''
                    className='w-full aspect-square object-cover'
                  />
                  <div className='w-full h-[65px] bg-black grid place-items-center py-2 text-3xl font-jaro truncate px-4'>
                    {quest?.reward.nft?.nft_name}
                  </div>
                </div>
                <Image src={NFTPackage} alt='' className='h-full w-auto relative' />
              </div>
              <div className='absolute -left-[15%] -rotate-12 w-[120px] -bottom-[10%] '>
                <Image
                  src={xpImageSrc}
                  width={240}
                  height={240}
                  alt=''
                  className='w-[75px] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
                />
                <Image src={XPPackage} alt='' className='h-full w-auto relative' />
                <div className='font-jaro text-[14px] absolute bottom-[14%] text-center w-[46px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
              </div>
              <div>
                <div className='pl-[45%]'>
                  <div className='leading-[26px] font-semibold mt-12 text-lg'>{t('Congratulation')}!</div>
                  <div className='text-sm text-text-quatenary'>{t('You have received quest reward')}</div>
                  <div className='mt-4'>
                    {quest?.reward.nft?.nft_name && (
                      <div className='text-sm font-semibold leading-5'>{quest?.reward.nft?.nft_name}</div>
                    )}
                    <div className='text-text-brand-hover font-semibold text-xl'>{`+ ${quest?.reward.xp} ${xpText}`}</div>
                  </div>
                </div>
                <div
                  className='mt-8 py-7 pr-6 pl-[45%] bg-neutral-950 bg-no-repeat bg-[length:auto_100%] rounded-b-2xl'
                  style={{
                    backgroundImage: `url(${Decor.src})`,
                  }}>
                  <Button className='w-full' onClick={() => setClaimSuccessModalOpen(false)}>
                    {t('Done')}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='absolute -top-[35%] -left-[5%] -bottom-[25%] '>
                <Image
                  src={xpImageSrc}
                  width={240}
                  height={240}
                  alt=''
                  className='w-[175px] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
                />
                <Image src={XPPackage} alt='' className='h-full w-auto relative' />
                <div className='font-jaro text-[28px] absolute bottom-[14.5%] text-center w-[100px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
              </div>
              <div>
                <div className='pl-[45%]'>
                  <div className='leading-[26px] font-semibold mt-12 text-lg'>{t('Congratulation')}!</div>
                  <div className='text-sm text-text-quatenary'>{t('You have received quest reward')}</div>
                  <div className='mt-4'>
                    {quest?.reward.nft?.nft_name && (
                      <div className='text-sm font-semibold leading-5'>{quest?.reward.nft?.nft_name}</div>
                    )}
                    <div className='text-text-brand-hover font-semibold text-xl'>{`+ ${quest?.reward.xp} ${xpText}`}</div>
                  </div>
                </div>
                <div
                  className='mt-8 py-7 pr-6 pl-[45%] bg-neutral-950 bg-no-repeat bg-[length:auto_100%] rounded-b-2xl'
                  style={{
                    backgroundImage: `url(${Decor.src})`,
                  }}>
                  <Button className='w-full' onClick={() => setClaimSuccessModalOpen(false)}>
                    {t('Done')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={`w-[320px] lg:hidden px-10 pb-5 pt-7 flex flex-col items-center`}>
          <div className='leading-[26px] font-semibold text-center text-lg'>{t('Congratulation')}!</div>
          <div className='text-sm mt-2'>{t('You have received quest reward')}</div>
          {quest?.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center mt-8'>
              <div className='relative w-[240px] h-[280px] rotate-12'>
                <div className='absolute inset-0 translate-x-[15%]'>
                  <div className='w-[60%] aspect-[4/6] absolute top-1/2 left-1/2 -translate-x-[53%] -translate-y-1/2 -rotate-[7deg] overflow-hidden rounded-lg'>
                    <Image
                      src={quest?.reward.nft.img_url || NoImage}
                      width={240}
                      height={240}
                      alt=''
                      className='w-full aspect-square object-cover'
                    />
                    <div className='w-full h-[65px] bg-black grid place-items-center py-2 text-xl font-jaro truncate px-4'>
                      {quest?.reward.nft?.nft_name}
                    </div>
                  </div>
                  <Image src={NFTPackage} alt='' className='h-full w-auto relative' />
                </div>
                <div className='absolute -left-[0%] -rotate-12 w-[100px] -bottom-[5%] '>
                  <Image
                    src={xpImageSrc}
                    width={240}
                    height={240}
                    alt=''
                    className='w-[55px] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
                  />
                  <Image src={XPPackage} alt='' className='h-full w-auto relative' />
                  <div className='font-jaro text-[14px] absolute bottom-[12%] text-center w-[36px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
                </div>
              </div>
              <div className='text-sm font-semibold w-[240px] whitespace-nowrap text-center truncate mt-4'>
                {quest?.reward.nft?.nft_name}
              </div>
              <div className='font-bold text-second-color text-xl text-text-brand-defaul text-center mt-4'>
                {`+ ${quest?.reward.xp} ${xpText}`}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center mt-8 relative w-[250px] h-[360px] '>
              <div className='absolute inset-0 '>
                <Image
                  src={xpImageSrc}
                  width={240}
                  height={240}
                  alt=''
                  className='w-[60%] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
                />
                <Image src={XPPackage} alt='' className='h-full w-auto relative' />
                <div className='font-jaro text-[28px] absolute bottom-[14.5%] text-center w-[100px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <div
        className={`bg-[#191919] outline-[3px] outline-black outline rounded-mlg relative ${
          quest.unlock &&
          (quest.reward_status == 'CAN_CLAIM' ||
            quest.reward_status == 'NOT_SATISFY' ||
            (quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily'))
            ? 'cursor-pointer '
            : null
        }`}
        onClick={() =>
          quest.unlock &&
          (quest.reward_status == 'CAN_CLAIM' ||
            quest.reward_status == 'NOT_SATISFY' ||
            (quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily'))
            ? setOpen(true)
            : null
        }>
        {' '}
        <Skew className='absolute top-1.5 right-1.5 hidden md:block' />
        <Skew className='absolute top-1.5 left-1.5' />
        <div className='px-5 pt-5 grid gap-3 grid-cols-[1fr_100px]'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              {(quest.repeat == 'Daily' || !quest.unlock) && (
                <div className='flex items-center gap-1.5 mb-2.5'>
                  {quest.repeat == 'Daily' && (
                    <Chip variant='skew' hasLeading color='process'>
                      {t('Daily')}
                    </Chip>
                  )}
                  {!quest.unlock && (
                    <div className='rounded h-[19px] w-[19px] grid place-items-center bg-[#DEDEDE]'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='9' height='10' viewBox='0 0 9 10' fill='none'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M1.8 4.24319V3.25301C1.8 1.45642 3.00883 0 4.5 0C5.99117 0 7.2 1.45642 7.2 3.25301V4.24319C7.6459 4.28331 7.93628 4.3846 8.14853 4.64033C8.5 5.06379 8.5 5.74534 8.5 7.10843C8.5 8.47153 8.5 9.15308 8.14853 9.57654C7.79706 10 7.23137 10 6.1 10H2.9C1.76863 10 1.20294 10 0.851472 9.57654C0.5 9.15308 0.5 8.47153 0.5 7.10843C0.5 5.74534 0.5 5.06379 0.851472 4.64033C1.06372 4.3846 1.3541 4.28331 1.8 4.24319ZM2.4 3.25301C2.4 1.85567 3.3402 0.722892 4.5 0.722892C5.6598 0.722892 6.6 1.85567 6.6 3.25301V4.21859C6.4468 4.21687 6.28061 4.21687 6.1 4.21687H2.9C2.71939 4.21687 2.5532 4.21687 2.4 4.21859V3.25301ZM5.3 7.10843C5.3 7.64076 4.94183 8.07229 4.5 8.07229C4.05817 8.07229 3.7 7.64076 3.7 7.10843C3.7 6.57611 4.05817 6.14458 4.5 6.14458C4.94183 6.14458 5.3 6.57611 5.3 7.10843Z'
                          fill='#61646B'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M1.8 4.24319V3.25301C1.8 1.45642 3.00883 0 4.5 0C5.99117 0 7.2 1.45642 7.2 3.25301V4.24319C7.6459 4.28331 7.93628 4.3846 8.14853 4.64033C8.5 5.06379 8.5 5.74534 8.5 7.10843C8.5 8.47153 8.5 9.15308 8.14853 9.57654C7.79706 10 7.23137 10 6.1 10H2.9C1.76863 10 1.20294 10 0.851472 9.57654C0.5 9.15308 0.5 8.47153 0.5 7.10843C0.5 5.74534 0.5 5.06379 0.851472 4.64033C1.06372 4.3846 1.3541 4.28331 1.8 4.24319ZM2.4 3.25301C2.4 1.85567 3.3402 0.722892 4.5 0.722892C5.6598 0.722892 6.6 1.85567 6.6 3.25301V4.21859C6.4468 4.21687 6.28061 4.21687 6.1 4.21687H2.9C2.71939 4.21687 2.5532 4.21687 2.4 4.21859V3.25301ZM5.3 7.10843C5.3 7.64076 4.94183 8.07229 4.5 8.07229C4.05817 8.07229 3.7 7.64076 3.7 7.10843C3.7 6.57611 4.05817 6.14458 4.5 6.14458C4.94183 6.14458 5.3 6.57611 5.3 7.10843Z'
                          fill='black'
                          fillOpacity='0.2'
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              <div className='text-sm lg:text-base font-semibold line-clamp-2 lg:leading-[23px] h-[46px]'>
                {quest[locale].name}
              </div>
            </div>
            <div className='text-xs leading-[18px] lg:text-sm lg:leading-5 font-medium text-text-quatenary flex items-center gap-1.5'>
              <span>{`${quest.reward.xp} ${xpText}`}</span>
              {quest.reward.nft?.img_url && (
                <>
                  <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                  <span>NFT</span>
                </>
              )}
              {!!quest.reward.slots && (
                <>
                  <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                  <span>
                    {locale == 'vn'
                      ? `${quest.reward.slots} phần thưởng`
                      : `${quest.reward.slots} slot${quest.reward.slots > 1 ? 's' : ''}`}
                  </span>
                </>
              )}
            </div>
          </div>
          <div
            className={`${
              quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
            } w-full aspect-square rounded-mlg overflow-hidden relative bg-[#2b2b2b] flex flex-col items-center`}>
            {quest?.reward?.nft?.nft_name ? (
              <>
                <div className='relative aspect-square w-full rounded-lg'>
                  <Image
                    src={quest?.reward?.nft.img_url || NoImage}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </div>
              </>
            ) : (
              <Image src={xpImageSrc} width={80} height={80} alt='' className='w-[69px] h-[69px] rounded-lg mt-1' />
            )}
            <div className='absolute bg-neutral-950 bottom-0 inset-x-0 w-full py-1.5 text-xs h-6 text-[#00E160] flex justify-center items-end gap-1'>
              <div className=' font-bold leading-3'>{`+ ${quest?.reward?.xp} ${xpText}`}</div>
              {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name && (
                <Image
                  src={xpImageSrc}
                  width={28}
                  height={28}
                  alt=''
                  className='w-[28px] h-[28px] rounded-lg translate-y-1'
                />
              )}
            </div>
          </div>
        </div>
        <div className='mt-2.5 px-2 pb-2 w-full'>
          {quest.reward_status == 'CLAIMED' && quest.repeat == 'Once' ? (
            <div className='rounded-b-md py-1.5 px-3 bg-[#2b2b2b]'>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase w-full text-end'>
                {t('completed!')}
              </div>
            </div>
          ) : quest.reward_status == 'OUT_OF_SLOT' ? (
            <div className='rounded-b-md py-1.5 px-3 bg-[#2b2b2b]'>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase w-full text-end'>
                {t('Out of reward!')}
              </div>
            </div>
          ) : !quest.unlock ? (
            <div className='rounded-b-md flex justify-between items-center w-full py-1.5 px-3 gap-4 bg-[#2b2b2b]'>
              <Popover
                popoverRender={() => {
                  return (
                    <div className='text-xs text-black bg-white py-2 px-3 rounded-lg font-medium w-[]'>
                      {!!quest.condition.level && <span>{`${t('Reach level')} ${quest.condition.level}`}</span>}
                      {!!quest.condition.level && !!quest.condition.quest_id && <span> {t('and')} </span>}
                      {!!quest.condition.quest_id && (
                        <span>
                          {t('Complete quest')}{' '}
                          <span className='text-second-color'>{quest.condition.requiredQuest?.[locale]?.name}</span>
                        </span>
                      )}
                      <span> {t('to unlock')}</span>
                    </div>
                  )
                }}>
                <div className='text-text-quatenary text-xs font-medium line-clamp-1'>
                  {!!quest.condition.level && <span>{`${t('Reach level')} ${quest.condition.level}`}</span>}
                  {!!quest.condition.level && !!quest.condition.quest_id && <span> {t('and')} </span>}
                  {!!quest.condition.quest_id && (
                    <span>
                      {t('Complete quest')}{' '}
                      <span className='text-second-color'>{quest.condition.requiredQuest?.[locale]?.name}</span>
                    </span>
                  )}
                  <span> {t('to unlock')}</span>
                </div>
              </Popover>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase'>{t('Locked')}</div>
            </div>
          ) : quest.reward_status == 'CAN_CLAIM' ? (
            <div
              className='rounded-b-md py-1.5 px-3 animate-claim-quest bg-[#00E160]'
              style={{
                backgroundImage: `url(${Decor.src})`,
              }}>
              <div
                className='font-jaro text-[26px] leading-[26px] text-black uppercase w-full text-end'
                onClick={(e) => {
                  claimQuestHandler()
                  e.stopPropagation()
                }}>
                {t(loading ? 'Loading' : 'Claim Reward')}
              </div>
            </div>
          ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
            <div className='rounded-b-md flex justify-between items-center w-full py-1.5 px-3 gap-4 bg-[#2b2b2b]'>
              <div className='text-text-quatenary text-xs font-medium line-clamp-1'>
                <span>
                  <Countdown
                    date={moment().add(1, 'd').startOf('day').toISOString()}
                    renderer={({ hours, minutes, seconds }) => {
                      if (locale == 'vn')
                        return (
                          <span>
                            Làm mới sau {zeroPad(hours)} giờ : {zeroPad(minutes)} phút : {zeroPad(seconds)} giây
                          </span>
                        )
                      return (
                        <span>
                          Reset in {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
                        </span>
                      )
                    }}
                  />
                </span>
                <span> {t('to unlock')}</span>
              </div>
              <div className='font-jaro text-[26px] text-text-teriary leading-[26px] uppercase'>{t('completed!')}</div>
            </div>
          ) : (
            <div
              className='rounded-b-md py-1.5 px-3 bg-[#2b2b2b] animate-claim-quest'
              style={{
                backgroundImage: `url(${Decor.src})`,
              }}>
              <div className='font-jaro text-[26px] text-white leading-[26px] uppercase w-full flex items-start gap-2.5 justify-end'>
                <div>{t('accept quest')}</div>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='23' viewBox='0 0 20 23' fill='none'>
                  <path
                    d='M11.7624 4.5625H1.375L8.60022 13.1839L1.375 21.8054H11.7624L18.9876 13.1839L11.7624 4.5625Z'
                    fill='white'
                  />
                  <path
                    d='M11.7624 4.5625H1.375L8.60022 13.1839L1.375 21.8054H11.7624L18.9876 13.1839L11.7624 4.5625Z'
                    fill='white'
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
const Skew = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='11'
      height='12'
      viewBox='0 0 11 12'
      fill='none'
      className={className}>
      <path
        d='M11 6.0625C11 9.10007 8.53757 11.5625 5.5 11.5625C2.46243 11.5625 0 9.10007 0 6.0625C0 3.02493 2.46243 0.5625 5.5 0.5625C8.53757 0.5625 11 3.02493 11 6.0625Z'
        fill='#3D3B3E'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.5 10.7163C8.07025 10.7163 10.1538 8.63275 10.1538 6.0625C10.1538 3.49225 8.07025 1.40865 5.5 1.40865C2.92975 1.40865 0.846154 3.49225 0.846154 6.0625C0.846154 8.63275 2.92975 10.7163 5.5 10.7163ZM5.5 11.5625C8.53757 11.5625 11 9.10007 11 6.0625C11 3.02493 8.53757 0.5625 5.5 0.5625C2.46243 0.5625 0 3.02493 0 6.0625C0 9.10007 2.46243 11.5625 5.5 11.5625Z'
        fill='black'
      />
      <path
        d='M3.13738 4.8952C2.80694 4.56475 2.80694 4.029 3.13738 3.69855C3.46783 3.36811 4.00358 3.36811 4.33403 3.69855L7.92395 7.28848C8.2544 7.61892 8.2544 8.15468 7.92395 8.48512C7.59351 8.81557 7.05775 8.81557 6.72731 8.48512L3.13738 4.8952Z'
        fill='#181818'
      />
      <path
        d='M6.7259 3.69988C7.05634 3.36944 7.5921 3.36944 7.92254 3.69988C8.25298 4.03033 8.25298 4.56608 7.92254 4.89653L4.33261 8.48645C4.00217 8.8169 3.46641 8.8169 3.13597 8.48645C2.80553 8.15601 2.80553 7.62025 3.13597 7.28981L6.7259 3.69988Z'
        fill='#181818'
      />
    </svg>
  )
}
