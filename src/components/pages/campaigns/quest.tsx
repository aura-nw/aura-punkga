import Image from 'next/image'
import QuestBackground from './assets/quest-background.svg'
import LockQuestBackground from './assets/lock-quest-background.svg'
import LockImage from './assets/lock-image.svg'
import { useContext, useEffect, useState } from 'react'
import Modal from './modal'
import { Quest } from 'src/models/campaign'
import moment from 'moment'
import { getQuestDetail } from 'src/services'
import { Context } from 'src/context'
import Link from 'next/link'
export default function Quest({ data }: { data: Quest }) {
  const [open, setOpen] = useState(false)
  const { account } = useContext(Context)
  const [questDetail, setQuestDetail] = useState<any>()
  useEffect(() => {
    if (open) {
      fetchQuestDetail()
    } else {
      setQuestDetail(undefined)
    }
  }, [open])

  const fetchQuestDetail = async () => {
    try {
      const res = await getQuestDetail(data.id, account?.id)
      setQuestDetail(res)
    } catch (error) {
      console.log(error)
    }
  }

  const mission = data.requirement.read
    ? `Read chapter ${data.requirement.read?.chapter?.title} of manga ${data.requirement.read?.manga?.title}`
    : data.requirement.comment
    ? `Comment something in chapter ${data.requirement.comment?.chapter?.title} of manga ${data.requirement.comment?.manga?.title}`
    : `Subcribe ${data.requirement?.subscribe?.manga?.title}`
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
      : `/comic/${data.requirement.subscribe.manga?.slug}`
  if (!data.unlock)
    return (
      <>
        <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)}>
          <div className='flex flex-col gap-8'>
            <div className='flex justify-between'>
              <div className='text-[32px] font-bold'>{data.name}</div>
              {data.reward.nft ? (
                <div className=''>
                  <div className='p-1 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
                    <div className='bg-white font-bold text-sm'>
                      <Image
                        src={data.reward.nft.img_url}
                        width={28}
                        height={28}
                        alt=''
                        className='object-cover aspect-square'
                      />
                    </div>
                  </div>
                  <div className='text-sm font-medium text-center'>NFT</div>
                </div>
              ) : (
                <div className='h-fit bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
                  <div className='bg-[#f4f4f4] m-1 font-bold text-[26px]'>
                    <span className='text-second-color'>{data.reward.xp}</span> EXP
                  </div>
                </div>
              )}
            </div>
            {conditions ? (
              <div className='text-lg text-second-color font-bold'>
                <span className='font-bold'>CONDITION: </span>
                {conditions}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Modal>
        <div className='relative cursor-pointer' onClick={() => setOpen(true)}>
          <Image src={LockQuestBackground} alt='' />
          <div className='absolute inset-0'>
            <div className='p-6 flex gap-5 flex-col items-center justify-center h-full'>
              <Image src={LockImage} alt='' />
              <div className='text-xl font-bold text-center'>{data.name}</div>
              {conditions ? (
                <div className='text-sm text-second-color text-center'>
                  <span className='font-bold'>CONDITION:</span>
                  {conditions}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {data.reward.nft ? (
            <div className='absolute top-8 right-6'>
              <div className='p-1 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
                <div className='bg-white font-bold text-sm'>
                  <Image
                    src={data.reward.nft.img_url}
                    width={28}
                    height={28}
                    alt=''
                    className='object-cover aspect-square'
                  />
                </div>
              </div>
              <div className='text-sm font-medium text-center'>NFT</div>
            </div>
          ) : (
            <div className='absolute top-8 right-6 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
              <div className='bg-white m-1 font-bold text-sm'>
                <span className='text-second-color'>{data.reward.xp}</span> EXP
              </div>
            </div>
          )}
        </div>
      </>
    )

  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)}>
        <div className='flex flex-col gap-8'>
          <div className='flex justify-between'>
            <div className='text-[32px] font-bold'>{data.name}</div>
            {data.reward.nft ? (
              <div className=''>
                <div className='p-1 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
                  <div className='bg-white font-bold text-sm'>
                    <Image
                      src={data.reward.nft.img_url}
                      width={28}
                      height={28}
                      alt=''
                      className='object-cover aspect-square'
                    />
                  </div>
                </div>
                <div className='text-sm font-medium text-center'>NFT</div>
              </div>
            ) : (
              <div className='h-fit bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
                <div className='bg-[#f4f4f4] m-1 font-bold text-[26px]'>
                  <span className='text-second-color'>{data.reward.xp}</span> EXP
                </div>
              </div>
            )}
          </div>
          <div className='uppercase font-bold text-lg border py-2 px-3 w-fit leading-3 rounded-sm border-[#414141]'>
            {data.type}
          </div>
          <div className='text-lg text-[#61646B] font-bold'>
            <span className='font-bold'>MISSION:</span>
            {mission}
          </div>
          {conditions ? <div className='text-2xl text-subtle-dark font-bold'>{conditions}</div> : <div></div>}
          <Link
            href={pageLink}
            className='p-3 hover:bg-[#DEDEDE] rounded-[20px] mt-[14px] text-center outline-none'
            target='_blank'>
            <div className='underline text-[32px] font-bold text-[#414141]'>Go to page</div>
          </Link>
          {questDetail && questDetail?.reward_status == 2 ? (
            <button className='p-3 bg-[#ababab] rounded-[20px] -mb-14 pointer-events-none'>
              <div className='text-[32px] font-bold text-[#414141]'>Claimed</div>
            </button>
          ) : questDetail && questDetail?.reward_status == 1 ? (
            <button className='p-3 bg-primary-color rounded-[20px] -mb-14'>
              <div className='text-[32px] font-bold text-[#414141]'>Claim reward</div>
            </button>
          ) : (
            <button className='p-3 bg-[#ababab] rounded-[20px] -mb-14 pointer-events-none'>
              <div className='text-[32px] font-bold text-[#414141]'>Claim reward</div>
            </button>
          )}
        </div>
      </Modal>
      <div className='relative cursor-pointer' onClick={() => setOpen(true)}>
        <Image src={QuestBackground} alt='' />
        <div className='absolute top-9 left-5 bottom-6 right-5 flex flex-col justify-between'>
          <div className='h-20 flex flex-col gap-3'>
            <div className='text-xl font-bold max-w-[240px] leading-5 h-10'>{data.name}</div>
            <div className='uppercase font-bold text-lg border py-2 px-3 w-fit leading-3 rounded-sm border-[#414141]'>
              {data.type}
            </div>
          </div>
          <div className='flex flex-col justify-between h-[140px]'>
            <div className='text-sm text-[#61646B]'>
              <span className='font-bold'>MISSION:</span>
              {mission}
            </div>
            <div className='text-sm text-second-color'>
              <span className='font-bold'>CONDITION:</span>
              {conditions}
            </div>
          </div>
        </div>
        {data.reward.nft ? (
          <div className='absolute top-8 right-6'>
            <div className='p-1 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
              <div className='bg-white font-bold text-sm'>
                <Image
                  src={data.reward.nft.img_url}
                  width={28}
                  height={28}
                  alt=''
                  className='object-cover aspect-square'
                />
              </div>
            </div>
            <div className='text-sm font-medium text-center'>NFT</div>
          </div>
        ) : (
          <div className='absolute top-8 right-6 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
            <div className='bg-white m-1 font-bold text-sm'>
              <span className='text-second-color'>{data.reward.xp}</span> EXP
            </div>
          </div>
        )}
      </div>
    </>
  )
}
