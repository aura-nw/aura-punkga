import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { ModalContext } from 'src/context/modals'
import { formatNumber, shorten } from 'src/utils'
import { useAccount, useBalance } from 'wagmi'
import AboutusButton from '../assets/about-us.png'
import AddressBackdrop from '../assets/address-backdrop.png'
import Backdrop1 from '../assets/backdrop-1.png'
import Backdrop2 from '../assets/backdrop-2.png'
import Backdrop4 from '../assets/backdrop-4.png'
import Backdrop5 from '../assets/backdrop-5.png'
import Backdrop6 from '../assets/backdrop-6.png'
import Backdrop from '../assets/backdrop.png'
import BalanceBackdrop from '../assets/balance-backdrop.png'
import ConnectWalletButton from '../assets/connect-wallet-button.png'
import DummyImage from '../assets/dummy-image.png'
import Logo from '../assets/logo.png'
export const LayoutContext = createContext<{ setData: any }>({
  setData: undefined,
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
    token: '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6',
  })
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
              className='px-[26px] py-[51px] h-[522px]'>
              {data}
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
