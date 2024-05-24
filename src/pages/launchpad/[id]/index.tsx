import Layout from '../components/layout'
import LiveChip from '../assets/live-chip.png'
import Image from 'next/image'
import Backdrop7 from '../assets/backdrop-7.png'
import Backdrop8 from '../assets/backdrop-8.png'
import GrayBar from '../assets/gray-bar.png'
import RedBlock from '../assets/red-block.svg'
import YellowBlock from '../assets/yellow-block.svg'
import GreenBlock from '../assets/green-block.svg'
import BlueBlock from '../assets/blue-block.svg'
import MintButton from '../assets/mint-button.svg'
import MintAmount from '../assets/mint-amount.svg'
import DummyImage from '../assets/dummy-image-2.png'
import SwiperNav from '../assets/swiper-nav.svg'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useState } from 'react'
import Modal from '../components/modal'
export default function Page() {
  const [tab, setTab] = useState(1)
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='flex flex-col gap-[18px] text-2xl leading-[22px]'>
        <div>
          <div className='flex items-center gap-4'>
            <div className='text-5xl text-primary-color leading-[43px] uppercase'>Heroic Librarian - Embrace hope</div>
            <Image src={LiveChip} alt='' />
          </div>
          <div className='flex'>
            <div className='w-[134px] text-2xl'>Creator:</div>
            <div className='w-[134px] text-2xl text-primary-color'>0x1231...123123</div>
          </div>
        </div>
        <div className='flex gap-3'>
          <div
            style={{ backgroundImage: `url(${Backdrop7.src})`, backgroundSize: '100% 100%' }}
            className='w-[667px] h-[214px] pt-3 px-6 pb-[18px] flex flex-col gap-[22px]'>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <div className=''>End in:</div>
                <div className=''>25d - 2h : 31m : 5s</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Minted::</div>
                <div className=''>270 / 500</div>
              </div>
              <div className='bg-[#1A2533] py-[3px] px-1 w-[619px] overflow-hidden flex shadow-[1px_1.5px_0px_0px_#FFF]'>
                {Array.apply(null, Array(56)).map((d, i) => (
                  <Image
                    src={i < 15 ? RedBlock : i < 30 ? YellowBlock : i < 45 ? GreenBlock : BlueBlock}
                    key={i}
                    alt=''
                  />
                ))}
                <Image src={GrayBar} alt='' className='' />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                Item: <span className='text-primary-color'>500</span>
              </div>
              <div className='w-[1px] h-[22px] bg-white'></div>
              <div>
                Price: <span className='text-primary-color'>5 UDST</span>
              </div>
              <div className='w-[1px] h-[22px] bg-white'></div>
              <div>
                Max <span className='text-primary-color'>2</span> per wallet
              </div>
            </div>
            <div className='flex gap-[10px]'>
              <div
                style={{ backgroundImage: `url(${MintAmount.src})`, backgroundSize: '100% 100%' }}
                className='flex text-primary-color w-full'>
                <div className='w-full h-full grid place-items-center pb-1 cursor-pointer'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <path d='M17.25 8.25H0.75V9.75H17.25V8.25Z' fill='#23FF81' />
                  </svg>
                </div>
                <div className='w-[72px] shrink-0 grid place-items-center pb-[6px]'>05</div>
                <div className='w-full grid place-items-center pb-1 cursor-pointer'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_8468_142518)'>
                      <path
                        d='M17.25 8.25V9.75H9.75V17.25H8.25V9.75H0.75V8.25H8.25V0.75H9.75V8.25H17.25Z'
                        fill='#23FF81'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_8468_142518'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div
                style={{ backgroundImage: `url(${MintButton.src})`, backgroundSize: '100% 100%' }}
                className='w-[465px] shrink-0 h-[39px] grid place-items-center uppercase text-primary-color pb-2 cursor-pointer'
                onClick={() => setOpen(true)}>
                Mint
              </div>
            </div>
          </div>
          <div>
            <div className='border border-[#2F639F] rounded overflow-hidden w-[180px] h-[180px]'>
              <Swiper
                slidesPerView={1}
                modules={[Navigation]}
                loop={true}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}>
                <SwiperSlide>
                  <Image src={DummyImage} alt='' className='w-[180px] h-[180px] object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={DummyImage} alt='' className='w-[180px] h-[180px] object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={DummyImage} alt='' className='w-[180px] h-[180px] object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={DummyImage} alt='' className='w-[180px] h-[180px] object-cover' />
                </SwiperSlide>
              </Swiper>
            </div>
            <div
              style={{ backgroundImage: `url(${SwiperNav.src})`, backgroundSize: '100% 100%' }}
              className='w-[180px] h-[38px] flex '>
              <div className='w-1/2 grid place-items-center cursor-pointer swiper-button-prev'>
                <svg width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M10 1V3H9V4H8V5H7V6H6V7H5V9H6V10H7V11H8V12H9V13H10V15H9V16H7V15H6V14H5V13H4V12H3V11H2V10H1V9H0V7H1V6H2V5H3V4H4V3H5V2H6V1H7V0H9V1H10Z'
                    fill='#23FF81'
                  />
                </svg>
              </div>
              <div className='w-1/2 grid place-items-center cursor-pointer swiper-button-next'>
                <svg width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M0 15V13H1V12H2V11H3V10H4V9H5V7H4V6H3V5H2V4H1V3H0V1H1V0H3V1H4V2H5V3H6V4H7V5H8V6H9V7H10V9H9V10H8V11H7V12H6V13H5V14H4V15H3V16H1V15H0Z'
                    fill='#23FF81'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='leading-[11px] flex border w-fit border-[#2F639F] [&>div]:p-2 [&>div]:cursor-pointer [&>div.active]:text-white [&>div.active]:bg-[linear-gradient(90deg,#243B55_0%,#141E30_100%)] [&>div]:text-[#5E789D]  '>
            <div className={`${tab == 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
              Launchpad
            </div>
            <div className={`${tab == 2 ? 'active' : ''} border-x border-[#2F639F]`} onClick={() => setTab(2)}>
              License Details
            </div>
            <div className={`${tab == 3 ? 'active' : ''}`} onClick={() => setTab(3)}>
              Licensor
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${Backdrop8.src})`, backgroundSize: '100% 100%' }}
            className='h-[110px] w-[856px] px-6 py-3'></div>
        </div>
      </div>
      <Modal open={open} title='Mint NFT confirmation'>
        <div>abc</div>
      </Modal>
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
