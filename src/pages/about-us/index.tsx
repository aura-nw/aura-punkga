import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FbIcon from 'images/Facebook.svg'
import BeIcon from 'images/behance.svg'
import FemaleIcon from 'images/icons/female.svg'
import MaleIcon from 'images/icons/male.svg'
import IgIcon from 'images/instagram.svg'
import { i18n, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Slider from 'react-slick'
import { authorData } from '../../utils/authorData'
import BgImage from './assets/bg.png'
import BgImage2 from './assets/bg-2.png'
import DecorImg2 from './assets/decor-2.svg'
import DecorImg3 from './assets/decor-3.png'
import DecorImg from './assets/decor.svg'
import SlideImage1 from './assets/slide-1.svg'
import SlideImage2 from './assets/slide-2.svg'
import SlideImage3 from './assets/slide-3.svg'
import SPImage from './assets/support.svg'
import SPImage2 from './assets/support-2.svg'
import Link from 'next/link'
import { isMobile } from 'react-device-detect'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <AboutUs />
}

const slideData = [
  {
    title: 'Platform',
    image: <Image src={SlideImage1} alt='' className='w-[59%] h-auto' />,
    des: 'A professional comic creation platform for comic artists both domestically and internationally on a common theme, which is Cyberpunk',
  },
  {
    title: 'NFTs ',
    image: <Image src={SlideImage2} alt='' className='w-[69%] h-aut0' />,
    des: 'Opportunity to own limited-edition NFTs created by Manga Creators themselves',
  },
  {
    title: 'Anime debut',
    image: <Image src={SlideImage3} alt='' className='w-[69%] h-aut0' />,
    des: 'Popular manga series with a large fanbase and community have a higher chance of being adapted into anime',
  },
]
function AboutUs() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [active, setActive] = useState(isMobile ? null : 0)
  const settings = {
    className: '[.center_.slick-center_.slide_.stroke]:stroke-second-color',
    centerMode: true,
    infinite: true,
    centerPadding: '50px',
    speed: 500,
  }
  return (
    <>
      <Header />
      <div className='mx-auto max-w-[1360px]'>
        <div className='pk-container px-5 lg:px-0'>
          <div className='flex gap-4 lg:gap-16 mt-[50px] lg:mt-24 items-start'>
            <Image src={DecorImg} alt='' className='lg:h-[294px] lg:w-auto' />
            <div className='font-bold '>
              <div className='uppercase font-masgistral text-xl leading-[14px] text-second-color lg:mt-10 lg:text-6xl  2xl:mt-16 2xl:text-[72px] 2xl:leading-[90px] whitespace-nowrap'>
                Punkga.Me
              </div>
              <div className='text-2xl leading-[30px] mt-5 lg:text-4xl 2xl:text-[48px] 2xl:leading-[60px] lg:max-w-[45vw]'>
                {locale == 'vn'
                  ? 'đang tạo ra một đa vũ trụ truyện tranh cho người Việt'
                  : 'is creating a Multiverse of Manga for Vietnamese'}
              </div>
            </div>
            <Image src={DecorImg3} alt='' className='hidden lg:block w-[43%] 2xl:min-h-[550px] 2xl:mt-10' />
          </div>
          <div
            style={{ backgroundImage: isMobile ? `url(${BgImage.src})` : `url(${BgImage2.src})` }}
            className={`mt-5 2xl:-mt-28 lg:-mt-7 flex pt-[14px] pl-[7px] gap-[7px] items-start relative bg-no-repeat bg-[length:100%_100%] lg:px-[100px] lg:py-[50px] lg:pb-24`}>
            <div className='relative'>
              <div className='text-[8px] min-[425px]:text-[10px] leading-[13px] text-[#828282] min-h-[137px] lg:text-lg lg:leading-[24px] lg:max-w-[690px] lg:w-[38vw]'>
                {locale == 'vn'
                  ? 'PUNKGA là một dự án hướng tới việc xây dựng một sân chơi chuyên nghiệp dành cho các họa sĩ truyện tranh với chủ đề Cyberpunk. Dự án mục tiêu không chỉ tạo ra các NFT bởi các họa sĩ Manga, mà còn khích lệ sự tham gia của cộng đồng thông qua việc chia sẻ và tham gia vào câu chuyện theo nhiều cách khác nhau. Người dùng sẽ có cơ hội sở hữu những tác phẩm số hóa độc đáo và tham gia vào quá trình phát triển câu chuyện một cách tích cực.'
                  : "PUNKGA is a project aimed at building a professional playground for comic artists with a Cyberpunk theme. The project's goal is not only to create NFTs by Manga artists but also to encourage community participation through sharing and involvement in the story in various ways. Users will have the opportunity to own unique digital artworks and actively participate in the development of the story."}
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='196'
                height='25'
                viewBox='0 0 196 25'
                fill='none'
                className='mt-3 lg:absolute lg:-top-[5.5rem] lg:w-[420px] lg:h-auto w-[150px] min-[425px]:w-auto'>
                <path
                  d='M170.878 24.1232H141.092H136.389L150.106 10.4061H159.12L168.526 1H194.001L170.878 24.1232Z'
                  stroke='#292929'
                />
                <path
                  d='M125.415 24.1232H95.6288H90.9258L104.643 10.4061H113.657L123.063 1H148.538L125.415 24.1232Z'
                  fill='#292929'
                />
                <path
                  d='M79.9518 24.1232H50.1659H45.4629L59.1801 10.4061H68.1942L77.6003 1H103.075L79.9518 24.1232Z'
                  fill='#292929'
                />
                <path
                  d='M34.4889 24.1232H4.70303H0L13.7172 10.4061H22.7313L32.1374 1H57.6121L34.4889 24.1232Z'
                  fill='#292929'
                />
              </svg>
            </div>
            <div className='w-[166px] shrink-0 relative lg:absolute lg:w-[33%] lg:right-24 lg:bottom-[70%]'>
              <Image src={DecorImg2} alt='' className='w-full h-full' />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='210'
                viewBox='0 0 16 210'
                fill='none'
                className='hidden lg:block absolute bottom-[55%] -right-16'>
                <path d='M15 0L1 14V85L15 71V0Z' fill='#292929' />
                <path d='M15 80.5L1 95.0833V115.5L15 100.917V80.5Z' fill='#292929' />
                <path d='M15 111.5L1 126.083V146.5L15 131.917V111.5Z' fill='#292929' />
                <path d='M15 142.5L1 157.083V177.5L15 162.917V142.5Z' stroke='#292929' />
                <path d='M15 173.5L1 188.083V208.5L15 193.917V173.5Z' stroke='#292929' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='245'
                height='42'
                viewBox='0 0 245 42'
                fill='none'
                className='hidden lg:block absolute bottom-5 right-1/2 translate-x-1/2'>
                <path
                  d='M27.0651 0.0429688L0 41.8382H26.4281L53.4934 0.0429688H27.0651ZM45.4932 4.19719C42.1897 9.29065 24.9555 35.8778 23.8013 37.684H7.96032C11.2639 32.5905 28.498 6.00338 29.6523 4.19719H45.4932Z'
                  fill='#565656'
                />
                <path
                  d='M65.2342 0.0429688L38.1692 41.8382H64.5975L91.6626 0.0429688H65.2342ZM83.6624 4.19719C80.3589 9.29065 63.125 35.8778 61.9707 37.684H46.1694C49.4729 32.5905 66.707 6.00338 67.8613 4.19719H83.6624Z'
                  fill='#565656'
                />
                <path
                  d='M103.403 0.0429688L76.3383 41.8382H102.767L129.832 0.0429688H103.403ZM121.831 4.19719C118.528 9.29065 101.294 35.8778 100.14 37.684H84.2986C87.6021 32.5905 104.836 6.00338 105.991 4.19719H121.831Z'
                  fill='#565656'
                />
                <path
                  d='M141.615 0.0429688L114.55 41.8382H140.979L168.044 0.0429688H141.615ZM160.043 4.19719C156.74 9.29065 139.506 35.8778 138.352 37.684H122.51C125.814 32.5905 143.048 6.00338 144.202 4.19719H160.043Z'
                  fill='#565656'
                />
                <path
                  d='M179.784 0.0429688L152.719 41.8382H179.148L206.213 0.0429688H179.784ZM198.212 4.19719C194.909 9.29065 177.675 35.8778 176.521 37.684H160.719C164.023 32.5905 181.257 6.00338 182.411 4.19719H198.252H198.212Z'
                  fill='#565656'
                />
                <path
                  d='M217.954 0.0429688L190.888 41.8382H217.317L244.382 0.0429688H217.954ZM236.382 4.19719C233.078 9.29065 215.844 35.8778 214.69 37.684H198.889C202.192 32.5905 219.426 6.00338 220.581 4.19719H236.382Z'
                  fill='#565656'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='mt-[50px] xl:hidden w-screen overflow-hidden [&_.slick-center_.slide_.stroke]:stroke-second-color [&_.slick-center_.slide_.fill]:fill-second-color [&_.slick-center_.slide_.fill-gray]:fill-[#DEDEDE] [&_.slick-center_.slide_.fill-gray]:stroke-primary-color'>
          <Slider {...settings}>
            {slideData.map((data, index) => (
              <div key={index} className='px-3'>
                <Slide data={data} />
              </div>
            ))}
          </Slider>
        </div>
        <div className='hidden xl:block pk-container'>
          <div className='mt-[180px] flex justify-between [&_.slide]:cursor-pointer [&_.slide:hover_.stroke]:stroke-second-color [&_.slide:hover_.fill]:fill-second-color [&_.slide:hover_.fill-gray]:fill-[#DEDEDE] [&_.slide:hover_.fill-gray]:stroke-primary-color'>
            {slideData.map((data, index) => (
              <Slide key={index} data={data} />
            ))}
          </div>
        </div>
        <div className='mt-[50px] lg:mt-[160px]'>
          <div className='pk-container px-5'>
            <div className='uppercase font-masgistral font-medium text-2xl leading-[17px] text-center text-subtle-dark lg:text-[#292929] lg:text-[48px]'>
              {t('Authors')}
            </div>
            <div className='text-sm leading-[18px] text-subtle-dark mt-4 text-center lg:text-2xl lg:text-[#ABABAB] lg:mt-8 lg:max-w-[545px] lg:mx-auto'>
              {t('Meet the skilled and experienced team behind our successful artwork strategies')}
            </div>
            <div className='mt-5 lg:hidden'>
              {authorData[locale].map((d, i) => (
                <Author key={i} active={active} setActive={setActive} data={d} index={i} />
              ))}
            </div>
            <div className='hidden lg:flex gap-10 mt-24'>
              <div className='w-1/2'>
                {authorData[locale].map((data, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center border-b cursor-pointer p-5 rounded-2xl ${
                      active != index ? 'border-b-[#DEDEDE]' : 'bg-[#F2F2F2] '
                    }`}
                    onClick={() => setActive(index)}>
                    <div className='flex items-center gap-5'>
                      <div className=''>
                        {data?.avatar ? (
                          <Image src={data?.avatar} alt='' className='w-20 h-20 object-cover rounded-[10px]' />
                        ) : (
                          <div className='w-20 h-20 rounded-lg bg-second-color'></div>
                        )}
                      </div>
                      <div>
                        <div className='font-semibold leading-[23px] text-[#292929] text-[18px] flex items-center gap-2'>
                          {data.nickname}
                          <span>
                            <Image
                              src={data.gender.toLowerCase() == 'male' ? MaleIcon : FemaleIcon}
                              alt=''
                              className='w-6'
                            />
                          </span>
                        </div>
                        <div className='mt-2 text-[#1FAB5E]'>{data.name}</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex gap-4 items-center'>
                        {data.socialLink.fb && (
                          <Image
                            src={FbIcon}
                            alt=''
                            className='w-[32px] h-[32px]'
                            onClick={() => window.open(data.socialLink.fb)}
                          />
                        )}
                        {data.socialLink.be && (
                          <Image
                            src={BeIcon}
                            alt=''
                            className='w-[32px] h-[32px]'
                            onClick={() => window.open(data.socialLink.be)}
                          />
                        )}
                        {data.socialLink.ig && (
                          <Image
                            src={IgIcon}
                            alt=''
                            className='w-[32px] h-[32px]'
                            onClick={() => window.open(data.socialLink.ig)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='w-1/2'>
                <div className={`transition-all `}>
                  <div className='flex gap-8'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      width='306'
                      height='306'
                      viewBox='0 0 306 306'
                      className='w-[300px] h-[300px]'
                      fill='none'>
                      <mask id='svgmask'>
                        <path
                          d='M1.5 283.392L1.5 283.912L1.82221 284.321L10.3274 295.105L10.7778 295.676L11.5052 295.676L77.2268 295.676L77.9542 295.676L78.4046 295.105L84.1397 287.833L237.324 287.833L250.018 303.929L250.469 304.5L251.196 304.5L296.041 304.5L296.769 304.5L297.219 303.929L304.178 295.105L304.5 294.697L304.5 294.176L304.5 11.8235L304.5 11.3032L304.178 10.8946L297.219 2.07112L296.769 1.49999L296.041 1.49999L157.639 1.49999L156.912 1.49999L156.461 2.07113L149.953 10.3235L63.2634 10.3235L56.7551 2.07113L56.3047 1.5L55.5773 1.5L20.0103 1.5L19.2829 1.5L18.8325 2.07114L7.23457 16.777L6.91236 17.1855L6.91236 17.7059L6.91237 167.186L1.82221 173.64L1.49999 174.048L1.49999 174.569L1.5 283.392Z'
                          stroke='#ABABAB'
                          strokeWidth='3'
                          fill='#fff'
                        />
                      </mask>
                      <image
                        className='w-full'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        xlinkHref={`${authorData[locale].at(active)?.avatar.src}`}
                        mask='url(#svgmask)'></image>
                      <path
                        d='M1.5 283.392L1.5 283.912L1.82221 284.321L10.3274 295.105L10.7778 295.676L11.5052 295.676L77.2268 295.676L77.9542 295.676L78.4046 295.105L84.1397 287.833L237.324 287.833L250.018 303.929L250.469 304.5L251.196 304.5L296.041 304.5L296.769 304.5L297.219 303.929L304.178 295.105L304.5 294.697L304.5 294.176L304.5 11.8235L304.5 11.3032L304.178 10.8946L297.219 2.07112L296.769 1.49999L296.041 1.49999L157.639 1.49999L156.912 1.49999L156.461 2.07113L149.953 10.3235L63.2634 10.3235L56.7551 2.07113L56.3047 1.5L55.5773 1.5L20.0103 1.5L19.2829 1.5L18.8325 2.07114L7.23457 16.777L6.91236 17.1855L6.91236 17.7059L6.91237 167.186L1.82221 173.64L1.49999 174.048L1.49999 174.569L1.5 283.392Z'
                        stroke='#ABABAB'
                        strokeWidth='3'
                      />
                    </svg>
                    <div>
                      <div className=' text-[#292929] text-[32px] gap-5 font-bold leading-10'>
                        <span className='mr-5'>{authorData[locale].at(active).name}</span>
                        <Image
                          src={authorData[locale].at(active).gender.toLowerCase() == 'male' ? MaleIcon : FemaleIcon}
                          alt=''
                          className='w-[32px] h-[32px] inline'
                        />
                      </div>
                      <div className='text-[#61646B] font-semibold left-5'>
                        {authorData[locale].at(active).nickname}
                      </div>
                    </div>
                  </div>
                  <div className=''>
                    <ul className={`list-disc text-base pt-5 mt-5 pl-2 list-inside  border-t border-[#DEDEDE]`}>
                      {authorData[locale].at(active).bio.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href='mailto:support@punkga.me'>
          <div className='pk-container px-5'>
            <Image src={SPImage2} alt='' className='w-full h-auto mt-[50px] lg:mt-40 hidden lg:block' />
            <Image src={SPImage} alt='' className='w-full h-auto mt-[50px] lg:mt-20 lg:hidden' />
          </div>
        </Link>
      </div>
      <Footer />
    </>
  )
}
const Slide = ({ data }) => {
  const { t } = useTranslation()

  return (
    <div className='slide'>
      <div className='relative w-fit mx-auto'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='380'
          height='480'
          viewBox='0 0 380 480'
          fill='none'
          className='w-full h-full max-w-[320px] xl:max-w-[380px]'>
          <path d='M12.3434 109.15L0 120.95V180.791L12.3434 168.991V109.15Z' fill='#292929' />
          <path d='M12.3434 176.998L0 189.289V206.497L12.3434 194.206V176.998Z' fill='#292929' />
          <path d='M12.3434 203.126L0 215.417V232.625L12.3434 220.334V203.126Z' fill='#292929' />
          <path d='M12.3434 229.255L0 241.546V258.754L12.3434 246.463V229.255Z' fill='#292929' />
          <path d='M12.3434 255.383L0 267.674V284.882L12.3434 272.591V255.383Z' fill='#292929' />
          <path d='M135.864 13.7143L121.757 0H252.685L238.579 13.7143H135.864Z' fill='#292929' className='fill' />
          <path
            d='M0 6.68892V75.2153C0 76.9976 0.711316 78.7062 1.97611 79.962L18.7432 96.6094C20.0079 97.8652 20.7193 99.5738 20.7193 101.356V380.74C20.7193 384.434 17.7245 387.429 14.0303 387.429H6.68892C2.99473 387.429 0 390.423 0 394.117V473.311C0 477.005 2.99474 480 6.68893 480H373.311C377.005 480 380 477.005 380 473.311V329.403C380 325.709 377.005 322.714 373.311 322.714H364.206C360.512 322.714 357.517 319.72 357.517 316.025V130.546C357.517 126.852 360.512 123.857 364.206 123.857H373.311C377.005 123.857 380 120.862 380 117.168V6.68892C380 2.99473 377.005 0 373.311 0H270.051C268.295 0 266.61 0.690244 265.358 1.92179L247.057 19.9354C245.806 21.1669 244.12 21.8571 242.365 21.8571H129.235C127.494 21.8571 125.821 21.1781 124.573 19.9642L105.984 1.8929C104.736 0.679074 103.063 0 101.322 0H6.68892C2.99473 0 0 2.99473 0 6.68892Z'
            fill='#F2F2F2'
            className='fill-gray'
          />
        </svg>
        <div className='absolute inset-0 grid place-items-center'>
          <div className=''>
            <div className='relative xl:pt-5 mb-4 pt-9 mx-auto text-center text-2xl leading-[30px] font-masgistral font-bold uppercase text-[#292929] xl:text-[38px] xl:leading-[47px]'>
              {t(data.title)}
            </div>
            <div className='relative flex flex-col items-center'>
              <div className='relative '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='230'
                  height='230'
                  viewBox='0 0 230 230'
                  fill='none'
                  className='w-[100px] h-[100px] min-[425px]:w-[200px] min-[425px]:h-[200px] xl:h-auto xl:w-auto'>
                  <path d='M10 32.0161V10H32.9411' stroke='#ABABAB' className='stroke' strokeWidth='19.6565' />
                  <path d='M220 32.0161V10H197.059' stroke='#ABABAB' className='stroke' strokeWidth='19.6565' />
                  <path d='M10 197.984V220H32.9411' stroke='#ABABAB' className='stroke' strokeWidth='19.6565' />
                  <path d='M220 197.984V220H197.059' stroke='#ABABAB' className='stroke' strokeWidth='19.6565' />
                </svg>
                <div className='absolute inset-0 grid place-items-center'>{data.image}</div>
              </div>
              <div className='text-xs leading-[15px] text-[#292929] lg:text-sm min-h-[60px] mx-auto  min-[425px]:max-w-[250px] max-w-[180px] mt-5'>
                {t(data.des)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const Author = ({ data, active, setActive, index }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <div className={`rounded-lg p-3  border-b border-[#DEDEDE] ${active != index ? 'rounded' : 'bg-[#F2F2F2]'}`}>
      <div
        className='flex justify-between items-center'
        onClick={() => (active == index ? setActive() : setActive(index))}>
        <div className='flex items-center gap-4'>
          <div className=''>
            {data?.avatar ? (
              <Image src={data?.avatar} alt='' className='w-12 h-12 rounded-lg object-cover' />
            ) : (
              <div className='w-12 h-12 rounded-lg bg-second-color'></div>
            )}
          </div>
          <div>
            <div className='font-bold leading-[18px] text-[#414141] text-sm flex items-center gap-2'>
              {data.nickname}
              <span>
                <Image src={data.gender.toLowerCase() == 'male' ? MaleIcon : FemaleIcon} alt='' className='w-6' />
              </span>
            </div>
            <div className='leading-[15px] text-[#ABABAB] text-xs'>{data.name}</div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center'>
            {data.socialLink.fb && <Image src={FbIcon} alt='' onClick={() => window.open(data.socialLink.fb)} />}
            {data.socialLink.be && <Image src={BeIcon} alt='' onClick={() => window.open(data.socialLink.be)} />}
            {data.socialLink.ig && <Image src={IgIcon} alt='' onClick={() => window.open(data.socialLink.ig)} />}
          </div>
          <ChevronDownIcon className={`w-5 ${active == index ? 'rotate-180' : 'rotate-0'} transition-all`} />
        </div>
      </div>
      <div className={`transition-all overflow-hidden ${active == index ? 'max-h-[1000px] ' : 'max-h-[0px]'}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='340'
          height='171'
          viewBox='0 0 340 171'
          className='mt-3 w-full'
          fill='none'>
          <mask id={`svgmask${index}`} className='w-full'>
            <path
              d='M85.134 164.633L85.4214 164.633L85.6649 164.481L90.6446 161.361C91.7585 160.663 93.0463 160.293 94.3607 160.293L262.959 160.293C264.273 160.293 265.561 160.663 266.675 161.361L277.5 168.143L278.031 167.295L277.5 168.143C278.933 169.04 280.588 169.516 282.278 169.516L327.907 169.516C329.597 169.516 331.253 169.04 332.685 168.143L332.154 167.295L332.685 168.143L334.778 166.832C337.405 165.186 339 162.304 339 159.205L339 11.8265C339 8.72675 337.405 5.84511 334.778 4.19949L332.685 2.88857C331.253 1.99143 329.597 1.51563 327.907 1.51563L177.495 1.51563C175.805 1.51563 174.149 1.99143 172.717 2.88859L168.819 5.33012C167.705 6.0279 166.418 6.39797 165.103 6.39797L70.9792 6.39798C69.6648 6.39798 68.377 6.02791 67.2631 5.33012L63.3656 2.88859C61.9335 1.99144 60.2777 1.51564 58.5877 1.51564L23.3504 1.51564C21.6604 1.51564 20.0046 1.99144 18.5725 2.88859L11.284 7.45439L11.8148 8.30185L11.284 7.45441C8.65704 9.10001 7.06185 11.9816 7.06185 15.0815L7.06185 90.0764C7.06185 91.9572 6.09396 93.7056 4.50005 94.7041C2.32238 96.0683 0.999997 98.4571 0.999997 101.027L0.999999 153.237C0.999999 156.337 2.59519 159.219 5.22212 160.864L9.04674 163.26C10.4789 164.157 12.1347 164.633 13.8246 164.633L85.134 164.633Z'
              stroke='#ABABAB'
              fill='#fff'
              strokeWidth='2'
            />
          </mask>
          <image
            className='w-full'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            xlinkHref={`${data?.avatar.src}`}
            mask={`url(#svgmask${index})`}></image>
          <path
            d='M85.134 164.633L85.4214 164.633L85.6649 164.481L90.6446 161.361C91.7585 160.663 93.0463 160.293 94.3607 160.293L262.959 160.293C264.273 160.293 265.561 160.663 266.675 161.361L277.5 168.143L278.031 167.295L277.5 168.143C278.933 169.04 280.588 169.516 282.278 169.516L327.907 169.516C329.597 169.516 331.253 169.04 332.685 168.143L332.154 167.295L332.685 168.143L334.778 166.832C337.405 165.186 339 162.304 339 159.205L339 11.8265C339 8.72675 337.405 5.84511 334.778 4.19949L332.685 2.88857C331.253 1.99143 329.597 1.51563 327.907 1.51563L177.495 1.51563C175.805 1.51563 174.149 1.99143 172.717 2.88859L168.819 5.33012C167.705 6.0279 166.418 6.39797 165.103 6.39797L70.9792 6.39798C69.6648 6.39798 68.377 6.02791 67.2631 5.33012L63.3656 2.88859C61.9335 1.99144 60.2777 1.51564 58.5877 1.51564L23.3504 1.51564C21.6604 1.51564 20.0046 1.99144 18.5725 2.88859L11.284 7.45439L11.8148 8.30185L11.284 7.45441C8.65704 9.10001 7.06185 11.9816 7.06185 15.0815L7.06185 90.0764C7.06185 91.9572 6.09396 93.7056 4.50005 94.7041C2.32238 96.0683 0.999997 98.4571 0.999997 101.027L0.999999 153.237C0.999999 156.337 2.59519 159.219 5.22212 160.864L9.04674 163.26C10.4789 164.157 12.1347 164.633 13.8246 164.633L85.134 164.633Z'
            stroke='#ABABAB'
            strokeWidth='2'
          />
        </svg>
        <ul className={`list-disc text-xs lg:text-lg pt-3 mt-3 pl-2 list-inside  border-t border-[#DEDEDE]`}>
          {data.bio.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
