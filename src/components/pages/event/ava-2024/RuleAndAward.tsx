import Ava from 'components/pages/event/ava-2024/assets/ava.svg'
import Flame from 'components/pages/event/ava-2024/assets/flame.svg'
import FourLeafClover from 'components/pages/event/ava-2024/assets/fourleafclover.svg'
import Artkeeper from 'components/pages/event/ava-2024/assets/mascot-head.svg'
import Modal from 'components/pages/event/ava-2024/Modal'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Rules from './Rules'

export default function RuleAndAward() {
  const [seeMore, setSeeMore] = useState(false)
  const [openAward, setOpenAward] = useState(false)
  const [openRules, setOpenRules] = useState(false)
  const { locale } = useRouter()
  const pathname = usePathname()
  return (
    <>
      <div className='relative w-full h-auto cursor-pointer' onClick={() => setSeeMore(!seeMore)}>
        <Image src={Artkeeper} alt='' className='w-full h-full' />
        <svg
          width='57'
          height='48'
          viewBox='0 0 57 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute w-[80%] -top-[30%] -right-[40%] animate-blink'>
          <path
            d='M19.0642 1.89453H18.7072L18.4309 2.12057L1.97907 15.5812L1.37793 16.073L1.70572 16.7772L11.8012 38.4637L12.0091 38.9105L12.4901 39.0177L18.0642 40.2608V44.6828V46.2917L19.5068 45.5795L26.3052 42.2233L47.3843 44.2717L48.1479 44.3459L48.4173 43.6275L55.1476 25.68L55.266 25.3644L55.1691 25.0415L48.4388 2.60718L48.225 1.89453H47.481H19.0642Z'
            fill='white'
            stroke='black'
            stroke-width='2'
          />
          <path
            d='M10.5969 24C10.4636 24 10.3969 23.9333 10.3969 23.8V15.128C10.3969 15.0053 10.4423 14.8987 10.5329 14.808L11.8689 13.464C11.9596 13.3787 12.0663 13.336 12.1889 13.336H14.0209C14.1436 13.336 14.2503 13.3787 14.3409 13.464L15.6849 14.816H16.0609L17.4049 13.464C17.4956 13.3787 17.6023 13.336 17.7249 13.336H19.5489C19.6769 13.336 19.7836 13.3787 19.8689 13.464L21.2129 14.808C21.3036 14.8987 21.3489 15.0053 21.3489 15.128V23.8C21.3489 23.9333 21.2823 24 21.1489 24H18.8529C18.7196 24 18.6529 23.9333 18.6529 23.8V15.52H17.2209V23.8C17.2209 23.9333 17.1543 24 17.0209 24H14.7329C14.5996 24 14.5329 23.9333 14.5329 23.8V15.52H13.0849V23.8C13.0849 23.9333 13.0183 24 12.8849 24H10.5969ZM25.2811 24C25.1584 24 25.0517 23.9547 24.9611 23.864L23.3611 22.264C23.2704 22.1787 23.2251 22.072 23.2251 21.944V15.384C23.2251 15.2613 23.2704 15.1547 23.3611 15.064L24.9611 13.464C25.0517 13.3787 25.1584 13.336 25.2811 13.336H28.4331C28.5611 13.336 28.6677 13.3787 28.7531 13.464L30.3531 15.064C30.4437 15.1547 30.4891 15.2613 30.4891 15.384V21.944C30.4891 22.072 30.4437 22.1787 30.3531 22.264L28.7531 23.864C28.6677 23.9547 28.5611 24 28.4331 24H25.2811ZM26.2491 21.824H27.4651C27.6891 21.824 27.8011 21.6747 27.8011 21.376V15.96C27.8011 15.656 27.6891 15.504 27.4651 15.504H26.2491C26.0304 15.504 25.9211 15.656 25.9211 15.96V21.376C25.9211 21.6747 26.0304 21.824 26.2491 21.824ZM32.5657 24C32.4324 24 32.3657 23.9333 32.3657 23.8V13.536C32.3657 13.4027 32.4324 13.336 32.5657 13.336H36.9257C37.0537 13.336 37.1604 13.3707 37.2457 13.44L39.0857 15.264C39.1444 15.3173 39.179 15.3627 39.1897 15.4C39.2057 15.4373 39.2137 15.4987 39.2137 15.584V17.776C39.2137 17.8453 39.1844 17.9067 39.1257 17.96L38.2457 18.824L37.5177 19.448L38.3817 20.6L39.2937 22.536C39.315 22.584 39.331 22.632 39.3417 22.68C39.3577 22.7227 39.3657 22.776 39.3657 22.84V23.8C39.3657 23.9333 39.299 24 39.1657 24H37.0377C36.9204 24 36.8404 23.9467 36.7977 23.84L35.5177 20.128H34.9337V23.8C34.9337 23.9333 34.867 24 34.7337 24H32.5657ZM35.7897 18.12C36.227 18.12 36.5257 18.0293 36.6857 17.848C36.8457 17.6667 36.9257 17.328 36.9257 16.832C36.9257 16.3253 36.8457 15.9813 36.6857 15.8C36.5257 15.6187 36.227 15.528 35.7897 15.528C35.363 15.528 35.067 15.6187 34.9017 15.8C34.7364 15.9813 34.6537 16.3253 34.6537 16.832C34.6537 17.328 34.7364 17.6667 34.9017 17.848C35.067 18.0293 35.363 18.12 35.7897 18.12ZM40.8157 24C40.6824 24 40.6157 23.9333 40.6157 23.8V13.536C40.6157 13.4027 40.6824 13.336 40.8157 13.336H46.3917C46.525 13.336 46.5917 13.4027 46.5917 13.536V15.304C46.5917 15.4373 46.525 15.504 46.3917 15.504H43.3037V17.72H46.1277C46.261 17.72 46.3277 17.7867 46.3277 17.92V19.416C46.3277 19.5493 46.261 19.616 46.1277 19.616H43.3037V21.824H46.3917C46.525 21.824 46.5917 21.8907 46.5917 22.024V23.8C46.5917 23.9333 46.525 24 46.3917 24H40.8157ZM23.0193 30.936C22.886 30.936 22.8193 30.864 22.8193 30.72V28.184C22.8193 28.04 22.886 27.968 23.0193 27.968H25.5793C25.7126 27.968 25.7793 28.04 25.7793 28.184V30.72C25.7793 30.864 25.7126 30.936 25.5793 30.936H23.0193ZM27.2224 30.936C27.0891 30.936 27.0224 30.864 27.0224 30.72V28.184C27.0224 28.04 27.0891 27.968 27.2224 27.968H29.7824C29.9158 27.968 29.9824 28.04 29.9824 28.184V30.72C29.9824 30.864 29.9158 30.936 29.7824 30.936H27.2224ZM31.4256 30.936C31.2922 30.936 31.2256 30.864 31.2256 30.72V28.184C31.2256 28.04 31.2922 27.968 31.4256 27.968H33.9856C34.1189 27.968 34.1856 28.04 34.1856 28.184V30.72C34.1856 30.864 34.1189 30.936 33.9856 30.936H31.4256Z'
            fill='#0B0B0B'
          />
        </svg>
        <div className={`active space-y-2 absolute right-1/2 translate-x-1/4 top-[120%] ${seeMore ? '' : 'hidden'}`}>
          <div onClick={() => setOpenRules(true)} className='bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
            View Rule
          </div>
          {pathname != '/events/ava-2024/map/submit-portal' && (
            <Link
              href={`/events/ava-2024/map/submit-portal`}
              className='block bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
              Submit
            </Link>
          )}
          <div onClick={() => setOpenAward(true)} className='bg-neutral-100 border-[2px] border-neutral-black rounded-mlg p-2.5 w-[154px] font-semibold text-sm text-text-primary-on-brand text-center cursor-pointer'>
            Award
          </div>
        </div>
      </div>
      <Modal open={openAward} setOpen={setOpenAward} title='AWARD'>
        <div className='w-[80vw] max-w-[500px]'>
          <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black'>
            <div className='text-lg font-bold rounded-md bg-[#A967FF] px-2 py-0.5'>Prize pool</div>
            <Image src={Ava} alt='' className='w-[138px] h-auto' />
            <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>6000 USD</div>
            <div className='font-medium mt-2'>53 prizes</div>
          </div>
          <div className='w-full border-t border-dashed border-white my-4'></div>
          <div className='text-lg font-medium w-full text-center'>Grand Final Prizes</div>
          <div className='flex flex-col items-center bg-neutral-950 py-5 px-14 border-[3px] w-full border-black mt-4'>
            <div className='text-lg font-bold rounded-md bg-[#1EBB61] px-2 py-0.5'>Special Prize</div>
            <Image src={Flame} alt='' className='w-[138px] h-auto' />
            <div className='font-jaro text-2xl rounded-md bg-black text-center mt-2 w-full'>1200 USD</div>
          </div>
          <div className='mt-4 bg-neutral-950 p-4 text-sm space-y-1.5'>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 01 1st Prize: 600 USD
            </div>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 02 2nd Prize: 400 USD
            </div>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 03 3rd Prize: 200 USD
            </div>
            <div className='flex gap-1.5 items-center'>
              <span>
                <Image src={FourLeafClover} alt='' className='w-5' />
              </span>
              Grand Final - 10 Encouragement Prizes: 40 USD
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openRules} setOpen={setOpenRules}>
        <Rules/>
      </Modal>
    </>
  )
}
