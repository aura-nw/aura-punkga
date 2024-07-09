import Modal from 'components/Modal'
import FilledButton from 'components/core/Button/FilledButton'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { isMobile } from 'react-device-detect'
import ReactHtmlParser from 'react-html-parser'
import { toast } from 'react-toastify'
import TruncateMarkup from 'react-truncate-markup'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { claimQuest, getRequestLog } from 'src/services'
import BasicQuest from './basicQuest'
import FreeQuest from './freeQuest'
import QuizQuest from './quizQuest'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import LabelChip from 'components/core/Chip/Label'

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
        <div className='p-5 pt-10 w-[90vw] max-w-[800px] lg:w-[800px] lg:grid-cols-[1fr_190px] lg:grid lg:gap-x-10 lg:grid-rows-[auto_1fr]'>
          <div>
            <div className='text-xs lg:text-sm leading-[15px] lg:leading-[18px] font-semibold'>
              {quest.repeat == 'Daily' && (
                <span className='bg-[#E2D8FF] text-[#A247FF] whitespace-nowrap font-bold rounded-[3px] lg:rounded-md px-2 pb-[1px] lg:pb-1 lg:pt-[2px] text-[10px] lg:text-sm leading-[13px] lg:leading-[18px] mr-[5px]'>
                  {t('Daily')}
                </span>
              )}
              {quest.name}
            </div>
            <div className='mt-[15px] lg:mt-5 lg:text-xl lg:leading-[25px] leading-5 font-bold'>
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
            {!!quest.description && (
              <div
                className={` mt-[15px] lg:mt-5 text-[#777777] text-xs lg:text-sm leading-[15px] lg:leading-[18px] max-h-[105px] lg:max-h-[126px] overflow-auto`}>
                {ReactHtmlParser(quest.description)}
              </div>
            )}
          </div>
          <div className='mt-5 lg:mt-0 flex flex-col items-center row-span-2'>
            <div className='text-sm lg:text-base leading-[18px] lg:leading-5 font-semibold mb-[10px]'>
              👑 {t('Reward')}
            </div>
            {quest.reward?.nft?.img_url ? (
              <>
                <div className='flex flex-col items-center gap-[10px]'>
                  <Image
                    onClick={() => setOpenNFTPreview(true)}
                    src={quest.reward.nft.img_url}
                    alt=''
                    width={180}
                    height={180}
                    className='w-[160px] h-[160px] rounded-lg object-contain bg-white'
                  />
                  <div className='text-sm lg:text-base leading-[18px] lg:leading-5 text-subtle-dark'>
                    {quest.reward.nft.nft_name}
                  </div>
                  <div className='w-[160px] h-[1px] bg-light-medium-gray'></div>
                  <div className='flex gap-2 items-center'>
                    <div className='text-second-color text-sm leading-[18px] lg:text-lg lg:leading-[23px] font-bold text-center'>{`+${quest.reward.xp} XP`}</div>
                    {!!quest.reward.slots && (
                      <>
                        <div className='w-[1px] h-[26px] bg-light-medium-gray'></div>
                        <div className='flex flex-col items-center text-[10px] leading-[13px] lg:text-xs lg:leading-[15px] whitespace-nowrap'>
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
                </div>
              </>
            ) : (
              <>
                <div className='bg-[#F0F0F0] w-[160px] h-[160px] rounded-lg flex flex-col items-center gap-[10px] p-[10px]'>
                  <Image src={IllusImage} alt='' className='w-[100px] h-[100px]' />
                  <div className='text-second-color text-2xl leading-[30px] font-bold text-center'>
                    {`+ ${quest.reward.xp} XP`}
                  </div>
                </div>
                {!!quest.reward.slots && (
                  <>
                    <div className='w-[160px] h-[1px] bg-light-medium-gray my-[10px]'></div>
                    <div className='flex flex-col items-center text-[10px] leading-[13px] lg:text-xs lg:leading-[15px]'>
                      <div>{`${
                        quest.repeat_quests?.[0]?.repeat_quest_reward_claimed == undefined
                          ? quest.quest_reward_claimed
                          : quest.repeat_quests?.[0]?.repeat_quest_reward_claimed
                      }/${quest.reward.slots}`}</div>
                      <div>{t('rewards claimed')}</div>
                    </div>
                  </>
                )}
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
        <div
          className={`w-[320px] lg:w-[448px] px-10 pb-5 pt-7 flex flex-col items-center ${
            quest?.reward.nft?.nft_name ? 'gap-[10px]' : 'gap-5'
          } text-sm`}>
          <div className='leading-[18px] lg:leading-5 font-semibold text-center'>👑 {t('Congratulation')}!</div>
          <div>{t('You have received quest reward')}</div>
          {quest?.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image
                  src={quest?.reward.nft.img_url || NoImage}
                  width={80}
                  height={80}
                  alt=''
                  className='w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] rounded-lg object-contain bg-white'
                />
              </div>
              <div className='text-sm leading-[18px] lg:text-base lg:leading-5 text-[#414141] max-w-[240px] truncate'>
                {quest?.reward.nft?.nft_name}
              </div>
              <div className='bg-[#DEDEDE] w-[240px] lg:w-[288px] h-[1px] my-[10px]'></div>
              <div className='font-bold text-second-color text-lg leading-[23px] lg:text-3xl lg:leading-[30px] text-center'>
                {`+ ${quest?.reward.xp} XP`}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='mb-5'>
                <Image
                  src={IllusImage}
                  width={80}
                  height={80}
                  alt=''
                  className='w-[200px] h-[200px] lg:w-[240px] lg:h-[240px]'
                />
              </div>
              <div className='font-bold text-second-color text-lg leading-[23px] lg:text-3xl lg:leading-[30px] text-center'>{`+ ${quest?.reward.xp} XP`}</div>
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
            <div className='text-xs leading-[15px] lg:text-base lg:leading-[23px] font-semibold line-clamp-2'>
              {quest.name}
            </div>
            <div className='text-xs leading-[15px] lg:text-sm lg:leading-5 font-medium text-text-teriary mt-3 flex items-center gap-[10px]'>
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
          {quest.reward_status == 'OUT_OF_SLOT' ? (
            <div className='text-xs w-fit bg-[#F2F2F2] leading-[15px] font-bold text-[#ABABAB] px-6 pt-1 pb-[5px] rounded-[20px]'>
              {t('Out of reward')}
            </div>
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
            <FilledButton
              loading={loading}
              className='w-fit lg:!text-base lg:!leading-5 lg:!px-[24px] lg:!pt-[8px] lg:!pb-[10px]'
              onClick={(e) => {
                claimQuestHandler()
                e.stopPropagation()
              }}>
              {t('Claim Reward')}
            </FilledButton>
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
          className={`reward w-[130px] h-fit min-h-[130px] flex flex-col justify-center items-center shrink-0 bg-white lg:bg-[#F0F0F0] rounded-mlg px-[10px] pt-[6px] pb-2 relative ${
            quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
          }`}>
          {quest.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center'>
              <div className='mb-1.5'>
                <Image
                  src={quest.reward.nft.img_url || NoImage}
                  width={80}
                  height={80}
                  alt=''
                  className='w-[80px] h-[80px] rounded-lg mt-1 object-cover bg-white'
                />
              </div>
              <div className='text-xs leading-[18px] text-text-teriary w-full text-center font-medium truncate'>
                {quest.reward.nft?.nft_name}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='mb-1.5'>
                <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px]' />
              </div>
              <div className='w-full text-text-teriary font-semibold text-center'>{`+ ${quest.reward.xp} XP`}</div>
            </div>
          )}
        </div>

        {quest.reward_status == 'CLAIMED' && quest.repeat == 'Once' && (
          <div className='bg-[#1FAB5E1A] absolute bottom-0 inset-x-0 h-[60px] backdrop-blur-[10px] rounded-b-[10px] font-semibold text-second-color text-xs lg:text-sm lg:leading-[18px] flex items-center justify-center'>
            {t('Quest completed')}
          </div>
        )}
      </div>
    </>
  )
}
