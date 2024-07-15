import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import Banner from './assets/banner.png'

import BannerEn from 'components/pages/event/assets/banner_en.png'
import BannerVn from 'components/pages/event/assets/banner.png'
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
  const { locale } = useRouter()
  return (
    <>
      <div className='flex flex-col-reverse gap-5'>
        <div className='relative w-full rounded-2xl overflow-hidden hidden md:block'>
          {/* <Carousel sliderNavRef={sliderNavRef} className=''>
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
        </Carousel> */}
        </div>
        <div className='px-5 md:px-0'>
          <div className='mt-5 md:mt-0 rounded-2xl flex flex-col gap-[10px]'>
            <Link
              href='https://docs.google.com/forms/d/e/1FAIpQLSelARRDM8YVrEHRycSfpA1J95_f2PmrvSRqXGVSKXusXla-5A/viewform'
              target='_blank'>
              <Image src={Banner} alt='' className='rounded-2xl w-full aspect-[40/15] object-cover' />
            </Link>
          </div>
          <div className='mt-5'>
            <div className='flex flex-col gap-[10px]'>
              <Link href='/campaigns'>
                <Image
                  src={locale == 'vn' ? BannerVn : BannerEn}
                  alt=''
                  className='rounded-2xl w-full aspect-[40/15] object-cover'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
