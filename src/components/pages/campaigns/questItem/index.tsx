import Modal from 'components/Modal'
import ChupButton from 'components/core/Button/ChupButton'
import LabelChip from 'components/core/Chip/Label'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
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
import BasicQuest from './basicQuest'
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
      throw new Error('Claim failed. Please try again later.')
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
      setOpen(false)
      setLoading(false)
      refreshCallback()
      await getProfile()
      toast(error?.message || 'Claim failed. Please try again later.', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      console.error(error)
    }
  }

  useEffect(() => {
    if (open) setSeeMore(undefined)
  }, [open])
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
            {quest.repeat == 'Daily' && <LabelChip className='mb-1.5'>{t('Daily')}</LabelChip>}
            {/* <div className='text-lg font-semibold'>{quest.name}</div> */}
            <div className='mt-1.5 text-lg leading-[26px] font-semibold'>
              {quest.type == 'Subscribe'
                ? locale == 'vn'
                  ? `Đăng ký theo dõi truyện ${quest.requirement.subscribe.manga.title} để nhận phần thưởng`
                  : `Subscribe to manga ${quest.requirement.subscribe.manga.title} to claim your reward`
                : quest.type == 'Like'
                ? locale == 'vn'
                  ? `Thích truyện ${quest.requirement.like.manga.title} để nhận phần thưởng`
                  : `Like manga ${quest.requirement.like.manga.title} to claim your reward`
                : quest.type == 'Read'
                ? locale == 'vn'
                  ? `Đọc chương ${quest.requirement.read.chapter.number} của truyện ${quest.requirement.read.manga.title} để nhận phần thưởng`
                  : `Read chapter ${quest.requirement.read.chapter.number} of manga ${quest.requirement.read.manga.title} to claim your reward`
                : quest.type == 'Comment'
                ? locale == 'vn'
                  ? `Bình luận về chương ${quest.requirement.comment.chapter.number} của truyện ${quest.requirement.comment.manga.title} để nhận phần thưởng`
                  : `Comment on chapter ${quest.requirement.comment.chapter.number} of manga ${quest.requirement.comment.manga.title} to claim your reward`
                : quest.type == 'Empty'
                ? t(`Free reward`)
                : quest.type == 'Quiz'
                ? t(`Answer a quiz`)
                : ``}
            </div>
            <div className='mt-3 flex flex-col items-center md:hidden'>
              <div
                className={`${
                  quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
                } rounded-mlg bg-[#F0F0F0] p-2.5 w-[130px] shrink-0 min-h-[130px] gap-1.5 flex flex-col justify-center items-center`}>
                {quest?.reward?.nft?.nft_name ? (
                  <>
                    <Image
                      src={quest?.reward?.nft.img_url || NoImage}
                      width={80}
                      height={80}
                      alt=''
                      className='w-[80px] h-[80px] rounded-lg object-cover'
                    />
                    <div className='text-xs leading-[18px] text-text-teriary w-[110px] truncate text-center'>
                      {quest?.reward?.nft?.nft_name}
                    </div>
                  </>
                ) : (
                  <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px] rounded-lg' />
                )}
                {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name ? (
                  <div className='rounded pt-0.5 bg-neutral-white min-w-[76px] text-center text-text-brand-defaul font-bold text-xs leading-[15px]'>{`+ ${quest?.reward?.xp} XP`}</div>
                ) : (
                  <div className='text-text-teriary font-semibold'>{`+ ${quest?.reward?.xp} XP`}</div>
                )}
              </div>
              {!!quest.reward.slots && (
                <>
                  <div className='flex flex-col items-center text-[10px] text-text-teriary leading-[13px] lg:text-xs lg:leading-[18px] mt-1.5'>
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
            {!!quest.description && (
              <div className={`mt-3 text-text-teriary text-sm max-h-[120px] overflow-auto`}>
                {ReactHtmlParser(quest.description)}
              </div>
            )}
          </div>
          <div className='mt-5 lg:mt-0 md:flex flex-col items-center row-span-2 hidden'>
            <div
              className={`${
                quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
              } rounded-mlg bg-[#F0F0F0] p-2.5 w-[130px] shrink-0 min-h-[130px] gap-1.5 flex flex-col justify-center items-center`}>
              {quest?.reward?.nft?.nft_name ? (
                <>
                  <Image
                    src={quest?.reward?.nft.img_url || NoImage}
                    width={80}
                    height={80}
                    alt=''
                    className='w-[80px] h-[80px] rounded-lg object-cover'
                  />
                  <div className='text-xs leading-[18px] text-text-teriary w-[110px] truncate text-center'>
                    {quest?.reward?.nft?.nft_name}
                  </div>
                </>
              ) : (
                <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px] rounded-lg' />
              )}
              {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name ? (
                <div className='rounded pt-0.5 bg-neutral-white min-w-[76px] text-center text-text-brand-defaul font-bold text-xs leading-[15px]'>{`+ ${quest?.reward?.xp} XP`}</div>
              ) : (
                <div className='text-text-teriary font-semibold'>{`+ ${quest?.reward?.xp} XP`}</div>
              )}
            </div>
            {!!quest.reward.slots && (
              <>
                <div className='flex flex-col items-center text-[10px] text-text-teriary leading-[13px] lg:text-xs lg:leading-[18px] mt-1.5'>
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
          {(quest.type == 'Comment' || quest.type == 'Like' || quest.type == 'Subscribe' || quest.type == 'Read') && (
            <BasicQuest quest={quest} loading={loading} claimQuestHandler={claimQuestHandler} />
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
      <Modal open={openClaimSuccessModal} setOpen={() => setClaimSuccessModalOpen(false)}>
        <div className={`w-[320px] lg:w-[547px] px-10 pb-5 pt-7 flex flex-col items-center`}>
          <div className='leading-[26px] font-semibold text-center text-lg'>{t('Congratulation')}!</div>
          <div className='text-sm mt-2'>{t('You have received quest reward')}</div>
          {quest?.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center mt-8'>
              <div>
                <Image
                  src={quest?.reward.nft.img_url || NoImage}
                  width={240}
                  height={240}
                  alt=''
                  className='w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] rounded-mlg object-cover bg-background-bg-primary'
                />
              </div>
              <div className='text-sm font-semibold w-[240px] whitespace-nowrap text-center truncate mt-4'>
                {quest?.reward.nft?.nft_name}
              </div>
              <div className='font-bold text-second-color text-xl text-text-brand-defaul text-center mt-4'>
                {`+ ${quest?.reward.xp} XP`}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center mt-8'>
              <div>
                <Image
                  src={IllusImage}
                  width={240}
                  height={240}
                  alt=''
                  className='w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] rounded-mlg object-cover bg-background-bg-primary'
                />
              </div>
              <div className='font-bold text-second-color text-xl text-text-brand-defaul text-center mt-4'>
                {`+ ${quest?.reward.xp} XP`}
              </div>
            </div>
          )}
        </div>
      </Modal>
      <div
        className={`bg-neautral-white lg:bg-white lg:border lg:border-light-medium-gray rounded-mlg p-4 flex gap-[10px] h-[166px] relative ${
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
        <div className='flex-1 flex flex-col relative h-full'>
          {(quest.repeat == 'Daily' || !quest.unlock) && (
            <div className='mb-1 flex items-center gap-1.5'>
              {quest.repeat == 'Daily' && <LabelChip>{t('Daily')}</LabelChip>}
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
          <div className='flex flex-col mb-3 h-full'>
            <div className='text-base font-semibold line-clamp-3 md:line-clamp-2'>{quest.name}</div>
            <div className='text-xs leading-[18px] lg:text-sm lg:leading-5 font-medium text-text-teriary mt-3 flex items-center gap-1.5'>
              <span>{`${quest.reward.xp} XP`}</span>
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
          {quest.reward_status == 'CLAIMED' && quest.repeat == 'Once' ? (
            <div className='flex gap-1 items-center text-xs font-semibold text-text-brand-defaul leading-[18px]'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M15.142 9.98299L10.875 14.25L9.42049 12.7955M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z'
                  stroke='#009640'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              {t('Quest completed')}
            </div>
          ) : quest.reward_status == 'OUT_OF_SLOT' ? (
            <ChupButton
              loading={loading}
              variant='filled'
              disabled
              size='xs'
              onClick={(e) => {
                claimQuestHandler()
                e.stopPropagation()
              }}>
              {t('Out of reward')}
            </ChupButton>
          ) : !quest.unlock ? (
            <div className='flex gap-[10px] items-center text-xxs leading-[13px] text-text-primary'>
              <div>
                {!!quest.condition.level && <span>{`${t('Reach level')} ${quest.condition.level}`}</span>}
                {!!quest.condition.level && !!quest.condition.quest_id && <span> {t('and')} </span>}
                {!!quest.condition.quest_id && (
                  <span>
                    {t('Complete quest')}{' '}
                    <span className='text-second-color'>
                      {quest.condition.requiredQuest?.name.length > limitChar
                        ? quest.condition.requiredQuest?.name.slice(0, limitChar) + '...'
                        : quest.condition.requiredQuest?.name}
                    </span>
                  </span>
                )}
                <span> {t('to unlock')}</span>
              </div>
            </div>
          ) : quest.reward_status == 'CAN_CLAIM' ? (
            <ChupButton
              loading={loading}
              variant='filled'
              color='green'
              size='xs'
              onClick={(e) => {
                claimQuestHandler()
                e.stopPropagation()
              }}>
              {t('Claim Reward')}
            </ChupButton>
          ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
            <div className='text-xs w-fit bg-[#DEDEDE] leading-[15px] font-bold text-medium-gray px-6 pt-1 pb-[5px] rounded-[20px]'>
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
            </div>
          ) : null}
        </div>
        <div
          className={`${
            quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
          } rounded-mlg bg-[#F0F0F0] p-2.5 w-[130px] shrink-0 min-h-[130px] gap-1.5 flex flex-col justify-center items-center`}>
          {quest?.reward?.nft?.nft_name ? (
            <>
              <Image
                src={quest?.reward?.nft.img_url || NoImage}
                width={80}
                height={80}
                alt=''
                className='w-[80px] h-[80px] rounded-lg object-cover'
              />
              <div className='text-xs leading-[18px] text-text-teriary w-[110px] truncate text-center'>
                {quest?.reward?.nft?.nft_name}
              </div>
            </>
          ) : (
            <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px] rounded-lg' />
          )}
          {!!quest?.reward?.xp && quest?.reward?.nft?.nft_name ? (
            <div className='rounded pt-0.5 bg-neutral-white min-w-[76px] text-center text-text-brand-defaul font-bold text-xs leading-[15px]'>{`+ ${quest?.reward?.xp} XP`}</div>
          ) : (
            <div className='text-text-teriary font-semibold'>{`+ ${quest?.reward?.xp} XP`}</div>
          )}
        </div>
      </div>
    </>
  )
}
