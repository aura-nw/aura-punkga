import HeroBannerMobileVN from 'components/pages/event/assets/allEvents/hero-banner-mobile-vn.png'
import HeroBannerMobile from 'components/pages/event/assets/allEvents/hero-banner-mobile.png'
import HeroBannerVN from 'components/pages/event/assets/allEvents/hero-banner-vn.png'
import HeroBanner from 'components/pages/event/assets/allEvents/hero-banner.png'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { eventService } from 'src/services/eventService'
import useSWR from 'swr'

export default function EventPage() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const { data } = useSWR('get-all-contest', eventService.getAll)
  const events = data?.data?.data?.contest
  return (
    <div className='bg-background text-white py-8'>
      <div className='pk-container'>
        <div className=''>
          <Image
            src={locale == 'vn' ? HeroBannerMobileVN : HeroBannerMobile}
            alt=''
            className='w-full h-auto object-cover rounded-mlg overflow-hidden md:hidden'
          />
          <Image
            src={locale == 'vn' ? HeroBannerVN : HeroBanner}
            alt=''
            className='w-full h-auto object-cover overflow-hidden hidden md:block'
          />
        </div>
        <div>
          <div className='text-lg font-medium mt-4 md:mt-8'>{t('Events')}</div>
          <div className='mt-4 grid grid-cols-1 md:gap-8 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {events?.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className='rounded-mlg p-4 bg-neutral-black relative'>
                <div className='relative'>
                  {event.image && (
                    <Image
                      src={event.image}
                      width={400}
                      height={400}
                      alt=''
                      className='w-full aspect-[310/166] object-cover rounded-md overflow-hidden'
                    />
                  )}
                  {event.isLive && (
                    <div className='absolute top-2.5 right-2.5 text-xxs font-semibold leading-[15px] bg-error-100 text-text-error-primary-3 flex items-center gap-1 rounded px-2.5 py-0.5'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                        <circle cx='2' cy='2' r='2' fill='#F73B3B' />
                      </svg>
                      Live
                    </div>
                  )}
                </div>
                <div className='mt-4'>
                  <div className='text-sm font-medium'>{event.title}</div>
                  <div className='mt-1 text-xs text-text-quatenary font-medium'>
                    {`${moment(event.start_date).format('MMM DD, YYYY')} - ${moment(event.end_date).format(
                      'MMM DD, YYYY'
                    )}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
