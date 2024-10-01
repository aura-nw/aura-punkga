import Howater from 'images/authors/howater.png'
import Next from 'images/icons/arrow-next.svg'
import Prev from 'images/icons/arrow-prev.svg'
import Image from 'next/image'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { useState } from 'react'
import Select from 'components/Select'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function NFTsList({ collections }: { collections: any[] }) {
  const { locale } = useRouter()
  console.log(collections)
  const [selected, setSelected] = useState({
    key: collections?.[0]?.slug,
    value: collections?.[0]?.name?.[locale],
  })
  if (!collections?.length) return null
  return (
    <div className='w-full px-5 container relative'>
      <div className='flex justify-between items-center pt-3'>
        <div>
          <Select
            options={collections.map((collection) => ({
              key: collection.slug,
              value: collection.name[locale],
            }))}
            selected={selected}
            onChange={setSelected}
          />
        </div>
        <Link
          href={`/collections/${selected.key}`}
          className='font-bold rounded-[20px] grid place-items-center h-10 px-6 border-[2px] border-second-color text-second-color'>
          View detail
        </Link>
      </div>
      <div className='swiper_container h-auto pt-10 pb-8 px-6 relative z-5'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'disabled_swiper_button',
            hiddenClass: 'hidden_swiper_button',
          }}
          coverflowEffect={{
            slideShadows: false,
            rotate: 20,
            scale: 0.8,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className='z-10 relative'>
          {collections
            .find((c) => selected.key == c.slug)
            .images.map((image, index) => (
              <SwiperSlide className='max-w-[200px]' key={index}>
                <Image src={image} alt='' width={200} height={200} className='rounded-2xl object-cover' />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className='slider-controler z-20 absolute top-full left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-7 '>
          <div className='swiper-button-prev slider-arrow flex items-center justify-center'>
            <Image src={Prev} alt='' width={24} height={24} />
          </div>
          <div className='swiper-pagination relative !mt-0 space-x-1'></div>
          <div className='swiper-button-next slider-arrow flex items-center justify-center'>
            <Image src={Next} alt='' width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  )
}
