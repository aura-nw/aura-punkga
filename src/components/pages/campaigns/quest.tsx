import Spinner from 'components/Spinner'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { claimQuest, getQuestDetail } from 'src/services'
import useSWR from 'swr'
import LockImage from './assets/lock-image.svg'
import Modal from './modal'
import DOMPurify from 'dompurify'

export default function Quest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isClaimed, setIsClaimed] = useState<number | undefined>()
  const { account, getProfile } = useContext(Context)
  const { data: questDetail } = useSWR(
    {
      key: 'get_quest_detail',
      questId: data.id,
      accountId: account?.id,
      open,
    },
    ({ questId, accountId, open }) => (open ? getQuestDetail(questId, accountId) : null),
    { refreshInterval: 5000 }
  )

  useEffect(() => {
    if (questDetail?.reward_status != undefined) {
      setIsClaimed(questDetail?.reward_status)
    }
  }, [questDetail?.reward_status])

  const mission = data.requirement.read
    ? `Read ${data.requirement.read?.manga?.title} - ${data.requirement.read?.chapter?.title}`
    : data.requirement.comment
    ? `Leave a comment on ${data.requirement.comment?.manga?.title} - ${data.requirement.comment?.chapter?.title}`
    : `Subcribe to ${data.requirement?.subscribe?.manga?.title}` + ' to claim your reward'
  const conditions = data.condition.level
    ? `Unlock at level ${data.condition.level}`
    : `${[
        data.condition.after
          ? new Date(data.condition.after).getTime() > Date.now()
            ? `Open in ${moment(data.condition.after).fromNow(true)}`
            : `Opened since ${moment(data.condition.after).fromNow(true)}`
          : '',
        data.condition.before
          ? new Date(data.condition.before).getTime() > Date.now()
            ? `Close in ${moment(data.condition.before).fromNow(true)}`
            : `Closed since ${moment(data.condition.before).fromNow(true)}`
          : '',
      ]
        .filter((v) => v)
        .join(', ')}`
  const pageLink =
    data.requirement.comment || data.requirement.read
      ? `/comic/${(data.requirement.comment || data.requirement.read).manga?.slug}/chapter/${
          (data.requirement.comment || data.requirement.read).chapter?.number
        }`
      : `/comic/${data.requirement.subscribe.manga?.slug}/chapter/1`

  const openQuestHandler = () => {
    if (account) {
      setOpen(true)
    } else {
      ;(document.querySelector('#open-sign-in-btn') as any)?.click()
    }
  }

  const claimQuestHandler = async () => {
    try {
      if (loading) return
      setLoading(true)
      const res = await claimQuest(data.id)
      await getProfile()
      if (res) {
        setIsClaimed(2)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  if (!data.unlock)
    return (
      <>
        <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)} hideClose>
          <div className='flex flex-col gap-[26px]'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <div className='font-bold flex flex-col gap-5'>
                  <div className=''>{data.name}</div>
                  <div className='border border-second-color p-2 rounded text-sm leading-3 font-medium w-fit uppercase'>
                    {data.type}
                  </div>
                </div>
                {data.reward.nft ? (
                  <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium w-[66px] h-[66px]'>
                    <Image
                      src={data.reward.nft.img_url}
                      width={66}
                      height={66}
                      alt=''
                      className='object-cover w-full h-full'
                    />
                  </div>
                ) : (
                  <div className='border border-second-color p-2 bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium  whitespace-nowrap h-fit'>
                    <span className='text-second-color font-bold'>{data.reward.xp}</span> XP
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              {data.description ? (
                <div
                  className='text-xs text-subtle-dark whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}></div>
              ) : (
                <div></div>
              )}
              {mission ? (
                <div className='text-xs text-second-color font-medium'>
                  <span className='font-bold'>CONDITION: </span>
                  {conditions}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Modal>
        <div
          className='relative cursor-pointer py-8 flex flex-col gap-5 rounded-[10px] border border-[#DEDEDE] bg-gradient-to-t from-[#39FF53]/10 via-50% via-transparent'
          onClick={openQuestHandler}>
          <div className='relative flex justify-center'>
            <Image src={LockImage} alt='' />
          </div>
          <div className='flex gap-2 flex-col justify-center items-center'>
            <div className='font-bold text-[#292929] min-h-[40px] px-8 text-center'>{data.name}</div>
            {conditions ? (
              <div className='text-xs text-second-color'>
                <span className='font-bold'>CONDITION: </span>
                {conditions}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </>
    )

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)} hideClose>
        <div className='flex flex-col gap-[26px]'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='font-bold flex flex-col gap-5'>
                <div>{data.name}</div>
                <div className='border border-second-color p-2 rounded text-sm leading-3 font-medium w-fit uppercase'>
                  {data.type}
                </div>
              </div>
              {data.reward.nft ? (
                <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium w-[66px] h-[66px]'>
                  <Image
                    src={data.reward.nft.img_url}
                    width={66}
                    height={66}
                    alt=''
                    className='object-cover w-full h-full'
                  />
                </div>
              ) : (
                <div className='border border-second-color p-2 bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium whitespace-nowrap h-fit'>
                  <span className='text-second-color font-bold'>{data.reward.xp}</span> XP
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            {data.description ? (
              <div
                className='text-xs text-subtle-dark whitespace-pre-wrap'
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}></div>
            ) : (
              <div></div>
            )}
            <div className='text-xs font-bold text-subtle-dark'>{mission}</div>
          </div>
          <Link
            href={pageLink}
            className='p-3 hover:bg-[#DEDEDE] rounded-[20px] text-center outline-none'
            target='_blank'>
            <div className='underline font-bold text-[#414141]'>Go to page</div>
          </Link>
          {isClaimed == 2 ? (
            <button className='p-3 bg-[#ababab] rounded-[20px] pointer-events-none'>
              <div className='font-bold text-[#414141]'>Claimed</div>
            </button>
          ) : isClaimed == 1 ? (
            <button
              className='p-3 bg-primary-color rounded-[20px] flex gap-2 items-center justify-center'
              onClick={claimQuestHandler}>
              {loading && (
                <span>
                  <Spinner className={` h-5 w-5`} />
                </span>
              )}
              <div className='font-bold text-[#414141]'>Claim reward</div>
            </button>
          ) : isClaimed == 0 ? (
            <button className='p-3 bg-[#ababab] rounded-[20px] pointer-events-none'>
              <div className='font-bold text-[#414141]'>Claim reward</div>
            </button>
          ) : (
            <button className='p-3 bg-[#ababab] rounded-[20px] pointer-events-none'>
              <span>
                <Spinner className={` h-6 w-6`} />
              </span>
            </button>
          )}
        </div>
      </Modal>
      <div
        className='relative cursor-pointer p-8 flex flex-col gap-5 rounded-[10px] border border-[#DEDEDE] '
        onClick={openQuestHandler}>
        <div className='flex flex-col justify-between gap-5 min-h-[181px]'>
          <div className='flex gap-7 justify-between'>
            <div className='font-bold max-w-[240px] leading-5 pr-1 line-clamp-2 min-h-[40px]'>{data.name}</div>
            {data.reward.nft ? (
              <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-xs leading-3 font-medium w-[38px] aspect-square'>
                <Image
                  src={data.reward.nft.img_url}
                  width={38}
                  height={38}
                  alt=''
                  className='object-cover h-full w-full'
                />
              </div>
            ) : (
              <div className='border border-second-color p-2 bg-[#1FAB5E]/10 rounded text-xs leading-3 font-medium whitespace-nowrap h-fit'>
                <span className='text-second-color font-bold'>{data.reward.xp}</span> XP
              </div>
            )}
          </div>
          <div className='flex-1 flex justify-between flex-col'>
            <div className='flex gap-2 flex-col'>
              {data.description ? (
                <div
                  className='text-xs text-subtle-dark line-clamp-2 whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }}></div>
              ) : (
                <div></div>
              )}
              {conditions ? (
                <div className='text-xs text-second-color'>
                  <span className='font-bold'>CONDITION: </span>
                  {conditions}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className='border border-second-color p-2 rounded text-xs leading-3 font-medium w-fit uppercase'>
              {data.type}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
