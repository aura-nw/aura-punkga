import Image from 'next/image'
import Link from 'next/link'
import Background from './assets/task-background.svg'

import Slider from 'react-slick'
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
    appendDots: (dots) => (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '16px',
          right: '26px',
          justifyContent: 'center',
          zIndex: 11,
        }}>
        <ul className='punkga-carousel' style={{ margin: '0px' }}>
          {' '}
          {dots}{' '}
        </ul>
      </div>
    ),
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

function Slide({ url }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='1059'
      height='470'
      viewBox='0 0 1059 470'
      fill='none'>
      <g filter={`url(#filter0_b_3747_60813_${url})`}>
        <path
          d='M38.2692 75.1719V31.9767V10C38.2692 4.47715 42.7464 0 48.2692 0H435.126C437.776 0 440.317 1.0513 442.192 2.92309L456.718 17.4257C458.593 19.2975 461.134 20.3488 463.784 20.3488H977.076C979.726 20.3488 982.267 21.4001 984.142 23.2719L1002.41 41.5121C1004.29 43.3839 1006.83 44.4352 1009.48 44.4352H1049C1054.52 44.4352 1059 48.9123 1059 54.4352V460C1059 465.523 1054.52 470 1049 470H266.614C263.965 470 261.424 468.949 259.549 467.077L245.854 453.405C243.979 451.533 241.438 450.482 238.789 450.482H53.2217C50.5724 450.482 48.0314 449.43 46.1565 447.559L11.2542 412.714C9.37523 410.838 8.31939 408.292 8.31939 405.637V389.014C8.31939 386.359 7.26354 383.813 5.38459 381.937L2.9348 379.492C1.05585 377.616 0 375.07 0 372.415V329.313C0 326.658 1.05584 324.112 2.93479 322.236L14.5359 310.654C16.4149 308.778 17.4707 306.232 17.4707 303.577V104.23C17.4707 101.575 18.5266 99.0288 20.4055 97.153L35.3344 82.2488C37.2134 80.3729 38.2692 77.8269 38.2692 75.1719Z'
          fill={`url(#pattern0_${url})`}
        />
      </g>
      <defs>
        <filter
          id={`filter0_b_3747_60813_${url}`}
          x='-20'
          y='-20'
          width='1099'
          height='510'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'>
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feGaussianBlur in='BackgroundImageFix' stdDeviation='10' />
          <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_3747_63328' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_3747_63328' result='shape' />
        </filter>
        <pattern id={`pattern0_${url}`} patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use xlinkHref={`#image0_3747_60813_${url}`} transform='matrix(0.000651042 0 0 0.00146692 0 -0.626596)' />
        </pattern>
        <image id={`image0_3747_60813_${url}`} width='1536' height='1536' xlinkHref={url} />
      </defs>
    </svg>
  )
}
export default function TaskSlider() {
  return (
    <div className='relative w-full'>
      <Image src={Background} alt='' className='relative z-10 pointer-events-none' />
      <div className='absolute top-0 left-[7px] right-[12px] bottom-[6px] overflow-hidden'>
        <Carousel
          className=''
          setting={{
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
          }}>
          <div className='outline-none [&_*]:outline-none'>
            <Link href='https://punkga.me/comic/hero_cyberpunk_1/chapter/1'>
              <Slide url='/assets/images/comic-banner/hamulage.jpg' />
            </Link>
          </div>
          <div className='outline-none [&_*]:outline-none'>
            <Link href='https://punkga.me/comic/hamulage_3/chapter/1'>
              <Slide url='/assets/images/comic-banner/hero_cyberpunk.jpg' />
            </Link>
          </div>
          <div className='outline-none [&_*]:outline-none'>
            <Link href='https://punkga.me/comic/heroic_librarian_5/chapter/1'>
              <Slide url='/assets/images/comic-banner/heroic.png' />
            </Link>
          </div>
          <div className='outline-none [&_*]:outline-none'>
            <Link href='https://punkga.me/comic/era_of_chaos_4/chapter/1'>
              <Slide url='/assets/images/comic-banner/the_chaos_of_the_past.jpg' />
            </Link>
          </div>
          <div className='outline-none [&_*]:outline-none'>
            <Link href='https://punkga.me/comic/neon_force_2/chapter/1'>
              <Slide url='/assets/images/comic-banner/ultra_v.jpg' />
            </Link>
          </div>
          <div className='outline-none [&_*]:outline-none'>
            <Link href='https://punkga.me/comic/errant_6/chapter/1'>
              <Slide url='/assets/images/comic-banner/errant.jpg' />
            </Link>
          </div>
        </Carousel>
      </div>
    </div>
  )
}
