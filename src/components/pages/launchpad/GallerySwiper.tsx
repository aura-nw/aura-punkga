import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { useState } from 'react'
import Image from 'next/image'
import { LeftButton, RightButton } from 'components/NavButtons'
export default function GallerySwiper({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <div>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Navigation]}
        navigation={{
          nextEl: '.button-next',
          prevEl: '.button-prev',
        }}
        className='mySwiper2'>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt=''
              width={446}
              height={446}
              className='rounded-mlg border border-border-teriary w-full aspect-square object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='relative px-4'>
        <div className='absolute top-1/2 -translate-y-1/2 left-0 z-10 button-prev'>
          <LeftButton />
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={16}
          slidesPerView={'auto'}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper mt-4 [&_.swiper-slide-thumb-active_.outline-div]:border-[3px] [&_.swiper-slide-thumb-active_.outline-div]:border-green-500'>
          {images.map((image, index) => (
            <SwiperSlide key={index} className='!w-[120px] !h-[120px] rounded-mlg'>
              <Image
                src={image}
                alt=''
                width={446}
                height={446}
                className='rounded-mlg w-full aspect-square object-cover'
              />
              <div className='outline-div absolute inset-0 border border-border-teriary rounded-mlg'></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute top-1/2 -translate-y-1/2 right-0 z-10 button-next'>
          <RightButton />
        </div>
      </div>
    </div>
  )
}
