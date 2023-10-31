import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Context } from 'src/context'
import { claimQuest, getAvailableQuests, getQuestDetail } from 'src/services'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import DOMPurify from 'dompurify'
import { Quest } from 'src/models/campaign'
import moment from 'moment'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'

export default function Quest() {
  const { account } = useContext(Context)
  const { data } = useSWR(
    { key: 'get_available_quests', account },
    ({ account }) => (account ? getAvailableQuests() : null),
    { refreshInterval: 30000 }
  )

  return (
    <div className='mt-10'>
      <div className='flex items-center gap-5'>
        <div className='text-xl leading-[25px] font-bold text-[#1C1C1C]'>Available Quests</div>
        <Link
          href='/campaigns'
          className='px-6 py-2 rounded-full border-2 border-second-color text-second-color font-bold leading-5'>
          See all
        </Link>
      </div>
      {!!data?.length && (
        <div className='w-full relative mt-5 h-[244px]'>
          <div className='absolute inset-0 [&_.swiper-button-prev]:text-[#61646B] [&_.swiper-button-next]:text-[#61646B] flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='37'
              height='36'
              viewBox='0 0 37 36'
              fill='none'
              className='shrink-0 cursor-pointer swiper-prev mr-10'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M23.7321 6.64586C24.2039 7.05021 24.2585 7.76042 23.8542 8.23216L15.4817 18L23.8542 27.7679C24.2585 28.2396 24.2039 28.9498 23.7321 29.3542C23.2604 29.7585 22.5502 29.7039 22.1458 29.2322L13.1458 18.7322C12.7847 18.3109 12.7847 17.6892 13.1458 17.2679L22.1458 6.76788C22.5502 6.29614 23.2604 6.24151 23.7321 6.64586Z'
                fill='#61646B'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M23.7321 6.64586C24.2039 7.05021 24.2585 7.76042 23.8542 8.23216L15.4817 18L23.8542 27.7679C24.2585 28.2396 24.2039 28.9498 23.7321 29.3542C23.2604 29.7585 22.5502 29.7039 22.1458 29.2322L13.1458 18.7322C12.7847 18.3109 12.7847 17.6892 13.1458 17.2679L22.1458 6.76788C22.5502 6.29614 23.2604 6.24151 23.7321 6.64586Z'
                fill='black'
                fill-opacity='0.2'
              />
            </svg>
            <Swiper
              autoplay={{
                delay: 4000,
              }}
              loop
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              spaceBetween={50}
              slidesPerView={2}
              modules={[Navigation]}>
              {data?.map((quest: Quest, index) => {
                return (
                  <SwiperSlide key={index}>
                    <QuestItem quest={quest} />
                  </SwiperSlide>
                )
              })}
              {data.length < 2 && <SwiperSlide></SwiperSlide>}
            </Swiper>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='37'
              height='36'
              viewBox='0 0 37 36'
              fill='none'
              className='shrink-0 cursor-pointer swiper-next ml-10'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.2679 6.64586C13.7396 6.24151 14.4498 6.29614 14.8542 6.76788L23.8542 17.2679C24.2153 17.6892 24.2153 18.3109 23.8542 18.7322L14.8542 29.2322C14.4498 29.7039 13.7396 29.7585 13.2679 29.3542C12.7961 28.9498 12.7415 28.2396 13.1459 27.7679L21.5183 18L13.1459 8.23216C12.7415 7.76042 12.7961 7.05021 13.2679 6.64586Z'
                fill='#61646B'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.2679 6.64586C13.7396 6.24151 14.4498 6.29614 14.8542 6.76788L23.8542 17.2679C24.2153 17.6892 24.2153 18.3109 23.8542 18.7322L14.8542 29.2322C14.4498 29.7039 13.7396 29.7585 13.2679 29.3542C12.7961 28.9498 12.7415 28.2396 13.1459 27.7679L21.5183 18L13.1459 8.23216C12.7415 7.76042 12.7961 7.05021 13.2679 6.64586Z'
                fill='black'
                fill-opacity='0.2'
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
const QuestItem = ({ quest }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isClaimed, setIsClaimed] = useState<number | undefined>()
  const { account, getProfile } = useContext(Context)
  const { data: questDetail } = useSWR(
    {
      key: 'get_quest_detail',
      questId: quest.id,
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

  const mission = quest.requirement.read
    ? `Read ${quest.requirement.read?.manga?.title} - ${quest.requirement.read?.chapter?.title}`
    : quest.requirement.comment
    ? `Leave a comment on ${quest.requirement.comment?.manga?.title} - ${quest.requirement.comment?.chapter?.title}`
    : `Subcribe to ${quest.requirement?.subscribe?.manga?.title}` + ' to claim your reward'
  const conditions = quest.condition.level
    ? `Unlock at level ${quest.condition.level}`
    : `${[
        quest.condition.after
          ? new Date(quest.condition.after).getTime() > Date.now()
            ? `Open in ${moment(quest.condition.after).fromNow(true)}`
            : `Opened since ${moment(quest.condition.after).fromNow(true)}`
          : '',
        quest.condition.before
          ? new Date(quest.condition.before).getTime() > Date.now()
            ? `Close in ${moment(quest.condition.before).fromNow(true)}`
            : `Closed since ${moment(quest.condition.before).fromNow(true)}`
          : '',
      ]
        .filter((v) => v)
        .join(', ')}`
  const pageLink =
    quest.requirement.comment || quest.requirement.read
      ? `/comic/${(quest.requirement.comment || quest.requirement.read).manga?.slug}/chapter/${
          (quest.requirement.comment || quest.requirement.read).chapter?.number
        }`
      : `/comic/${quest.requirement.subscribe.manga?.slug}/chapter/1`

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
      const res = await claimQuest(quest.id)
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
  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)} hideClose>
        <div className='bg-[#f4f4f4] p-8 rounded-[10px] w-[656px]'>
          <div className='flex flex-col gap-[26px]'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <div className='font-bold flex flex-col gap-5'>
                  <div>{quest.name}</div>
                  <div className='border border-second-color p-2 rounded text-sm leading-3 font-medium w-fit uppercase'>
                    {quest.type}
                  </div>
                </div>
                {quest.reward.nft ? (
                  <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium w-[66px] h-[66px]'>
                    <Image
                      src={quest.reward.nft.img_url}
                      width={66}
                      height={66}
                      alt=''
                      className='object-cover w-full h-full'
                    />
                  </div>
                ) : (
                  <div className='border border-second-color p-2 bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium whitespace-nowrap h-fit'>
                    <span className='text-second-color font-bold'>{quest.reward.xp}</span> XP
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              {quest.description ? (
                <div
                  className='text-xs text-subtle-dark whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(quest?.description) }}></div>
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
        </div>
      </Modal>
      <div
        className='relative mx-auto w-[380px] h-[244px] px-8 py-4 rounded-[10px] border border-[#DEDEDE] flex flex-col justify-between cursor-pointer'
        onClick={() => setOpen(true)}>
        <div>
          <div className='flex gap-7 min-h-[40px] w-full justify-between'>
            <div className='font-bold leading-5 line-clamp-2'>{`${quest.name}`}</div>
            {quest.reward.nft ? (
              <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium w-[38px] h-[38px] shrink-0'>
                <Image
                  src={quest.reward.nft.img_url}
                  width={38}
                  height={38}
                  alt=''
                  className='object-cover w-full h-full'
                />
              </div>
            ) : (
              <div className='border border-second-color p-2 bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium  whitespace-nowrap h-fit'>
                <span className='text-second-color font-bold'>{quest.reward.xp}</span> XP
              </div>
            )}
          </div>
          {quest.description ? (
            <div
              className='text-xs text-subtle-dark whitespace-pre-wrap mt-5 line-clamp-2'
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(quest.description) }}></div>
          ) : (
            <div></div>
          )}
          {conditions ? (
            <div className='text-xs text-second-color font-medium mt-5'>
              <span className='font-bold'>CONDITION: </span>
              {conditions}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className='border border-second-color p-2 rounded text-sm leading-3 font-medium w-fit uppercase'>
          {quest.type}
        </div>
      </div>
    </>
  )
}
