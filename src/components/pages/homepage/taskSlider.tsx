import Image from 'next/image'
import Link from 'next/link'
import Hanz from 'images/authors/hanz.jpg'
import Howater from 'images/authors/howater.png'
import Moffi from 'images/authors/moffi.jpg'
import PhatBear from 'images/authors/phat_bear.jpg'
import TienTranRB from 'images/authors/tien_tran_rb.jpg'
import Uma from 'images/authors/uma.jpg'
import Slider from 'react-slick'
import Eng from './assets/eng.svg'
import Vn from './assets/vn.svg'
function Carousel({ children, setting, className }: any) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    appendDots: (dots) => <></>,
    customPaging: (i) => (
      <div
        style={{
          background: '#ababab',
          width: 8,
          height: 5,
          borderRadius: '10px',
        }}></div>
    ),
    ...setting,
  }
  return (
    <div className={className}>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default function TaskSlider() {
  return (
    <div className='relative w-full rounded-2xl overflow-hidden'>
      <Carousel
        className=''
        setting={{
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
        }}>
        <div className='outline-none [&_*]:outline-none'>
          <Link href='https://punkga.me/comic/hamulage_3/chapter/1' className='relative'>
            <Image
              alt=''
              width={1920}
              height={1080}
              className='w-full aspect-[108/46] object-cover'
              src='/assets/images/comic-banner/hamulage.jpg'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[100px] py-[86px] flex flex-col justify-end'>
              <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                New Release
              </div>
              <div className='text-white font-bold text-[48px] leading-[60px]'>Hamulage</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex gap-[5px] items-center'>
                  <Image src={TienTranRB} alt='' className='w-7 h-7 rounded-full' />
                  <div className='text-white font-semibold text-sm leading-[18px]'>TIEN TRAN RB</div>
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
              <div className='mt-10 bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
                Read now
              </div>
            </div>
          </Link>
        </div>
        <div className='outline-none [&_*]:outline-none'>
          <Link href='https://punkga.me/comic/hero_cyberpunk_1/chapter/1' className='relative'>
            <Image
              alt=''
              width={1920}
              height={1080}
              className='w-full aspect-[108/46]  object-cover'
              src='/assets/images/comic-banner/hero_cyberpunk.jpg'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[100px] py-[86px] flex flex-col justify-end'>
              <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                New Release
              </div>
              <div className='text-white font-bold text-[48px] leading-[60px]'>Hero Cyberpunk</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex gap-[5px] items-center'>
                  <Image src={Hanz} alt='' className='w-7 h-7 rounded-full' />
                  <div className='text-white font-semibold text-sm leading-[18px]'>Hanz</div>
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
              <div className='mt-10 bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
                Read now
              </div>
            </div>
          </Link>
        </div>
        <div className='outline-none [&_*]:outline-none'>
          <Link href='https://punkga.me/comic/heroic_librarian_5/chapter/1' className='relative'>
            <Image
              alt=''
              width={1920}
              height={1080}
              className='w-full aspect-[108/46]  object-cover'
              src='/assets/images/comic-banner/heroic.png'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[100px] py-[86px] flex flex-col justify-end'>
              <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                New Release
              </div>
              <div className='text-white font-bold text-[48px] leading-[60px]'>Heroic Librarian</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex gap-[5px] items-center'>
                  <Image src={Howater} alt='' className='w-7 h-7 rounded-full' />
                  <div className='text-white font-semibold text-sm leading-[18px]'>Howater</div>
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
              <div className='mt-10 bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
                Read now
              </div>
            </div>
          </Link>
        </div>
        <div className='outline-none [&_*]:outline-none'>
          <Link href='https://punkga.me/comic/era_of_chaos_4/chapter/1' className='relative'>
            <Image
              alt=''
              width={1920}
              height={1080}
              className='w-full aspect-[108/46]  object-cover'
              src='/assets/images/comic-banner/the_chaos_of_the_past.jpg'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[100px] py-[86px] flex flex-col justify-end'>
              <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                New Release
              </div>
              <div className='text-white font-bold text-[48px] leading-[60px]'>Era Of Chaos</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex gap-[5px] items-center'>
                  <Image src={PhatBear} alt='' className='w-7 h-7 rounded-full' />
                  <div className='text-white font-semibold text-sm leading-[18px]'>Phat Bear</div>
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
              <div className='mt-10 bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
                Read now
              </div>
            </div>
          </Link>
        </div>
        <div className='outline-none [&_*]:outline-none'>
          <Link href='https://punkga.me/comic/neon_force_2/chapter/1' className='relative'>
            <Image
              alt=''
              width={1920}
              height={1080}
              className='w-full aspect-[108/46]  object-cover'
              src='/assets/images/comic-banner/ultra_v.jpg'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[100px] py-[86px] flex flex-col justify-end'>
              <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                New Release
              </div>
              <div className='text-white font-bold text-[48px] leading-[60px]'>Neon Force</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex gap-[5px] items-center'>
                  <Image src={Moffi} alt='' className='w-7 h-7 rounded-full' />
                  <div className='text-white font-semibold text-sm leading-[18px]'>Moffi</div>
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
              <div className='mt-10 bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
                Read now
              </div>
            </div>
          </Link>
        </div>
        <div className='outline-none [&_*]:outline-none'>
          <Link href='https://punkga.me/comic/errant_6/chapter/1' className='relative'>
            <Image
              alt=''
              width={1920}
              height={1080}
              className='w-full aspect-[108/46]  object-cover'
              src='/assets/images/comic-banner/errant.jpg'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none px-[100px] py-[86px] flex flex-col justify-end'>
              <div className='bg-[#23FF81] rounded-[20px] py-[3px] px-3 text-sm leading-[18px] w-fit font-semibold'>
                New Release
              </div>
              <div className='text-white font-bold text-[48px] leading-[60px]'>Errannt</div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex gap-[5px] items-center'>
                  <Image src={Uma} alt='' className='w-7 h-7 rounded-full' />
                  <div className='text-white font-semibold text-sm leading-[18px]'>UMA</div>
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
              <div className='mt-10 bg-[#23FF81] rounded-[20px] py-3 px-8 leading-[25px] w-fit font-bold text-xl'>
                Read now
              </div>
            </div>
          </Link>
        </div>
      </Carousel>
    </div>
  )
}
