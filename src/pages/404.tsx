import Logo from 'images/header-logo.svg'
import NotFoundBg from 'images/not-found-bg.png'
import NotFoundImg from 'images/404.svg'
import Image from 'next/image'
import Link from 'next/link'
export default function NotFound() {
  return (
    <>
      <Image src={NotFoundBg} alt='' className='fixed h-screen w-screen object-cover' />
      <div className='h-screen w-screen flex flex-col items-center relative z-10 py-[50px] lg:py-[59px]'>
        <Link href='/'>
          <Image src={Logo} alt='' className='h-[92px] w-auto' />
        </Link>
        <Image src={NotFoundImg} alt='' className='w-[320px] h-auto mt-[166px] lg:mt-[90px] lg:w-[733px]' />
        <div className='mt-20 text-2xl leading-[30px] text-[#4e4e4e] font-extrabold lg:mt-10 lg:text-[48px] lg:leading-[69px]'>
          You’ve lost in the space?
        </div>
        <div className='mt-[10px] leading-[20px] text-[#4e4e4e] font-bold lg:text-2xl lg:leading-[160%]'>
          We can’t find the page you’re looking for
        </div>
      </div>
    </>
  )
}
