import Hanz from 'images/authors/hanz.jpg'
import Howater from 'images/authors/howater.png'
import Moffi from 'images/authors/moffi.jpg'
import PhatBear from 'images/authors/phat_bear.jpg'
import TienTranRB from 'images/authors/tien_tran_rb.jpg'
import Uma from 'images/authors/uma.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Slider from 'react-slick'
import Eng from './assets/eng.svg'
import Vn from './assets/vn.svg'
function Carousel({ sliderRef, children, className, setSlideIndex, sliderNavRef }) {
  var settings = {
    infinite: true,
    asNavFor: sliderNavRef.current,
    swipeToSlide: false,
    afterChange: (current) => {
      setSlideIndex(current)
    },
  }
  return (
    <div className={className}>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
    </div>
  )
}
function MobileCarousel({ children, setSlideIndex, sliderRef }) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    arrows: false,
    afterChange: (current) => setSlideIndex(current),
  }
  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  )
}
export const list = [
  {
    comic: {
      image: '/assets/images/comic-banner/hamulage.jpg',
      name: 'Hamulage',
      href: 'https://punkga.me/comic/hamulage_3/chapter/1',
    },
    author: {
      avatar: TienTranRB,
      name: 'TIEN TRAN RB',
    },
  },
  {
    comic: {
      image: '/assets/images/comic-banner/hero_cyberpunk.jpg',
      name: 'Hero Cyberpunk',
      href: 'https://punkga.me/comic/hero_cyberpunk_1/chapter/1',
    },
    author: {
      avatar: Hanz,
      name: 'Hanz',
    },
  },
  {
    comic: {
      image: '/assets/images/comic-banner/heroic.png',
      name: 'Heroic Librarian',
      href: 'https://punkga.me/comic/heroic_librarian_5/chapter/1',
    },
    author: {
      avatar: Howater,
      name: 'Howater',
    },
  },
  {
    comic: {
      image: '/assets/images/comic-banner/the_chaos_of_the_past.jpg',
      name: 'Era Of Chaos',
      href: 'https://punkga.me/comic/era_of_chaos_4/chapter/1',
    },
    author: {
      avatar: PhatBear,
      name: 'Phat Bear',
    },
  },
  {
    comic: {
      image: '/assets/images/comic-banner/ultra_v.jpg',
      name: 'Neon Force',
      href: 'https://punkga.me/comic/neon_force_2/chapter/1',
    },
    author: {
      avatar: Moffi,
      name: 'Moffi',
    },
  },
  {
    comic: {
      image: '/assets/images/comic-banner/errant.jpg',
      name: 'Errannt',
      href: 'https://punkga.me/comic/errant_6/chapter/1',
    },
    author: {
      avatar: Uma,
      name: 'UMA',
    },
  },
]
export default function TaskSlider({ sliderNavRef }) {
  const sliderRef = useRef(null)
  const sliderRefMobile = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  return (
    <>
      <div className='md:hidden h-[460px] mt-[1px] w-screen rounded-b-2xl relative overflow-hidden'>
        <MobileCarousel setSlideIndex={setSlideIndex} sliderRef={sliderRefMobile}>
          {list.map((data, index) => (
            <div className='outline-none [&_*]:outline-none' key={index}>
              <Link href={data.comic.href} className='relative'>
                <Image
                  alt=''
                  width={1920}
                  height={1080}
                  className='w-full h-[460px] object-cover'
                  src={data.comic.image}
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[20px] py-[40px] flex flex-col justify-start '>
                  <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                    New Release
                  </div>
                  <div className='text-white font-bold text-[32px] leading-[40px]'>{data.comic.name}</div>
                  <div className='flex items-center gap-[10px] mt-[5px]'>
                    <div className='flex gap-[5px] items-center'>
                      <Image src={data.author.avatar} alt='' className='w-7 h-7 rounded-full' />
                      <div className='text-white font-semibold text-sm leading-[18px]'>{data.author.name}</div>
                    </div>
                    <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                      <circle cx='2' cy='2' r='2' fill='white' />
                    </svg>
                    <div className='flex gap-[5px] items-center'>
                      <Image src={Eng} alt='' />
                      <div className='text-white font-semibold text-sm leading-[18px]'>English</div>
                    </div>
                    <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                      <circle cx='2' cy='2' r='2' fill='white' />
                    </svg>
                    <div className='flex gap-[5px] items-center'>
                      <Image src={Vn} alt='' />
                      <div className='text-white font-semibold text-sm leading-[18px]'>Vietnamese</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </MobileCarousel>
        <div className='absolute inset-x-5 bottom-10 flex justify-between'>
          <Link
            href={list[slideIndex].comic.href}
            className=' bg-[#23FF81] rounded-[20px] pt-2 pb-[10px] px-6 leading-[20px] w-fit font-bold'>
            Read now
          </Link>
          <div className='flex gap-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
              className='cursor-pointer'
              onClick={() => sliderRefMobile.current.slickGoTo(slideIndex - 1 < 0 ? list.length - 1 : slideIndex - 1)}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.9993 34.8337C27.7439 34.8337 34.8327 27.7448 34.8327 19.0003C34.8327 10.2558 27.7439 3.16699 18.9993 3.16699C10.2548 3.16699 3.16602 10.2558 3.16602 19.0003C3.16602 27.7448 10.2548 34.8337 18.9993 34.8337ZM22.214 13.4106C22.6778 13.8744 22.6778 14.6263 22.214 15.09L18.3037 19.0003L22.214 22.9106C22.6778 23.3744 22.6778 24.1263 22.214 24.59C21.7503 25.0538 20.9984 25.0538 20.5347 24.59L15.7847 19.84C15.3209 19.3763 15.3209 18.6244 15.7847 18.1606L20.5347 13.4106C20.9984 12.9469 21.7503 12.9469 22.214 13.4106Z'
                fill='white'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
              className='cursor-pointer'
              onClick={() => sliderRefMobile.current.slickGoTo(slideIndex + 1 > list.length - 1 ? 0 : slideIndex + 1)}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.9993 34.8337C27.7439 34.8337 34.8327 27.7448 34.8327 19.0003C34.8327 10.2558 27.7439 3.16699 18.9993 3.16699C10.2548 3.16699 3.16602 10.2558 3.16602 19.0003C3.16602 27.7448 10.2548 34.8337 18.9993 34.8337ZM15.7847 13.4106C16.2484 12.9469 17.0003 12.9469 17.464 13.4106L22.214 18.1606C22.6778 18.6244 22.6778 19.3763 22.214 19.84L17.464 24.59C17.0003 25.0538 16.2484 25.0538 15.7847 24.59C15.3209 24.1263 15.3209 23.3744 15.7847 22.9106L19.695 19.0003L15.7847 15.09C15.3209 14.6263 15.3209 13.8744 15.7847 13.4106Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      </div>

      <div className='relative w-full rounded-2xl overflow-hidden hidden md:block'>
        <Carousel sliderRef={sliderRef} setSlideIndex={setSlideIndex} sliderNavRef={sliderNavRef} className=''>
          {list.map((data, index) => (
            <div className='outline-none [&_*]:outline-none' key={index}>
              <Link href={data.comic.href} className='relative'>
                <Image
                  alt=''
                  width={1920}
                  height={1080}
                  className='w-full aspect-[105/46] object-cover'
                  src={data.comic.image}
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[60px] pb-[150px] flex flex-col justify-end'>
                  <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                    New Release
                  </div>
                  <div className='text-white font-bold text-[48px] leading-[60px]'>{data.comic.name}</div>
                  <div className='flex items-center gap-[10px]'>
                    <div className='flex gap-[5px] items-center'>
                      <Image src={data.author.avatar} alt='' className='w-7 h-7 rounded-full' />
                      <div className='text-white font-semibold text-sm leading-[18px]'>{data.author.name}</div>
                    </div>
                    <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                      <circle cx='2' cy='2' r='2' fill='white' />
                    </svg>
                    <div className='flex gap-[5px] items-center'>
                      <Image src={Eng} alt='' />
                      <div className='text-white font-semibold text-sm leading-[18px]'>English</div>
                    </div>
                    <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                      <circle cx='2' cy='2' r='2' fill='white' />
                    </svg>
                    <div className='flex gap-[5px] items-center'>
                      <Image src={Vn} alt='' />
                      <div className='text-white font-semibold text-sm leading-[18px]'>Vietnamese</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
        <div className='absolute inset-x-[60px] bottom-[62px] flex justify-between'>
          <Link
            href={list[slideIndex].comic.href}
            className=' bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
            Read now
          </Link>
          <div className='flex gap-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
              className='cursor-pointer'
              onClick={() => sliderRef.current.slickGoTo(slideIndex - 1 < 0 ? list.length - 1 : slideIndex - 1)}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.9993 34.8337C27.7439 34.8337 34.8327 27.7448 34.8327 19.0003C34.8327 10.2558 27.7439 3.16699 18.9993 3.16699C10.2548 3.16699 3.16602 10.2558 3.16602 19.0003C3.16602 27.7448 10.2548 34.8337 18.9993 34.8337ZM22.214 13.4106C22.6778 13.8744 22.6778 14.6263 22.214 15.09L18.3037 19.0003L22.214 22.9106C22.6778 23.3744 22.6778 24.1263 22.214 24.59C21.7503 25.0538 20.9984 25.0538 20.5347 24.59L15.7847 19.84C15.3209 19.3763 15.3209 18.6244 15.7847 18.1606L20.5347 13.4106C20.9984 12.9469 21.7503 12.9469 22.214 13.4106Z'
                fill='white'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
              className='cursor-pointer'
              onClick={() => sliderRef.current.slickGoTo(slideIndex + 1 > list.length - 1 ? 0 : slideIndex + 1)}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.9993 34.8337C27.7439 34.8337 34.8327 27.7448 34.8327 19.0003C34.8327 10.2558 27.7439 3.16699 18.9993 3.16699C10.2548 3.16699 3.16602 10.2558 3.16602 19.0003C3.16602 27.7448 10.2548 34.8337 18.9993 34.8337ZM15.7847 13.4106C16.2484 12.9469 17.0003 12.9469 17.464 13.4106L22.214 18.1606C22.6778 18.6244 22.6778 19.3763 22.214 19.84L17.464 24.59C17.0003 25.0538 16.2484 25.0538 15.7847 24.59C15.3209 24.1263 15.3209 23.3744 15.7847 22.9106L19.695 19.0003L15.7847 15.09C15.3209 14.6263 15.3209 13.8744 15.7847 13.4106Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
