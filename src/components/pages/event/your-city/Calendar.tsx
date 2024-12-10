import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import useSWR from 'swr'
import { eventService } from 'src/services/eventService'
import Image from 'next/image'
import O1 from './assets/OBJECTS.svg'
import O2 from './assets/OBJECTS2.svg'
import O3 from './assets/OBJECTS3.svg'
import moment, { Moment } from 'moment-timezone'
import { useWindowSize } from 'usehooks-ts'
export default function Calendar({ date, setDate }: { date: Moment; setDate: (date: Moment) => void }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { width } = useWindowSize()
  const [week, setWeeks] = useState(
    date.date() >= 9 && date.date() <= 21 ? 0 : date.date() >= 22 && date.date() <= 4 ? 1 : 2
  )
  const { data } = useSWR('get-all-topic', () => eventService.punktober.getAllTopic(), {
    revalidateOnFocus: false,
  })
  const topics = data?.data?.data?.artwork_topics
  const isEnded = moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz('2025-01-09', 'Asia/Ho_Chi_Minh'))
  return (
    <>
      <div className=' w-full mx-auto max-w-96'>
        <div className='w-full flex items-center justify-between'>
          <div
            className='text-xs font-bold text-neutral-black cursor-pointer flex gap-1.5 items-center'
            onClick={() => setOpen(true)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='19' viewBox='0 0 18 19' fill='none'>
              <path
                d='M8.09974 12.6999V15.3998C8.09974 16.8847 6.88469 18.0997 5.39983 18.0997H2.69991C1.21505 18.0997 0 16.8847 0 15.3998V12.6999C0 11.215 1.21505 10 2.69991 10H5.39983C6.88469 10 8.09974 11.215 8.09974 12.6999Z'
                fill='#0B0B0B'
              />
              <path
                d='M8.09974 2.80148V5.50139C8.09974 6.98625 6.88469 8.2013 5.39983 8.2013H2.69991C1.21505 8.2013 0 6.98625 0 5.50139V2.80148C0 1.31661 1.21505 0.101562 2.69991 0.101562H5.39983C6.88469 0.101562 8.09974 1.31661 8.09974 2.80148Z'
                fill='#0B0B0B'
              />
              <path
                d='M17.9992 12.6999V15.3998C17.9992 16.8847 16.7841 18.0997 15.2992 18.0997H12.5993C11.1145 18.0997 9.89941 16.8847 9.89941 15.3998V12.6999C9.89941 11.215 11.1145 10 12.5993 10H15.2992C16.7841 10 17.9992 11.215 17.9992 12.6999Z'
                fill='#0B0B0B'
              />
              <path
                d='M17.9992 2.80148V5.50139C17.9992 6.98625 16.7841 8.2013 15.2992 8.2013H12.5993C11.1145 8.2013 9.89941 6.98625 9.89941 5.50139V2.80148C9.89941 1.31661 11.1145 0.101562 12.5993 0.101562H15.2992C16.7841 0.101562 17.9992 1.31661 17.9992 2.80148Z'
                fill='#0B0B0B'
              />
            </svg>
            {t('View All')}
          </div>
          <div className='flex gap-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='36'
              height='37'
              viewBox='0 0 36 37'
              fill='none'
              className='cursor-pointer'
              onClick={() => setWeeks((prev) => (prev > 0 ? prev - 1 : 0))}>
              <g clipPath='url(#clip0_7175_34515)'>
                <path
                  d='M28 36.6016H8C3.58 36.6016 0 33.0216 0 28.6016V8.60156C0 4.18156 3.58 0.601562 8 0.601562H28C32.42 0.601562 36 4.18156 36 8.60156V28.6016C36 33.0216 32.42 36.6016 28 36.6016Z'
                  fill='#4F4F4F'
                />
                <rect
                  x='12'
                  y='18.7031'
                  width='2'
                  height='12'
                  rx='1'
                  transform='rotate(-53.398 12 18.7031)'
                  fill='white'
                />
                <rect
                  x='21.417'
                  y='10.6016'
                  width='2'
                  height='12'
                  rx='1'
                  transform='rotate(51.698 21.417 10.6016)'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_7175_34515'>
                  <rect width='36' height='36' fill='white' transform='translate(0 0.601562)' />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='36'
              height='37'
              viewBox='0 0 36 37'
              fill='none'
              className='cursor-pointer'
              onClick={() => setWeeks((prev) => (prev < 2 ? prev + 1 : 2))}>
              <g clipPath='url(#clip0_7175_34519)'>
                <path
                  d='M8 0.601562H28C32.42 0.601562 36 4.18156 36 8.60156V28.6016C36 33.0216 32.42 36.6016 28 36.6016H8C3.57999 36.6016 -3.8147e-06 33.0216 -3.8147e-06 28.6016V8.60156C-3.8147e-06 4.18156 3.57999 0.601562 8 0.601562Z'
                  fill='#4F4F4F'
                />
                <rect x='24' y='18.5' width='2' height='12' rx='1' transform='rotate(126.602 24 18.5)' fill='white' />
                <rect
                  x='14.583'
                  y='26.6016'
                  width='2'
                  height='12'
                  rx='1'
                  transform='rotate(-128.302 14.583 26.6016)'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_7175_34519'>
                  <rect width='36' height='36' fill='white' transform='matrix(-1 0 0 -1 36 36.6016)' />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className='mt-4 text-lg font-medium'>
          <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
            <div>{t('Sun')}</div>
            <div>{t('Mon')}</div>
            <div>{t('Tue')}</div>
            <div>{t('Wed')}</div>
            <div>{t('Thu')}</div>
            <div>{t('Fri')}</div>
            <div>{t('Sat')}</div>
          </div>
          <div
            className='mt-4 overflow-hidden h-20 relative [&_.selected-date]:text-neutral-black [&_.selected-date]:bg-feedback-success-defaul [&_.selected-date]:w-7 [&_.selected-date]:h-7 [&_.selected-date]:grid [&_.selected-date]:place-items-center [&_.selected-date]:rounded-full
        [&_.current-date]:border [&_.current-date]:border-feedback-success-700 [&_.current-date]:text-feedback-success-700 [&_.current-date]:w-7 [&_.current-date]:h-7 [&_.current-date]:grid [&_.current-date]:place-items-center [&_.current-date]:rounded-full'>
            <div
              className={`transition-all space-y-4 absolute inset-0 duration-500 ${
                week != 0 ? '-translate-x-full' : ''
              }`}>
              <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
                {['2024-12-8', '2024-12-9', '2024-12-10', '2024-12-11', '2024-12-12', '2024-12-13', '2024-12-14'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={
                          moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date() == 8
                            ? 'pointer-events-none opacity-50'
                            : date.format('YYYY-MM-D') == d
                            ? 'selected-date'
                            : !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'current-date'
                            : `aspect-square h-full grid place-items-center ${
                                isEnded ||
                                moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`
                        }>
                        {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date()}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
                {['2024-12-15', '2024-12-16', '2024-12-17', '2024-12-18', '2024-12-19', '2024-12-20', '2024-12-21'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={
                          date.format('YYYY-MM-D') == d
                            ? 'selected-date'
                            : !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'current-date'
                            : `aspect-square h-full grid place-items-center ${
                                isEnded ||
                                moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`
                        }>
                        {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date()}
                      </div>
                    )
                  }
                )}
              </div>
            </div>
            <div
              className={`transition-all space-y-4 absolute inset-0 duration-500 ${
                week == 0 ? 'translate-x-full' : week == 2 ? '-translate-x-full' : ''
              }`}>
              <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
                {['2024-12-22', '2024-12-23', '2024-12-24', '2024-12-25', '2024-12-26', '2024-12-27', '2024-12-28'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={
                          date.format('YYYY-MM-D') == d
                            ? 'selected-date'
                            : !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'current-date'
                            : `aspect-square h-full grid place-items-center ${
                                isEnded ||
                                moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`
                        }>
                        {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date()}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
                {['2024-12-29', '2024-12-30', '2024-12-31', '2025-01-1', '2025-01-2', '2025-01-3', '2025-01-4'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={
                          date.format('YYYY-MM-D') == d
                            ? 'selected-date'
                            : !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'current-date'
                            : `aspect-square h-full grid place-items-center ${
                                isEnded ||
                                moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`
                        }>
                        {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date()}
                      </div>
                    )
                  }
                )}
              </div>
            </div>
            <div className={`transition-all space-y-4 duration-500 ${week != 2 ? 'translate-x-full' : ''}`}>
              <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
                {['2024-12-29', '2024-12-30', '2024-12-31', '2025-01-1', '2025-01-2', '2025-01-3', '2025-01-4'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={
                          date.format('YYYY-MM-D') == d
                            ? 'selected-date'
                            : !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'current-date'
                            : `aspect-square h-full grid place-items-center ${
                                isEnded ||
                                moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`
                        }>
                        {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date()}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 [&>div]:cursor-pointer place-items-center gap-4'>
                {['2025-01-5', '2025-01-6', '2025-01-7', '2025-01-8', '2025-01-9', '2025-01-10', '2025-01-11'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={
                          date.format('YYYY-MM-D') == d
                            ? 'selected-date'
                            : !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'current-date'
                            : `aspect-square h-full grid place-items-center ${
                                isEnded ||
                                moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))
                                  ? ''
                                  : 'pointer-events-none opacity-50'
                              }`
                        }>
                        {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').date()}
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className='w-screen p-4 lg:max-w-[1160px] mx-auto relative'>
          <div
            className='flex items-center lg:justify-center gap-4 text-lg font-medium text-white w-full lg:text-3xl'
            onClick={() => setOpen(false)}>
            <svg
              width='33'
              height='32'
              viewBox='0 0 33 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='lg:hidden'>
              <path
                d='M20.3996 22.7969L13.5996 15.9969L20.3996 9.19688'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {t('31-day drawing challenge')}
          </div>
          <div className='relative'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='cursor-pointer absolute left-full top-0 ml-4 hidden lg:block'
              onClick={() => setOpen(false)}>
              <path d='M16 8L8 16M16 16L8 8' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
            <div className='mt-4 rounded-lg bg-white divide-y-[1px] lg:mt-11 relative'>
              <div className='grid grid-cols-7 items-center divide-x-[1px] lg:text-xl [&>div]:p-3 [&>div]:font-medium [&>div]:text-neutral-400 [&>div:first-child]:text-red-500'>
                <div className='text-center w-full'>S</div>
                <div className='text-center w-full'>M</div>
                <div className='text-center w-full'>T</div>
                <div className='text-center w-full'>W</div>
                <div className='text-center w-full'>T</div>
                <div className='text-center w-full'>F</div>
                <div className='text-center w-full'>S</div>
              </div>
              <div className='grid grid-cols-7 items-center divide-x-[1px] text-gray-black font-medium [&>div]:h-full text-[8px] lg:text-xs [&>div:first-child>.date]:text-red-500 [&_.date]:text-sm lg:[&_.date]:text-lg [&_.date]:font-semibold [&>div]:p-3'>
                {['', '2024-12-9', '2024-12-10', '2024-12-11', '2024-12-12', '2024-12-13', '2024-12-14'].map(
                  (d, index) => {
                    if (d == '') {
                      return <div key={index}></div>
                    }
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={`${
                          !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'bg-green-100'
                            : date.format('YYYY-MM-D') == d
                            ? 'bg-neutral-200'
                            : isEnded ||
                              (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh')) &&
                                topics.find((topic) => topic.date == d))
                            ? 'cursor-pointer'
                            : 'pointer-events-none opacity-50'
                        } flex flex-col items-center gap-1.5 min-h-28`}>
                        <div className='date'>
                          {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').format(width < 1024 && d != '2025-01-1' ? 'DD' : 'DD/MM')}
                        </div>
                        {topics.find((topic) => topic.date == d) ? (
                          <>
                            <div className='line-clamp-2 lg:line-clamp-1'>
                              {topics.find((topic) => topic.date == d)?.title}
                            </div>
                            <div className='w-[30px] h-[30px]'>
                              {topics.find((topic) => topic.date == d)?.sponser_logo ? (
                                <Image
                                  alt=''
                                  className='w-full aspect-square object-cover rounded-full'
                                  width={30}
                                  height={30}
                                  src={topics.find((topic) => topic.date == d)?.sponser_logo}
                                />
                              ) : null}
                            </div>
                          </>
                        ) : (
                          <div className='h-full grid place-items-center '>
                            <svg
                              width='15'
                              height='25'
                              viewBox='0 0 15 25'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M4.80859 17.3068V17.0909C4.82375 15.6818 4.9639 14.5606 5.22905 13.7273C5.50178 12.8939 5.88814 12.2197 6.38814 11.7045C6.88814 11.1894 7.49041 10.7197 8.19496 10.2955C8.6495 10.0076 9.05859 9.68561 9.42223 9.32955C9.78587 8.97348 10.0737 8.56439 10.2859 8.10227C10.498 7.64015 10.604 7.12879 10.604 6.56818C10.604 5.89394 10.445 5.31061 10.1268 4.81818C9.80859 4.32576 9.38435 3.94697 8.85405 3.68182C8.33132 3.40909 7.74799 3.27273 7.10405 3.27273C6.52072 3.27273 5.9639 3.39394 5.43359 3.63636C4.90329 3.87879 4.4639 4.25758 4.11541 4.77273C3.76693 5.2803 3.56617 5.93561 3.51314 6.73864H0.0585938C0.111624 5.375 0.456321 4.22348 1.09268 3.28409C1.72905 2.33712 2.56996 1.62121 3.61541 1.13636C4.66844 0.651514 5.83132 0.40909 7.10405 0.40909C8.49799 0.40909 9.71769 0.670454 10.7631 1.19318C11.8086 1.70833 12.6192 2.43182 13.195 3.36364C13.7783 4.28788 14.07 5.36742 14.07 6.60227C14.07 7.45076 13.9374 8.21591 13.6722 8.89773C13.4071 9.57197 13.0283 10.1742 12.5359 10.7045C12.051 11.2348 11.4677 11.7045 10.7859 12.1136C10.1419 12.5152 9.6192 12.9318 9.21768 13.3636C8.82375 13.7955 8.53587 14.3068 8.35405 14.8977C8.17223 15.4886 8.07375 16.2197 8.05859 17.0909V17.3068H4.80859ZM6.5245 24.2159C5.90329 24.2159 5.3692 23.9962 4.92223 23.5568C4.47526 23.1098 4.25178 22.572 4.25178 21.9432C4.25178 21.322 4.47526 20.7917 4.92223 20.3523C5.3692 19.9053 5.90329 19.6818 6.5245 19.6818C7.13814 19.6818 7.66844 19.9053 8.11541 20.3523C8.56996 20.7917 8.79723 21.322 8.79723 21.9432C8.79723 22.3598 8.69117 22.7424 8.47905 23.0909C8.2745 23.4318 8.00178 23.7045 7.66087 23.9091C7.31996 24.1136 6.94117 24.2159 6.5245 24.2159Z'
                                fill='#067537'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 items-center divide-x-[1px] text-gray-black font-medium [&>div]:h-full text-[8px] lg:text-xs [&>div:first-child>.date]:text-red-500 [&_.date]:text-sm lg:[&_.date]:text-lg [&_.date]:font-semibold [&>div]:p-3'>
                {['2024-12-15', '2024-12-16', '2024-12-17', '2024-12-18', '2024-12-19', '2024-12-20', '2024-12-21'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={`${
                          !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'bg-green-100'
                            : date.format('YYYY-MM-D') == d
                            ? 'bg-neutral-200'
                            : isEnded ||
                              (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh')) &&
                                topics.find((topic) => topic.date == d))
                            ? 'cursor-pointer'
                            : 'pointer-events-none opacity-50'
                        } flex flex-col items-center gap-1.5 min-h-28`}>
                        <div className='date'>
                          {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').format(width < 1024 && d != '2025-01-1' ? 'DD' : 'DD/MM')}
                        </div>
                        {topics.find((topic) => topic.date == d) ? (
                          <>
                            <div className='line-clamp-2 lg:line-clamp-1'>
                              {topics.find((topic) => topic.date == d)?.title}
                            </div>
                            <div className='w-[30px] h-[30px]'>
                              {topics.find((topic) => topic.date == d)?.sponser_logo ? (
                                <Image
                                  alt=''
                                  className='w-full aspect-square object-cover rounded-full'
                                  width={30}
                                  height={30}
                                  src={topics.find((topic) => topic.date == d)?.sponser_logo}
                                />
                              ) : null}
                            </div>
                          </>
                        ) : (
                          <div className='h-full grid place-items-center '>
                            <svg
                              width='15'
                              height='25'
                              viewBox='0 0 15 25'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M4.80859 17.3068V17.0909C4.82375 15.6818 4.9639 14.5606 5.22905 13.7273C5.50178 12.8939 5.88814 12.2197 6.38814 11.7045C6.88814 11.1894 7.49041 10.7197 8.19496 10.2955C8.6495 10.0076 9.05859 9.68561 9.42223 9.32955C9.78587 8.97348 10.0737 8.56439 10.2859 8.10227C10.498 7.64015 10.604 7.12879 10.604 6.56818C10.604 5.89394 10.445 5.31061 10.1268 4.81818C9.80859 4.32576 9.38435 3.94697 8.85405 3.68182C8.33132 3.40909 7.74799 3.27273 7.10405 3.27273C6.52072 3.27273 5.9639 3.39394 5.43359 3.63636C4.90329 3.87879 4.4639 4.25758 4.11541 4.77273C3.76693 5.2803 3.56617 5.93561 3.51314 6.73864H0.0585938C0.111624 5.375 0.456321 4.22348 1.09268 3.28409C1.72905 2.33712 2.56996 1.62121 3.61541 1.13636C4.66844 0.651514 5.83132 0.40909 7.10405 0.40909C8.49799 0.40909 9.71769 0.670454 10.7631 1.19318C11.8086 1.70833 12.6192 2.43182 13.195 3.36364C13.7783 4.28788 14.07 5.36742 14.07 6.60227C14.07 7.45076 13.9374 8.21591 13.6722 8.89773C13.4071 9.57197 13.0283 10.1742 12.5359 10.7045C12.051 11.2348 11.4677 11.7045 10.7859 12.1136C10.1419 12.5152 9.6192 12.9318 9.21768 13.3636C8.82375 13.7955 8.53587 14.3068 8.35405 14.8977C8.17223 15.4886 8.07375 16.2197 8.05859 17.0909V17.3068H4.80859ZM6.5245 24.2159C5.90329 24.2159 5.3692 23.9962 4.92223 23.5568C4.47526 23.1098 4.25178 22.572 4.25178 21.9432C4.25178 21.322 4.47526 20.7917 4.92223 20.3523C5.3692 19.9053 5.90329 19.6818 6.5245 19.6818C7.13814 19.6818 7.66844 19.9053 8.11541 20.3523C8.56996 20.7917 8.79723 21.322 8.79723 21.9432C8.79723 22.3598 8.69117 22.7424 8.47905 23.0909C8.2745 23.4318 8.00178 23.7045 7.66087 23.9091C7.31996 24.1136 6.94117 24.2159 6.5245 24.2159Z'
                                fill='#067537'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 items-center divide-x-[1px] text-gray-black font-medium [&>div]:h-full text-[8px] lg:text-xs [&>div:first-child>.date]:text-red-500 [&_.date]:text-sm lg:[&_.date]:text-lg [&_.date]:font-semibold [&>div]:p-3'>
                {['2024-12-22', '2024-12-23', '2024-12-24', '2024-12-25', '2024-12-26', '2024-12-27', '2024-12-28'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={`${
                          !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'bg-green-100'
                            : date.format('YYYY-MM-D') == d
                            ? 'bg-neutral-200'
                            : isEnded ||
                              (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh')) &&
                                topics.find((topic) => topic.date == d))
                            ? 'cursor-pointer'
                            : 'pointer-events-none opacity-50'
                        } flex flex-col items-center gap-1.5 min-h-28 relative`}>
                        {d == '2024-12-24' && (
                          <Image src={O1} alt='' className='absolute top-0 right-0 -translate-y-1/2 w-5 h-5 lg:w-auto lg:h-auto' />
                        )}
                        {d == '2024-12-25' && (
                          <Image src={O2} alt='' className='absolute top-0 right-0 -translate-y-1/2 w-5 h-5 lg:w-auto lg:h-auto' />
                        )}
                        <div className='date'>
                          {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').format(width < 1024 && d != '2025-01-1' ? 'DD' : 'DD/MM')}
                        </div>
                        {topics.find((topic) => topic.date == d) ? (
                          <>
                            <div className='line-clamp-2 lg:line-clamp-1'>
                              {topics.find((topic) => topic.date == d)?.title}
                            </div>
                            <div className='w-[30px] h-[30px]'>
                              {topics.find((topic) => topic.date == d)?.sponser_logo ? (
                                <Image
                                  alt=''
                                  className='w-full aspect-square object-cover rounded-full'
                                  width={30}
                                  height={30}
                                  src={topics.find((topic) => topic.date == d)?.sponser_logo}
                                />
                              ) : null}
                            </div>
                          </>
                        ) : (
                          <div className='h-full grid place-items-center '>
                            <svg
                              width='15'
                              height='25'
                              viewBox='0 0 15 25'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M4.80859 17.3068V17.0909C4.82375 15.6818 4.9639 14.5606 5.22905 13.7273C5.50178 12.8939 5.88814 12.2197 6.38814 11.7045C6.88814 11.1894 7.49041 10.7197 8.19496 10.2955C8.6495 10.0076 9.05859 9.68561 9.42223 9.32955C9.78587 8.97348 10.0737 8.56439 10.2859 8.10227C10.498 7.64015 10.604 7.12879 10.604 6.56818C10.604 5.89394 10.445 5.31061 10.1268 4.81818C9.80859 4.32576 9.38435 3.94697 8.85405 3.68182C8.33132 3.40909 7.74799 3.27273 7.10405 3.27273C6.52072 3.27273 5.9639 3.39394 5.43359 3.63636C4.90329 3.87879 4.4639 4.25758 4.11541 4.77273C3.76693 5.2803 3.56617 5.93561 3.51314 6.73864H0.0585938C0.111624 5.375 0.456321 4.22348 1.09268 3.28409C1.72905 2.33712 2.56996 1.62121 3.61541 1.13636C4.66844 0.651514 5.83132 0.40909 7.10405 0.40909C8.49799 0.40909 9.71769 0.670454 10.7631 1.19318C11.8086 1.70833 12.6192 2.43182 13.195 3.36364C13.7783 4.28788 14.07 5.36742 14.07 6.60227C14.07 7.45076 13.9374 8.21591 13.6722 8.89773C13.4071 9.57197 13.0283 10.1742 12.5359 10.7045C12.051 11.2348 11.4677 11.7045 10.7859 12.1136C10.1419 12.5152 9.6192 12.9318 9.21768 13.3636C8.82375 13.7955 8.53587 14.3068 8.35405 14.8977C8.17223 15.4886 8.07375 16.2197 8.05859 17.0909V17.3068H4.80859ZM6.5245 24.2159C5.90329 24.2159 5.3692 23.9962 4.92223 23.5568C4.47526 23.1098 4.25178 22.572 4.25178 21.9432C4.25178 21.322 4.47526 20.7917 4.92223 20.3523C5.3692 19.9053 5.90329 19.6818 6.5245 19.6818C7.13814 19.6818 7.66844 19.9053 8.11541 20.3523C8.56996 20.7917 8.79723 21.322 8.79723 21.9432C8.79723 22.3598 8.69117 22.7424 8.47905 23.0909C8.2745 23.4318 8.00178 23.7045 7.66087 23.9091C7.31996 24.1136 6.94117 24.2159 6.5245 24.2159Z'
                                fill='#067537'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 items-center divide-x-[1px] text-gray-black font-medium [&>div]:h-full text-[8px] lg:text-xs [&>div:first-child>.date]:text-red-500 [&_.date]:text-sm lg:[&_.date]:text-lg [&_.date]:font-semibold [&>div]:p-3'>
                {['2024-12-29', '2024-12-30', '2024-12-31', '2025-01-1', '2025-01-2', '2025-01-3', '2025-01-4'].map(
                  (d, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                        className={`${
                          !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                            ? 'bg-green-100'
                            : date.format('YYYY-MM-D') == d
                            ? 'bg-neutral-200'
                            : isEnded ||
                              (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh')) &&
                                topics.find((topic) => topic.date == d))
                            ? 'cursor-pointer'
                            : 'pointer-events-none opacity-50'
                        } flex flex-col items-center gap-1.5 min-h-28 relative`}>
                        <div className='date'>
                          {moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh').format(width < 1024 && d != '2025-01-1' ? 'DD' : 'DD/MM')}
                        </div>
                        {topics.find((topic) => topic.date == d) ? (
                          <>
                            <div className='line-clamp-2 lg:line-clamp-1'>
                              {topics.find((topic) => topic.date == d)?.title}
                            </div>
                            <div className='w-[30px] h-[30px]'>
                              {topics.find((topic) => topic.date == d)?.sponser_logo ? (
                                <Image
                                  alt=''
                                  className='w-full aspect-square object-cover rounded-full'
                                  width={30}
                                  height={30}
                                  src={topics.find((topic) => topic.date == d)?.sponser_logo}
                                />
                              ) : null}
                            </div>
                          </>
                        ) : (
                          <div className='h-full grid place-items-center '>
                            <svg
                              width='15'
                              height='25'
                              viewBox='0 0 15 25'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M4.80859 17.3068V17.0909C4.82375 15.6818 4.9639 14.5606 5.22905 13.7273C5.50178 12.8939 5.88814 12.2197 6.38814 11.7045C6.88814 11.1894 7.49041 10.7197 8.19496 10.2955C8.6495 10.0076 9.05859 9.68561 9.42223 9.32955C9.78587 8.97348 10.0737 8.56439 10.2859 8.10227C10.498 7.64015 10.604 7.12879 10.604 6.56818C10.604 5.89394 10.445 5.31061 10.1268 4.81818C9.80859 4.32576 9.38435 3.94697 8.85405 3.68182C8.33132 3.40909 7.74799 3.27273 7.10405 3.27273C6.52072 3.27273 5.9639 3.39394 5.43359 3.63636C4.90329 3.87879 4.4639 4.25758 4.11541 4.77273C3.76693 5.2803 3.56617 5.93561 3.51314 6.73864H0.0585938C0.111624 5.375 0.456321 4.22348 1.09268 3.28409C1.72905 2.33712 2.56996 1.62121 3.61541 1.13636C4.66844 0.651514 5.83132 0.40909 7.10405 0.40909C8.49799 0.40909 9.71769 0.670454 10.7631 1.19318C11.8086 1.70833 12.6192 2.43182 13.195 3.36364C13.7783 4.28788 14.07 5.36742 14.07 6.60227C14.07 7.45076 13.9374 8.21591 13.6722 8.89773C13.4071 9.57197 13.0283 10.1742 12.5359 10.7045C12.051 11.2348 11.4677 11.7045 10.7859 12.1136C10.1419 12.5152 9.6192 12.9318 9.21768 13.3636C8.82375 13.7955 8.53587 14.3068 8.35405 14.8977C8.17223 15.4886 8.07375 16.2197 8.05859 17.0909V17.3068H4.80859ZM6.5245 24.2159C5.90329 24.2159 5.3692 23.9962 4.92223 23.5568C4.47526 23.1098 4.25178 22.572 4.25178 21.9432C4.25178 21.322 4.47526 20.7917 4.92223 20.3523C5.3692 19.9053 5.90329 19.6818 6.5245 19.6818C7.13814 19.6818 7.66844 19.9053 8.11541 20.3523C8.56996 20.7917 8.79723 21.322 8.79723 21.9432C8.79723 22.3598 8.69117 22.7424 8.47905 23.0909C8.2745 23.4318 8.00178 23.7045 7.66087 23.9091C7.31996 24.1136 6.94117 24.2159 6.5245 24.2159Z'
                                fill='#067537'
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )
                  }
                )}
              </div>
              <div className='grid grid-cols-7 items-center divide-x-[1px] text-gray-black font-medium [&>div]:h-full text-[8px] lg:text-xs [&>div:first-child>.date]:text-red-500 [&_.date]:text-sm lg:[&_.date]:text-lg [&_.date]:font-semibold [&>div]:p-3'>
                {['2025-01-5', '2025-01-6', '2025-01-7', '2025-01-8', '', '', ''].map((d, index) => {
                  if (!d) return <div key={index} />
                  return (
                    <div
                      key={index}
                      onClick={() => setDate(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh'))}
                      className={`${
                        !isEnded && moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-D') == d
                          ? 'bg-green-100'
                          : date.format('YYYY-MM-D') == d
                          ? 'bg-neutral-200'
                          : isEnded ||
                            (moment().tz('Asia/Ho_Chi_Minh').isAfter(moment.tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh')) &&
                              topics.find((topic) => topic.date == d))
                          ? 'cursor-pointer'
                          : 'pointer-events-none opacity-50'
                      } flex flex-col items-center gap-1.5 min-h-28 relative`}>
                      {d == '2025-01-8' && (
                        <Image src={O3} alt='' className='absolute top-0 right-0 -translate-y-1/2 w-5 h-5 lg:w-auto lg:h-auto' />
                      )}
                      <div className='date relative z-10'>
                        {moment
                          .tz(d, 'YYYY-MM-D', 'Asia/Ho_Chi_Minh')
                          .format(width < 1024 && d != '2025-01-1' ? 'DD' : 'DD/MM')}
                      </div>
                      {topics.find((topic) => topic.date == d) ? (
                        <>
                          <div className='line-clamp-2 lg:line-clamp-1'>
                            {topics.find((topic) => topic.date == d)?.title}
                          </div>
                          <div className='w-[30px] h-[30px]'>
                            {topics.find((topic) => topic.date == d)?.sponser_logo ? (
                              <Image
                                alt=''
                                className='w-full aspect-square object-cover rounded-full'
                                width={30}
                                height={30}
                                src={topics.find((topic) => topic.date == d)?.sponser_logo}
                              />
                            ) : null}
                          </div>
                        </>
                      ) : (
                        <div className='h-full grid place-items-center '>
                          <svg
                            width='15'
                            height='25'
                            viewBox='0 0 15 25'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M4.80859 17.3068V17.0909C4.82375 15.6818 4.9639 14.5606 5.22905 13.7273C5.50178 12.8939 5.88814 12.2197 6.38814 11.7045C6.88814 11.1894 7.49041 10.7197 8.19496 10.2955C8.6495 10.0076 9.05859 9.68561 9.42223 9.32955C9.78587 8.97348 10.0737 8.56439 10.2859 8.10227C10.498 7.64015 10.604 7.12879 10.604 6.56818C10.604 5.89394 10.445 5.31061 10.1268 4.81818C9.80859 4.32576 9.38435 3.94697 8.85405 3.68182C8.33132 3.40909 7.74799 3.27273 7.10405 3.27273C6.52072 3.27273 5.9639 3.39394 5.43359 3.63636C4.90329 3.87879 4.4639 4.25758 4.11541 4.77273C3.76693 5.2803 3.56617 5.93561 3.51314 6.73864H0.0585938C0.111624 5.375 0.456321 4.22348 1.09268 3.28409C1.72905 2.33712 2.56996 1.62121 3.61541 1.13636C4.66844 0.651514 5.83132 0.40909 7.10405 0.40909C8.49799 0.40909 9.71769 0.670454 10.7631 1.19318C11.8086 1.70833 12.6192 2.43182 13.195 3.36364C13.7783 4.28788 14.07 5.36742 14.07 6.60227C14.07 7.45076 13.9374 8.21591 13.6722 8.89773C13.4071 9.57197 13.0283 10.1742 12.5359 10.7045C12.051 11.2348 11.4677 11.7045 10.7859 12.1136C10.1419 12.5152 9.6192 12.9318 9.21768 13.3636C8.82375 13.7955 8.53587 14.3068 8.35405 14.8977C8.17223 15.4886 8.07375 16.2197 8.05859 17.0909V17.3068H4.80859ZM6.5245 24.2159C5.90329 24.2159 5.3692 23.9962 4.92223 23.5568C4.47526 23.1098 4.25178 22.572 4.25178 21.9432C4.25178 21.322 4.47526 20.7917 4.92223 20.3523C5.3692 19.9053 5.90329 19.6818 6.5245 19.6818C7.13814 19.6818 7.66844 19.9053 8.11541 20.3523C8.56996 20.7917 8.79723 21.322 8.79723 21.9432C8.79723 22.3598 8.69117 22.7424 8.47905 23.0909C8.2745 23.4318 8.00178 23.7045 7.66087 23.9091C7.31996 24.1136 6.94117 24.2159 6.5245 24.2159Z'
                              fill='#067537'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
