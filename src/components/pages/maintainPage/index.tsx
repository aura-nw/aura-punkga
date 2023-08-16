import Logo from 'images/header-logo.svg'
import NotFoundBg from 'images/not-found-bg.png'
import MaintainceImg from 'images/maintaince.svg'
import Image from 'next/image'
export default function MaintainPage() {
  return (
    <>
      <Image src={NotFoundBg} alt='' className='fixed h-screen w-screen object-cover' />
      <div className='h-screen w-screen flex flex-col items-center relative z-10 py-[50px] lg:py-[59px]'>
        <Image src={Logo} alt='' className='h-[92px] w-auto' />
        <Image src={MaintainceImg} alt='' className='w-[320px] h-auto mt-[166px] lg:mt-[90px] lg:w-[733px]' />
        <div className='mt-20 text-2xl leading-[30px] text-[#4e4e4e] font-extrabold w-[265px] lg:w-auto text-center lg:mt-10 lg:text-[48px] lg:leading-[69px]'>
          The site is currently down for maintenance
        </div>
        <div className='mt-[10px] leading-[20px] text-[#4e4e4e] font-bold lg:text-2xl lg:leading-[160%] w-[345px] lg:w-auto text-center'>
          We apologize for any inconvenience caused. We’ve almost done
        </div>
      </div>
    </>
  )
}
