import Checkbox from 'components/Input/Checkbox'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import DOMPurify from 'dompurify'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { Campaign } from 'src/models/campaign'
import { getCampaigns } from 'src/services'
import useSWR from 'swr'
import IllusImage from './assets/illus.svg'
export default function Campaign() {
  const { account } = useContext(Context)
  const router = useRouter()
  const { t } = useTranslation()
  const { data } = useSWR(
    { key: 'get_all_campaigns', accountId: account?.id },
    ({ accountId }) => getCampaigns(accountId),
    {
      refreshInterval: 10000,
    }
  )
  const [rewardNFTChecked, setRewardNFTChecked] = useState<boolean>(false)
  const [enrolledChecked, setEnrolledChecked] = useState<boolean>(false)
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [list, setList] = useState<Campaign[]>([])
  useEffect(() => {
    if (data?.data.campaign) {
      const filteredList = data?.data.campaign?.filter((campaign: Campaign) => {
        const campaignStatus = moment(campaign.start_date).isAfter()
          ? 'Upcoming'
          : moment(campaign.end_date).isAfter()
          ? 'Ongoing'
          : 'Ended'
        return (
          ((statusFilter.length && statusFilter.includes(campaignStatus)) || !statusFilter.length) &&
          (!rewardNFTChecked || campaign.reward.nft_name) &&
          (!enrolledChecked || !!campaign.campaign_user.length)
        )
      })
      setList(filteredList)
    } else {
      setList([])
    }
  }, [data?.data.campaign, statusFilter.length, rewardNFTChecked, enrolledChecked])
  const clickHandler = (slug:string) => {
    try {
      if (account) {
        router.push(`/campaigns/${slug}`)
      } else {
        ;(document.querySelector('#open-sign-in-btn') as any)?.click()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='pk-container py-5 md:py-16'>
      <div>
        <div className='flex items-center justify-between'>
          <div className='text-base leading-5 font-bold md:text-2xl md:leading-[18px] md:font-extrabold'>
            {t('Campaign')} <span className='hidden md:inline'>{` (${list.length})`}</span>
          </div>
          <div className='flex gap-[10px] items-center md:hidden'>
            <div className='p-1'>
              <Checkbox
                label={'Reward NFT'}
                checked={rewardNFTChecked}
                onClick={() => setRewardNFTChecked(!rewardNFTChecked)}
              />
            </div>
            <div className='p-1'>
              <Checkbox
                label={'Enrolled'}
                checked={enrolledChecked}
                onClick={() => setEnrolledChecked(!enrolledChecked)}
              />
            </div>
          </div>
        </div>
        <div className='flex gap-3 mt-[10px] md:mt-6 items-center'>
          <Tag selected={!statusFilter.length} onClick={() => setStatusFilter([])}>
            {t('All status')}
          </Tag>
          <span className='inline-block w-[1px] self-stretch bg-[#DEDEDE]'></span>
          {['Upcoming', 'Ongoing', 'Ended'].map((status, index) => (
            <Tag
              key={index}
              selected={statusFilter.includes(status)}
              onClick={() => {
                statusFilter.includes(status)
                  ? setStatusFilter(statusFilter.filter((s) => s != status))
                  : setStatusFilter([...statusFilter, status])
              }}>
              {t(status)}
            </Tag>
          ))}
          <div className='hidden gap-8 items-center md:flex ml-5'>
            <div className='p-1'>
              <Checkbox
                label={'Reward NFT'}
                checked={rewardNFTChecked}
                onClick={() => setRewardNFTChecked(!rewardNFTChecked)}
              />
            </div>
            <div className='p-1'>
              <Checkbox
                label={'Enrolled'}
                checked={enrolledChecked}
                onClick={() => setEnrolledChecked(!enrolledChecked)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[39px] grid grid-cols-1 lg:grid-cols-2 gap-5 2xl:gap-10 xl:grid-cols-3'>
        {list?.map((campaign, index) => (
          <div key={index} className='px-4 py-3 flex gap-5 bg-[#F2F2F2] rounded-[10px] min-h-[180px]' onClick={() => clickHandler(campaign.slug)}>
            <div className='flex flex-col justify-between flex-1'>
              <div className='flex flex-col'>
                <div className='inline-flex'>
                  <StatusLabel
                    status={
                      moment(campaign.start_date).isAfter()
                        ? 'warning'
                        : moment(campaign.end_date).isAfter()
                        ? 'success'
                        : 'default'
                    }>
                    {t(
                      moment(campaign.start_date).isAfter()
                        ? 'Upcoming'
                        : moment(campaign.end_date).isAfter()
                        ? 'Ongoing'
                        : 'Ended'
                    )}
                  </StatusLabel>
                </div>
                <div className='mt-[10px] text-xs leading-[15px]'>
                  <div className=' text-[#292929] font-bold line-clamp-2 2xl:text-base'>{campaign.name}</div>
                  <div
                    className=' text-[#61646B] mt-1 2xl:mt-[10px] line-clamp-3 2xl:text-sm'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(campaign.description) }}></div>
                </div>
              </div>
              <div className='text-xs 2xl:text-sm text-[#61646B]'>
                {moment(campaign.start_date).isAfter() ? (
                  <Countdown
                    date={campaign.start_date}
                    renderer={({ days, hours, minutes, seconds }) => {
                      if (days > 0) {
                        return (
                          <span className='inline-flex gap-1 items-center'>
                            Starts: {moment(campaign.start_date).format('HH:mm')}
                            <svg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5' fill='none'>
                              <circle cx='2' cy='2.5' r='2' fill='#ABABAB' />
                            </svg>
                            {moment(campaign.start_date).format('DD/MM/yyyy')}
                          </span>
                        )
                      } else {
                        return (
                          <span>
                            Starts: {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
                          </span>
                        )
                      }
                    }}
                  />
                ) : moment(campaign.end_date).isAfter() ? (
                  <Countdown
                    date={campaign.end_date}
                    renderer={({ days, hours, minutes, seconds }) => {
                      if (days > 0) {
                        return (
                          <span className='inline-flex gap-1 items-center'>
                            Ends: {moment(campaign.end_date).format('HH:mm')}
                            <svg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5' fill='none'>
                              <circle cx='2' cy='2.5' r='2' fill='#ABABAB' />
                            </svg>
                            {moment(campaign.end_date).format('DD/MM/yyyy')}
                          </span>
                        )
                      } else {
                        return (
                          <span>
                            Ends: {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
                          </span>
                        )
                      }
                    }}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='rounded-lg bg-white pt-[6px] px-[10px] pb-2 min-w-[140px] shrink-0 h-fit flex flex-col'>
              <div className='text-xs text-[#61646B] text-center md:leading-[15px]'>
                Bonus to <br className='md:block hidden' /> 👑 1st place
              </div>
              {campaign?.reward?.nft_name ? (
                <div className='flex flex-col items-center'>
                  <div className='mt-[6px] md:mt-[9px]'>
                    <Image
                      src={campaign?.reward.img_url || NoImage}
                      width={80}
                      height={80}
                      alt=''
                      className='w-[80px] h-[80px] rounded-lg'
                    />
                  </div>
                  <div className='mt-[6px] md:mt-[9px] mb-1 text-[10px] md:text-xs md:leading-[15px] leading-[13px] text-[#61646B] max-w-[120px] truncate'>
                    {campaign?.reward?.nft_name}
                  </div>
                </div>
              ) : (
                <div className='flex items-center my-[18.5px] flex-col'>
                  <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px] rounded-lg' />
                </div>
              )}
              {!!campaign?.reward?.xp && (
                <div className='rounded py-[2px] bg-[#61646B] text-center text-primary-color font-bold text-[10px] md:text-xs leading-[13px] md:leading-[15px] md:pb-1'>{`+ ${campaign?.reward?.xp} XP`}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
