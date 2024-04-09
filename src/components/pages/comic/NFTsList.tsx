import Howater from 'images/authors/howater.png';
import Next from 'images/icons/arrow-next.svg';
import Prev from 'images/icons/arrow-prev.svg';
import Image from 'next/image';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function NFTsList() {
  return (
    <div className="w-full px-6 container relative">
      <div className="flex justify-between items-center"></div>
      <div className="swiper_container h-auto min-h-[400px] py-8 px-6 relative z-5">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'disabled_swiper_button',
            hiddenClass: 'hidden_swiper_button',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="z-10 relative"
        >
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="max-w-[200px]">
            <Image
              src={Howater}
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className="slider-controler z-20 absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center">
          <div className="swiper-button-prev slider-arrow flex items-center justify-center">
            <Image src={Prev} alt="" width={24} height={24} />
          </div>
          <div className="swiper-button-next slider-arrow flex items-center justify-center">
            <Image src={Next} alt="" width={24} height={24} />
          </div>

          <div className="swiper-pagination relative w-20 bottom-4"></div>
        </div>
      </div>
    </div>
  );
}
