import FilledButton from 'components/Button/FilledButton'
import Footer from 'components/Footer'
import Header from 'components/Header'
import StatusLabel from 'components/Label/Status'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
import LeaderBoard from 'components/pages/campaigns/leaderboard'
import DOMPurify from 'dompurify'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Context } from 'src/context'
import { Campaign } from 'src/models/campaign'
import {
  claimCampaignReward,
  enrollCampaign,
  getCampaignAuthorizedData,
  getCampaignDetail,
  getCampaignLeaderboard,
} from 'src/services'
import useSWR, { useSWRConfig } from 'swr'
import QuestList from './questList'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <CampaignDetail {...props} />
}
function CampaignDetail({}) {
  const { account } = useContext(Context)
  const [data, setData] = useState<Campaign>()
  const [seeMore, setSeeMore] = useState(false)
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const { query } = useRouter()
  const slug = query.campaignSlug as string
  const { mutate } = useSWRConfig()
  const { t } = useTranslation()
  const { data: authData } = useSWR(
    { key: 'fetch_campaign_auth_data', slug },
    ({ key, slug }) => getCampaignAuthorizedData(slug),
    {
      refreshInterval: 60000,
    }
  )
  const { data: leaderboardData } = useSWR(
    { key: `get_leaderboard_${data?.id}`, id: data?.id },
    async ({ id }) => {
      if (id) {
        const data = await getCampaignLeaderboard(id)
        return data?.user_campaign || []
      } else {
        return []
      }
    },
    { refreshInterval: 10000 }
  )
  useEffect(() => {
    fetchData()
  }, [account])
  const fetchData = async () => {
    try {
      const data = await getCampaignDetail(slug)
      if (data.data?.campaign?.[0]) {
        setData(data.data.campaign[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const enrollHandler = async () => {
    try {
      if (!account) {
        ;(document.querySelector('#open-sign-in-btn') as any)?.click()
      } else {
        setEnrollLoading(true)
        const res = await enrollCampaign(data.id)
        await fetchData()
        mutate({ key: 'fetch_campaign_auth_data', slug })
        if (res) {
          toast(`Enroll successful`, {
            type: 'success',
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
          })
        }
        setEnrollLoading(false)
      }
    } catch (error) {
      mutate({ key: 'fetch_campaign_auth_data', slug })
      setEnrollLoading(false)
      toast(`Enroll failed`, {
        type: 'error',
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      console.error(error)
    }
  }
  const claimHandler = async () => {
    try {
      setClaimLoading(true)
      const res = await claimCampaignReward(data.id)
      if (res) {
        toast(`Claim successful`, {
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
      }
      setClaimLoading(false)
    } catch (error) {
      setClaimLoading(false)
      toast(`Claim failed`, {
        type: 'error',
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
      console.error(error)
    }
  }

  if (!data) return null

  const isEnded = moment(data.end_date).isBefore()
  const isUpcoming = moment(data.start_date).isAfter()
  const isOngoing = moment(data.start_date).isBefore() && moment(data.end_date).isAfter()
  const isEnrolled = !!authData?.campaign_quests
  return (
    <>
      <Header />
      <div className='pk-container'>
        <div className='py-5 lg:py-16 lg:grid-cols-[1fr_min(50%,520px)] lg:grid lg:gap-x-10 lg:grid-rows-[auto_1fr]'>
          <div>
            {/* Campaign info  */}
            <StatusLabel status={isUpcoming ? 'warning' : !isEnded ? 'success' : 'default'} className='lg:hidden'>
              {t(isUpcoming ? 'Upcoming' : !isEnded ? 'Ongoing' : 'Ended')}
            </StatusLabel>
            <div className='flex justify-between'>
              <div className='font-bold mt-[5px] leading-5 lg:text-xl lg:leading-[25px] lg:mt-0'>
                {data.name}{' '}
                <span className='hidden lg:inline-block ml-[15px]'>
                  <StatusLabel status={isUpcoming ? 'warning' : !isEnded ? 'success' : 'default'}>
                    {t(isUpcoming ? 'Upcoming' : !isEnded ? 'Ongoing' : 'Ended')}
                  </StatusLabel>
                </span>
              </div>
              <div className='hidden lg:block'>
                {/* Enroll button */}
                {isUpcoming ? (
                  <div>
                    <button className='w-full bg-[#ABABAB] text-[#DEDEDE] font-bold leading-[25px] text-xl px-8 text-center pt-3 pb-[14px] rounded-[20px]'>
                      Enroll now
                    </button>
                  </div>
                ) : isOngoing && !isEnrolled ? (
                  <div>
                    <FilledButton size='lg' loading={enrollLoading} className='w-full' onClick={enrollHandler}>
                      Enroll now
                    </FilledButton>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='my-5 flex justify-between items-start text-sm leading-[18px] lg:text-base lg:leading-5'>
              <div className='flex flex-col gap-[5px] lg:flex-row lg:gap-5 lg:flex-wrap'>
                <div>Starts: {moment(data.start_date).format('HH:mm DD/MM/yyyy')}</div>
                <span className='h-5 w-[1px] hidden lg:inline-block bg-[#F0F0F0]'></span>
                <div>Ends: {moment(data.end_date).format('HH:mm DD/MM/yyyy')}</div>
                <span className='h-5 w-[1px] hidden lg:inline-block bg-[#F0F0F0]'></span>
                <div className='lg:block hidden'>{`${data?.participants?.aggregate?.count} participants`}</div>
              </div>
              <div className='lg:hidden'>{`${data?.participants?.aggregate?.count} participants`}</div>
            </div>
            <div
              className={` text-[#61646B] text-sm leading-[18px] lg:text-base lg:leading-5 ${
                seeMore ? '' : 'line-clamp-3'
              }`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}></div>
            <div
              className='font-semibold text-sm lg:text-base lg:leading-5 text-second-color mt-1'
              onClick={() => setSeeMore(!seeMore)}>
              {seeMore ? 'See less' : 'See more'}
            </div>
            {/* Enroll button */}
            {isUpcoming ? (
              <div className='mt-10 lg:hidden'>
                <button className='w-full bg-[#ABABAB] text-[#DEDEDE] font-bold leading-5 text-center pt-2 pb-[10px] rounded-full'>
                  Enroll now
                </button>
              </div>
            ) : isOngoing && !isEnrolled ? (
              <div className='mt-10 lg:hidden'>
                <FilledButton loading={enrollLoading} className='w-full' onClick={enrollHandler}>
                  Enroll now
                </FilledButton>
              </div>
            ) : null}
          </div>
          <div className='row-span-2'>
            {/* Claim section */}
            <div className='p-5 w-full flex flex-col gap-5 bg-[#F0F0F0] rounded-[10px] mt-10 lg:mt-0'>
              <p className='text-center w-full text-lg lg:text-2xl lg:leading-[30px] leading-[23px] font-bold'>
                Bonus to 👑 1st place
              </p>
              <div className='flex gap-[30px] justify-center items-start'>
                {data?.reward?.nft?.nft_name && (
                  <div className='flex flex-col gap-[10px] justify-center'>
                    <Image
                      src={data?.reward?.nft.img_url || NoImage}
                      width={200}
                      height={200}
                      alt=''
                      className=' w-[160px] h-[160px] lg:w-[220px] lg:h-[220px] rounded-lg object-cover'
                    />
                    <p className='text-center text-sm text-[#61646B] max-w-[160px] lg:max-w-[220px] line-clamp-2'>
                      {data.reward?.nft.nft_name}
                    </p>
                  </div>
                )}
                {!!data.reward.xp && (
                  <div className='bg-white rounded-lg w-[160px] h-[160px] lg:w-[220px] lg:h-[220px] flex justify-center items-center flex-col gap-[10px]'>
                    <Image src={IllusImage} alt='' className='h-[100px] w-[100px] lg:w-[140px] lg:h-[140px]' />
                    <p className='text-xl leading-[25px] lg:text-[32px] lg:leading-[40px] text-second-color font-bold'>{`+ ${data.reward.xp} XP`}</p>
                  </div>
                )}
              </div>
              {isEnrolled ? (
                isEnded && account.id == leaderboardData[0].id ? (
                  <FilledButton
                    loading={claimLoading}
                    className='w-full lg:p-3 lg:rounded-[20px] lg:text-base lg:leading-6'
                    onClick={claimHandler}>
                    Claim Reward
                  </FilledButton>
                ) : (
                  <button className='w-full bg-[#ABABAB] text-[#DEDEDE] font-bold leading-5 text-center pt-2 pb-[10px] rounded-full lg:p-3 lg:rounded-[20px] lg:text-base lg:leading-6'>
                    Claim Reward
                  </button>
                )
              ) : null}
            </div>
            {/* Leaderboard  */}
            <div>
              <LeaderBoard data={leaderboardData} />
              {/* <LeaderBoard/> */}
            </div>
          </div>
          <div>
            {/* Quest  */}
            <QuestList quests={authData?.campaign_quests} isEnded={isEnded} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
