import getConfig from 'next/config'
import Link from 'next/link'
import WowYourselfImage from 'components/pages/event/assets/allEvents/wow-yourself.png'
import KaiaEventImage from 'components/pages/event/assets/allEvents/Kaia.png'
import KaiaEventImageVN from 'components/pages/event/assets/allEvents/Kaia-vn.png'
import PudgyEventImage from 'components/pages/event/assets/allEvents/Pudgy.png'
import AvaEventImage from 'components/pages/event/assets/allEvents/ava.png'
import PunktoberEventImage from 'components/pages/event/assets/allEvents/punktober.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import { Skeleton } from '@mui/material'
const events = [
  {
    url: '/events/your-city',
    isLive: true,
    en: {
      image: PunktoberEventImage,
      title: `Your City`,
      subtitle: `14 Dec 2024 - 13 Jan 2025`,
    },
    vn: {
      image: AvaEventImage,
      title: `AVA Grand Contest 2024`,
      subtitle: `14/12/2024 - 13/01/2025`,
    },
  },
  {
    url: '/events/ava-2024',
    isLive: false,
    en: {
      image: AvaEventImage,
      title: `AVA Grand Contest 2024`,
      subtitle: `12 Oct 2024 - 17 Nov 2024`,
    },
    vn: {
      image: AvaEventImage,
      title: `AVA Grand Contest 2024`,
      subtitle: `12/10/2024 - 12/11/2024`,
    },
  },
  {
    url: '/events/pudgy-asia-tour',
    isLive: false,
    en: {
      image: PudgyEventImage,
      title: `Pudgy Asia Tour`,
      subtitle: `01 Aug 2024 - 4 Sep 2024`,
    },
    vn: {
      image: PudgyEventImage,
      title: `Pudgy Asia Tour`,
      subtitle: `01/08/2024 - 04/09/2024`,
    },
  },
  {
    url: '/events/kaia-island',
    isLive: false,
    en: {
      image: KaiaEventImage,
      title: `Kaia's Island Mythology Record`,
      subtitle: `17 Jul 2024 - 13 Aug 2024`,
    },
    vn: {
      image: KaiaEventImageVN,
      title: `Ghi chép về truyền thuyết đảo Kaia`,
      subtitle: `17/07/2024 - 13/08/2024`,
    },
  },
  {
    url: '/events/wow-yourself',
    isLive: false,
    en: {
      image: WowYourselfImage,
      title: `WOW yourself`,
      subtitle: `03 Jun 2024 - 30 Jun 2024`,
    },
    vn: {
      image: WowYourselfImage,
      title: `WOW yourself`,
      subtitle: `03/06/2024 - 30/06/2024`,
    },
  },
]
export default function MobileVersion() {
  const config = getConfig()
  return (
    <main className='bg-neutral-black py-4 text-white'>
      <div className='space-y-4'>
        <Link
          href={config.ADMIN_URL}
          className='flex items-center gap-2 text-text-info-primary text-sm font-medium px-4'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3.33398 12.6703V15.7437C3.33398 16.2095 3.50958 16.6562 3.82214 16.9856C4.1347 17.315 4.55862 17.5 5.00065 17.5H15.0007C15.4427 17.5 15.8666 17.315 16.1792 16.9856C16.4917 16.6562 16.6673 16.2095 16.6673 15.7437V12.6703M10.0013 12.4521L10.0013 2.5M10.0013 2.5L6.19175 6.30265M10.0013 2.5L13.8108 6.30265'
              className='stroke-current'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Upload your manga or artwork</span>
        </Link>
        <div className=''>
          <Swiper slidesPerView='auto' slidesOffsetBefore={16} slidesOffsetAfter={16} spaceBetween={16}>
            {events.map((event, index) => (
              <SwiperSlide key={index} className='!h-[97px] !w-[143px] rounded-md overflow-hidden'>
                <Link href={event.url} target='_blank'>
                  <Image src={event.en.image} alt='' className='w-full h-full object-cover' />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='p-4 space-y-8'>
          {events.map((e, index) => (
            <div key={index} className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full bg-gray-300' />
                <div className='space-y-1'>
                  <div className='text-sm font-semibold text-text-brand-focus'>Artist Name</div>
                  <div className='text-xxs text-neutral-400'>4m ago</div>
                </div>
              </div>
              <div>
                <div className='text-lg font-medium'>Manga Name</div>
                <div className='space-y-1.5'>
                  <div className='text-sm line-clamp-2'>
                    Start with a present-tense statement about yourself. If you're not sure how to begin, simply Start
                    with a present-tense statement about yourself. If you're not sure how to begin, simply...
                  </div>
                  <div className='text-text-info-primary text-sm font-medium'>View more</div>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='w-full aspect-square bg-neutral-400 rounded-md'></div>
                <div className='text-xs font-semibold text-neutral-400 leading-8'>20 likes</div>
                <div className='h-8 flex items-center justify-between'>
                  <div className='flex items-center gap-1 text-sm font-semibold'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M3.17115 5.17232C3.92126 4.42244 4.93849 4.00118 5.99915 4.00118C7.0598 4.00118 8.07703 4.42244 8.82714 5.17232L9.99914 6.34332L11.1711 5.17232C11.5401 4.79028 11.9815 4.48555 12.4695 4.27592C12.9575 4.06628 13.4824 3.95594 14.0135 3.95132C14.5447 3.94671 15.0714 4.04791 15.563 4.24904C16.0545 4.45016 16.5012 4.74717 16.8767 5.12274C17.2523 5.49832 17.5493 5.94492 17.7504 6.43651C17.9516 6.92809 18.0528 7.45481 18.0481 7.98593C18.0435 8.51705 17.9332 9.04193 17.7235 9.52994C17.5139 10.018 17.2092 10.4593 16.8271 10.8283L9.99914 17.6573L3.17115 10.8283C2.42126 10.0782 2 9.06098 2 8.00032C2 6.93967 2.42126 5.92244 3.17115 5.17232V5.17232Z'
                        stroke='#F6F6F6'
                        strokeWidth='1.5'
                        strokeLinejoin='round'
                      />
                    </svg>
                    Like
                  </div>
                  <div className='flex items-center gap-1 text-sm font-semibold'>
                    View all chapters
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M10 7L15 12L10 17'
                        stroke='white'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
