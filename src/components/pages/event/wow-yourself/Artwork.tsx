import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image1 from './assets/AVT phụ.png'
import Image2 from './assets/AVT.png'
import Image3 from './assets/BANNER TRI AN FINAL BLACK AND WHITE 3.png'
import Image4 from './assets/Rô con.png'
import Image5 from './assets/WOW CA CHEP PNG.png'
import Image6 from './assets/mas.png'
import Image7 from './assets/rô base.png'
import Image8 from './assets/rô line.png'
import Image9 from './assets/rô phác.png'
import Image10 from './assets/rô v2 viền.png'
import Image11 from './assets/rô.png'
import Image12 from './assets/typo new 1.png'
import Image13 from './assets/typo new bút.png'
import Image14 from './assets/Round 1/Banner Summer 2.png'
import Image15 from './assets/Round 1/Bản xanh.png'
import Image16 from './assets/Round 1/Run Round 1 banner.png'
import Image17 from './assets/Round 1/Twitter post - vong 1.png'
import Image18 from './assets/Round 1/post fb vong 1.png'
import Image19 from './assets/Round 2/WoW Banner V2.png'
import Image20 from './assets/Round 2/group chat.png'
import Image21 from './assets/Round 2/run phase 2.png'
import Image22 from './assets/Round 3/Banner V3 . 2.png'
import Image23 from './assets/Round 3/Banner V3 e.png'
import Image24 from './assets/Round 3/giải thưởng chung cuộc.png'
import Image from 'next/image'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
export default function Artwork() {
  const { t } = useTranslation()
  return (
    <div className='mt-9 lg:mt-16'>
      <h1 className='font-bold lg:text-xl'>{t('Artworks')}</h1>
      <div className='mt-4 lg:mt-6 flex items-center gap-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='37'
          height='36'
          viewBox='0 0 37 36'
          fill='none'
          className='shrink-0 cursor-pointer swiper-prev mr-5 hidden md:block'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M23.7321 6.64586C24.2039 7.05021 24.2585 7.76042 23.8542 8.23216L15.4817 18L23.8542 27.7679C24.2585 28.2396 24.2039 28.9498 23.7321 29.3542C23.2604 29.7585 22.5502 29.7039 22.1458 29.2322L13.1458 18.7322C12.7847 18.3109 12.7847 17.6892 13.1458 17.2679L22.1458 6.76788C22.5502 6.29614 23.2604 6.24151 23.7321 6.64586Z'
            fill='#61646B'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M23.7321 6.64586C24.2039 7.05021 24.2585 7.76042 23.8542 8.23216L15.4817 18L23.8542 27.7679C24.2585 28.2396 24.2039 28.9498 23.7321 29.3542C23.2604 29.7585 22.5502 29.7039 22.1458 29.2322L13.1458 18.7322C12.7847 18.3109 12.7847 17.6892 13.1458 17.2679L22.1458 6.76788C22.5502 6.29614 23.2604 6.24151 23.7321 6.64586Z'
            fill='black'
            fillOpacity='0.2'
          />
        </svg>
        <div className='w-full'>
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            loop
            className='[&>div]:items-center'
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}>
            <SwiperSlide>
              <Image src={Image1} alt='Image1' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image2} alt='Image2' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image3} alt='Image3' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image4} alt='Image4' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image5} alt='Image5' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image6} alt='Image6' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image7} alt='Image7' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image8} alt='Image8' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image9} alt='Image9' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image10} alt='Image10' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image11} alt='Image11' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image12} alt='Image12' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image13} alt='Image13' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image14} alt='Image14' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image15} alt='Image15' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image16} alt='Image16' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image17} alt='Image17' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image18} alt='Image18' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image19} alt='Image19' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image20} alt='Image20' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image21} alt='Image21' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image22} alt='Image22' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image23} alt='Image23' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={Image24} alt='Image24' className='mx-auto w-auto h-auto max-h-[80vh]' />
            </SwiperSlide>
          </Swiper>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='37'
          height='36'
          viewBox='0 0 37 36'
          fill='none'
          className='shrink-0 cursor-pointer swiper-next ml-5  hidden md:block'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.2679 6.64586C13.7396 6.24151 14.4498 6.29614 14.8542 6.76788L23.8542 17.2679C24.2153 17.6892 24.2153 18.3109 23.8542 18.7322L14.8542 29.2322C14.4498 29.7039 13.7396 29.7585 13.2679 29.3542C12.7961 28.9498 12.7415 28.2396 13.1459 27.7679L21.5183 18L13.1459 8.23216C12.7415 7.76042 12.7961 7.05021 13.2679 6.64586Z'
            fill='#61646B'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.2679 6.64586C13.7396 6.24151 14.4498 6.29614 14.8542 6.76788L23.8542 17.2679C24.2153 17.6892 24.2153 18.3109 23.8542 18.7322L14.8542 29.2322C14.4498 29.7039 13.7396 29.7585 13.2679 29.3542C12.7961 28.9498 12.7415 28.2396 13.1459 27.7679L21.5183 18L13.1459 8.23216C12.7415 7.76042 12.7961 7.05021 13.2679 6.64586Z'
            fill='black'
            fillOpacity='0.2'
          />
        </svg>
      </div>
    </div>
  )
}
