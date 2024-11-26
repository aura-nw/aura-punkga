import Image from 'next/image'
import Logo from 'components/pages/event/punktober/assets/logo.svg'
import { use, useState } from 'react'
import Calendar from 'components/pages/event/punktober/Calendar'
import { useTranslation } from 'react-i18next'
import TextField from 'components/Input/TextField'
import Point from 'components/pages/event/punktober/assets/point.svg'
import Mockup2 from 'components/pages/event/punktober/assets/mock.png'
import Link from 'next/link'
import useSWR from 'swr'
import { eventService } from 'src/services/eventService'
import moment from 'moment'
import { formatNumber } from 'src/utils'
import Spinner from 'components/Spinner'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const [date, setDate] = useState(new Date())
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
  if (!topics?.length) return <div></div>
  return (
    <div className='bg-[#DBDBDB] min-h-screen px-4 flex flex-col lg:justify-center gap-10 lg:flex-row w-full lg:px-[85px] lg:gap-14'>
      <div className='flex flex-col items-center pb-3.5 lg:pb-8 w-full lg:w-[663px] lg:sticky lg:top-[120px] pt-3 lg:h-[calc(100vh-120px)] justify-between'>
        <div className='flex flex-col items-center lg:gap-[4vh]'>
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
            <Calendar date={date} setDate={setDate} />
          </div>
          {selectedTopic && (
            <div className='flex flex-col items-center gap-10 mt-8 w-full'>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='text-neutral-default font-medium text-sm'>{t('Topic of the day')}</div>
                <div className='font-roboto font-bold text-[40px] uppercase text-black'>{selectedTopic.title}</div>
              </div>
              <div className='grid grid-cols-[1fr_auto_1fr] gap-10 w-full'>
                <div className='flex flex-col items-center gap-2.5'>
                  <div className='text-gray-800 text-sm'>{t('Total reward')}</div>
                  <div className='text-gray-black text-xl font-semibold'>
                    {formatNumber(selectedTopic.total_reward)} DP
                  </div>
                </div>
                <div className='w-[1px] h-full bg-neutral-black'></div>
                <div className='flex flex-col items-center gap-2.5'>
                  <div className='text-gray-800 text-sm'>{t('Participants')}</div>
                  <div className='text-gray-black text-xl font-semibold'>
                    {formatNumber(selectedTopic.participants.aggregate.count || 0)}
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-col items-center gap-3'>
                <Link
                  href='/events/punktober/submit'
                  className={`p-2.5 text-center font-roboto text-[22px] uppercase font-bold bg-neutral-black w-full ${
                    date == new Date() ? 'text-white' : 'text-text-teriary-on-brand pointer-events-none'
                  }`}>
                  {t('SUBMIT artwork')}
                </Link>
                <div className='flex items-center gap-1.5 text-sm text-neutral-black font-medium'>
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
        </div>
        <div className='w-full h-[92px] relative bg-neutral-black hidden lg:block'>
          <Image src={Mockup2} alt='' className='h-[79px] absolute bottom-0 left-0' />
          <div className='font-roboto absolute top-0 text-white font-bold text-[22px] uppercase pt-3 pl-4'>
            {t('Complete quest and get dreams')}
          </div>
          <div className='flex items-center justify-end h-full px-10'>
            <Link
              href='/events/punktober/submit'
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
            <div className='w-full flex lg:justify-end bg-[#DBDBDB] lg:pt-10 lg:sticky lg:top-[82px] pb-5'>
              <TextField
                className='bg-neutral-300 border-none [&_input::placeholder]:!text-text-secondary-on-brand lg:max-w-96'
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
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
              {topicData.story_artworks.map((artwork, index) => (
                <div key={index} className='relative rounded-lg overflow-hidden [&:hover>div]:block'>
                  <Image
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
  )
}
