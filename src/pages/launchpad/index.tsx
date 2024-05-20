import Image from 'next/image'
import Backdrop from './assets/backdrop.png'
import Backdrop1 from './assets/backdrop-1.png'
import Backdrop2 from './assets/backdrop-2.png'
import Backdrop3 from './assets/backdrop-3.png'
import Backdrop4 from './assets/backdrop-4.png'
import Logo from './assets/logo.png'
import ConnectWalletButton from './assets/connect-wallet-button.png'
import DummyImage from './assets/dummy-image.png'
import DummyImage2 from './assets/dummy-image-2.png'
import ViewLaunchPadButton from './assets/view-launchpad.png'
import AboutusButton from './assets/about-us.png'
import Left from './assets/left.png'
import Right from './assets/right.png'
export default function LaunchPad() {
  return (
    <div className='relative h-screen w-screen grid place-items-center'>
      <Image src={Backdrop} alt='' className='absolute inset-0 w-screen h-screen' />
      <div className='flex relative'>
        <div>
          <div
            style={{ backgroundImage: `url(${Backdrop1.src})`, backgroundSize: '100% 100%' }}
            className='px-[26px] pt-[18px] pb-[16px] flex gap-3'>
            <Image src={Logo} alt='' className='w-[148px] h-auto' />
            <div className='flex flex-col gap-[4px]'>
              <Image src={ConnectWalletButton} alt='' className='w-[200px] h-auto cursor-pointer' />
              <Image src={DummyImage} alt='' className='w-[200px] h-auto' />
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${Backdrop2.src})`, backgroundSize: '100% 100%' }}
            className='px-[26px] py-[51px]'>
            <Image src={DummyImage2} alt='' className='w-[360px] h-[270px]' />
            <div
              style={{ backgroundImage: `url(${Backdrop3.src})`, backgroundSize: '100% 100%' }}
              className='px-[13px] py-[18px] w-[360px]'>
              abd
            </div>
            <Image src={ViewLaunchPadButton} alt='' className='w-[360px] h-auto' />
            <div className='flex mt-3'>
              <Image src={Left} alt='' className='w-[180px] h-auto cursor-pointer' />
              <Image src={Right} alt='' className='w-[180px] h-auto cursor-pointer' />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{ backgroundImage: `url(${Backdrop4.src})`, backgroundSize: '100% 100%' }}
            className='px-[28px] pt-[8px] pb-[8px]'>
            <Image src={ViewLaunchPadButton} alt='' className='w-[360px] h-auto' />
          </div>
        </div>
      </div>
    </div>
  )
}
