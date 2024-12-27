import { XMarkIcon } from '@heroicons/react/24/outline'
import LazyImage from 'components/Image'
import TextField from 'components/Input/TextField'
import Logo from 'components/pages/event/your-city/assets/logo-punktober.png'
import Mockup2 from 'components/pages/event/your-city/assets/banner-desktop.svg'
import Banner from 'components/pages/event/your-city/assets/banner.svg'
import Point from 'components/pages/event/your-city/assets/dp.svg'
import Calendar from 'components/pages/event/your-city/Calendar'
import Modal from 'components/pages/event/your-city/Modal'
import Spinner from 'components/Spinner'
import moment, { Moment } from 'moment-timezone'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { eventService } from 'src/services/eventService'
import { formatNumber } from 'src/utils'
import 'swiper/css'
import 'swiper/css/navigation'
import useSWR from 'swr'
import { useWindowSize } from 'usehooks-ts'
import ArtworkDetail from './ArtworkDetail'
import { Context } from 'src/context'
import Usdt from 'assets/images/token/usdt.svg'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const searchParams = new URLSearchParams(location.search)
  const artworkIdParam = searchParams.get('artwork_id')
  const router = useRouter()
  const { account } = useContext(Context)
  const [date, setDate] = useState<Moment>(
    searchParams.get('date')
      ? moment.tz(`${searchParams.get('date')}`, 'DD-MM-YYYY', 'Asia/Ho_Chi_Minh')
      : moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz('2025-01-14', 'Asia/Ho_Chi_Minh'))
      ? moment.tz('2024-12-14', 'Asia/Ho_Chi_Minh')
      : moment().tz('Asia/Ho_Chi_Minh')
  )
  const { width } = useWindowSize()
  const [search, setSearch] = useState('')
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [openArtworkDetail, setOpenArtworkDetail] = useState(false)
  const [showContestRule, setShowContestRule] = useState(false)
  const [showSpecialRewardGuideModal, setShowSpecialRewardGuideModal] = useState(false)
  const [list, setList] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const { t } = useTranslation()
  const { data } = useSWR('get-all-topic', () => eventService.punktober.getAllTopic(), {
    revalidateOnFocus: false,
  })
  const topics = data?.data?.data?.artwork_topics
  const selectedTopic = topics?.find((topic) => topic.date == moment(date).format('YYYY-MM-DD'))
  const { data: topicDT, isLoading } = useSWR(
    { key: 'get-topic', id: selectedTopic?.id },
    ({ id }) => (id ? eventService.punktober.getTopic(id) : null),
    {
      revalidateOnFocus: false,
    }
  )
  const topicData = topicDT?.data?.data?.artwork_topics_by_pk
  useEffect(() => {
    if (!isFirstRender) {
      if (openArtworkDetail && selectedArtwork?.id) {
        searchParams.set('artwork_id', selectedArtwork.id)
        searchParams.set('date', date.format('DD-MM-YYYY'))
        router.replace(
          {
            pathname: router.pathname,
            search: searchParams.toString(),
          },
          undefined,
          { shallow: true }
        )
      } else {
        searchParams.delete('artwork_id')
        router.replace(
          {
            pathname: router.pathname,
            search: searchParams.toString(),
          },
          undefined,
          { shallow: true }
        )
      }
    }
    setIsFirstRender(false)
  }, [openArtworkDetail, selectedArtwork?.id])
  useEffect(() => {
    if (!topicData?.story_artworks?.length) return
    setList(
      topicData.story_artworks.filter(
        (artwork) =>
          !search ||
          artwork?.artwork?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
          artwork?.artwork?.creator?.pen_name?.toLowerCase()?.includes(search.toLowerCase())
      )
    )
  }, [topicData?.story_artworks?.[0]?.id, search])
  useEffect(() => {
    if (artworkIdParam) {
      const artwork = list.find((artwork) => artwork.id == artworkIdParam)
      if (artwork) {
        setSelectedArtwork(artwork)
        setOpenArtworkDetail(true)
      }
    }
  }, [list.length])
  if (!topics?.length) return <div></div>
  return (
    <>
      <div className='bg-[#ffffff] min-h-screen px-4 flex flex-col xl:justify-center gap-10 xl:flex-row w-full lg:px-[85px] lg:gap-14'>
        <div className='flex flex-col items-center pb-3.5 lg:pb-8 w-full xl:w-[663px] xl:sticky xl:top-[120px] pt-3 xl:h-[calc(100dvh-120px)] xl:min-h-[800px] gap-20 xl:gap-0 justify-between'>
          <div className='flex items-center gap-8 flex-col md:flex-row'>
            <div className='relative'>
              <Image src={Logo} alt='' className='w-[132px] md:w-[269px]' />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                className='animate-pulse absolute bottom-0 right-0'>
                <path
                  d='M9.15055 0.617188L9.64284 3.60593C10.0831 6.27907 12.1783 8.3742 14.8514 8.8145L17.8402 9.3068L14.8514 9.79909C12.1783 10.2394 10.0831 12.3345 9.64284 15.0077L9.15055 17.9964L8.65825 15.0077C8.21795 12.3345 6.12281 10.2394 3.44968 9.79909L0.460938 9.3068L3.44968 8.8145C6.12282 8.3742 8.21795 6.27906 8.65825 3.60593L9.15055 0.617188Z'
                  fill='#0B0B0B'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='13'
                viewBox='0 0 12 13'
                fill='none'
                className='absolute top-10 left-0 -translate-x-1/2 animate-[pulse_1.5s_ease-in-out_infinite]'>
                <path
                  d='M5.90893 0.867188L6.24369 2.89953C6.5431 4.71727 7.96779 6.14195 9.78552 6.44136L11.8179 6.77612L9.78552 7.11088C7.96779 7.41029 6.5431 8.83498 6.24369 10.6527L5.90893 12.6851L5.57417 10.6527C5.27477 8.83498 3.85008 7.41029 2.03234 7.11088L0 6.77612L2.03235 6.44136C3.85008 6.14195 5.27477 4.71726 5.57417 2.89953L5.90893 0.867188Z'
                  fill='#0B0B0B'
                />
              </svg>
            </div>
            <Calendar
              date={date}
              setDate={(d) => {
                router.replace({ search: `?date=${d.format('DD-MM-YYYY')}` })
                setDate(d)
              }}
            />
          </div>
          {selectedTopic && (
            <div className='flex flex-col items-center gap-5 w-full'>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='text-neutral-default font-medium text-sm flex items-center gap-1.5'>
                  {t('Topic of the day')}{' '}
                  <div
                    className='w-4 h-4 grid place-items-center bg-feedback-info-link-defaul rounded cursor-pointer'
                    onClick={() => navigator.share({ url: location.href })}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='9' height='10' viewBox='0 0 9 10' fill='none'>
                      <path
                        d='M6.85827 3.36497C7.51134 3.36497 8.04076 2.83556 8.04076 2.18249C8.04076 1.52942 7.51134 1 6.85827 1C6.2052 1 5.67578 1.52942 5.67578 2.18249C5.67578 2.83556 6.2052 3.36497 6.85827 3.36497Z'
                        stroke='white'
                        strokeWidth='0.666667'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M2.1278 6.12279C2.78087 6.12279 3.31029 5.59337 3.31029 4.9403C3.31029 4.28723 2.78087 3.75781 2.1278 3.75781C1.47473 3.75781 0.945312 4.28723 0.945312 4.9403C0.945312 5.59337 1.47473 6.12279 2.1278 6.12279Z'
                        stroke='white'
                        strokeWidth='0.666667'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M6.85827 8.8806C7.51134 8.8806 8.04076 8.35118 8.04076 7.69811C8.04076 7.04504 7.51134 6.51562 6.85827 6.51562C6.2052 6.51562 5.67578 7.04504 5.67578 7.69811C5.67578 8.35118 6.2052 8.8806 6.85827 8.8806Z'
                        stroke='white'
                        strokeWidth='0.666667'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M3.14844 5.53906L5.84057 7.10783'
                        stroke='white'
                        strokeWidth='0.666667'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.83662 2.78125L3.14844 4.35002'
                        stroke='white'
                        strokeWidth='0.666667'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
                <div className='font-roboto font-bold text-[40px] uppercase text-black'>{selectedTopic.title}</div>
                <div className='flex items-center gap-2.5'>
                  <Image
                    src={selectedTopic.sponser_logo}
                    width={60}
                    height={60}
                    className='w-[30px] aspect-square rounded-full object-cover'
                    alt=''
                  />
                  <div className='text-xs font-medium text-neutral-950'>{selectedTopic.sponser_name}</div>
                </div>
              </div>
              {date.isSameOrAfter(moment('2024-12-30')) && date.isSameOrBefore(moment('2025-01-02')) ? (
                <div className='grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-10 w-full max-w-lg'>
                  <div
                    className='flex flex-col items-center gap-2.5 cursor-pointer'
                    onClick={() => setShowSpecialRewardGuideModal(true)}>
                    <div className='text-gray-800 text-sm flex items-center whitespace-nowrap gap-1'>
                      {t('Special Reward')}{' '}
                      <span className='cursor-pointer'>
                        <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M8 0.5C12.4184 0.5 16 4.0816 16 8.5C16 12.9184 12.4184 16.5 8 16.5C3.5816 16.5 0 12.9184 0 8.5C0 4.0816 3.5816 0.5 8 0.5ZM8 11.7C7.78783 11.7 7.58434 11.7843 7.43431 11.9343C7.28429 12.0843 7.2 12.2878 7.2 12.5C7.2 12.7122 7.28429 12.9157 7.43431 13.0657C7.58434 13.2157 7.78783 13.3 8 13.3C8.21217 13.3 8.41566 13.2157 8.56569 13.0657C8.71571 12.9157 8.8 12.7122 8.8 12.5C8.8 12.2878 8.71571 12.0843 8.56569 11.9343C8.41566 11.7843 8.21217 11.7 8 11.7ZM8 4.1C7.23087 4.1 6.49325 4.40553 5.94939 4.94939C5.40554 5.49325 5.1 6.23087 5.1 7C5.1 7.21217 5.18429 7.41566 5.33431 7.56569C5.48434 7.71571 5.68783 7.8 5.9 7.8C6.11217 7.8 6.31566 7.71571 6.46569 7.56569C6.61571 7.41566 6.7 7.21217 6.7 7C6.70026 6.76403 6.76475 6.53258 6.88655 6.33047C7.00834 6.12836 7.18285 5.96321 7.39136 5.85274C7.59988 5.74226 7.83453 5.69062 8.07015 5.70335C8.30578 5.71609 8.5335 5.79271 8.72889 5.92502C8.92428 6.05732 9.07997 6.24032 9.17928 6.45438C9.27858 6.66843 9.31775 6.90549 9.29258 7.14011C9.26742 7.37474 9.17886 7.59809 9.03642 7.78621C8.89397 7.97434 8.70301 8.12015 8.484 8.208C7.9432 8.424 7.2 8.9776 7.2 9.9V10.1C7.2 10.3122 7.28429 10.5157 7.43431 10.6657C7.58434 10.8157 7.78783 10.9 8 10.9C8.21217 10.9 8.41566 10.8157 8.56569 10.6657C8.71571 10.5157 8.8 10.3122 8.8 10.1C8.8 9.9048 8.84 9.8072 9.0088 9.724L9.0784 9.692C9.70305 9.44071 10.2208 8.97996 10.543 8.38873C10.8651 7.79751 10.9716 7.11263 10.8441 6.45151C10.7166 5.79039 10.3631 5.19421 9.8442 4.76518C9.32529 4.33614 8.6733 4.10098 8 4.1Z'
                            fill='#2D72FB'
                          />
                        </svg>
                      </span>
                    </div>
                    <div className='text-gray-black text-xl font-semibold flex items-center gap-1'>
                      450 <Image src={Usdt} width={24} height={24} alt='' />
                    </div>
                  </div>
                  <div className='w-[1px] h-14 bg-neutral-black'></div>
                  <div className='flex flex-col items-center gap-2.5'>
                    <div className='text-gray-800 text-sm'>{t('Total reward')}</div>
                    <div className='text-gray-black text-xl font-semibold flex items-center gap-1'>
                      {formatNumber(selectedTopic.total_reward)} <Image src={Point} width={24} height={24} alt='' />
                    </div>
                  </div>
                  <div className='w-[1px] h-14 bg-neutral-black'></div>
                  <div className='flex flex-col items-center gap-2.5'>
                    <div className='text-gray-800 text-sm'>{t('Participants')}</div>
                    <div className='text-gray-black text-xl font-semibold'>
                      {formatNumber(selectedTopic.participants.aggregate.count || 0)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='grid grid-cols-[1fr_auto_1fr] gap-10 w-full'>
                  <div className='flex flex-col items-center gap-2.5'>
                    <div className='text-gray-800 text-sm'>{t('Total reward')}</div>
                    <div className='text-gray-black text-xl font-semibold flex items-center gap-1'>
                      {formatNumber(selectedTopic.total_reward)} <Image src={Point} width={24} height={24} alt='' />
                    </div>
                  </div>
                  <div className='w-[1px] h-14 bg-neutral-black'></div>
                  <div className='flex flex-col items-center gap-2.5'>
                    <div className='text-gray-800 text-sm'>{t('Participants')}</div>
                    <div className='text-gray-black text-xl font-semibold'>
                      {formatNumber(selectedTopic.participants.aggregate.count || 0)}
                    </div>
                  </div>
                </div>
              )}
              <div className='w-full flex flex-col items-center gap-3 max-w-sm'>
                <Link
                  href='/events/your-city/submit'
                  className={`p-2.5 text-center font-roboto text-[22px] uppercase font-bold bg-neutral-black w-full ${
                    moment(date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')
                      ? 'text-white'
                      : 'text-text-teriary-on-brand pointer-events-none'
                  }`}>
                  {t('SUBMIT artwork')}
                </Link>
                <div
                  className='flex items-center gap-1.5 text-sm text-neutral-black font-medium cursor-pointer'
                  onClick={() => setShowContestRule(true)}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
                    <path
                      d='M12.5 12L12.5 16.5M12.5 8.66455V8.625M3.5 12C3.5 7.02944 7.52944 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12C21.5 16.9706 17.4706 21 12.5 21C7.52944 21 3.5 16.9706 3.5 12Z'
                      stroke='black'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  {t('Contest rules')}
                </div>
              </div>
            </div>
          )}
          <Link
            href='/events/your-city/submit'
            className={`p-2.5 text-center text-[20px] uppercase font-bold text-neutral-black font-roboto bg-white flex items-center w-full -mt-10 lg:mt-0`}>
            <Image src={Mockup2} alt='' className='w-full hidden lg:block' />
            <Image src={Banner} alt='' className='w-full lg:hidden' />
          </Link>
        </div>
        {isLoading ? (
          <div className='lg:flex-1 min-h-20 lg:min-h-screen grid place-items-center'>
            <Spinner />
          </div>
        ) : (
          !!topicData?.story_artworks?.length && (
            <div className='lg:flex-1'>
              <div className='w-full flex flex-col md:flex-row gap-5 justify-between bg-[#ffffff] lg:pt-10 lg:sticky z-10 lg:top-[82px] pb-5'>
                {account?.id ? (
                  <Link href={`/events/your-city/${account.id}`} className='flex items-center gap-1.5 shrink-0'>
                    <svg width='23' height='24' viewBox='0 0 23 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M19.9193 2.67672C17.2979 -0.780405 13.0118 -0.284829 11.5489 1.78985C9.5528 4.62134 11.6653 6.07747 8.2901 8.58623C6.55321 9.87717 1.82924 9.81795 0.4717 13.8956C-0.884984 17.9682 2.1924 24.3557 9.37334 23.8046C14.0414 23.4903 18.3292 21.0538 20.4696 17.1105C22.9104 12.614 22.5921 6.20214 19.9193 2.67672ZM3.84609 17.6942C1.23125 18.109 1.64041 14.9607 2.64188 13.5134C3.56186 12.1839 5.54038 11.1007 6.60659 11.741C9.05533 13.211 5.97482 17.357 3.84609 17.6945V17.6942Z'
                        fill='#F6A654'
                      />
                      <path
                        d='M19.9192 2.67934L20.0462 2.58357C18.6605 0.754557 16.8052 -0.00113212 15.1311 1.27287e-06C13.5725 0.000851317 12.1633 0.648018 11.4188 1.70094C10.9083 2.42433 10.6564 3.06923 10.5173 3.65944C10.4128 4.10203 10.3711 4.51289 10.3265 4.90419C10.2597 5.49214 10.1876 6.03135 9.90652 6.59719C9.62542 7.16276 9.13079 7.76544 8.19491 8.46134C7.78915 8.76396 7.18009 9.0014 6.47534 9.23913C5.41794 9.59757 4.147 9.96195 3.00356 10.6295C1.86012 11.296 0.841894 12.2778 0.320573 13.8481C0.105911 14.4924 0 15.1906 0 15.9086C0.000567888 17.7875 0.724341 19.8057 2.1523 21.3605C3.5794 22.9152 5.71664 24.0002 8.51434 23.999C8.798 23.999 9.08848 23.988 9.38577 23.9653H9.38435C14.0995 23.6479 18.4388 21.1868 20.6098 17.1885C21.7416 15.1025 22.2851 12.6192 22.2853 10.1957C22.2845 7.32398 21.5235 4.53357 20.0464 2.58357L19.9195 2.67934L19.7926 2.77511C21.2146 4.64861 21.9676 7.37952 21.967 10.1957C21.967 12.5722 21.4324 15.0072 20.3301 17.0374C18.2204 20.9258 13.9834 23.338 9.36305 23.6488H9.36163C9.0723 23.6712 8.79005 23.6819 8.51463 23.6819C5.79984 23.6808 3.75942 22.6381 2.38712 21.1463C1.01567 19.6544 0.318017 17.707 0.318585 15.9089C0.318585 15.222 0.420237 14.5573 0.622973 13.9484C0.954052 12.9555 1.48559 12.2208 2.12816 11.6484C3.09158 10.7905 4.31169 10.3028 5.4628 9.91123C6.03835 9.71516 6.59602 9.54316 7.09576 9.35757C7.5955 9.17169 8.03846 8.97363 8.38543 8.71607C9.24124 8.08024 9.75944 7.50278 10.0806 6.94571C10.3214 6.52834 10.4497 6.12457 10.5286 5.72817C10.647 5.13257 10.6601 4.55595 10.7825 3.93967C10.9049 3.32311 11.1309 2.66262 11.6792 1.8837C12.345 0.9359 13.6597 0.316784 15.1311 0.317634C16.711 0.318768 18.4632 1.02374 19.7926 2.77511L19.9195 2.67934H19.9192ZM3.84602 17.6968L3.82103 17.5401C3.66884 17.5642 3.52914 17.5755 3.4008 17.5755C3.13985 17.5755 2.92803 17.529 2.75596 17.4503C2.49842 17.3316 2.32295 17.1406 2.20397 16.8884C2.08557 16.6365 2.02963 16.3231 2.02992 15.9825C2.02793 15.1719 2.34907 14.2153 2.77271 13.6064C3.12395 13.0983 3.64414 12.6198 4.20407 12.2729C4.76344 11.9253 5.36342 11.7119 5.8589 11.713C6.11246 11.713 6.33678 11.7669 6.52447 11.8794C6.82317 12.059 7.02619 12.2752 7.15794 12.518C7.28941 12.7611 7.34989 13.034 7.34989 13.3295C7.35017 13.7463 7.22694 14.2074 7.01342 14.6658C6.6937 15.3538 6.17152 16.0341 5.58887 16.56C5.00707 17.0867 4.36223 17.4557 3.82075 17.5398L3.84574 17.6965L3.87072 17.8532C4.29607 17.7852 4.73931 17.5823 5.17034 17.2924C5.81631 16.8567 6.43474 16.222 6.89728 15.5198C7.35869 14.8174 7.66677 14.0475 7.66791 13.3293C7.66791 12.9904 7.59749 12.6623 7.43763 12.367C7.27805 12.0715 7.02989 11.8116 6.6883 11.6071C6.44184 11.4592 6.15704 11.3951 5.8589 11.3951C5.27454 11.3963 4.63226 11.6343 4.03626 12.0029C3.44083 12.3724 2.89254 12.8748 2.51092 13.4256C2.04724 14.0986 1.7136 15.0911 1.71161 15.9822C1.71218 16.4809 1.81753 16.953 2.08954 17.3117C2.22527 17.4905 2.40359 17.6384 2.62336 17.7387C2.84313 17.8393 3.10237 17.8929 3.4008 17.8929C3.5476 17.8929 3.70405 17.8801 3.87072 17.8535L3.84574 17.6968H3.84602Z'
                        fill='#581E18'
                      />
                      <path
                        d='M20.8797 8.60778C20.8797 9.90126 19.8288 10.9502 18.5326 10.9502C17.2364 10.9502 16.1855 9.90126 16.1855 8.60778C16.1855 7.3143 17.2364 6.26562 18.5326 6.26562C19.8288 6.26562 20.8797 7.3143 20.8797 8.60778Z'
                        fill='#61B9D9'
                      />
                      <path
                        d='M20.8793 8.6102H20.7202C20.7202 9.21374 20.4755 9.75861 20.0794 10.1542C19.683 10.5497 19.137 10.7937 18.5322 10.7937C17.9274 10.7937 17.3816 10.5494 16.985 10.1542C16.5889 9.75861 16.3441 9.21345 16.3441 8.6102C16.3441 8.00696 16.5889 7.46208 16.985 7.06624C17.3813 6.67097 17.9274 6.42672 18.5322 6.42672C19.1367 6.42672 19.6827 6.67097 20.0794 7.06624C20.4755 7.4618 20.7202 8.00667 20.7202 8.6102H21.0385C21.0385 7.22888 19.9164 6.10938 18.5325 6.10938C17.1482 6.10938 16.0264 7.22917 16.0264 8.6102C16.0264 9.99153 17.1485 11.1113 18.5325 11.1113C19.9167 11.1113 21.0385 9.99153 21.0385 8.6102H20.8795H20.8793Z'
                        fill='#581E18'
                      />
                      <path
                        d='M17.2962 3.92809C17.2962 5.22158 16.2453 6.27025 14.9491 6.27025C13.6529 6.27025 12.6021 5.22158 12.6021 3.92809C12.6021 2.63461 13.6529 1.58594 14.9491 1.58594C16.2453 1.58594 17.2962 2.63461 17.2962 3.92809Z'
                        fill='#E73A3A'
                      />
                      <path
                        d='M17.296 3.9227H17.137C17.137 4.52595 16.8923 5.07083 16.4962 5.46667C16.0998 5.86194 15.5538 6.10619 14.949 6.10619C14.3444 6.10619 13.7984 5.86194 13.402 5.46667C13.0059 5.07111 12.7612 4.52624 12.7612 3.9227C12.7612 3.31917 13.0059 2.7743 13.402 2.37874C13.7984 1.98347 14.3444 1.73922 14.949 1.73922C15.5538 1.73922 16.0998 1.98347 16.4962 2.37874C16.8923 2.7743 17.137 3.31917 17.137 3.9227H17.4553C17.4553 2.54138 16.3335 1.42188 14.949 1.42188C13.565 1.42188 12.4429 2.54138 12.4429 3.9227C12.4429 5.30374 13.565 6.42354 14.949 6.42354C16.3332 6.42354 17.455 5.30374 17.4553 3.9227H17.2963H17.296Z'
                        fill='#581E18'
                      />
                      <path
                        d='M20.0877 14.6237C20.0877 15.9172 19.0368 16.9661 17.7406 16.9661C16.4444 16.9661 15.3936 15.9175 15.3936 14.6237C15.3936 13.3299 16.4444 12.2812 17.7406 12.2812C19.0368 12.2812 20.0877 13.3299 20.0877 14.6237Z'
                        fill='#95C11F'
                      />
                      <path
                        d='M20.0871 14.6261H19.928C19.928 15.2296 19.6833 15.7745 19.2872 16.1701C18.8908 16.5653 18.3448 16.8096 17.74 16.8096C17.1352 16.8096 16.5892 16.5653 16.1928 16.1701C15.7967 15.7745 15.5519 15.2296 15.5519 14.6261C15.5519 14.0226 15.7967 13.4777 16.1928 13.0821C16.5892 12.6869 17.1352 12.4426 17.74 12.4426C18.3448 12.4426 18.8905 12.6869 19.2872 13.0821C19.6833 13.4777 19.928 14.0226 19.928 14.6261H20.2464C20.2464 13.2448 19.1242 12.125 17.7403 12.125C16.356 12.125 15.2342 13.2448 15.2339 14.6261C15.2339 16.0074 16.356 17.1269 17.7403 17.1272C19.1245 17.1272 20.2464 16.0074 20.2464 14.6261H20.0873H20.0871Z'
                        fill='#581E18'
                      />
                      <path
                        d='M9.77766 19.975C9.77766 21.2687 8.72678 22.3171 7.43058 22.3171C6.13437 22.3171 5.0835 21.2685 5.0835 19.975C5.0835 18.6815 6.13437 17.6328 7.43058 17.6328C8.72678 17.6328 9.77766 18.6815 9.77766 19.975Z'
                        fill='#7C5DA4'
                      />
                      <path
                        d='M9.7772 19.9774H9.61819C9.61819 20.5809 9.37344 21.1258 8.97733 21.5214C8.58095 21.9166 8.03492 22.1609 7.43041 22.1609C6.82561 22.1609 6.27958 21.9166 5.88319 21.5214C5.48709 21.1258 5.24233 20.5809 5.24233 19.9774C5.24233 19.3739 5.48709 18.8293 5.88319 18.4334C6.27958 18.0382 6.82561 17.7939 7.43041 17.7939C8.03492 17.7939 8.58095 18.0382 8.97733 18.4334C9.37344 18.829 9.61819 19.3739 9.61819 19.9774H9.9365C9.9365 18.5961 8.81463 17.4766 7.43041 17.4766C6.04618 17.4766 4.92432 18.5964 4.92432 19.9774C4.92432 21.3587 6.04618 22.4782 7.43041 22.4785C8.81435 22.4785 9.9365 21.3587 9.9365 19.9774H9.77749H9.7772Z'
                        fill='#581E18'
                      />
                      <path
                        d='M15.869 18.8343C15.869 20.1278 14.8181 21.1765 13.5219 21.1765C12.2257 21.1765 11.1748 20.1278 11.1748 18.8343C11.1748 17.5409 12.2257 16.4922 13.5219 16.4922C14.8181 16.4922 15.869 17.5406 15.869 18.8343Z'
                        fill='#FFCA00'
                      />
                      <path
                        d='M15.8685 18.829H15.7095C15.7095 19.4325 15.4647 19.9771 15.0686 20.3729C14.6723 20.7682 14.1262 21.0124 13.5214 21.0124C12.9166 21.0124 12.3709 20.7682 11.9742 20.3729C11.5781 19.9774 11.3334 19.4325 11.3334 18.829C11.3334 18.2254 11.5781 17.6805 11.9742 17.285C12.3706 16.8897 12.9166 16.6458 13.5214 16.6455C14.1259 16.6455 14.672 16.8894 15.0686 17.285C15.4647 17.6805 15.7095 18.2254 15.7095 18.829H16.0278C16.0278 17.4476 14.9057 16.3281 13.5217 16.3281C12.1378 16.3281 11.0156 17.4476 11.0156 18.829C11.0156 20.2103 12.1378 21.3298 13.5217 21.3298C14.9057 21.3298 16.0278 20.2103 16.0278 18.829H15.8688H15.8685Z'
                        fill='#581E18'
                      />
                      <path
                        d='M7.84497 11.9592C7.79954 11.917 7.73764 11.9802 7.77739 12.0264C8.21466 12.5293 8.28849 13.1266 8.23993 13.7687C8.19564 14.3487 7.86314 14.8321 7.78278 15.3857C7.77284 15.4554 7.84724 15.5512 7.92277 15.4928C8.39923 15.1253 8.51678 14.3322 8.55341 13.7687C8.59855 13.0827 8.3467 12.4247 7.84468 11.9592H7.84497Z'
                        fill='#581E18'
                      />
                      <path
                        d='M10.9358 6.24645C10.4028 7.79778 9.12962 8.51436 7.99016 9.57947C7.97539 9.59335 7.99442 9.61772 8.01174 9.60724C9.20146 8.88725 10.8418 7.77086 11.0962 6.29065C11.1141 6.18581 10.9707 6.14387 10.9358 6.24645Z'
                        fill='#581E18'
                      />
                      <path
                        d='M11.1104 5.70312C10.9059 5.70312 10.9059 6.01962 11.1104 6.01962C11.3148 6.01962 11.3151 5.70312 11.1104 5.70312Z'
                        fill='#581E18'
                      />
                      <path
                        d='M14.476 5.04668C14.3402 4.90473 14.1469 4.82907 13.9986 4.70071C13.8524 4.57377 13.705 4.37656 13.6326 4.19805C13.613 4.15045 13.5321 4.15102 13.5352 4.21137C13.548 4.45704 13.5892 4.63526 13.7385 4.83814C13.8828 5.03393 14.0816 5.24049 14.3169 5.31983C14.4785 5.37395 14.5841 5.15946 14.476 5.04668Z'
                        fill='#581E18'
                      />
                      <path
                        d='M14.6982 4.55052C14.6196 4.48932 14.554 4.51086 14.4617 4.49527C14.3609 4.47827 14.2831 4.42557 14.2317 4.33915C14.1993 4.28418 14.1235 4.32243 14.1338 4.37995C14.1553 4.49895 14.2093 4.62306 14.3158 4.68795C14.4194 4.75142 14.6119 4.79392 14.6979 4.68738C14.728 4.65026 14.7428 4.58538 14.6979 4.55024L14.6982 4.55052Z'
                        fill='#581E18'
                      />
                      <path
                        d='M19.3214 7.6751C19.2677 7.63402 19.2175 7.71761 19.2544 7.76209C19.3665 7.89866 19.4069 8.08737 19.4219 8.26078C19.4367 8.43136 19.3955 8.60392 19.4157 8.76996C19.4307 8.89917 19.6136 8.98559 19.6865 8.84306C19.8932 8.43788 19.651 7.92757 19.3214 7.67482V7.6751Z'
                        fill='#581E18'
                      />
                      <path
                        d='M20.1025 8.05085C20.0628 7.94969 19.927 7.98908 19.9421 8.09505C19.9679 8.27753 19.954 8.46935 19.9188 8.64956C19.8893 8.80031 19.8254 8.94765 19.8793 9.09895C19.8901 9.12927 19.9225 9.14429 19.952 9.12842C20.2791 8.95076 20.215 8.33618 20.1022 8.05085H20.1025Z'
                        fill='#581E18'
                      />
                      <path
                        d='M18.6984 13.8723C18.6703 13.8312 18.5993 13.8556 18.6149 13.9074C18.7276 14.2758 18.7327 14.7127 18.6703 15.0904C18.6322 15.3202 18.5439 15.5446 18.3974 15.7268C18.2994 15.8486 18.1867 15.877 18.1308 16.0243C18.114 16.0679 18.1487 16.1206 18.1915 16.1311C18.601 16.2328 18.8557 15.5681 18.9295 15.2672C19.0473 14.7872 18.9772 14.2792 18.6984 13.8723Z'
                        fill='#581E18'
                      />
                      <path
                        d='M19.3416 14.5977C19.3169 14.5475 19.2368 14.5719 19.2383 14.6257C19.2437 14.8346 19.1395 15.0227 19.0997 15.2219C19.0722 15.3602 19.2397 15.4248 19.32 15.3148C19.4739 15.1043 19.4509 14.8173 19.3413 14.5977H19.3416Z'
                        fill='#581E18'
                      />
                      <path
                        d='M15.1021 19.0698C15.0859 19.0612 15.0644 19.059 15.0482 19.0698C14.9468 19.1375 14.9406 19.2687 14.9034 19.378C14.8469 19.5449 14.7461 19.6676 14.6149 19.7824C14.3823 19.9858 14.0603 20.1428 13.7875 20.2859C13.7557 20.3026 13.7687 20.3595 13.8065 20.3559C14.2066 20.3153 14.5439 20.2054 14.8599 19.9427C15.03 19.8016 15.4315 19.2409 15.1021 19.0695V19.0698Z'
                        fill='#581E18'
                      />
                      <path
                        d='M14.8558 18.7999C14.849 18.7293 14.7712 18.7123 14.7297 18.7659C14.5855 18.9529 14.5142 19.1943 14.3225 19.3479C14.2626 19.396 14.3271 19.4952 14.3958 19.4734C14.692 19.3793 14.8842 19.1098 14.8555 18.7996L14.8558 18.7999Z'
                        fill='#581E18'
                      />
                      <path
                        d='M8.39391 20.9722C8.20935 21.0291 8.08668 21.1926 7.91916 21.2864C7.68377 21.4184 7.39926 21.404 7.15478 21.3065C7.12582 21.2955 7.10566 21.3366 7.12582 21.3561C7.3172 21.544 7.54123 21.6522 7.81495 21.5919C8.07334 21.5346 8.44105 21.3578 8.49386 21.0722C8.50465 21.0144 8.45752 20.9529 8.3942 20.9725L8.39391 20.9722Z'
                        fill='#581E18'
                      />
                      <path
                        d='M8.29877 20.6322C8.10569 20.5991 7.91147 20.6909 7.71725 20.6821C7.66614 20.6799 7.64684 20.7538 7.69142 20.7779C7.89018 20.8864 8.15396 20.87 8.31638 20.6983C8.33512 20.6784 8.32972 20.6373 8.29905 20.6322H8.29877Z'
                        fill='#581E18'
                      />
                      <path
                        d='M4.58752 22.005C4.47195 21.8475 4.36632 21.8126 4.18772 21.7186C3.85239 21.5412 3.55311 21.2998 3.26689 21.0538C2.745 20.6056 2.23873 20.0219 1.88863 19.4297L1.875 19.4376C2.18847 20.0488 2.53148 20.571 3.00538 21.0725C3.33674 21.4233 4.02162 22.1342 4.54606 22.0764C4.57786 22.073 4.6108 22.0373 4.58723 22.005H4.58752Z'
                        fill='#581E18'
                      />
                      <path
                        d='M5.05125 22.2734C4.91325 22.2734 4.91325 22.4871 5.05125 22.4871C5.18925 22.4871 5.18925 22.2734 5.05125 22.2734Z'
                        fill='#581E18'
                      />
                      <path
                        d='M17.1256 18.0844C17.0853 18.0425 17.0165 18.0646 16.9998 18.1176C16.8905 18.4675 16.9757 18.86 16.8771 19.2283C16.7664 19.6431 16.596 20.0308 16.3754 20.3985C16.355 20.4325 16.4049 20.4731 16.4316 20.4416C16.7218 20.0985 16.9907 19.7259 17.1483 19.3034C17.2806 18.9487 17.4183 18.3854 17.1253 18.0847L17.1256 18.0844Z'
                        fill='#581E18'
                      />
                      <path
                        d='M20.9501 6.86181C20.5906 6.40505 20.2181 5.8154 19.64 5.61253C18.9051 5.35496 18.2007 5.39577 17.4982 5.72927C17.4593 5.74768 17.4871 5.81087 17.5271 5.79784C18.2543 5.56606 19.0377 5.53149 19.7396 5.86612C20.2067 6.08855 20.4909 6.60935 20.8717 6.94058C20.9271 6.98846 20.9938 6.91763 20.9501 6.86209V6.86181Z'
                        fill='#581E18'
                      />
                      <path
                        d='M14.0586 6.8477C13.8596 6.70036 13.6168 6.65361 13.3967 6.53715C13.1517 6.40709 12.9555 6.21102 12.7704 6.00927C12.3308 5.53127 12.0642 4.84386 11.981 4.2086C11.9787 4.19131 11.952 4.19046 11.9532 4.2086C11.998 4.92632 12.1514 5.56413 12.5881 6.14981C12.8845 6.54763 13.5191 7.05143 14.0444 6.95622C14.1009 6.94602 14.0949 6.87462 14.0586 6.8477Z'
                        fill='#581E18'
                      />
                      <path
                        d='M16.7474 11.5573C16.2914 11.3711 15.6675 11.9996 15.406 12.3127C15.0409 12.7507 14.8353 13.2916 14.864 13.8589C14.8671 13.9161 14.9486 13.9295 14.9653 13.8725C15.1198 13.3466 15.3274 12.8459 15.7008 12.4362C15.8839 12.2356 16.1108 12.0902 16.3473 11.9619C16.539 11.8582 16.6741 11.8596 16.8005 11.6882C16.8382 11.6372 16.7948 11.5768 16.7471 11.5573H16.7474Z'
                        fill='#581E18'
                      />
                      <path
                        d='M7.81254 16.9201C7.7654 16.9235 7.75064 16.9932 7.80089 17.0054C8.27508 17.1221 8.71917 17.2748 9.12776 17.5483C9.5869 17.8563 9.79787 18.3159 10.027 18.7947C10.0878 18.9222 10.263 18.8265 10.2408 18.7046C10.0458 17.629 8.87108 16.8385 7.81254 16.9198V16.9201Z'
                        fill='#581E18'
                      />
                      <path
                        d='M19.4685 2.803C19.2907 2.58 19.1084 2.36154 18.9136 2.15328C18.743 1.97052 18.5533 1.80873 18.3506 1.6628C18.1257 1.50101 17.9363 1.49846 17.6759 1.45312L17.6714 1.46418C18.099 1.67045 18.5039 2.07366 18.8165 2.42246C19.0795 2.71572 19.3353 3.28242 19.7192 3.41928C19.7703 3.43741 19.8032 3.38414 19.7973 3.34136C19.7677 3.12743 19.5996 2.9679 19.4682 2.80328L19.4685 2.803Z'
                        fill='#581E18'
                      />
                      <path
                        d='M20.1547 3.82607L20.149 3.81162C20.1002 3.68779 19.9452 3.68779 19.8963 3.81162L19.8906 3.82607C19.8049 4.04453 20.2405 4.04453 20.1547 3.82607Z'
                        fill='#581E18'
                      />
                      <path
                        d='M2.30391 12.0912C1.6886 12.4678 1.26893 13.2011 1.13236 13.8944C1.12724 13.9199 1.16132 13.9284 1.1704 13.9049C1.44611 13.2107 1.91576 12.729 2.3607 12.1482C2.38682 12.1139 2.33713 12.0708 2.30362 12.0912H2.30391Z'
                        fill='#581E18'
                      />
                      <path
                        d='M2.63328 12.501C2.2863 12.5976 2.04495 12.9631 1.8601 13.2476C1.84534 13.2705 1.87884 13.2958 1.8973 13.2765C2.0211 13.1464 2.15228 13.0277 2.28801 12.9104C2.41947 12.7965 2.56372 12.6868 2.66934 12.5474C2.68695 12.5245 2.65827 12.4942 2.63357 12.501H2.63328Z'
                        fill='#581E18'
                      />
                    </svg>
                    <span className='text-feedback-info-link-defaul text-sm font-semibold'>View My Progress</span>
                    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M10.2852 7L15.2852 12L10.2852 17'
                        stroke='#2D72FB'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </Link>
                ) : (
                  <div></div>
                )}
                <TextField
                  value={search}
                  onChange={setSearch}
                  className='bg-neutral-100 border-none [&_input::placeholder]:!text-text-secondary-on-brand max-w-96'
                  placeholder={t('Search by title, name artist')}
                  trailingComponent={
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        d='M14.1057 14.2L17 17M16.0667 9.53333C16.0667 13.1416 13.1416 16.0667 9.53333 16.0667C5.92507 16.0667 3 13.1416 3 9.53333C3 5.92507 5.92507 3 9.53333 3C13.1416 3 16.0667 5.92507 16.0667 9.53333Z'
                        stroke='#6D6D6D'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />
                    </svg>
                  }
                />
              </div>
              <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative pb-20 pt-0.5'>
                {list.map((artwork, index) => (
                  <div
                    key={index}
                    className='relative rounded-lg overflow-hidden [&:hover>div]:block cursor-pointer border-[3px] border-neutral-black'
                    onClick={() => {
                      setSelectedArtwork(artwork)
                      setOpenArtworkDetail(true)
                    }}>
                    <LazyImage
                      src={artwork.display_url}
                      width={500}
                      height={500}
                      alt=''
                      className='w-full aspect-square object-cover'
                    />
                    <div className='absolute hidden w-full bottom-0 p-2 lg:pt-10 lg:p-4 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_6.71%,#000_76.24%)]'>
                      <div className='text-sm font-bold text-white'>
                        {artwork?.artwork?.name || 'Unknown artwork title'}
                      </div>
                      <div className='text-sm font-medium text-white'>
                        by{' '}
                        <span className='text-text-brand-hover'>
                          {artwork?.artwork?.creator?.pen_name || 'Unknown creator'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      <Modal open={showSpecialRewardGuideModal} setOpen={setShowSpecialRewardGuideModal}>
        <div className='px-8 py-4 rounded-mlg bg-white w-full max-w-screen-sm space-y-4 relative'>
          <div className='absolute top-3 right-3' onClick={() => setShowSpecialRewardGuideModal(false)}>
            <XMarkIcon width={20} height={20} />
          </div>
          <div className='text-center w-full font-semibold text-lg'>{t('SPECIAL REWARD')}</div>
          <div className='p-4 rounded-md bg-neutral-50 text-sm space-y-4'>
            <p className='whitespace-pre-line'>
              🎨 DRAWING CONTEST SPECIAL PRIZE 🎉
              <br />
              <br />
              📅 Event Duration
              <br />
              The special prize is available from 🗓 December 30, 2024, to January 2, 2025.
              <br />
              <br />
              💰 Daily Prize Distribution (450 USDT per day)
              <br />
              🥇 1st Prize: 100 USDT for 1 winner.
              <br />
              🥈 2nd Prizes: 50 USDT each for 3 winners.
              <br />
              🥉 3rd Prizes: 15 USDT each for 10 winners.
              <br />
              <br />
              🍀 Lucky Number Prizes (on X)
              <br />
              3 winners who guess the closest to the actual number of votes for the top artist of the day:
              <br />
              🎁 1st Closest Guess: 25 USDT
              <br />
              🎁 2nd Closest Guess: 15 USDT
              <br />
              🎁 3rd Closest Guess: 10 USDT
              <br />
              <br />
              🗳 Voting Rules:
              <br />
              - Winners are determined based on the number of votes received during the event.
              <br />
              - Voting closes at ⏰ 11:59 PM on January 3, 2024. Votes submitted after this time will not be counted.
              <br />
              <br />
              🎊 Get ready to unleash your creativity and win exciting prizes! 🖌✨
            </p>
          </div>
        </div>
      </Modal>
      <Modal open={showContestRule} setOpen={setShowContestRule}>
        <div className='px-8 py-4 rounded-mlg bg-white w-full max-w-screen-sm space-y-4 relative'>
          <div className='absolute top-3 right-3' onClick={() => setShowContestRule(false)}>
            <XMarkIcon width={20} height={20} />
          </div>
          <div className='text-center w-full font-semibold text-lg'>{t('CONTEST RULES')}</div>
          <div className='p-4 rounded-md bg-neutral-50 text-sm space-y-4'>
            <strong>Punktober: Your City</strong>
            <p>
              {`Inspired by "Inktober," Punktober is a 31-day artistic journey celebrating creativity and perseverance.
              Through each daily topic, participants will bring the concept of "Your City" to life in their unique
              artistic styles. It’s your chance to sharpen your skills, develop original IPs, and unlock exciting
              rewards. Let’s see your vision of the city!`}
            </p>
            <br />
            <strong>📅 Event Duration:</strong>
            <p>14 Dec 2024 – 13 Jan 2025</p>
            <br />
            <strong>✨ Submission Guidelines:</strong>
            <ul className='list-disc pl-5 list-inside'>
              <li>Step 1: Submit 01 artwork daily on PunkgaMe’s website (opens on 14 Dec 2024)</li>
              <li>
                Step 2: Wait for the link of the approved art work on the website (approvals may take up to 24 hours)
              </li>
              <li>
                Step 3: Share your creations on X or Facebook with the hashtags #Punktober_YourCity and #PunkgaMe.
                Include the link to your approved submission on website to amplify the challenge spirit.
              </li>
            </ul>
            <br />
            <strong>🎁 Dream Points (DP) Rewards:</strong>
            <ul className='list-disc pl-5 list-inside'>
              <li>A minimum of 5,000 DP daily, co-sponsored by PunkgaMe and its partners.</li>
              <li>
                All approved submissions for the day will share the rewards equally, ensuring recognition for every
                artist.
              </li>
            </ul>
            <p>
              Let the world see <strong>Your City</strong> through your eyes!
            </p>
          </div>
        </div>
      </Modal>
      {width >= 768 ? (
        <Modal open={openArtworkDetail} setOpen={setOpenArtworkDetail}>
          <div className='w-screen max-w-screen-2xl relative mx-auto flex items-center gap-4'>
            <div className='absolute top-0 right-5 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                onClick={() => setOpenArtworkDetail(false)}>
                <path d='M16 8L8 16M16 16L8 8' stroke='#fff' stroke-width='1.5' stroke-linecap='round' />
              </svg>
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                const index = list.findIndex((artwork) => artwork.id == selectedArtwork.id)
                if (index > 0) {
                  setSelectedArtwork(list[index - 1])
                }
              }}>
              <svg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46' fill='none'>
                <path
                  d='M10.2209 21.2051L30.6915 0.734872C31.1649 0.261039 31.7969 0 32.4709 0C33.1448 0 33.7768 0.261039 34.2503 0.734872L35.7578 2.24201C36.7387 3.22409 36.7387 4.82024 35.7578 5.80081L18.5681 22.9905L35.7768 40.1992C36.2503 40.673 36.5117 41.3047 36.5117 41.9782C36.5117 42.6525 36.2503 43.2842 35.7768 43.7584L34.2693 45.2651C33.7955 45.739 33.1638 46 32.4899 46C31.816 46 31.184 45.739 30.7105 45.2651L10.2209 24.7762C9.74629 24.3009 9.48563 23.6662 9.48713 22.9916C9.48563 22.3143 9.74629 21.68 10.2209 21.2051Z'
                  fill='white'
                />
              </svg>
            </div>
            <div className='bg-[#ffffff] p-8 h-full w-full relative'>
              <ArtworkDetail id={selectedArtwork?.id} />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                const index = list.findIndex((artwork) => artwork.id == selectedArtwork.id)
                if (index < list.length - 1) {
                  setSelectedArtwork(list[index + 1])
                }
              }}>
              <svg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 46 46' fill='none'>
                <path
                  d='M35.7791 21.2051L15.3085 0.734872C14.8351 0.261039 14.2031 0 13.5291 0C12.8552 0 12.2232 0.261039 11.7497 0.734872L10.2422 2.24201C9.26128 3.22409 9.26128 4.82024 10.2422 5.80081L27.4319 22.9905L10.2232 40.1992C9.74969 40.673 9.48828 41.3047 9.48828 41.9782C9.48828 42.6525 9.74969 43.2842 10.2232 43.7584L11.7307 45.2651C12.2045 45.739 12.8362 46 13.5101 46C14.184 46 14.816 45.739 15.2895 45.2651L35.7791 24.7762C36.2537 24.3009 36.5144 23.6662 36.5129 22.9916C36.5144 22.3143 36.2537 21.68 35.7791 21.2051Z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
        </Modal>
      ) : (
        openArtworkDetail && (
          <Modal open={openArtworkDetail} setOpen={setOpenArtworkDetail}>
            <div className='fixed bg-[#ffffff] top-14 left-0 w-screen h-[calc(100dvh-56px)] flex flex-col'>
              <div className='flex-1 overflow-auto p-4'>
                <div className='flex justify-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    onClick={() => setOpenArtworkDetail(false)}>
                    <path d='M16 8L8 16M16 16L8 8' stroke='#0B0B0B' stroke-width='1.5' stroke-linecap='round' />
                  </svg>
                </div>
                <ArtworkDetail id={selectedArtwork?.id} />
              </div>
            </div>
          </Modal>
        )
      )}
    </>
  )
}
