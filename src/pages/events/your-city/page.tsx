import LazyImage from 'components/Image'
import TextField from 'components/Input/TextField'
import Logo from 'components/pages/event/your-city/assets/logo.svg'
import Mockup2 from 'components/pages/event/your-city/assets/mock.png'
import Point from 'components/pages/event/your-city/assets/point.svg'
import Calendar from 'components/pages/event/your-city/Calendar'
import Modal from 'components/pages/event/your-city/Modal'
import Spinner from 'components/Spinner'
import moment, { Moment } from 'moment-timezone'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { eventService } from 'src/services/eventService'
import { formatNumber } from 'src/utils'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { useWindowSize } from 'usehooks-ts'
import ArtworkDetail from './ArtworkDetail'
import { XMarkIcon } from '@heroicons/react/24/outline'
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
        router.replace({
          pathname: router.pathname,
          search: searchParams.toString(),
        })
      } else {
        searchParams.delete('artwork_id')
        router.replace({
          pathname: router.pathname,
          search: searchParams.toString(),
        })
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
        <div className='flex flex-col items-center pb-3.5 lg:pb-8 w-full xl:w-[663px] xl:sticky xl:top-[120px] pt-3 xl:h-[calc(100vh-120px)] xl:min-h-[800px] gap-20 xl:gap-0 justify-between'>
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
              <div className='grid grid-cols-[1fr_auto_1fr] gap-10 w-full'>
                <div className='flex flex-col items-center gap-2.5'>
                  <div className='text-gray-800 text-sm'>{t('Total reward')}</div>
                  <div className='text-gray-black text-xl font-semibold'>
                    {formatNumber(selectedTopic.total_reward)} DP
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
              <div className='w-full flex flex-col items-center gap-3'>
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
          <div className='w-full relative bg-neutral-black hidden lg:block'>
            <Image src={Mockup2} alt='' className='w-full' />
            <div className='flex items-center h-full px-10 absolute right-0 top-0'>
              <Link
                href='/events/your-city/submit'
                className={`p-2.5 text-center text-[20px] uppercase font-bold text-neutral-black font-roboto bg-white flex items-center w-fit`}>
                {t('Join Now')}
                <Image src={Point} alt='' className='w-5 h-5 ml-2' />
              </Link>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className='lg:flex-1 min-h-20 lg:min-h-screen grid place-items-center'>
            <Spinner />
          </div>
        ) : (
          !!topicData?.story_artworks?.length && (
            <div className='lg:flex-1'>
              <div className='w-full flex lg:justify-end bg-[#ffffff] lg:pt-10 lg:sticky z-10 lg:top-[82px] pb-5'>
                <TextField
                  value={search}
                  onChange={setSearch}
                  className='bg-neutral-100 border-none [&_input::placeholder]:!text-text-secondary-on-brand lg:max-w-96'
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
      <Modal open={showContestRule} setOpen={setShowContestRule}>
        <div className='px-8 py-4 rounded-mlg bg-white w-full max-w-screen-sm space-y-4 relative'>
          <div className='lg:hidden absolute top-3 right-3' onClick={() => setShowContestRule(false)}>
            <XMarkIcon width={20} height={20} />
          </div>
          <div className='text-center w-full font-semibold text-lg'>{t('CONTEST RULES')}</div>
          <div className='p-4 rounded-md bg-neutral-50 text-sm space-y-4'>
            <p>
              <span className='font-semibold'>🎨 Event Theme: </span>
              <i>Your City</i>
            </p>
            <p>
              <span className='font-semibold'>📅 Duration: </span>
              <i>31 Days (December 14th - January 13th)</i>
            </p>
            <p>
              <span className='font-semibold'>🌟 Celebrate Your Creativity:</span>
            </p>
            <p>
              Unleash your imagination and showcase the essence of your city! Every day brings a fresh, inspiring topic
              tied to the main theme, giving you 31 opportunities to let your art shine.
            </p>
            <p>
              <span className='font-semibold'>📜Know What’s Coming:</span>
            </p>
            <p>
              Stay ahead of the game! Each daily topic will be revealed 2 days in advance, giving you time to brainstorm
              and perfect your masterpiece.
            </p>
            <p>
              <span className='font-semibold'>🖌️ Submit & Shine:</span>
            </p>
            <ul className='list-disc list-inside '>
              <li>
                Share <span className='font-semibold'>one masterpiece per day</span> and watch your art take center
                stage!
              </li>
              <li>
                Changed your mind or made a last-minute tweak? No worries—your latest submission will always be the one
                that counts.
              </li>
            </ul>
            <p>
              <span className='font-semibold'>💎 Win Dream Points (DP):</span>
            </p>
            <ul className='list-disc list-inside '>
              <li>
                <span className='font-semibold'>Daily Rewards: </span>
                Each day, a prize pool of <span className='font-semibold'>Dream Points (DP)</span> - sponsored by{' '}
                <span className='font-semibold'>Punkga.me</span> and our amazing partners—awaits!
              </li>
              <li>
                <span className='font-semibold'>Fair Sharing:</span> All approved artworks of the day will equally split
                the pool, giving every participating artist a piece of the reward.
              </li>
              <li>The DP prize amounts change daily. Prepare yourself and make your own tactic!</li>
            </ul>
            <p>
              Let the world see <i>Your City</i> through your eyes!
            </p>
          </div>
        </div>
      </Modal>
      {width >= 768 ? (
        <Modal open={openArtworkDetail} setOpen={setOpenArtworkDetail}>
          <div className='w-screen max-w-screen-2xl relative mx-auto flex items-center gap-4'>
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
            <div className='bg-[#ffffff] p-8 h-full w-full'>
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
            <div className='fixed bg-[#ffffff] top-14 left-0 w-screen h-[calc(100vh-56px)] flex flex-col'>
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
