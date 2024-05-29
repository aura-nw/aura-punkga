import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { createContext, useContext, useState } from 'react'
import Backdrop3 from 'src/components/pages/launchpad/assets/backdrop-3.png'
import LeftButton from 'src/components/pages/launchpad/assets/left.png'
import RightButton from 'src/components/pages/launchpad/assets/right.png'
import ViewLaunchPadButton from 'src/components/pages/launchpad/assets/view-launchpad.png'
import { ModalContext } from 'src/context/modals'
import { getAllLaunchPad } from 'src/services'
import { formatNumber, shorten } from 'src/utils'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import AboutusButton from '../assets/about-us.png'
import AddressBackdrop from '../assets/address-backdrop.png'
import Backdrop1 from '../assets/backdrop-1.png'
import Backdrop2 from '../assets/backdrop-2.png'
import Backdrop4 from '../assets/backdrop-4.png'
import Backdrop5 from '../assets/backdrop-5.png'
import Backdrop6 from '../assets/backdrop-6.png'
import Backdrop from '../assets/backdrop.png'
import DisconnectButton from '../assets/disconnect-button.png'
import BalanceBackdrop from '../assets/balance-backdrop.png'
import ConnectWalletButton from '../assets/connect-wallet-button.png'
import DummyImage from '../assets/dummy-image.png'
import Logo from '../assets/logo.png'
import Mewo from '../assets/mewo.png'
import { Context } from 'src/context'
export const LayoutContext = createContext<{ setData: any }>({
  setData: undefined,
})
export default function Layout({ children }: any) {
  const { data: allLaunchPad } = useSWR('get_all_launchpad', () => getAllLaunchPad())
  const { setSignInOpen } = useContext(ModalContext)
  const [data, setData] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const walletBalance = useBalance({
    address,
  })
  const usdtBalance = useBalance({
    address,
    token: '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6',
  })
  if (window.innerWidth < 1400) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center gap-5 font-atlantis bg-[#26335C]'>
        <Image src={Mewo} alt='' />
        <div className='text-primary-color text-3xl'>
          Require 1400px screen or higher. Please use another compatible device
        </div>
      </div>
    )
  }
  return (
    <LayoutContext.Provider value={{ setData }}>
      <Head>
        <meta name='viewport' content='width=1440px, initial-scale=1'></meta>
      </Head>
      <div className='relative h-screen w-screen grid place-items-center font-atlantis text-white'>
        <Image src={Backdrop} alt='' className='absolute inset-0 w-screen h-screen' />
        <div className='flex relative'>
          <div>
            <div
              style={{ backgroundImage: `url(${Backdrop1.src})`, backgroundSize: '100% 100%' }}
              className='px-[26px] pt-[18px] pb-[16px] flex gap-3'>
              <Image src={Logo} alt='' className='w-[148px] h-auto' />
              <div className='flex flex-col gap-[4px]'>
                {address ? (
                  <>
                    <div
                      onClick={() => setOpen(!open)}
                      style={{
                        backgroundImage: `url(${AddressBackdrop.src})`,
                        backgroundSize: '100% 100%',
                        textShadow: '1px 1.5px 0px #FFF',
                      }}
                      className='w-[200px] h-[37px] grid place-items-center text-black text-2xl pb-1 relative cursor-pointer'>
                      {shorten(address, 4, 4)}
                      {open && (
                        <Image
                          src={DisconnectButton}
                          alt=''
                          className='w-[200px] h-auto cursor-pointer absolute top-full -mt-1'
                          onClick={() => disconnect()}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <Image
                    src={ConnectWalletButton}
                    alt=''
                    className='w-[200px] h-auto cursor-pointer'
                    onClick={() => setSignInOpen(true)}
                  />
                )}
                {walletBalance.data || usdtBalance.data ? (
                  <div
                    style={{
                      backgroundImage: `url(${BalanceBackdrop.src})`,
                      backgroundSize: '100% 100%',
                    }}
                    className='w-[200px] h-[61px] text-2xl leading-[22px] px-3 flex flex-col justify-center items-center'>
                    {walletBalance.data && (
                      <div className='flex justify-between w-full'>
                        <div>ETH:</div>
                        <div className='text-primary-color'>{`${formatNumber(
                          (+walletBalance.data.formatted).toFixed(3)
                        )}`}</div>
                      </div>
                    )}
                    {usdtBalance.data && (
                      <div className='flex justify-between w-full'>
                        <div>USDT:</div>
                        <div className='text-primary-color'>{`${formatNumber(
                          (+usdtBalance.data.formatted).toFixed(3)
                        )}`}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Image src={DummyImage} alt='' className='w-[200px] h-auto' />
                )}
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${Backdrop2.src})`, backgroundSize: '100% 100%' }}
              className='px-[26px] py-[51px] h-[560px]'>
              {data ? (
                data
              ) : (
                <div>
                  <div className='w-[360px] relative -mb-10'>
                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      modules={[Navigation]}
                      onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}>
                      {allLaunchPad?.launchpad?.map((launchpad, index) => (
                        <SwiperSlide key={index}>
                          <Link href={`/launchpad/${launchpad.id}`} className='w-[360px]'>
                            <Image
                              src={launchpad.thumbnail_url}
                              width={360}
                              height={270}
                              alt=''
                              className='w-[360px] h-[270px] object-cover'
                            />
                            <div
                              style={{ backgroundImage: `url(${Backdrop3.src})`, backgroundSize: '100% 100%' }}
                              className='px-[13px] py-[14px] w-[360px] h-[104px] flex flex-col gap-1 text-2xl leading-[22px]'>
                              <div className='text-primary-color overflow-hidden text-ellipsis whitespace-nowrap'>
                                {launchpad.name}
                              </div>
                              <div className=' flex justify-between'>
                                <div>Start:</div>
                                <div className='text-primary-color'>
                                  {moment(launchpad.start_date).format('DD MMM yyyy')}
                                </div>
                              </div>
                              <div className=' flex justify-between'>
                                <div>End:</div>
                                <div className='text-primary-color'>
                                  {moment(launchpad.end_date).format('DD MMM yyyy')}
                                </div>
                              </div>
                            </div>
                            <div className='w-full h-10'></div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <Image src={ViewLaunchPadButton} alt='' className='cursor-pointer relative' />
                  <div className='flex mt-2'>
                    <Image src={LeftButton} alt='' className='cursor-pointer swiper-button-prev' />
                    <Image src={RightButton} alt='' className='cursor-pointer swiper-button-next' />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${Backdrop5.src})`, backgroundSize: '100% 100%' }}
            className='px-[26px] py-[18px] flex flex-col gap-4 w-[1000px]'>
            <div
              style={{ backgroundImage: `url(${Backdrop4.src})`, backgroundSize: '100% 100%' }}
              className='px-[28px] pt-[8px] pb-[8px] w-[910px]'>
              <Link href='https://launch.punkga.me/' target='_blank' className='w-fit block'>
                <Image src={AboutusButton} alt='' className='w-[156px] h-auto cursor-pointer' />
              </Link>
            </div>
            <div
              style={{ backgroundImage: `url(${Backdrop6.src})`, backgroundSize: '100% 100%' }}
              className='w-[910px] h-[544px] py-6 px-7 flex flex-col gap-4'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}
