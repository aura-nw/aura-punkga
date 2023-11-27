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
import DecorImg2 from './assets/decor-2.svg'
import DecorImg from './assets/decor.svg'
import SlideImage1 from './assets/slide-1.svg'
import SlideImage2 from './assets/slide-2.svg'
import SlideImage3 from './assets/slide-3.svg'
import SPImage from './assets/support.png'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <AboutUs />
}

const slideData = [
  {
    title: 'Platform',
    image: SlideImage1,
    des: 'Nền tảng sáng tác truyện tranh chuyên nghiệp dành cho các hoạ sĩ truyện tranh trong và ngoài nước về một chủ đề chung chính là Cyberpunk.',
  },
  {
    title: 'NFTs ',
    image: SlideImage2,
    des: 'Nền tảng sáng tác truyện tranh chuyên nghiệp dành cho các hoạ sĩ truyện tranh trong và ngoài nước về một chủ đề chung chính là Cyberpunk.',
  },
  {
    title: 'Anime debut',
    image: SlideImage3,
    des: 'Các đầu truyện có lượng fan và cộng đồng lớn có nhiều cơ hội được sản xuất anime',
  },
]

function AboutUs() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [active, setActive] = useState()
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
      <div className='pk-container px-5'>
        <div className='flex gap-4 mt-[50px] items-start'>
          <Image src={DecorImg} alt='' />
          <div className='font-orbitron font-bold uppercase'>
            <div className='text-xl leading-[14px] text-second-color'>Punkga Me</div>
            <div className='text-2xl leading-[30px] mt-5'>is creating a Multiverse of Manga for Vietnamese</div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${BgImage.src})` }}
          className={`mt-5 flex pt-[14px] pl-[7px] gap-[7px] items-start relative bg-no-repeat bg-[length:100%_100%]`}>
          <div className='relative'>
            <div className='text-[10px] leading-[13px] text-[#828282] min-h-[137px]'>
              PUNKGA là một dự án hướng tới việc xây dựng một sân chơi chuyên nghiệp dành cho các họa sĩ truyện tranh
              với chủ đề Cyberpunk. Dự án mục tiêu không chỉ tạo ra các NFT bởi các họa sĩ Manga, mà còn khích lệ sự
              tham gia của cộng đồng thông qua việc chia sẻ và tham gia vào câu chuyện theo nhiều cách khác nhau. Người
              dùng sẽ có cơ hội sở hữu những tác phẩm số hóa độc đáo và tham gia vào quá trình phát triển câu chuyện một
              cách tích cực.
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='196'
              height='25'
              viewBox='0 0 196 25'
              fill='none'
              className='mt-3'>
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
          <Image src={DecorImg2} alt='' className='w-[166px] shrink-0 relative' />
        </div>
      </div>
      <div className='mt-[50px] w-screen overflow-hidden [&_.slick-center_.slide_.stroke]:stroke-second-color [&_.slick-center_.slide_.fill]:fill-second-color [&_.slick-center_.slide_.fill-gray]:fill-[#DEDEDE]'>
        <Slider {...settings}>
          {slideData.map((data, index) => (
            <Slide key={index} data={data} />
          ))}
        </Slider>
      </div>
      <div className='mt-[50px]'>
        <div className='pk-container px-5'>
          <div className='uppercase font-orbitron font-bold text-2xl leading-[17px] text-center text-subtle-dark'>
            Author
          </div>
          <div className='text-sm leading-[18px] text-subtle-dark mt-4 text-center'>
            Meet the skilled and experienced team behind our successful artwork strategies
          </div>
          <div className='mt-5'>
            {authorData[locale].map((d, i) => (
              <Author key={i} active={active} setActive={setActive} data={d} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className='pk-container px-5'>
        <Image src={SPImage} alt='' className='w-full h-auto mt-[50px]' />
      </div>
      <Footer />
    </>
  )
}
const Slide = ({ data }) => {
  return (
    <div className='slide'>
      <div className='relative flex flex-col items-center gap-6 px-[10px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='521'
          height='657'
          viewBox='0 0 521 657'
          fill='none'
          className='w-full h-auto'>
          <path d='M17.4097 149.344L0.533936 165.488V247.364L17.4097 231.219V149.344Z' fill='#292929' />
          <path d='M17.4097 242.174L0.533936 258.991V282.535L17.4097 265.718V242.174Z' fill='#292929' />
          <path d='M17.4097 277.924L0.533936 294.741V318.285L17.4097 301.468V277.924Z' fill='#292929' />
          <path d='M17.4097 313.674L0.533936 330.491V354.035L17.4097 337.218V313.674Z' fill='#292929' />
          <path d='M17.4097 349.422L0.533936 366.239V389.783L17.4097 372.966V349.422Z' fill='#292929' />
          <path d='M185.567 19.938L166.28 1.17383H345.284L325.998 19.938H185.567Z' className='fill' fill='#292929' />
          <path
            d='M0.533936 6.68892V103.938C0.533936 105.72 1.24456 107.427 2.50826 108.683L26.8869 132.906C28.1506 134.162 28.8612 135.869 28.8612 137.651V523.4C28.8612 527.094 25.8665 530.089 22.1723 530.089H9.03098C5.33679 530.089 2.34206 533.083 2.34206 536.778V650.058C2.34206 653.752 5.33681 656.747 9.03099 656.747H513.379C517.073 656.747 520.068 653.752 520.068 650.058V448.234C520.068 444.54 517.073 441.545 513.379 441.545H496.019C492.325 441.545 489.33 438.55 489.33 434.856V176.153C489.33 172.459 492.325 169.464 496.019 169.464H513.379C517.073 169.464 520.068 166.469 520.068 162.775V10.7936C520.068 7.0994 517.073 4.10467 513.379 4.10467H364.875C363.133 4.10467 361.46 4.78442 360.211 5.99932L337.587 28.0108C336.338 29.2257 334.665 29.9054 332.922 29.9054H176.228C174.486 29.9054 172.812 29.2257 171.564 28.0108L144.72 1.89465C143.472 0.679751 141.798 0 140.056 0H7.22286C3.52867 0 0.533936 2.99473 0.533936 6.68892Z'
            className='fill-gray'
            fill='#F2F2F2'
          />
        </svg>
        <div className='absolute inset-x-12 top-12'>
          <div className='text-center text-2xl leading-[30px] font-orbitron font-bold uppercase text-[#292929]'>
            {data.title}
          </div>
          <div className='mb-5 mt-3 px-2 relative'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='356'
              height='303'
              viewBox='0 0 356 303'
              fill='none'
              className='w-full h-auto'>
              <path d='M10.1111 40.299V10.707H46.7192' className='stroke' stroke='#ABABAB' stroke-width='19.6565' />
              <path d='M345.217 40.299V10.707H308.609' className='stroke' stroke='#ABABAB' stroke-width='19.6565' />
              <path d='M10.1111 263.377V292.969H46.7192' className='stroke' stroke='#ABABAB' stroke-width='19.6565' />
              <path d='M345.217 263.377V292.969H308.609' className='stroke' stroke='#ABABAB' stroke-width='19.6565' />
            </svg>
            <div className='absolute inset-0 grid place-items-center'>
              <Image src={data.image} alt='' className='w-[100px] h-auto' />
            </div>
          </div>
          <div className='text-xs leading-[15px] text-[#292929]'>{data.des}</div>
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
            {data.avatar ? (
              <Image src={data.avatar} alt='' className='w-12 h-12 rounded-md object-cover' />
            ) : (
              <div className='w-12 h-12 rounded-md bg-second-color'></div>
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
      <div className={`transition-all overflow-hidden ${active == index ? 'max-h-[500px] ' : 'max-h-[0px]'}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='340'
          height='171'
          viewBox='0 0 340 171'
          className='mt-3'
          fill='none'>
          <path
            d='M85.134 164.633L85.4214 164.633L85.6649 164.481L90.6446 161.361C91.7585 160.663 93.0463 160.293 94.3607 160.293L262.959 160.293C264.273 160.293 265.561 160.663 266.675 161.361L277.5 168.143L278.031 167.295L277.5 168.143C278.933 169.04 280.588 169.516 282.278 169.516L327.907 169.516C329.597 169.516 331.253 169.04 332.685 168.143L332.154 167.295L332.685 168.143L334.778 166.832C337.405 165.186 339 162.304 339 159.205L339 11.8265C339 8.72675 337.405 5.84511 334.778 4.19949L332.685 2.88857C331.253 1.99143 329.597 1.51563 327.907 1.51563L177.495 1.51563C175.805 1.51563 174.149 1.99143 172.717 2.88859L168.819 5.33012C167.705 6.0279 166.418 6.39797 165.103 6.39797L70.9792 6.39798C69.6648 6.39798 68.377 6.02791 67.2631 5.33012L63.3656 2.88859C61.9335 1.99144 60.2777 1.51564 58.5877 1.51564L23.3504 1.51564C21.6604 1.51564 20.0046 1.99144 18.5725 2.88859L11.284 7.45439L11.8148 8.30185L11.284 7.45441C8.65704 9.10001 7.06185 11.9816 7.06185 15.0815L7.06185 90.0764C7.06185 91.9572 6.09396 93.7056 4.50005 94.7041C2.32238 96.0683 0.999997 98.4571 0.999997 101.027L0.999999 153.237C0.999999 156.337 2.59519 159.219 5.22212 160.864L9.04674 163.26C10.4789 164.157 12.1347 164.633 13.8246 164.633L85.134 164.633Z'
            fill={`url(#pattern${index})`}
            stroke='#ABABAB'
            stroke-width='2'
          />
          <defs>
            <pattern id={`pattern${index}`} patternContentUnits='objectBoundingBox' width='1' height='1'>
              <use xlinkHref={`#image_${index}`} transform='matrix(0 0.000247812 -0.000500643 0 1.07699 -0.00751877)' />
            </pattern>
            <image id={`image_${index}`} width='4096' height='2305' xlinkHref={data.avatar.src} />
          </defs>
        </svg>
        <ul className={`list-disc text-xs md:text-lg pt-3 mt-3 pl-2 list-inside  border-t border-[#DEDEDE]`}>
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
