import FilledButton from 'components/Button/FilledButton'
import Modal from 'components/Modal'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
import DOMPurify from 'dompurify'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-toastify'
import { Quest } from 'src/models/campaign'
import { claimQuest } from 'src/services'
import { useSWRConfig } from 'swr'
export default function BasicQuest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  const [seeMore, setSeeMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const limitChar = isMobile ? 20 : 30
  const { query } = useRouter()
  const slug = query.campaignSlug as string
  const { mutate } = useSWRConfig()
  const claimQuestHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await claimQuest(data.id)
      mutate({ key: 'fetch_campaign_auth_data', slug })
      if (res) {
        if (data.reward.xp) {
          toast(`${data.reward.xp} XP claimed`, {
            type: 'success',
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
          })
        }
        setOpen(false)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      mutate({ key: 'fetch_campaign_auth_data', slug })
      toast(`Claim failed`, {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      console.error(error)
    }
  }
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className='p-5 pt-10 min-w-[360px] max-w-[600px] lg:grid-cols-[1fr_173px] lg:grid lg:gap-x-10 lg:grid-rows-[auto_1fr]'>
          <div>
            <div className='text-xs leading-[15px] font-semibold'>
              {data.repeat == 'Daily' && (
                <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] px-2 pb-[1px] text-[10px] leading-[13px] mr-[5px]'>
                  Daily
                </span>
              )}
              {data.name}
            </div>
            <div className='mt-[15px] leading-5 font-bold'>
              {data.type == 'Subscribe'
                ? `Subscribe to manga ${data.requirement.subscribe.manga.title} to claim your reward`
                : data.type == 'Like'
                ? `Like manga ${data.requirement.like.manga.title} to claim your reward`
                : data.type == 'Read'
                ? `Read chapter ${data.requirement.read.chapter.number} of manga ${data.requirement.read.manga.title} to claim your reward`
                : data.type == 'Comment'
                ? `Comment on chapter ${data.requirement.comment.chapter.number} of manga ${data.requirement.comment.manga.title} to claim your reward`
                : ``}
            </div>
            {data.description && (
              <>
                <div
                  className={`mt-[15px] text-[#777777] text-xs leading-[15px] ${seeMore ? '' : 'line-clamp-5'}`}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}></div>
                <div className='font-semibold text-xs text-second-color' onClick={() => setSeeMore(!seeMore)}>
                  {seeMore ? 'See less' : 'See more'}
                </div>
              </>
            )}
          </div>
          <div className='mt-5 flex flex-col items-center row-span-2'>
            <div className='text-sm leading-[18px] font-semibold mb-[10px]'>👑 Reward</div>
            {data.reward.nft.img_url ? (
              <>
                <div className='flex flex-col items-center gap-[10px]'>
                  <Image
                    src={data.reward.nft.img_url}
                    alt=''
                    width={180}
                    height={180}
                    className='w-[160px] h-[160px] rounded-lg'
                  />
                  <div className='text-sm leading-[18px] text-subtle-dark'>{data.reward.nft.nft_name}</div>
                  <div className='w-[160px] h-[1px] bg-light-medium-gray'></div>
                  <div className='flex gap-2 items-center'>
                    <div className='text-second-color text-sm leading-[18px] lg:text-lg lg:leading-[23px] font-bold'>{`+ ${data.reward.xp} XP`}</div>
                    {!!data.reward.slots && (
                      <>
                        <div className='w-[1px] h-[26px] bg-light-medium-gray'></div>
                        <div className='flex flex-col items-center text-[10px] leading-[13px] lg:text-xs lg:leading-[15px]'>
                          <div>{`${data.quest_reward_claimed}/${data.reward.slots}`}</div>
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
                    {`+ ${data.reward.xp} XP`}
                  </div>
                </div>
                {!!data.reward.slots && (
                  <>
                    <div className='w-[160px] h-[1px] bg-light-medium-gray my-[10px]'></div>
                    <div className='flex flex-col items-center text-[10px] leading-[13px] lg:text-xs lg:leading-[15px]'>
                      <div>{`${data.quest_reward_claimed}/${data.reward.slots}`}</div>
                      <div>rewards claimed</div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className='mt-5 w-full'>
            {data.reward_status == 'CAN_CLAIM' ? (
              <FilledButton loading={loading} onClick={claimQuestHandler} className='w-full'>
                Claim Reward
              </FilledButton>
            ) : data.reward_status == 'OUT_OF_SLOT' ? (
              <div className='text-center bg-medium-gray leading-5 font-bold text-light-medium-gray px-6 pt-2 pb-[10px] rounded-[20px]'>
                Out of reward
              </div>
            ) : data.reward_status == 'CLAIMED' && data.repeat == 'Daily' ? (
              <div className='text-center bg-medium-gray leading-5 font-bold text-light-medium-gray px-6 pt-2 pb-[10px] rounded-[20px]'>
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
            ) : (
              <Link
                target='_blank'
                href={`/comic/${data.requirement[data.type.toLowerCase()].manga.slug}${
                  data.requirement[data.type.toLowerCase()]?.chapter?.number
                    ? `/chapter/${data.requirement[data.type.toLowerCase()].chapter.number}`
                    : ''
                }`}
                className='text-center w-full block bg-light-medium-gray leading-5 font-bold text-second-color px-6 pt-2 pb-[10px] rounded-[20px]'>
                Go to page
              </Link>
            )}
          </div>
        </div>
      </Modal>
      <div
        className='bg-[#F2F2F2] lg:bg-white lg:border lg:border-light-medium-gray rounded-[10px] p-4 flex gap-[10px] min-h-[160px] relative'
        onClick={() =>
          data.unlock &&
          (data.reward_status == 'CAN_CLAIM' ||
            data.reward_status == 'NOT_SATISFY' ||
            (data.reward_status == 'CLAIMED' && data.repeat == 'Daily'))
            ? setOpen(true)
            : null
        }>
        <div className='flex-1 flex flex-col justify-between relative'>
          <div className='flex flex-col justify-between h-[68px] lg:h-[78px]'>
            <div className='text-xs leading-[15px] lg:text-base lg:leading-5 font-bold min-h-[32px] lg:min-h-[48px] line-clamp-2'>
              {data.repeat == 'Daily' && (
                <span className='bg-[#E2D8FF] text-[#A247FF] font-bold rounded-[3px] px-2 pb-[1px] lg:pt-[2px] lg:pb-1 lg:font-semibold text-[10px] lg:text-sm leading-[13px] lg:leading-[18px] mr-[5px]'>
                  Daily
                </span>
              )}
              {data.name}
            </div>
            <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px] font-semibold text-[#646464] flex items-center gap-[10px]'>
              <span>{`${data.reward.xp} XP`}</span>
              {data.reward.nft.img_url && (
                <>
                  <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
                  <span>NFT</span>
                </>
              )}
              <span className='w-1 h-1 rounded-full bg-[#646464]'></span>
              <span>{`${data.reward.slots} slots`}</span>
            </div>
          </div>

          {!data.unlock ? (
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
                {!!data.condition.level && <span>{`Reach level ${data.condition.level}`}</span>}
                {!!data.condition.level && !!data.condition.quest_id && <span> and </span>}
                {!!data.condition.quest_id && (
                  <span>
                    Complete quest{' '}
                    <span className='text-second-color'>
                      {data.condition.requiredQuest?.name.length > limitChar
                        ? data.condition.requiredQuest?.name.slice(0, limitChar) + '...'
                        : data.condition.requiredQuest?.name}
                    </span>
                  </span>
                )}
                <span> to unlock</span>
              </div>
            </div>
          ) : data.reward_status == 'CAN_CLAIM' ? (
            <FilledButton
              loading={loading}
              className='w-fit'
              onClick={(e) => {
                claimQuestHandler()
                e.stopPropagation()
              }}>
              Claim Reward
            </FilledButton>
          ) : data.reward_status == 'OUT_OF_SLOT' ? (
            <div className='text-xs w-fit bg-[#DEDEDE] leading-[15px] font-bold text-medium-gray px-6 pt-1 pb-[5px] rounded-[20px]'>
              Out of reward
            </div>
          ) : data.reward_status == 'CLAIMED' && data.repeat == 'Daily' ? (
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
        <div className='w-[140px] max-h-[130px] shrink-0 bg-white rounded-lg px-[10px] pt-[6px] pb-2 relative'>
          {data?.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image
                  src={data?.reward.nft.img_url || NoImage}
                  width={80}
                  height={80}
                  alt=''
                  className='w-[80px] h-[80px] rounded-lg'
                />
              </div>
              <div className='text-xs leading-[15px] text-[#61646B] max-w-[120px] truncate'>
                {data?.reward.nft?.nft_name}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px]' />
              </div>
              <div className='w-full bg-[#61646B] rounded font-bold text-[#23FF81] text-xs leading-[15px] pt-[2px] pb-1 text-center'>{`+ ${data.reward.xp} XP`}</div>
            </div>
          )}
        </div>

        {data.reward_status == 'CLAIMED' && data.repeat == 'Once' && (
          <div className='bg-[#1FAB5E1A] absolute bottom-0 inset-x-0 h-[60px] backdrop-blur-[10px] rounded-b-[10px] font-semibold text-second-color text-xs lg:text-sm lg:leading-[18px] flex items-center justify-center'>
            Quest completed
          </div>
        )}
      </div>
    </>
  )
}
