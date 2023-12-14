import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'

import Banner from './assets/banner.png'
import { list } from './comicSlider'
function Carousel({ children, className, sliderNavRef }) {
  var settings = {
    swipeToSlide: false,
  }
  return (
    <div className={className}>
      <Slider ref={sliderNavRef} {...settings}>
        {children}
      </Slider>
    </div>
  )
}

export default function SlideSection({ sliderNavRef }) {
  return (
    <>
      <div className='relative w-full rounded-2xl overflow-hidden hidden md:block'>
        <Carousel sliderNavRef={sliderNavRef} className=''>
          {[...list.slice(1), list[0]].map((data, index) => (
            <div key={index} className='outline-none [&_*]:outline-none'>
              <Link href={data.comic.href} className='relative'>
                <Image
                  alt=''
                  width={1920}
                  height={1080}
                  className='w-full aspect-[52/22]  object-cover'
                  src={data.comic.image}
                />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <div className='px-5 md:px-0'>
        <div className='mt-5 rounded-2xl bg-[#F0F0F0] p-[10px] flex flex-col gap-[10px]'>
          <div>
            <Image src={Banner} alt='' className='rounded-[10px] w-full aspect-[5/2] object-cover' />
          </div>
        </div>
      </div>
    </>
  )
}
