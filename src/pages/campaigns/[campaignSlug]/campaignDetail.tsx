import Modal from 'components/Modal'
import Popover from 'components/Popover'
import ChupButton from 'components/core/Button/ChupButton'
import LabelChip from 'components/core/Chip/Label'
import XPImage from 'components/pages/campaigns/assets/illus.svg'
import KPImage from 'components/pages/campaigns/assets/ic_Kp.svg'
import LeaderBoard from 'components/pages/campaigns/leaderboard'
import NoImage from 'images/no_img.png'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import pluralize from 'pluralize'
import { useContext, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import TruncateMarkup from 'react-truncate-markup'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { Campaign } from 'src/models/campaign'
import NotFound from 'src/pages/404'
import {
  claimCampaignReward,
  enrollCampaign,
  getCampaignAuthorizedData,
  getCampaignDetail,
  getCampaignLeaderboard,
  getRequestLog,
  getUserRankInCampaign,
} from 'src/services'
import useSWR, { useSWRConfig } from 'swr'
import QuestList from '../../../components/pages/campaigns/questList'
import { levelToXp } from 'src/utils'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <CampaignDetail {...props} />
}
function CampaignDetail({}) {
  const { account } = useContext(Context)
  const { setSignInOpen } = useContext(ModalContext)
  const [openClaimSuccessModal, setClaimSuccessModalOpen] = useState(false)
  const [openNFTPreview, setOpenNFTPreview] = useState(false)
  const [data, setData] = useState<Campaign>(undefined)
  const [seeMore, setSeeMore] = useState(undefined)
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const { query, locale } = useRouter()
  const slug = query.campaignSlug as string
  const { mutate } = useSWRConfig()
  const { t } = useTranslation()

  const { data: authData } = useSWR(
    { key: 'fetch_campaign_auth_data', slug, account: account?.id },
    ({ key, slug, account }) => (account ? getCampaignAuthorizedData(slug) : null),
    {
      revalidateOnFocus: true,
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
    { revalidateOnFocus: true }
  )
  const { data: userData } = useSWR(
    { key: `get_leaderboard_${data?.id}_user_rank`, id: data?.id },
    async ({ id }) => {
      if (id) {
        const data = await getUserRankInCampaign(id)
        return data?.data?.user_campaign?.[0]
      } else {
        return undefined
      }
    },
    { revalidateOnFocus: true }
  )

  const refresh = () => {
    mutate({ key: 'fetch_campaign_auth_data', slug, account: account?.id })
    mutate({ key: `get_leaderboard_${data?.id}`, id: data?.id })
    mutate({ key: `get_leaderboard_${data?.id}_user_rank`, id: data?.id })
  }

  useEffect(() => {
    fetchData()
  }, [account])
  useEffect(() => {
    if (data && !account) {
      setSignInOpen(true)
    }
  }, [account, data])
  const fetchData = async () => {
    try {
      const data = await getCampaignDetail(slug)
      if (data.data?.campaign?.[0]) {
        setData(data.data.campaign[0] || null)
      } else {
        setData(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const enrollHandler = async () => {
    try {
      if (!account) {
        setSignInOpen(true)
      } else {
        setEnrollLoading(true)
        const res = await enrollCampaign(data.id)
        await fetchData()
        refresh()
        if (res?.errors?.message) {
          toast(res?.errors?.message, {
            type: 'error',
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 3000,
          })
          console.error(res?.errors?.message)
          setEnrollLoading(false)
          return
        }
        toast(`Enroll successful`, {
          type: 'success',
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
        setEnrollLoading(false)
      }
    } catch (error) {
      refresh()
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
  const revealResult = async (id: string) => {
    const data = await getRequestLog(id)
    if (data?.status == 'SUCCEEDED') {
      setClaimSuccessModalOpen(true)
      refresh()
      await fetchData()
      setClaimLoading(false)
      return
    }
    if (data?.status == 'FAILED') {
      refresh()
      await fetchData()
      setClaimLoading(false)
      toast(`Claim failed`, {
        type: 'error',
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      })
    }
    setTimeout(() => revealResult(id), 4000)
  }
  const claimHandler = async () => {
    try {
      setClaimLoading(true)
      const res = await claimCampaignReward(data.id)
      if (res?.requestId) {
        revealResult(res?.requestId)
      } else {
        toast(res?.errors?.message || 'Claim failed. Please try again later.', {
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        })
        console.error(res?.errors?.message)
        setClaimLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  if (typeof data == 'undefined') return null
  if (!data) return <NotFound />
  const isEnded = moment(data.end_date).isBefore()
  const isUpcoming = moment(data.start_date).isAfter()
  const isOngoing = moment(data.start_date).isBefore() && moment(data.end_date).isAfter()
  const isEnrolled = !!authData?.campaignQuests
  const isKP = data?.campaign_chain?.punkga_config?.reward_point_name == 'KP'
  const displayConfig = {
    xpImageSrc: isKP ? KPImage : XPImage,
    xpText: isKP ? 'KP' : 'XP',
  }
  const calcPercentage = (xp, level) => {
    const percentage =
      xp && level ? (Math.round(xp - levelToXp(level)) / Math.round(levelToXp(level + 1) - levelToXp(level))) * 100 : 0
    return percentage
  }
  return (
    <div className='bg-gray-50'>
      <Modal open={openNFTPreview} setOpen={() => setOpenNFTPreview(false)}>
        <div className=' p-10 flex flex-col items-center'>
          <Image
            src={data?.reward?.nft?.img_url || NoImage}
            width={600}
            height={600}
            alt=''
            className='max-w-[600px] w-[80vw] aspect-square rounded-lg object-contain bg-white'
          />
        </div>
      </Modal>
      <Modal open={openClaimSuccessModal} setOpen={() => setClaimSuccessModalOpen(false)}>
        <div
          className={`w-[320px] lg:w-[448px] px-10 pb-5 pt-7 flex flex-col items-center ${
            data?.reward.nft?.nft_name ? 'gap-[10px]' : 'gap-5'
          } text-sm`}>
          <div className='leading-[18px] lg:leading-5 font-semibold text-center'>👑 {t('Congratulation')}!</div>
          <div>{t('You have received campaign reward')}</div>
          {data?.reward.nft?.nft_name ? (
            <div className='flex flex-col items-center'>
              <div className='mb-[10px]'>
                <Image
                  src={data?.reward.nft.img_url || NoImage}
                  width={200}
                  height={200}
                  alt=''
                  className='w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] rounded-lg object-contain bg-white'
                />
              </div>
              <div className='text-sm leading-[18px] lg:text-base lg:leading-5 text-[#414141] max-w-[240px] text-center truncate'>
                {data?.reward.nft?.nft_name}
              </div>
              <div className='bg-[#DEDEDE] w-[240px] lg:w-[288px] h-[1px] my-[10px]'></div>
              <div className='font-bold text-second-color text-lg leading-[23px] lg:text-3xl lg:leading-[30px] text-center'>
                {`+ ${data?.reward.xp} ${displayConfig.xpText}`}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='mb-5'>
                <Image
                  src={displayConfig.xpImageSrc}
                  width={200}
                  height={200}
                  alt=''
                  className='w-[200px] h-[200px] lg:w-[240px] lg:h-[240px]'
                />
              </div>
              <div className='font-bold text-second-color text-lg leading-[23px] lg:text-3xl lg:leading-[30px] text-center'>{`+ ${data?.reward.xp} ${displayConfig.xpText}`}</div>
            </div>
          )}
        </div>
      </Modal>
      <div className='pk-container'>
        <div className='py-8 lg:grid-cols-[1fr_min(50%,400px)] lg:grid lg:gap-x-8 lg:grid-rows-[auto_1fr]'>
          <div>
            {/* Campaign info  */}
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1.5'>
                <LabelChip color={isUpcoming ? 'process' : !isEnded ? 'success' : 'error'} className='w-fit'>
                  {t(isUpcoming ? 'Upcoming' : !isEnded ? 'Ongoing' : 'Ended')}
                </LabelChip>
                <div className='text-xl font-medium'>{data[locale].name} </div>
                <div className='flex gap-1 lg:gap-2.5 font-medium text-sm lg:items-center flex-col lg:flex-row'>
                  <div>
                    {t('Starts')}: {moment(data.start_date).format('HH:mm DD/MM/yyyy')}
                  </div>
                  <svg
                    width='4'
                    height='4'
                    viewBox='0 0 4 4'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='hidden lg:block'>
                    <rect width='4' height='4' rx='2' fill='#646464' />
                  </svg>
                  <div>
                    {t('Ends')}: {moment(data.end_date).format('HH:mm DD/MM/yyyy')}
                  </div>
                  <svg
                    width='4'
                    height='4'
                    viewBox='0 0 4 4'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='hidden lg:block'>
                    <rect width='4' height='4' rx='2' fill='#646464' />
                  </svg>
                  <div className=''>{`${data?.participants?.aggregate?.count} ${t(
                    pluralize('participant', data?.participants?.aggregate?.count)
                  )}`}</div>
                </div>
              </div>
              <div className='hidden lg:block'>
                {/* Enroll button */}
                {isUpcoming ? (
                  <Popover
                    popoverRender={() => (
                      <div className='shadow-[0px_4px_15px_0px_#00000026] rounded-[20px] p-3 m-3 text-sm whitespace-nowrap bg-[#fff]'>
                        {t('Campaign has not started yet')}
                      </div>
                    )}>
                    <button className='w-full bg-[#ABABAB] text-[#DEDEDE] font-bold leading-[25px] text-xl px-8 text-center pt-3 pb-[14px] rounded-[20px]'>
                      {t('Enroll now')}
                    </button>
                  </Popover>
                ) : isOngoing && !isEnrolled ? (
                  <div>
                    <ChupButton size='sm' loading={enrollLoading} className='w-full' onClick={enrollHandler}>
                      {t('Enroll now')}
                    </ChupButton>
                  </div>
                ) : null}
              </div>
            </div>
            <TruncateMarkup
              lines={!seeMore ? 3 : 9999}
              lineHeight={20}
              ellipsis={<span></span>}
              onTruncate={(wasTruncated) => (wasTruncated && seeMore == undefined ? setSeeMore(false) : null)}>
              <div className={`mt-4 text-text-teriary text-sm`}>{ReactHtmlParser(data[locale].description)}</div>
            </TruncateMarkup>
            {seeMore != undefined ? (
              <div
                className='font-semibold text-sm text-text-info-primary mt-1.5 cursor-pointer'
                onClick={() => setSeeMore(!seeMore)}>
                {t(seeMore ? 'See less' : 'See more')}
              </div>
            ) : null}

            {/* Enroll button */}
            {isUpcoming ? (
              <div className='mt-10 lg:hidden'>
                <button className='w-full bg-[#ABABAB] text-[#DEDEDE] font-bold leading-5 text-center pt-2 pb-[10px] rounded-full'>
                  {t('Enroll now')}
                </button>
              </div>
            ) : isOngoing && !isEnrolled ? (
              <div className='mt-10 lg:hidden'>
                <ChupButton size='sm' loading={enrollLoading} className='w-full' onClick={enrollHandler}>
                  {t('Enroll now')}
                </ChupButton>
              </div>
            ) : null}
          </div>
          <div className='row-span-2'>
            {/* Claim section */}
            <div className='px-8 pt-4 pb-8 w-full flex flex-col gap-5 bg-neutral-white rounded-mlg mt-8 lg:mt-0'>
              <p className='text-center w-full text-base font-medium'>
                {t('Bonus to')} {t('1st place')}
              </p>
              <div className='flex gap-8 justify-center items-start'>
                {data?.reward?.nft?.nft_name && (
                  <div className='flex flex-col gap-[10px] justify-center'>
                    <Image
                      onClick={() => setOpenNFTPreview(true)}
                      src={data?.reward?.nft.img_url || NoImage}
                      width={200}
                      height={200}
                      alt=''
                      className=' w-[130px] h-[130px] rounded-lg object-cover bg-background-bg-primary'
                    />
                    <p className='text-center text-xs max-w-[130px] font-medium line-clamp-2'>
                      {data.reward?.nft.nft_name}
                    </p>
                  </div>
                )}
                {!!data.reward.xp && (
                  <div className='w-[130px] h-[130px] rounded-lg object-cover bg-background-bg-primary flex justify-center items-center flex-col gap-[10px]'>
                    <Image src={displayConfig.xpImageSrc} alt='' className='h-[80px] w-[80px]' />
                    <p className='text-base text-text-teriary font-semibold'>{`+ ${data.reward.xp} ${displayConfig.xpText}`}</p>
                  </div>
                )}
              </div>
              {isEnrolled ? (
                account?.id == leaderboardData?.[0]?.user_id && isEnded ? (
                  authData?.user_campaign_rewards?.length == 0 ? (
                    <ChupButton size='sm' loading={claimLoading} className='w-full' color='dark' onClick={claimHandler}>
                      {t('Claim Reward')}
                    </ChupButton>
                  ) : (
                    <ChupButton size='sm' className='w-full' disabled>
                      {t('Claimed')}
                    </ChupButton>
                  )
                ) : (
                  <ChupButton size='sm' className='w-full' disabled>
                    {t('Claim Reward')}
                  </ChupButton>
                )
              ) : null}
            </div>
            {account &&
              (isKP ? null : (
                <div className='rounded-lg p-4 bg-white mt-4 md:mt-8'>
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold '>
                      {t('Level')} {account.level}
                    </div>
                    <div className='text-xxs lowercase'>{`${Math.round(
                      levelToXp(account.level + 1) - levelToXp(account.level)
                    )} ${t(`xp to level`)} ${account.level + 1}`}</div>
                  </div>
                  <div className='relative h-3 mt-2 w-full rounded-lg overflow-hidden bg-[#1C1C1C]/5'>
                    <div
                      className={`absolute top-0 left-0 bg-[#1FAB5E] bottom-0`}
                      style={{ width: `${calcPercentage(account.xp, account.level)}%` }}></div>
                  </div>
                </div>
              ))}
            <div className='hidden md:block'>
              {isEnrolled || isEnded ? (
                <LeaderBoard data={leaderboardData} userData={userData} xpText={displayConfig.xpText} />
              ) : (
                <div className='overflow-auto'>
                  <div className='bg-white rounded-mlg mt-8 min-w-[300px] md:min-w-[400px]'>
                    <div className='py-3 md:py-4 px-4 md:px-[32px] w-full h-full flex flex-col'>
                      <div
                        className={`leading-5 md:text-xl cursor-pointer font-semibold w-full text-center  pb-[2px] mb-2 md:mb-4`}>
                        {t('Campaign Leaderboard')}
                      </div>
                      <div className='flex px-[6px] py-2 md:px-[18px] md:py-[11px] border-b-[1px] border-border-primary font-semibold text-xs leading-[15px] md:text-base'>
                        <div className='mr-14 md:mr-[70px]'></div>
                        <div className='w-full'>{t('User')}</div>
                        <div className='w-[98px] md:w-[88px] shrink-0 text-center'>{t('Level')}</div>
                        <div className='w-12 shrink-0 text-center'>{displayConfig.xpText}</div>
                      </div>
                      <div className='h-[240px] md:h-[90px] flex flex-col relative'></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            {/* Quest  */}
            <QuestList quests={authData?.campaignQuests} isEnded={isEnded} refreshCallback={refresh} />
          </div>
          <div className='md:hidden'>
            {isEnrolled || isEnded ? (
              <LeaderBoard data={leaderboardData} userData={userData} xpText={displayConfig.xpText} />
            ) : (
              <div className='overflow-auto'>
                <div className='bg-white rounded-mlg mt-8 min-w-[300px] md:min-w-[400px]'>
                  <div className='py-3 md:py-4 px-4 md:px-[32px] w-full h-full flex flex-col'>
                    <div
                      className={`leading-5 md:text-xl cursor-pointer font-semibold w-full text-center  pb-[2px] mb-2 md:mb-4`}>
                      {t('Campaign Leaderboard')}
                    </div>
                    <div className='flex px-[6px] py-2 md:px-[18px] md:py-[11px] border-b-[1px] border-border-primary font-semibold text-xs leading-[15px] md:text-base'>
                      <div className='mr-14 md:mr-[70px]'></div>
                      <div className='w-full'>{t('User')}</div>
                      <div className='w-[98px] md:w-[88px] shrink-0 text-center'>{t('Level')}</div>
                      <div className='w-12 shrink-0 text-center'>{displayConfig.xpText}</div>
                    </div>
                    <div className='h-[240px] md:h-[90px] flex flex-col relative'></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
