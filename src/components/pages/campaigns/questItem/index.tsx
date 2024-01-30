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
import { claimQuest } from 'src/services'
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
  const claimQuestHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await claimQuest(quest.id)
      if (res?.errors?.message) {
        toast(res?.errors?.message, {
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
        console.error(res?.errors?.message)
        setOpen(false)
        setLoading(false)
        return
      }
      await getProfile()
      refreshCallback()
      setClaimSuccessModalOpen(true)
      setOpen(false)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      refreshCallback()
      await getProfile()
      toast(`Claim failed`, {
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
              className='max-w-[600px] w-[80vw] aspect-square rounded-lg object-contain bg-white'
            />
          </div>
        </Modal>
        <div className='p-5 pt-10 w-[90vw] max-w-[600px] lg:w-[600px] lg:grid-cols-[1fr_190px] lg:grid lg:gap-x-10 lg:grid-rows-[auto_1fr]'>
          <div>
            <div className='text-xs lg:text-sm leading-[15px] lg:leading-[18px] font-semibold'>
              {quest.repeat == 'Daily' && (
                <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] lg:rounded-md px-2 pb-[1px] lg:pb-1 lg:pt-[2px] text-[10px] lg:text-sm leading-[13px] lg:leading-[18px] mr-[5px]'>
                  Daily
                </span>
              )}
              {quest.name}
            </div>
            <div className='mt-[15px] lg:mt-5 lg:text-xl lg:leading-[25px] leading-5 font-bold'>
              {quest.type == 'Subscribe'
                ? `Subscribe to manga ${quest.requirement.subscribe.manga.title} to claim your reward`
                : quest.type == 'Like'
                ? `Like manga ${quest.requirement.like.manga.title} to claim your reward`
                : quest.type == 'Read'
                ? `Read chapter ${quest.requirement.read.chapter.number} of manga ${quest.requirement.read.manga.title} to claim your reward`
                : quest.type == 'Comment'
                ? `Comment on chapter ${quest.requirement.comment.chapter.number} of manga ${quest.requirement.comment.manga.title} to claim your reward`
                : quest.type == 'Empty'
                ? `Free quest`
                : quest.type == 'Quiz'
                ? `Answer a quiz`
                : ``}
            </div>
            {!!quest.description &&
              (quest?.description?.length > 250 ? (
                <>
                  <TruncateMarkup
                    lines={!seeMore ? 5 : 99}
                    ellipsis={<span></span>}
                    onTruncate={(wasTruncated) => {
                      if (wasTruncated && seeMore == undefined) setSeeMore(false)
                    }}>
                    <div
                      className={` mt-[15px] lg:mt-5 text-[#777777] text-xs lg:text-sm leading-[15px] lg:leading-[18px]`}>
                      {ReactHtmlParser(quest.description)}
                    </div>
                  </TruncateMarkup>
                  {seeMore != undefined ? (
                    <div
                      className='font-semibold text-xs lg:text-sm lg:leading-[18px] text-second-color cursor-pointer'
                      onClick={() => setSeeMore(!seeMore)}>
                      {seeMore ? 'See less' : 'See more'}
                    </div>
                  ) : null}
                </>
              ) : (
                <div
                  className={` mt-[15px] lg:mt-5 text-[#777777] text-xs lg:text-sm leading-[15px] lg:leading-[18px]`}>
                  {ReactHtmlParser(quest.description)}
                </div>
              ))}
          </div>
          <div className='mt-5 lg:mt-0 flex flex-col items-center row-span-2'>
            <div className='text-sm lg:text-base leading-[18px] lg:leading-5 font-semibold mb-[10px]'>👑 Reward</div>
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
                          <div>rewards claimed</div>
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
                      <div>rewards claimed</div>
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
          <div className='leading-[18px] lg:leading-5 font-semibold text-center'>👑 Congratulation!</div>
          <div>You have received quest reward</div>
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
        className={`bg-[#F2F2F2] lg:bg-white lg:border lg:border-light-medium-gray  rounded-[10px] p-4 flex gap-[10px] min-h-[160px] relative ${
          quest.unlock &&
          (quest.reward_status == 'CAN_CLAIM' ||
            quest.reward_status == 'NOT_SATISFY' ||
            (quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily'))
            ? 'cursor-pointer hover:bg-[#F2F2F2] [&_.reward]:hover:bg-white'
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
        <div className='flex-1 flex flex-col justify-between relative'>
          <div className='flex flex-col justify-between h-[68px] lg:h-[76px]'>
            <div className='text-xs leading-[15px] lg:text-base lg:leading-5 font-bold line-clamp-2'>
              {quest.repeat == 'Daily' && (
                <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] lg:rounded-md px-2 pb-[1px] lg:pt-[2px] lg:pb-1 lg:font-semibold text-[10px] lg:text-sm leading-[13px] lg:leading-[18px] mr-[5px]'>
                  Daily
                </span>
              )}
              {quest.name}
            </div>
            <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px] font-semibold text-[#646464] flex items-center gap-[10px]'>
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
                  <span>{`${quest.reward.slots} slot${quest.reward.slots > 1 ? 's' : ''}`}</span>
                </>
              )}
            </div>
          </div>

          {quest.reward_status == 'OUT_OF_SLOT' ? (
            <div className='text-xs w-fit bg-[#F2F2F2] leading-[15px] font-bold text-[#ABABAB] px-6 pt-1 pb-[5px] rounded-[20px]'>
              Out of reward
            </div>
          ) : !quest.unlock ? (
            <div className='flex gap-[10px] items-center text-xs leading-[15px] lg:text-sm lg:leading-[18px] text-medium-gray'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='none'
                className='w-6 h-6 shrink-0'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.25 10.5546V8.5C5.25 4.77208 8.27208 1.75 12 1.75C15.7279 1.75 18.75 4.77208 18.75 8.5V10.5546C19.8648 10.6379 20.5907 10.848 21.1213 11.3787C22 12.2574 22 13.6716 22 16.5C22 19.3284 22 20.7426 21.1213 21.6213C20.2426 22.5 18.8284 22.5 16 22.5H8C5.17157 22.5 3.75736 22.5 2.87868 21.6213C2 20.7426 2 19.3284 2 16.5C2 13.6716 2 12.2574 2.87868 11.3787C3.40931 10.848 4.13525 10.6379 5.25 10.5546ZM6.75 8.5C6.75 5.60051 9.10051 3.25 12 3.25C14.8995 3.25 17.25 5.60051 17.25 8.5V10.5036C16.867 10.5 16.4515 10.5 16 10.5H8C7.54849 10.5 7.13301 10.5 6.75 10.5036V8.5ZM14 16.5C14 17.6046 13.1046 18.5 12 18.5C10.8954 18.5 10 17.6046 10 16.5C10 15.3954 10.8954 14.5 12 14.5C13.1046 14.5 14 15.3954 14 16.5Z'
                  fill='#ABABAB'
                />
              </svg>
              <div>
                {!!quest.condition.level && <span>{`Reach level ${quest.condition.level}`}</span>}
                {!!quest.condition.level && !!quest.condition.quest_id && <span> and </span>}
                {!!quest.condition.quest_id && (
                  <span>
                    Complete quest{' '}
                    <span className='text-second-color'>
                      {quest.condition.requiredQuest?.name.length > limitChar
                        ? quest.condition.requiredQuest?.name.slice(0, limitChar) + '...'
                        : quest.condition.requiredQuest?.name}
                    </span>
                  </span>
                )}
                <span> to unlock</span>
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
              Claim Reward
            </FilledButton>
          ) : quest.reward_status == 'CLAIMED' && quest.repeat == 'Daily' ? (
            <div className='text-xs w-fit bg-[#DEDEDE] leading-[15px] font-bold text-medium-gray px-6 pt-1 pb-[5px] rounded-[20px]'>
              <Countdown
                date={moment().add(1, 'd').startOf('day').toISOString()}
                renderer={({ hours, minutes, seconds }) => {
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
          className={`reward w-[140px] max-h-[130px] shrink-0 bg-white lg:bg-[#F0F0F0] rounded-lg px-[10px] pt-[6px] pb-2 relative ${
            quest.reward_status == 'OUT_OF_SLOT' ? 'opacity-20' : ''
          }`}>
          {quest.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image
                  src={quest.reward.nft.img_url || NoImage}
                  width={80}
                  height={80}
                  alt=''
                  className='w-[80px] h-[80px] rounded-lg mt-1 object-contain bg-white'
                />
              </div>
              <div className='text-xs leading-[15px] text-[#61646B] max-w-[120px] truncate'>
                {quest.reward.nft?.nft_name}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px]' />
              </div>
              <div className='w-full bg-[#61646B] rounded font-bold text-[#23FF81] text-xs leading-[15px] pt-[2px] pb-1 text-center'>{`+ ${quest.reward.xp} XP`}</div>
            </div>
          )}
        </div>

        {quest.reward_status == 'CLAIMED' && quest.repeat == 'Once' && (
          <div className='bg-[#1FAB5E1A] absolute bottom-0 inset-x-0 h-[60px] backdrop-blur-[10px] rounded-b-[10px] font-semibold text-second-color text-xs lg:text-sm lg:leading-[18px] flex items-center justify-center'>
            Quest completed
          </div>
        )}
      </div>
    </>
  )
}
