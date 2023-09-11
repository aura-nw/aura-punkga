import { ReactNode } from 'react'
import Tail from 'images/tab_tail.svg'
import SubTail from 'images/subtab_tail.svg'
import SubTailDark from 'images/subtab_tail_dark.svg'
import Image from 'next/image'
export default function Card({
  title,
  children,
  className,
}: {
  className?: string
  title: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <div className='relative rounded-[20px_20px_0px_0px] text-base leading-6 font-extrabold text-[#414141] px-5 py-[10px] lg:px-[50px] lg:py-5 lg:text-2xl lg:leading-6 bg-light-gray w-fit drop-shadow-[5px_0px_5px_rgba(0,0,0,0.1)]'>
        {title}
        <span className='absolute -right-5 bottom-0'>
          <Image src={Tail} alt='' className='w-5 h-5' />
        </span>
      </div>
      <div className='bg-light-gray p-[10px] rounded-[0px_20px_20px_20px] z-10 relative lg:p-[60px]'>{children}</div>
    </div>
  )
}
export function SubCard({
  title,
  children,
  className,
  theme,
}: {
  className?: string
  theme?: string
  title: string | ReactNode
  children: ReactNode
}) {
  if (theme == 'dark') {
    return (
      <div className={className}>
        <div className='max-w-[90%] relative rounded-[20px_20px_0px_0px] text-sm leading-6 font-bold text-primary-color px-5 py-[5px] lg:py-[10px] lg:px-[50px] lg:text-xl lg:leading-6 bg-[#292929] w-fit drop-shadow-[5px_0px_5px_rgba(0,0,0,0.1)]'>
          {title}
          <span className='absolute -right-5 bottom-0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path d='M0 0V20H20C8.95431 20 0 11.0457 0 0Z' fill='#292929' />
            </svg>
          </span>
        </div>
        <div className='bg-[#292929] p-[10px] rounded-[0px_20px_20px_20px] z-10 relative lg:py-5 lg:px-10'>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className={className}>
      <div className='max-w-[90%] relative rounded-[20px_20px_0px_0px] text-sm leading-6 font-bold text-second-color px-5 py-[5px] lg:py-[10px] lg:px-[50px] lg:text-xl lg:leading-6 bg-light-medium-gray w-fit drop-shadow-[5px_0px_5px_rgba(0,0,0,0.1)]'>
        {title}
        <span className='absolute -right-5 bottom-0'>
          <Image src={SubTail} alt='' className='w-5 h-5' />
        </span>
      </div>
      <div className='bg-light-medium-gray p-[10px] rounded-[0px_20px_20px_20px] z-10 relative lg:py-5 lg:px-10'>
        {children}
      </div>
    </div>
  )
}
