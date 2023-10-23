import Image from 'next/image'
import Frame from './assets/frame.svg'
import Slider from 'react-slick'
import Link from 'next/link'
import Banner from './assets/banner.png'
function Slide({ url }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='462'
      height='206'
      viewBox='0 0 462 206'
      className='w-full h-full'
      fill='none'>
      <g filter={`url(#filter0_b_3747_60813_${url})`}>
        <path
          d='M445.305 30.6464V10.1272C445.305 4.6312 440.847 0.175781 435.348 0.175781H274.487C271.849 0.175781 269.318 1.22244 267.451 3.08586L264.39 6.14124C262.523 8.00467 259.992 9.05133 257.354 9.05133H38.0555C35.4171 9.05133 32.8865 10.098 31.0196 11.9614L26.3253 16.647C24.4584 18.5104 21.9278 19.5571 19.2893 19.5571H9.9569C4.45784 19.5571 0 24.0125 0 29.5085V195.224C0 200.72 4.45784 205.176 9.9569 205.176H343.371C346.01 205.176 348.54 204.129 350.407 202.266L353.105 199.573C354.972 197.709 357.503 196.662 360.141 196.662H436.466C439.104 196.662 441.635 195.616 443.502 193.752L455.45 181.827C457.32 179.96 458.371 177.427 458.371 174.786V170.607C458.371 168.966 459.023 167.392 460.185 166.232C461.347 165.072 462 163.499 462 161.857V146.129C462 143.488 460.949 140.955 459.079 139.088L457.299 137.311C455.429 135.445 454.378 132.911 454.378 130.27V47.9548C454.378 45.3133 453.327 42.7801 451.457 40.9135L448.226 37.6878C446.355 35.8212 445.305 33.288 445.305 30.6464Z'
          fill={`url(#pattern0_${url})`}
        />
      </g>
      <defs>
        <filter
          id={`filter0_b_3747_60813_${url}`}
          x='-20'
          y='-19.8242'
          width='502'
          height='245'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'>
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feGaussianBlur in='BackgroundImageFix' stdDeviation='10' />
          <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_3772_29422' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_3772_29422' result='shape' />
        </filter>
        <pattern id={`pattern0_${url}`} patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use xlinkHref={`#image0_3747_60813_${url}`} transform='matrix(0.000651042 0 0 0.00146723 0 -0.626829)' />
        </pattern>
        <image id={`image0_3747_60813_${url}`} width='1536' height='1536' xlinkHref={url} />
      </defs>
    </svg>
  )
}
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

export default function SlideSection() {
  return (
    <div className='relative mb-[60px]'>
      <Image src={Frame} alt='' />
      <div className='absolute top-[7%] left-[5%] right-[0%] bottom-[15%]'>
        <Carousel
          className='w-[91%]'
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
        <Image src={Banner} alt='' className='ml-[10%] w-[83%] mt-1' />
        <div className='relative w-[38%] ml-auto -mt-[1%] mr-[7%]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='190'
            height='57'
            viewBox='0 0 190 57'
            fill='none'
            className='w-full h-full'>
            <path
              d='M0 23.0336V10.1758C0 4.65293 4.47715 0.175781 10 0.175781H170.858C173.51 0.175781 176.054 1.22935 177.929 3.10471L186.929 12.1047C190.834 16.01 190.834 22.3416 186.929 26.2468L159.929 53.2468C158.054 55.1222 155.51 56.1758 152.858 56.1758H33.1421C30.49 56.1758 27.9464 55.1222 26.0711 53.2468L2.92893 30.1047C1.05357 28.2293 0 25.6858 0 23.0336Z'
              fill='#23FF81'
            />
          </svg>
          <span className='absolute inset-0 grid place-items-center font-semibold'>Go to quests</span>
        </div>
      </div>
    </div>
  )
}
