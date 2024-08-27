import Image from 'next/image'
import PudgyWithCup from './assets/pudgy-with-cup.svg'
import Bamboo from './assets/bamboo.svg'
import Cup from './assets/cuo.svg'
import Image2 from './assets/i2.svg'
import Image1 from './assets/i1.svg'
import R1 from './assets/r1.png'
import R2 from './assets/r2.png'
import R3 from './assets/r3.png'
import Line from './assets/line.svg'
import TimeLineImage from './assets/timeline.png'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Modal from 'components/Modal'
import { useRouter } from 'next/router'
export default function TimeLine() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [open, setOpen] = useState(false)
  return (
    <>
      <style jsx>
        {`
          @keyframes blink {
            0% {
              color: #00e160;
            }
            50% {
              color: #009640;
            }
          }
          .blinking {
            animation: blink 1s step-end infinite;
          }
        `}
      </style>
      <Modal open={open} setOpen={setOpen}>
        {locale == 'vn' ? (
          <div className='flex flex-col gap-4 items-center p-8 pt-12'>
            <div className='trailer-font text-[40px] leading-[52px] font-black'>GIAI THUONG</div>
            <div className='estedad-font text-lg font-semibold max-w-[483px]'>
              🏆 Giải thưởng: <br />
              🥇1 Giải Nhất: 10.000.000 VNĐ
              <br />
              🥈1 Giải Nhì: 5.000.000 VNĐ <br />
              🥉1 Giải Ba: 2.500.000 VNĐ <br />
              🏅7 Giải 4 - 10: 1.250.000 VNĐ <br />
              🎖️10 Giải 11 - 20: 500.000 VNĐ <br />
              🔥 Đặc biệt, Top 20 họa sĩ xuất sắc nhất sẽ nhận được ấn phẩm truyện độc quyền của cuộc thi.
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-4 items-center p-8 pt-12'>
            <div className='trailer-font text-[40px] leading-[52px] font-black'>PRIZE</div>
            <div className='estedad-font text-lg font-semibold max-w-[483px]'>
              🏆 Prizes: <br />
              🥇 1 First Prize: $400 <br />
              🥈 1 Second Prize: $200 <br />
              🥉 1 Third Prize: $100 <br />
              🏅 7 Prizes for 4th - 10th place: $50 each <br />
              🎖️ 10 Prizes for 11th - 20th place: $20 each <br />
              🔥 Special: The Top 20 most outstanding artists will receive an exclusive comic book of the contest!
            </div>
          </div>
        )}
      </Modal>
      <div className='hidden xl:block pt-16 pk-container'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[64px] leading-[84px] font-black text-stroke'>
          {t('IT’s Time TO TRAVEL')}
        </div>
        <div className='relative mt-28 font-semibold'>
          <Image src={TimeLineImage} alt='' className='w-full' />
          <Image
            src={Image1}
            alt=''
            className='absolute top-[50%] left-[14%] w-[215px] -translate-y-full hover:w-[250px] transition-all'
          />
          <Image
            src={Image2}
            alt=''
            className='absolute top-[70%] left-[55%] -rotate-[22deg] w-[240px] -translate-x-1/2 -translate-y-full hover:w-[270px] transition-all'
          />

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
            <div className='absolute inset-x-2.5 top-2.5 flex flex-col items-center' onClick={() => setOpen(true)}>
              <div className='uppercase text-stroke font-black text-2xl drop-shadow-[1px_1px_0px_#000] trailer-font text-[#FFDC48]'>
                {t('upto 2.000 USD')}
              </div>
              <div className='-mt-1 uppercase font-black text-base drop-shadow-[1px_1px_0px_#000] trailer-font blinking'>
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
            <div className='absolute inset-x-2.5 top-2.5 flex flex-col items-center' onClick={() => setOpen(true)}>
              <div className='uppercase text-stroke font-black text-2xl drop-shadow-[1px_1px_0px_#000] trailer-font text-[#FFDC48]'>
                {t('upto 2.000 USD')}
              </div>
              <div className='-mt-1 uppercase font-black text-base drop-shadow-[1px_1px_0px_#000] trailer-font blinking'>
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
