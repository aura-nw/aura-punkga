import Image from 'next/image'
import PudgyWithCup from './assets/pudgy-with-cup.svg'
import Bamboo from './assets/bamboo.svg'
import Cup from './assets/cuo.svg'
import Image2 from './assets/i2.png'
import R1 from './assets/r1.png'
import R2 from './assets/r2.png'
import R3 from './assets/r3.png'
import Line from './assets/line.svg'
import TimeLineImage from './assets/timeline.png'
import { useTranslation } from 'react-i18next'
export default function TimeLine() {
  const { t } = useTranslation()
  return (
    <>
      <div className='hidden xl:block pt-16 pk-container'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[64px] leading-[84px] font-black text-stroke'>
          {t('IT’s Time TO TRAVEL')}
        </div>
        <div className='relative mt-28 font-semibold'>
          <Image src={TimeLineImage} alt='' className='w-full' />
          <div className='absolute flex flex-col items-center top-[-16%] left-[6.5%]'>
            <div className='text-sm text-[#009640]'>01/08/2024</div>
            <div className='text-lg text-center max-w-[154px]'>{t(`"Join the Waddle and start flappin'!"`)}</div>
          </div>
          <div className='absolute flex flex-col items-center top-[16%] left-[35.2%]'>
            <div className='text-sm text-[#009640]'>01/09/2024</div>
            <div className='text-lg text-center max-w-[170px]'>{t(`"Show your best flap before this day!"`)}</div>
          </div>
          <div className='absolute flex flex-col items-center top-[-6%] right-[25.4%]'>
            <div className='text-sm text-[#009640]'>04/09/2024</div>
            <div className='text-lg text-center max-w-[165px]'>{t(`"Shout out to the grooviest flappers!"`)}</div>
          </div>
          <div className='absolute cursor-pointer right-[9.8%] top-[-18%]'>
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
                {t('upto 2.000 USD')}
              </div>
              <div className='-mt-1 uppercase text-stroke font-black text-base drop-shadow-[1px_1px_0px_#000] trailer-font text-[#16CC64]'>
                {t('Click Me')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[22px] lg:mt-16 xl:hidden'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[36px] lg:text-[64px] leading-[48px] font-black text-stroke'>
          {t('IT’s Time TO TRAVEL')}
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
                {t('upto 2.000 USD')}
              </div>
              <div className='-mt-1 uppercase text-stroke font-black text-base drop-shadow-[1px_1px_0px_#000] trailer-font text-[#16CC64]'>
                {t('Click Me')}
              </div>
            </div>
          </div>
          <Image src={PudgyWithCup} alt='' className='w-[170px]' />
        </div>
        <div className='flex flex-col items-center mt-5 font-semibold -space-y-5'>
          <div className='flex'>
            <div>
              <Image src={R1} alt='' className='w-[131px]' />
            </div>
            <div className='w-[200px] pt-5'>
              <div className='text-sm text-[#009640]'>01/08/2024</div>
              <div className='text-lg max-w-[154px]'>{t(`"Join the Waddle and start flappin'!"`)}</div>
              <Image src={Bamboo} alt='' className='w-[205px] mt-3 -ml-5' />
            </div>
          </div>
          <div className='flex'>
            <div>
              <Image src={R2} alt='' className='w-[131px]' />
            </div>
            <div className='w-[200px] pt-5'>
              <div className='text-sm text-[#009640]'>01/09/2024</div>
              <div className='text-lg max-w-[170px]'>{t(`"Show your best flap before this day!"`)}</div>
              <Image src={Image2} alt='' className='w-[174px] mt-4 -ml-5' />
            </div>
          </div>
          <div className='flex relative w-full justify-center'>
            <div className=''>
              <Image src={R3} alt='' className='w-[131px]' />
            </div>
            <div className='w-full h-[88px] absolute inset-x-0 top-[79%] bg-[#474749] shadow-[0px_14px_0px_0px_#000] grid place-items-center'>
              <Image src={Line} alt='' className='w-screen h-3 object-cover' />
            </div>
            <div className='w-[200px] pt-5 relative'>
              <div className='text-sm text-[#009640]'>04/09/2024</div>
              <div className='text-lg max-w-[165px]'>{t(`"Shout out to the grooviest flappers!"`)}</div>
              <Image src={Cup} alt='' className='w-[92px] mt-4 ml-4' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
