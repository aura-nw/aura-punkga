import Popover from 'components/Popover'
import Button from 'components/core/Button/Button'
import Chip, { PlaceholderChip } from 'components/core/Chip'
import KPImage from 'components/pages/campaigns/assets/ic_Kp.svg'
import XPImage from 'components/pages/campaigns/assets/illus.svg'
import SFImage from 'components/pages/campaigns/assets/sf.png'
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
import { levelToXp } from 'src/utils'
import useSWR, { useSWRConfig } from 'swr'
import QuestList from '../../../components/pages/campaigns/questList'
import Modal from 'components/core/modal'
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
    { key: `get_leaderboard_${data?.id}_user_rank`, id: data?.id, user: account?.id },
    async ({ id, user }) => {
      if (id && user) {
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
      return
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
  const isSF = data?.campaign_chain?.punkga_config?.reward_point_name == 'SF'
  const displayConfig = {
    xpImageSrc: isKP ? KPImage : isSF ? SFImage : XPImage,
    xpText: isKP ? 'KP' : isSF ? 'SF' : 'XP',
  }
  const calcPercentage = (xp, level) => {
    const percentage =
      xp && level ? (Math.round(xp - levelToXp(level)) / Math.round(levelToXp(level + 1) - levelToXp(level))) * 100 : 0
    return percentage
  }
  return (
    <div className='bg-gray-900 text-white'>
      <Modal open={openNFTPreview} setOpen={() => setOpenNFTPreview(false)}>
        <div className=' p-10 flex flex-col items-center'>
          <Image
            src={data?.reward?.nft?.img_url || NoImage}
            width={600}
            height={600}
            alt=''
            className='max-w-[600px] w-[80vw] aspect-square rounded-lg object-contain'
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
      <div>
        <Image
          src={data[locale].thumbnail_url}
          width={1980}
          height={400}
          alt=''
          className='w-full h-[200px] lg:h-[400px] object-cover'
        />
      </div>
      <div className='pk-container'>
        <div className='py-8 lg:grid-cols-[1fr_min(50%,400px)] lg:grid lg:gap-x-8 lg:grid-rows-[auto_1fr]'>
          <div>
            {/* Campaign info  */}
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1.5'>
                <Chip color={isUpcoming ? 'process' : !isEnded ? 'success' : 'error'} variant='skew' hasLeading>
                  {t(isUpcoming ? 'Upcoming' : !isEnded ? 'Ongoing' : 'Ended')}
                </Chip>
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
                      <div className='shadow-[0px_4px_15px_0px_#00000026] rounded-xl p-2 m-3 text-xs whitespace-nowrap bg-[#191919]'>
                        {t('Campaign has not started yet')}
                      </div>
                    )}>
                    <Button size='sm' disabled className='w-full'>
                      {t('Enroll now')}
                    </Button>
                  </Popover>
                ) : isOngoing && !isEnrolled ? (
                  <div>
                    <Button size='sm' loading={enrollLoading} className='w-full' onClick={enrollHandler}>
                      {t('Enroll now')}
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
            <TruncateMarkup
              lines={!seeMore ? 3 : 9999}
              lineHeight={20}
              ellipsis={<span></span>}
              onTruncate={(wasTruncated) => (wasTruncated && seeMore == undefined ? setSeeMore(false) : null)}>
              <div className={`mt-4 text-text-quatenary text-sm`}>{ReactHtmlParser(data[locale].description)}</div>
            </TruncateMarkup>
            {seeMore != undefined ? (
              <div
                className='font-semibold text-sm text-text-brand-hover mt-1.5 cursor-pointer'
                onClick={() => setSeeMore(!seeMore)}>
                {t(seeMore ? 'See less' : 'See more')}
              </div>
            ) : null}

            {/* Enroll button */}
            {isUpcoming ? (
              <div className='mt-10 lg:hidden'>
                <Button size='sm' disabled className='w-full'>
                  {t('Enroll now')}
                </Button>
              </div>
            ) : isOngoing && !isEnrolled ? (
              <div className='mt-10 lg:hidden'>
                <Button size='sm' loading={enrollLoading} className='w-full' onClick={enrollHandler}>
                  {t('Enroll now')}
                </Button>
              </div>
            ) : null}
          </div>
          <div className='row-span-2'>
            {/* Claim section */}
            <div className='px-8 pt-4 pb-8 w-full flex flex-col gap-5 bg-[#191919] rounded-mlg mt-8 lg:mt-0'>
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
                      className=' w-[130px] h-[130px] rounded-lg object-cover bg-gray-950'
                    />
                    <p className='text-center text-xs max-w-[130px] font-medium line-clamp-2'>
                      {data.reward?.nft.nft_name}
                    </p>
                  </div>
                )}
                {!!data.reward.xp && (
                  <div className='w-[130px] h-[130px] rounded-lg object-cover bg-gray-950 flex justify-center items-center flex-col gap-[10px]'>
                    <Image src={displayConfig.xpImageSrc} alt='' className='h-[80px] w-[80px]' />
                    <p className='text-base text-text-teriary font-semibold'>{`+ ${data.reward.xp} ${displayConfig.xpText}`}</p>
                  </div>
                )}
              </div>
              {isEnrolled ? (
                account?.id == leaderboardData?.[0]?.user_id && isEnded ? (
                  authData?.user_campaign_rewards?.length == 0 ? (
                    <Button size='sm' loading={claimLoading} className='w-full' color='dark' onClick={claimHandler}>
                      {t('Claim Reward')}
                    </Button>
                  ) : (
                    <Button size='sm' className='w-full' disabled>
                      {t('Claimed')}
                    </Button>
                  )
                ) : (
                  <Button size='sm' className='w-full' disabled>
                    {t('Claim Reward')}
                  </Button>
                )
              ) : null}
            </div>
            {account &&
              (isKP || isSF ? null : (
                <div className='rounded-lg p-4 bg-[#191919] mt-4 md:mt-8'>
                  <div className='flex justify-between items-center'>
                    <div className='font-semibold '>
                      {t('Level')} {account.level}
                    </div>
                    <div className='text-xxs lowercase'>{`${Math.round(levelToXp(account.level + 1) - account.xp)} ${t(
                      `XP to level`
                    )} ${account.level + 1}`}</div>
                  </div>
                  <div className='relative h-3 mt-2 w-full rounded-lg overflow-hidden bg-gray-950'>
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
                  <div className='bg-[#191919] rounded-mlg mt-8 min-w-[300px] md:min-w-[400px]'>
                    <div className=' w-full h-full flex flex-col py-4'>
                      <div className={`leading-5 md:text-xl cursor-pointer font-semibold w-full text-center`}>
                        {t('Campaign Leaderboard')}
                      </div>
                      <div className='flex mt-4 border-b-[1px] border-neutral-900 p-4 font-semibold text-xs leading-[15px] md:text-base'>
                        <div className='mr-14 md:mr-[70px]'></div>
                        <div className='w-full'>{t('User')}</div>
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
                <div className='bg-[#191919] rounded-mlg mt-8 min-w-[300px] md:min-w-[400px]'>
                  <div className='py-4 w-full h-full flex flex-col'>
                    <div className={`leading-5 md:text-xl cursor-pointer font-semibold w-full text-center`}>
                      {t('Campaign Leaderboard')}
                    </div>
                    <div className='flex p-4 my-4 border-b-[1px] border-border-primary font-semibold text-xs leading-[15px] md:text-base'>
                      <div className='mr-14 md:mr-[70px]'></div>
                      <div className='w-full'>{t('User')}</div>
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
