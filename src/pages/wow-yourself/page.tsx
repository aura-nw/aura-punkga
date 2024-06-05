import MainButton from 'components/Button/MainButton'
import BannerDesktop from 'components/pages/event/assets/banner-desktop.png'
import BannerMobile from 'components/pages/event/assets/banner-mobile.png'
import Banner from 'components/pages/event/assets/banner.png'
import Image from 'next/image'
import Link from 'next/link'
import X from 'assets/images/x.png'
import Facebook from 'assets/images/Facebook.png'
import moment from 'moment'
import JudgeBoard from 'components/pages/event/wow-yourself/JudgeBoard'
export default function WowYourSelf() {
  return (
    <div className=''>
      <Image src={BannerMobile} className='w-full lg:hidden' alt='' />
      <div className='pk-container hidden lg:block'>
        <Image src={BannerDesktop} className='w-full mt-3' alt='' />
      </div>
      <div className='pk-container'>
        <div className='flex flex-col gap-4 lg:gap-5 mt-5 lg:mt-8 lg:flex-row'>
          <div className='lg:w-full'>
            <h1 className='text-base font-bold leading-5 flex items-center gap-2 lg:text-xl'>
              Wow yourself - Final round{' '}
              <Link
                target='_blank'
                href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2FPunkgaMeManga%2Fposts%2Fpfbid02H7stNei37BqvRZD5ygKW1WdJsdWad7TYgwhHMSFMY6deWh3NVzWjXXBByc5rC2nml&amp;src=sdkpreparse'
                className='cursor-pointer'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z'
                    stroke='#1FAB5E'
                    strokeWidth='1.5'
                  />
                  <path d='M14 6.5L9 10' stroke='#1FAB5E' strokeWidth='1.5' strokeLinecap='round' />
                  <path d='M14 17.5L9 14' stroke='#1FAB5E' strokeWidth='1.5' strokeLinecap='round' />
                  <path
                    d='M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z'
                    stroke='#1FAB5E'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z'
                    stroke='#1FAB5E'
                    strokeWidth='1.5'
                  />
                </svg>
              </Link>
            </h1>
            <div className='mt-1 flex gap-3 items-center lg:mt-3'>
              <Link target='_blank' href='https://x.com/PunkgaMeManga/status/1796810762088018331'>
                <Image src={X} alt='' className='w-8 h-8' />
              </Link>
              <Link
                target='_blank'
                href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02H7stNei37BqvRZD5ygKW1WdJsdWad7TYgwhHMSFMY6deWh3NVzWjXXBByc5rC2nml'>
                <Image src={Facebook} alt='' className='w-8 h-8' />
              </Link>
            </div>
            <p className='text-xs leading-5 mt-4 lg:mt-3 lg:text-sm lg:leading-6'>
              WoW YOURSELF - CUỘC THI VẼ TRUYỆN HOT NHẤT MÙA HÈ CHỈ CÓ TẠI PUNKGA ME!
              <br />
              Bạn có đam mê vẽ truyện? Bạn muốn thể hiện cá tính và tài năng của mình? Vậy thì đừng bỏ lỡ cơ hội tỏa
              sáng cùng cuộc thi WoW YOURSELF do Punkga ME tổ chức!
              <br />
              Tổng giải thưởng lên đến 8.000.000+ VNĐ cùng nhiều phần quà hấp dẫn khác, WoW YOURSELF hứa hẹn sẽ mang đến
              những trải nghiệm thú vị và cơ hội phát triển bản thân cho tất cả các hoạ sĩ.
              <br />
              Tham gia group cuộc thi của Punkga tại đây:{' '}
              <Link href='http://www.facebook.com/group/punkga.me' className='text-[#2684FC] underline'>
                http://www.facebook.com/group/punkga.me
              </Link>
            </p>
          </div>
          <div className='flex flex-col gap-4 lg:w-1/2 lg:max-w-[400px] lg:shrink-0'>
            <div className='flex gap-5'>
              <MainButton style='secondary' className='w-full'>
                View Rule
              </MainButton>
              <MainButton disabled={!moment().isAfter(moment('2024-06-11'))} className='w-full'>
                Submit my artwork
              </MainButton>
            </div>
            <div className='bg-[#F2F2F2] rounded-2xl py-5 px-4 flex flex-col gap-5 text-[#1C1C1C]'>
              <div className='flex gap-6 justify-between'>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px]'>Participants</div>
                  <div className='font-semibold lg:text-lg'>12</div>
                </div>
                <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
                <div className='flex flex-col gap-1 w-[40%]'>
                  <div className='text-xs leading-[15px] lg:text-sm lg:leading-[18px]'>Submitted artworks</div>
                  <div className='font-semibold lg:text-lg'>2048</div>
                </div>
              </div>
            </div>
            <Link href=''>
              <Image src={Banner} alt='' className='w-full' />
            </Link>
          </div>
        </div>
        <div className='flex flex-col items-center w-full mt-10 lg:mt-8 lg:flex-row'>
          <div
            className={`lg:min-h-[138px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
              moment().isAfter(moment('2024-06-03'))
                ? moment().isBefore(moment('2024-06-10'))
                  ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
                  : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
                : 'border-[#DEDEDE]'
            }`}>
            <div className='font-semibold leading-5'>Round 1: Show YOURSELF</div>
            <div className='flex gap-6 justify-between'>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Start</div>
                <div className='font-semibold'>03/06 - 10/06</div>
              </div>
              <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Participants:</div>
                <div className='font-semibold'>2048</div>
              </div>
            </div>
            <Link
              href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02fm2AemHFfMWPaZxPceJHyQbj1PsPUkfXCoJbLZJGAJuXCfpc49apQknwdkdEfkhbl?rdid=2Ew6QNhR0hxgSi2o'
              target='_blank'
              className='text-[#2684FC] text-sm'>
              View on facebook
            </Link>
          </div>
          <div className='w-[1px] h-[32px] lg:w-[40px] lg:h-[1px] lg:shrink-0 bg-[#1C1C1C1A]'></div>
          <div
            className={`lg:min-h-[138px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
              moment().isAfter(moment('2024-06-11'))
                ? moment().isBefore(moment('2024-06-17'))
                  ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
                  : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
                : 'border-[#DEDEDE]'
            }`}>
            <div className='font-semibold leading-5'>Round 2: Know YOURSELF</div>
            <div className='flex gap-6 justify-between'>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Start</div>
                <div className='font-semibold'>11/06 - 17/06</div>
              </div>
              <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Participants:</div>
                <div className='font-semibold'>---</div>
              </div>
            </div>
          </div>
          <div className='w-[1px] h-[32px] lg:w-[40px] lg:h-[1px] lg:shrink-0 bg-[#1C1C1C1A]'></div>
          <div
            className={`lg:min-h-[138px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
              moment().isAfter(moment('2024-06-18'))
                ? moment().isBefore(moment('2024-06-30'))
                  ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
                  : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
                : 'border-[#DEDEDE]'
            }`}>
            <div className='font-semibold leading-5'>Round 3: Grow YOURSELF</div>
            <div className='flex gap-6 justify-between'>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Start</div>
                <div className='font-semibold'>18/06 - 30/06</div>
              </div>
              <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
              <div className='flex flex-col gap-1 w-[40%]'>
                <div className='text-sm leading-[18px]'>Participants:</div>
                <div className='font-semibold'>---</div>
              </div>
            </div>
          </div>
        </div>
        <JudgeBoard />
      </div>
    </div>
  )
}
