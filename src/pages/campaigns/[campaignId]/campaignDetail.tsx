import Footer from 'components/Footer'
import Header from 'components/Header'
import StatusLabel from 'components/Label/Status'
import IllusImage from 'components/pages/campaigns/assets/illus.svg'
import Mascot2 from 'components/pages/campaigns/assets/Mascot2.svg'
import LeaderBoard from 'components/pages/campaigns/leaderboard'
import DOMPurify from 'dompurify'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { Campaign } from 'src/models/campaign'
import { getCampaignAuthorizedData, getCampaignDetail } from 'src/services'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <CampaignDetail {...props} />
}
function CampaignDetail({}) {
  const { account } = useContext(Context)
  const [data, setData] = useState<Campaign>()
  const [authData, setAuthData] = useState<Campaign>()
  const [seeMore, setSeeMore] = useState(false)
  const { query } = useRouter()
  const id = query.campaignId
  const router = useRouter()
  const { t } = useTranslation()
  useEffect(() => {
    if (!account) {
      ;(document.querySelector('#open-sign-in-btn') as any)?.click()
    } else {
      fetchAuthData()
    }
    fetchData()
  }, [account])
  const fetchData = async () => {
    try {
      const data = await getCampaignDetail(id)
      if (data.data?.campaign?.[0]) {
        setData(data.data.campaign[0])
      }
    } catch (error) {}
  }
  const fetchAuthData = async () => {
    try {
      const authData = await getCampaignAuthorizedData(id)
      if (authData) {
        console.log(authData)
      }
    } catch (error) {}
  }
  if (!data) return null
  return (
    <>
      <Header />
      <div className='pk-container'>
        <div className='py-5'>
          <StatusLabel
            status={
              moment(data.start_date).isAfter() ? 'warning' : moment(data.end_date).isAfter() ? 'success' : 'default'
            }>
            {t(moment(data.start_date).isAfter() ? 'Upcoming' : moment(data.end_date).isAfter() ? 'Ongoing' : 'Ended')}
          </StatusLabel>
          <div className='font-bold mt-[5px] leading-5'>{data.name}</div>
          <div className='my-5 flex justify-between items-start text-sm leading-[18px]'>
            <div className='flex flex-col gap-[5px]'>
              <div>Starts: {moment(data.start_date).format('HH:mm DD/MM/yyyy')}</div>
              <div>Ends: {moment(data.end_date).format('HH:mm DD/MM/yyyy')}</div>
            </div>
            <div>{`${data?.participants?.aggregate?.count} participants`}</div>
          </div>
          <div
            className={` text-[#61646B] text-sm leading-[18px] ${seeMore ? '' : 'line-clamp-3'}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}></div>
          <div className='font-semibold text-sm text-second-color mt-1' onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? 'See less' : 'See more'}
          </div>
          {/* Enroll button */}
          <div className='mt-10'>
            <button className='w-full bg-primary-color font-bold leading-5 text-center pt-2 pb-[10px] rounded-full'>
              Enroll now
            </button>
          </div>
          {/* Claim section */}
          <div className='p-5 w-full flex flex-col gap-5 bg-[#F0F0F0] rounded-[10px] mt-10'>
            <p className='text-center w-full text-lg leading-[23px] font-bold'>Bonus to 👑 1st place</p>
            <div className='flex gap-[30px] justify-center items-start'>
              {data?.reward?.nft_name && (
                <div className='w-1/2 flex flex-col gap-[10px] justify-center'>
                  <Image
                    src={data?.reward.img_url || NoImage}
                    width={200}
                    height={200}
                    alt=''
                    className='w-full aspect-square rounded-lg object-cover'
                  />
                  <p className='text-center text-sm text-[#61646B]'>{data.reward.nft_name}</p>
                </div>
              )}
              {!!data.reward.xp && (
                <div className='bg-white rounded-lg w-1/2 aspect-square flex justify-center items-center flex-col gap-[10px]'>
                  <Image src={IllusImage} alt='' className='h-[100px] w-[100px]' />
                  <p className='text-xl leading-[25px] text-second-color font-bold'>{`+ ${data.reward.xp} XP`}</p>
                </div>
              )}
            </div>
            <div>
              <button className='w-full bg-primary-color font-bold leading-5 text-center pt-2 pb-[10px] rounded-full'>
                Claim Reward
              </button>
            </div>
          </div>
          {/* Leaderboard  */}
          <div>
            <div className='bg-[#f0f0f0] rounded-[10px] mt-10'>
              <div className='md:py-4 py-3 md:px-[32px] px-[16px] w-full h-full flex flex-col'>
                <div className='md:text-xl leading-5 md:leading-[25px] font-bold w-full text-center border-b-[3px] pb-[2px] md:mb-3 mb-2 text-[#414141] border-[#414141]'>
                  Leaderboard
                </div>
                <div className='flex justify-between md:px-[32px] px-[6px] py-2 md:pb-3 md:pt-1 border-b-[1px] border-medium-gray text-subtle-dark font-semibold text-xs md:text-sm md:leading-[18px] leading-4'>
                  <div className='flex gap-16'>
                    <div>Rank</div>
                    <div>User</div>
                  </div>
                  <div className='flex gap-16'>
                    <div>Quests</div>
                    <div>XP</div>
                  </div>
                </div>
                <div className='h-[321px] flex flex-col relative justify-center items-center'>
                  <p className='text-xs font-semibold'>Enroll to view leaderboard</p>
                </div>
              </div>
            </div>
            {/* <LeaderBoard/> */}
          </div>
          {/* Quest  */}
          <div className='mt-10'>
            <p className='text-lg leading-[23px] font-bold'>Quests</p>
            <div className='mt-5 p-6 flex flex-col items-center w-full'>
              <Image src={Mascot2} alt='' className='w-[240px] h-[240px]' />
              <div className='text-sm leading-[18px] font-semibold mt-5 text-center'>Enroll to view quests</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
