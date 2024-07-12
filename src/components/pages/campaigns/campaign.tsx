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
import Chip from 'components/core/Chip'
import LabelChip from 'components/core/Chip/Label'

export default function CampaignPage() {
  const { account } = useContext(Context)
  const { setSignInOpen } = useContext(ModalContext)
  const router = useRouter()
  const { locale } = useRouter()
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
    <div className='pk-container'>
      <div className='sticky md:top-16 top-[95px]  pb-8 pt-5 md:pt-12 bg-gray-50'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='text-base leading-5 md:text-xl font-medium whitespace-nowrap'>
            {t('Campaign')} <span className=''>{` (${list.length})`}</span>
          </div>
          {list.length > 0 && (
            <div className='flex gap-[10px] items-center md:hidden'>
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
          )}
        </div>

        <div className='flex gap-3 mt-[10px] md:mt-8 items-center flex-wrap'>
          <Chip
            className='min-w-[103px]'
            color={!statusFilter.length ? 'success' : 'default'}
            onClick={() => setStatusFilter([])}>
            {t('All status')}
          </Chip>
          {['Upcoming', 'Ongoing', 'Ended'].map((status, index) => (
            <Chip
              key={index}
              className='min-w-[103px]'
              color={statusFilter.includes(status) ? 'success' : 'default'}
              onClick={() => {
                statusFilter.includes(status)
                  ? setStatusFilter(statusFilter.filter((s) => s != status))
                  : setStatusFilter([...statusFilter, status])
              }}>
              {t(status)}
            </Chip>
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
      {list.length > 0 ? (
        <div className='grid mt-0.5 grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-x-8 xl:gap-y-4 xl:grid-cols-3'>
          {list?.map((campaign, index) => (
            <div
              key={index}
              className='cursor-pointer p-4 flex gap-5 bg-[#F2F2F2] lg:bg-white lg:border lg:border-border-teriary rounded-mlg min-h-[206px] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]'
              onClick={() => clickHandler(campaign.slug)}>
              <div className='flex flex-col justify-between flex-1 max-w-[calc(100%-156px)]'>
                <div className='flex flex-col'>
                  <div className='inline-flex flex-wrap'>
                    <LabelChip
                      color={
                        moment(campaign.start_date).isAfter()
                          ? 'process'
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
                    </LabelChip>
                  </div>
                  <div className='mt-1'>
                    <div className='font-semibold line-clamp-2 text-base'>{campaign[locale].name}</div>
                    <div
                      className=' text-text-teriary mt-1 xl:mt-3 line-clamp-3 max-h-[60px] overflow-hidden xl:text-sm max-w'
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(campaign[locale].description) }}></div>
                  </div>
                </div>
                <div className='text-xs xl:text-sm text-text-teriary mt-3'>
                  {moment(campaign.start_date).isAfter() ? (
                    <Countdown
                      date={campaign.start_date}
                      renderer={({ days, hours, minutes, seconds }) => {
                        if (days > 0) {
                          return (
                            <span className='inline-flex gap-1 items-center flex-wrap'>
                              {t('Starts')}: {moment(campaign.start_date).format('HH:mm')}
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='4'
                                height='5'
                                viewBox='0 0 4 5'
                                fill='none'>
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
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='4'
                                height='5'
                                viewBox='0 0 4 5'
                                fill='none'>
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
              <div className='flex flex-col gap-1.5 items-center'>
                <div className='reward rounded-mlg bg-[#F0F0F0] p-2.5 w-[130px] shrink-0 min-h-[130px] gap-1.5 flex flex-col justify-center items-center'>
                  {campaign?.reward?.nft?.nft_name ? (
                    <>
                      <Image
                        src={campaign?.reward?.nft.img_url || NoImage}
                        width={80}
                        height={80}
                        alt=''
                        className='w-[80px] h-[80px] rounded-lg object-cover'
                      />
                      <div className='text-xs leading-[18px] text-text-teriary w-[110px] truncate text-center'>
                        {campaign?.reward?.nft?.nft_name}
                      </div>
                    </>
                  ) : (
                    <Image src={IllusImage} width={80} height={80} alt='' className='w-[80px] h-[80px] rounded-lg' />
                  )}
                  {!!campaign?.reward?.xp && campaign?.reward?.nft?.nft_name ? (
                    <div className='rounded pt-0.5 bg-neutral-white min-w-[76px] text-center text-text-brand-defaul font-bold text-xs leading-[15px]'>{`+ ${campaign?.reward?.xp} XP`}</div>
                  ) : (
                    <div className='text-text-teriary font-semibold'>{`+ ${campaign?.reward?.xp} XP`}</div>
                  )}
                </div>
                <div className='text-xs text-text-teriary text-center md:leading-[18px]'>
                  {t('Bonus to')} {t('1st place')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
