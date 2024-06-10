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
import c1 from './assets/comics/hamulage.jpg'
import c2 from './assets/comics/hero_cyberpunk.png'
import c3 from './assets/comics/heroic.png'
import c4 from './assets/comics/the_chaos_of_the_past.jpg'
import c5 from './assets/comics/ultra_v.jpg'
import c6 from './assets/comics/errant.jpg'
import c7 from './assets/comics/Do_you_want.png'
import c8 from './assets/comics/Hoc_vien_phep_thuat.jpg'
import c9 from './assets/comics/Lost.jpg'
import c10 from './assets/comics/Normal_day.png'
import c11 from './assets/comics/Yes_I_do.jpg'
import c12 from './assets/comics/Yidra.jpg'
import c13 from './assets/comics/Still_the_same.png'
import c14 from './assets/comics/robots_dogs_time.jpg'
import c15 from './assets/comics/noah.png'
import c16 from './assets/comics/la_thu_cuoi_cung.jpeg'
import c17 from './assets/comics/gio_thoi.jpeg'
import c18 from './assets/comics/the_darkness_secret.png'
import c19 from './assets/comics/htx.png'
import c20 from './assets/comics/we_trainers_we_fight.jpg'
import c21 from './assets/comics/normal_days.png'
import Avalook from './assets/authors/avalook.webp'
import DangBao from './assets/authors/DangBao.webp'
import H3 from './assets/authors/H3.webp'
import MiniPeace from './assets/authors/MiniPeace.webp'
import Sherlox from './assets/authors/Sherlox.jpg'
import DaisyBlue from './assets/authors/DaisyBlue.webp'
import Miroles from './assets/authors/Miroles.webp'
import NgocBe from './assets/authors/ngoc_be.jpg'
import Miyuki from './assets/authors/miyuki.webp'
import Grey from './assets/authors/grey.webp'
import EventBanner from './assets/event-banner.png'
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
      image: c21,
      name: 'Normal Days',
      href: 'https://punkga.me/comic/normal-days-25/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Sherlox,
        name: 'Sherlox',
      },
    ],
  },
  {
    comic: {
      image: c20,
      name: 'We Trainers We Fight!',
      href: 'https://punkga.me/comic/we-trainers-we-fight-24/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Grey,
        name: 'Grey',
      },
    ],
  },
  {
    comic: {
      image: c19,
      name: 'Hoa Lac Thanh Xuan',
      href: 'https://punkga.me/comic/hoa-lac-thanh-23/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Grey,
        name: 'Grey',
      },
    ],
  },
  {
    comic: {
      image: c18,
      name: 'The Darkness Secret',
      href: 'https://punkga.me/comic/the-darkness-secret-22/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Miyuki,
        name: 'Miyuki',
      },
    ],
  },
  {
    comic: {
      image: c2,
      name: 'Hero Cyberpunk',
      href: 'https://punkga.me/comic/hero_cyberpunk_1/chapter/3',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Hanz,
        name: 'Hanz',
      },
    ],
  },
  {
    comic: {
      image: c17,
      name: 'The wind blows',
      href: 'https://punkga.me/comic/the-wind-blows-21/chapter/1',
      isOneShot: false,
      isNewRelease: true,
    },
    author: [
      {
        avatar: NgocBe,
        name: 'Ngọc Bé',
      },
    ],
  },
  {
    comic: {
      image: c16,
      name: '[OneShot] The last letter',
      href: 'https://punkga.me/comic/the-last-letter-20/chapter/1',
      isOneShot: false,
      isNewRelease: true,
    },
    author: [
      {
        avatar: NgocBe,
        name: 'Ngọc Bé',
      },
    ],
  },
  {
    comic: {
      image: c14,
      name: '[One Shot] Robots, Dogs & Time',
      href: 'https://punkga.me/comic/oneshot-robots-dogs-time-19/chapter/1',
      isOneShot: false,
      isNewRelease: true,
    },
    author: [
      {
        avatar: Miroles,
        name: 'Miroles',
      },
    ],
  },
  {
    comic: {
      image: c15,
      name: 'The NOAH Game',
      href: 'https://punkga.me/comic/the-noah-game-18/chapter/1',
      isOneShot: false,
      isNewRelease: true,
    },
    author: [
      {
        avatar: Hanz,
        name: 'Hanz',
      },
      {
        avatar: Howater,
        name: 'Howater',
      },
    ],
  },
  {
    comic: {
      image: c13,
      name: '[One Shot] Still the same',
      href: 'https://punkga.me/comic/one-shot-still-the-same-17/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: MiniPeace,
        name: 'Mini Peace',
      },
    ],
  },
  {
    comic: {
      image: c9,
      name: '[One Shot] Lost',
      href: 'https://punkga.me/comic/lost-15/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: H3,
        name: 'H3',
      },
    ],
  },
  {
    comic: {
      image: c11,
      name: '[One Shot] Yes I do',
      href: 'https://punkga.me/comic/yes-i-do-16/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: H3,
        name: 'H3',
      },
    ],
  },
  {
    comic: {
      image: c7,
      name: 'Do you want',
      href: 'https://punkga.me/comic/do-you-want-11/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Avalook,
        name: 'Avalook',
      },
    ],
  },
  {
    comic: {
      image: c8,
      name: 'Học viện phép thuật',
      href: 'https://punkga.me/comic/alvies-academy-12/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: DangBao,
        name: 'Đăng Bảo',
      },
    ],
  },

  {
    comic: {
      image: c10,
      name: "[One Shot] I'm Not A Hero",
      href: 'https://punkga.me/comic/oneshot-i-m-not-a-hero-10/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Sherlox,
        name: 'Sher lox',
      },
    ],
  },

  {
    comic: {
      image: c12,
      name: 'Yidra',
      href: 'https://punkga.me/comic/yidra-13/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: DaisyBlue,
        name: 'Daisy Blue',
      },
    ],
  },
  {
    comic: {
      image: c1,
      name: 'Hamulage',
      href: 'https://punkga.me/comic/hamulage_3/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: TienTranRB,
        name: 'TIEN TRAN RB',
      },
    ],
  },

  {
    comic: {
      image: c3,
      name: 'Heroic Librarian',
      href: 'https://punkga.me/comic/heroic_librarian_5/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Howater,
        name: 'Howater',
      },
    ],
  },
  {
    comic: {
      image: c4,
      name: 'Era Of Chaos',
      href: 'https://punkga.me/comic/era_of_chaos_4/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: PhatBear,
        name: 'Phat Bear',
      },
    ],
  },
  {
    comic: {
      image: c5,
      name: 'Neon Force',
      href: 'https://punkga.me/comic/neon_force_2/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Moffi,
        name: 'Moffi',
      },
    ],
  },
  {
    comic: {
      image: c6,
      name: 'Errannt',
      href: 'https://punkga.me/comic/errant_6/chapter/1',
      isNewRelease: true,
    },
    author: [
      {
        avatar: Uma,
        name: 'UMA',
      },
    ],
  },
]
export default function TaskSlider({ sliderNavRef }) {
  const sliderRef = useRef(null)
  const sliderRefMobile = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  return (
    <Link
      href='https://www.facebook.com/PunkgaMeManga/posts/pfbid0DSbBV83x5J94cMiPSjknY3NCWekJ9nKVMdSTJnzrBHFEJr3texFbMRwyhvQ7browl'
      target='_blank'>
      <div className='md:hidden px-5 pt-5'>
        <Image src={EventBanner} alt='' className='w-full object-cover aspect-[84/32] rounded-2xl' />
      </div>
      <Image
        src={EventBanner}
        alt=''
        className='hidden md:block w-full object-cover aspect-[84/32] rounded-2xl'
      />
    </Link>
  )
  return (
    <>
      <div className='md:hidden mt-[1px] w-screen relative overflow-hidden aspect-[9/4]'>
        <MobileCarousel setSlideIndex={setSlideIndex} sliderRef={sliderRefMobile}>
          {list.map((data, index) => (
            <div className='outline-none [&_*]:outline-none' key={index}>
              <Link href={data.comic.href} className='relative'>
                <Image alt='' width={1920} height={1080} className='w-full object-contain' src={data.comic.image} />
                <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[20px] py-4 sm:py-[40px] flex flex-col justify-start '>
                  <div className='flex gap-2'>
                    {data.comic.isNewRelease && (
                      <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-xs sm:text-sm w-fit leading-[18px] font-semibold whitespace-nowrap'>
                        New Release
                      </div>
                    )}
                    {data.comic.isOneShot && (
                      <div className='bg-[#8a23ff] text-white rounded-[20px] py-[3px] px-3 text-xs sm:text-sm w-fit leading-[18px] font-semibold whitespace-nowrap'>
                        One Shot
                      </div>
                    )}
                  </div>
                  <div className='text-white font-bold text-[20px] sm:text-[32px] leading-[40px]'>
                    {data.comic.name}
                  </div>
                  <div className='flex flex-col items-start gap-[10px] mt-[5px]'>
                    <div className='flex gap-[5px] items-center'>
                      {data.author.map((author, index) => {
                        const isLastAuthor = index === data.author.length - 1

                        return (
                          <div className='flex gap-[5px] items-center' key={index}>
                            <Image src={author.avatar} alt='' className='w-7 h-7 rounded-full' />
                            <div className='text-white font-semibold text-sm leading-[18px]'>{author.name}</div>
                            {!isLastAuthor && (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='4'
                                height='4'
                                viewBox='0 0 4 4'
                                fill='none'>
                                <circle cx='2' cy='2' r='2' fill='white' />
                              </svg>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {/* <div className='flex gap-[5px] items-center'>
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
                        </div> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </MobileCarousel>
        <div className='absolute inset-x-5 bottom-2 flex justify-between'>
          <Link
            href={list[slideIndex].comic.href}
            className='bg-[#23FF81] rounded-[20px] py-1 px-4 text-sm leading-[12px] w-fit font-bold'>
            Read now
          </Link>
          <div className='flex gap-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
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
              width='24'
              height='24'
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
                  <div className='flex gap-2'>
                    {data.comic.isNewRelease && (
                      <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm w-fit leading-[18px] font-semibold whitespace-nowrap'>
                        New Release
                      </div>
                    )}
                    {data.comic.isOneShot && (
                      <div className='bg-[#8a23ff] text-white rounded-[20px] py-[3px] px-3 text-sm w-fit leading-[18px] font-semibold whitespace-nowrap'>
                        One Shot
                      </div>
                    )}
                  </div>
                  <div className='text-white font-bold text-[48px] leading-[60px]'>{data.comic.name}</div>
                  <div className='flex items-center gap-[10px]'>
                    {data.author.map((author, index) => (
                      <div key={index}>
                        <div className='flex gap-[5px] items-center'>
                          <Image src={author.avatar} alt='' className='w-7 h-7 rounded-full' />
                          <div className='text-white font-semibold text-sm leading-[18px]'>{author.name}</div>
                        </div>
                        <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                          <circle cx='2' cy='2' r='2' fill='white' />
                        </svg>
                      </div>
                    ))}
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
        <div className='absolute inset-x-[40px] bottom-[32px] flex justify-between'>
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
