import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'

import Banner from './assets/banner.png'
import Event from './assets/event-mission.png'
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
                  className='w-full aspect-[40/15]  object-cover'
                  src={data.comic.image}
                />
              </Link>
            </div>
          ))}
        </Carousel>
        {/* <Link href='/campaigns'>
          <Image src={Event} alt='' className='rounded-[10px] w-full aspect-[40/15] object-cover' />
        </Link> */}
      </div>
      <div className='px-5 md:px-0'>
        <div className='mt-5 rounded-2xl flex flex-col gap-[10px]'>
          <Link
            href='https://docs.google.com/forms/d/e/1FAIpQLSelARRDM8YVrEHRycSfpA1J95_f2PmrvSRqXGVSKXusXla-5A/viewform'
            target='_blank'>
            <Image src={Banner} alt='' className='rounded-[10px] w-full aspect-[40/15] object-cover' />
          </Link>
        </div>
      </div>
    </>
  )
}
