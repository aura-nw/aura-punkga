import Image from 'next/image'
import PudgyWithCup from './assets/pudgy-with-cup.svg'
import Bamboo from './assets/bamboo.svg'
import Image1 from './assets/i1.png'
import Image2 from './assets/i2.png'
import R1 from './assets/r1.png'
import R2 from './assets/r2.png'
import R3 from './assets/r3.png'
import Line from './assets/line.svg'
import TimeLineImage from './assets/timeline.png'
export default function TimeLine() {
  return (
    <>
      <div className='hidden xl:block pt-16 pk-container'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[64px] leading-[84px] font-black text-stroke'>
          IT’s Time TO TRAVEL
        </div>
        <div className='relative mt-28 font-semibold'>
          <Image src={TimeLineImage} alt='' className='w-full' />
          <div className='absolute flex flex-col items-center top-[-12%] left-[9.5%]'>
            <div className='text-sm text-[#009640]'>11/8/2024</div>
            <div className='text-lg'>Register</div>
          </div>
          <div className='absolute flex flex-col items-center top-[21%] left-[37.2%]'>
            <div className='text-sm text-[#009640]'>20/8/2024</div>
            <div className='text-lg'>Receive Pudgy</div>
          </div>
          <div className='absolute flex flex-col items-center top-[0%] right-[27.4%]'>
            <div className='text-sm text-[#009640]'>2/9/2024</div>
            <div className='text-lg'>Receive Pudgy</div>
          </div>
        </div>
      </div>
      <div className='mt-[22px] lg:mt-16 xl:hidden'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[36px] lg:text-[64px] leading-[48px] font-black text-stroke'>
          IT’s Time TO TRAVEL
        </div>
        <div className='mt-8 flex items-center w-full flex-col'>
          <div className='relative cursor-pointer -translate-x-11'>
            <svg xmlns='http://www.w3.org/2000/svg' width='147' height='85' viewBox='0 0 147 85' fill='none'>
              <path
                d='M0.5 10C0.5 4.75329 4.7533 0.5 10 0.5H137C142.247 0.5 146.5 4.75329 146.5 10V57C146.5 62.2467 142.247 66.5 137 66.5H10C4.75329 66.5 0.5 62.2467 0.5 57V10Z'
                fill='#FF5050'
                stroke='black'
              />
              <path d='M68.1214 66.75L76 83.8076L83.8786 66.75H68.1214Z' fill='#FF5050' stroke='black' />
            </svg>
            <div className='absolute inset-x-2.5 top-2.5 flex flex-col items-center'>
              <div className='uppercase text-stroke font-black text-2xl drop-shadow-[1px_1px_0px_#000] trailer-font text-[#FFDC48]'>
                upto 2.000 USD
              </div>
              <div className='-mt-1 uppercase text-stroke font-black text-base drop-shadow-[1px_1px_0px_#000] trailer-font text-[#16CC64]'>
                Click Me
              </div>
            </div>
          </div>
          <Image src={PudgyWithCup} alt='' className='w-[170px]' />
        </div>
        <div className='flex flex-col items-center mt-5 font-semibold -space-y-4'>
          <div className='flex'>
            <div>
              <Image src={R1} alt='' className='w-[131px]' />
            </div>
            <div className='w-[200px] pt-7'>
              <div className='text-sm text-[#009640]'>11/8/2024</div>
              <div className='text-lg'>Register</div>
              <Image src={Bamboo} alt='' className='w-20 mt-7' />
            </div>
          </div>
          <div className='flex'>
            <div>
              <Image src={R2} alt='' className='w-[131px]' />
            </div>
            <div className='w-[200px] pt-7'>
              <div className='text-sm text-[#009640]'>20/8/2024</div>
              <div className='text-lg'>Receive Pudgy</div>
              <Image src={Image1} alt='' className='w-[167px] mt-7' />
            </div>
          </div>
          <div className='flex relative w-full justify-center'>
            <div className=''>
              <Image src={R3} alt='' className='w-[131px]' />
            </div>
            <div className='w-full h-[88px] absolute inset-x-0 top-[79%] bg-[#474749] shadow-[0px_14px_0px_0px_#000] grid place-items-center'>
              <Image src={Line} alt='' className='w-screen h-3 object-cover' />
            </div>
            <div className='w-[200px] pt-11 relative'>
              <div className='text-sm text-[#009640]'>2/9/2024</div>
              <div className='text-lg'>Receive Pudgy</div>
              <Image src={Image2} alt='' className='w-[173px] mt-7' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
