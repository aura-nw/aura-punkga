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
import Mascot3 from 'components/pages/campaigns/assets/Mascot3.svg'
import { ModalContext } from 'src/context/modals'

export default function CampaignPage() {
  const { account } = useContext(Context)
  const { setSignInOpen } = useContext(ModalContext)
  const router = useRouter()
  const {locale} = useRouter()
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
          (!rewardNFTChecked || campaign.reward?.nft?.nft_name) &&
          (!enrolledChecked || !!campaign.campaign_user.length)
        )
      })
      setList(filteredList)
    } else {
      setList([])
    }
  }, [data?.data.campaign, statusFilter.length, rewardNFTChecked, enrolledChecked])
  const clickHandler = (slug: string) => {
    try {
      if (account) {
        router.push(`/campaigns/${slug}`)
      } else {
        setSignInOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='pk-container '>
      <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='text-base leading-5 font-bold md:text-2xl md:leading-[18px] md:font-extrabold whitespace-nowrap'>
            {t('Campaign')} <span className=''>{` (${list.length})`}</span>
          </div>
          {list.length > 0 && <div className='flex gap-[10px] items-center md:hidden'>
            <div className='p-1'>
              <Checkbox
                label={t('Reward NFT')}
                checked={rewardNFTChecked}
                onClick={() => setRewardNFTChecked(!rewardNFTChecked)}
              />
            </div>
            <div className='p-1'>
              <Checkbox
                label={t('Enrolled')}
                checked={enrolledChecked}
                onClick={() => {
                  if (account) {
                    setEnrolledChecked(!enrolledChecked)
                  } else {
                    setSignInOpen(true)
                  }
                }}
              />
            </div>
          </div>}
        </div>

        <div className='flex gap-3 mt-[10px] md:mt-6 items-center flex-wrap'>
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
                label={t('Reward NFT')}
                checked={rewardNFTChecked}
                onClick={() => setRewardNFTChecked(!rewardNFTChecked)}
              />
            </div>
            <div className='p-1'>
              <Checkbox
                label={t('Enrolled')}
                checked={enrolledChecked}
                onClick={() => {
                  if (account) {
                    setEnrolledChecked(!enrolledChecked)
                  } else {
                    setSignInOpen(true)
                  }
                }}
              />
            </div>
          </div>
        </div>

      </div>
      {list.length > 0 ? (<div className='grid grid-cols-1 lg:grid-cols-2 gap-5 2xl:gap-10 xl:grid-cols-3'>
        {list?.map((campaign, index) => (
          <div
            key={index}
            className='cursor-pointer px-4 py-3 flex gap-5 bg-[#F2F2F2] lg:bg-white lg:border lg:border-[#DEDEDE] rounded-[10px] min-h-[180px] hover:bg-[#F2F2F2] [&_.reward]:hover:bg-white'
            onClick={() => clickHandler(campaign.slug)}>
            <div className='flex flex-col justify-between flex-1 max-w-[calc(100%-156px)]'>
              <div className='flex flex-col'>
                <div className='inline-flex flex-wrap'>
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
                  <div className=' text-[#292929] font-bold line-clamp-2 2xl:text-base'>{campaign[locale].name}</div>
                  <div
                    className=' text-[#61646B] mt-1 2xl:mt-[10px] line-clamp-3 2xl:text-sm max-w'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(campaign[locale].description) }}></div>
                </div>
              </div>
              <div className='text-xs 2xl:text-sm text-[#61646B]'>
                {moment(campaign.start_date).isAfter() ? (
                  <Countdown
                    date={campaign.start_date}
                    renderer={({ days, hours, minutes, seconds }) => {
                      if (days > 0) {
                        return (
                          <span className='inline-flex gap-1 items-center flex-wrap'>
                            {t('Starts')}: {moment(campaign.start_date).format('HH:mm')}
                            <svg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5' fill='none'>
                              <circle cx='2' cy='2.5' r='2' fill='#ABABAB' />
                            </svg>
                            {moment(campaign.start_date).format('DD/MM/yyyy')}
                          </span>
                        )
                      } else {
                        return (
                          <span>
                            {t('Starts')}: {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
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
                          <span className='inline-flex gap-1 items-center flex-wrap'>
                            {t('Ends')}: {moment(campaign.end_date).format('HH:mm')}
                            <svg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5' fill='none'>
                              <circle cx='2' cy='2.5' r='2' fill='#ABABAB' />
                            </svg>
                            {moment(campaign.end_date).format('DD/MM/yyyy')}
                          </span>
                        )
                      } else {
                        return (
                          <span>
                            {t('Ends')}: {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
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
            <div className='reward rounded-lg bg-white lg:bg-[#F0F0F0] pt-[6px] px-[10px] pb-2 min-w-[140px] shrink-0 h-fit flex flex-col'>
              <div className='text-xs text-[#61646B] text-center md:leading-[15px]'>
                {t('Bonus to')} <br className='md:block hidden' /> 👑 {t("1st place")}
              </div>
              {campaign?.reward?.nft?.nft_name ? (
                <div className='flex flex-col items-center'>
                  <div className='mt-[6px] md:mt-[9px]'>
                    <Image
                      src={campaign?.reward?.nft.img_url || NoImage}
                      width={80}
                      height={80}
                      alt=''
                      className='w-[80px] h-[80px] rounded-lg object-contain bg-white'
                    />
                  </div>
                  <div className='mt-[6px] md:mt-[9px] mb-1 text-[10px] md:text-xs md:leading-[15px] leading-[13px] text-[#61646B] max-w-[120px] truncate'>
                    {campaign?.reward?.nft?.nft_name}
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
      </div>) : (
        <div className='p-6 flex flex-col items-center w-full'>
          <Image src={Mascot3} alt='' className='w-[240px] h-[240px] lg:w-[320px] lg:h-[320px]' />
          <div className='text-sm leading-[18px] lg:text-base lg:leading-base font-semibold mt-5 text-center'>
            {t('Coming soon')}
          </div>
        </div>
      )}
    </div>
  )
}