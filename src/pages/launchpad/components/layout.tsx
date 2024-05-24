import Image from 'next/image'
import Backdrop from '../assets/backdrop.png'
import Backdrop1 from '../assets/backdrop-1.png'
import Backdrop2 from '../assets/backdrop-2.png'
import Backdrop3 from '../assets/backdrop-3.png'
import Backdrop4 from '../assets/backdrop-4.png'
import Backdrop5 from '../assets/backdrop-5.png'
import Backdrop6 from '../assets/backdrop-6.png'
import Logo from '../assets/logo.png'
import ConnectWalletButton from '../assets/connect-wallet-button.png'
import DummyImage from '../assets/dummy-image.png'
import DummyImage2 from '../assets/dummy-image-2.png'
import ViewLaunchPadButton from '../assets/view-launchpad.png'
import AboutusButton from '../assets/about-us.png'
import Left from '../assets/left.png'
import Right from '../assets/right.png'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ModalContext } from 'src/context/modals'
import { createContext, useContext, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import AddressBackdrop from '../assets/address-backdrop.png'
import BalanceBackdrop from '../assets/balance-backdrop.png'
import { shorten } from 'src/utils'
export const LayoutContext = createContext<{ data: any }>({
  data: undefined,
})
export default function Layout({ children }: any) {
  const router = useRouter()
  const { setSignInOpen, setMigrateWalletOpen } = useContext(ModalContext)
  const [data, setData] = useState<any>()
  const { address } = useAccount()
  const walletBalance = useBalance({
    address,
  })
  const usdtBalance = useBalance({
    address,
    token: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
  })
  return (
    <LayoutContext.Provider value={{ data }}>
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
                  <div
                    style={{
                      backgroundImage: `url(${AddressBackdrop.src})`,
                      backgroundSize: '100% 100%',
                      textShadow: '1px 1.5px 0px #FFF',
                    }}
                    className='w-[200px] h-[37px] grid place-items-center text-black text-2xl pb-1'>
                    {shorten(address, 4, 4)}
                  </div>
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
                        <div className='text-primary-color'>{`${walletBalance.data.formatted}`}</div>
                      </div>
                    )}
                    {usdtBalance.data && (
                      <div className='flex justify-between w-full'>
                        <div>USDT:</div>
                        <div className='text-primary-color'>{`${usdtBalance.data.formatted}`}</div>
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
              className='px-[26px] py-[51px]'>
              <Image src={DummyImage2} alt='' className='w-[360px] h-[270px]' />
              <div
                style={{ backgroundImage: `url(${Backdrop3.src})`, backgroundSize: '100% 100%' }}
                className='px-[13px] py-[18px] w-[360px] h-[104px]'>
                abd
              </div>
              <Image src={ViewLaunchPadButton} alt='' className='w-[360px] h-auto' />
              <div className='flex mt-3'>
                <Image src={Left} alt='' className='w-[180px] h-auto cursor-pointer' />
                <Image src={Right} alt='' className='w-[180px] h-auto cursor-pointer' />
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${Backdrop5.src})`, backgroundSize: '100% 100%' }}
            className='px-[26px] py-[18px] flex flex-col gap-4 w-[1000px]'>
            <div
              style={{ backgroundImage: `url(${Backdrop4.src})`, backgroundSize: '100% 100%' }}
              className='px-[28px] pt-[8px] pb-[8px] w-[910px]'>
              <Image
                src={AboutusButton}
                alt=''
                className='w-[156px] h-auto cursor-pointer'
                onClick={() => router.push('/about-us')}
              />
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
