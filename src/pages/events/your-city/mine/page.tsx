import Logo from 'components/pages/event/your-city/assets/logo-punktober.png'
import Image from 'next/image'
import { formatNumber } from 'src/utils'
import Point from 'components/pages/event/your-city/assets/dp.svg'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'calendar' | 'collection'>('calendar')
  return (
    <div className='w-full flex flex-col items-center p-4'>
      <Image src={Logo} alt='' className='h-[74px] w-auto' />
      <div className='font-bold uppercase font-roboto mt-4'>City of [Username]</div>
      <div className='grid grid-cols-[1fr_auto_1fr] gap-10 w-full mt-4'>
        <div className='flex flex-col items-center gap-2.5'>
          <div className='text-gray-800 text-sm'>{t('Submitted')}</div>
          <div className='text-gray-black text-xl font-semibold'>23 Artworks</div>
        </div>
        <div className='w-[1px] h-14 bg-neutral-black'></div>
        <div className='flex flex-col items-center gap-2.5'>
          <div className='text-gray-800 text-sm'>{t('Earned')}</div>
          <div className='text-gray-black text-xl font-semibold flex items-center gap-1'>
            100 <Image src={Point} width={24} height={24} alt='' />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center lg:justify-between w-full mt-8'>
        <div className='hidden lg:flex gap-4 bg-[#E1E1E1] p-1 rounded-full'>
          <div
            onClick={() => setTab('calendar')}
            className={`h-[30px] flex items-center gap-1.5 px-2.5 ${
              tab == 'calendar' ? 'bg-white rounded-full text-text-primary' : 'text-text-teriary'
            }`}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M16 3L16 6M8 3L8 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14 4H10L10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6L6 4.07612C5.02492 4.17203 4.36857 4.38879 3.87868 4.87868C3 5.75736 3 7.17157 3 10V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V10C21 7.17157 21 5.75736 20.1213 4.87868C19.6314 4.38879 18.9751 4.17203 18 4.07612L18 6C18 7.10457 17.1046 8 16 8C14.8954 8 14 7.10457 14 6L14 4ZM7 12C7 11.4477 7.44772 11 8 11L16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13L8 13C7.44772 13 7 12.5523 7 12ZM8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17L16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15L8 15Z'
                fill='currentColor'
              />
            </svg>
            <span className='text-sm font-medium'>View as calendar</span>
          </div>
          <div
            onClick={() => setTab('collection')}
            className={`h-[30px] flex items-center gap-1.5 px-2.5 ${
              tab == 'collection' ? 'bg-white rounded-full text-text-primary' : 'text-text-teriary'
            }`}>
            <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.09974 12.5984V15.2983C8.09974 16.7831 6.88469 17.9982 5.39983 17.9982H2.69991C1.21505 17.9982 0 16.7831 0 15.2983V12.5984C0 11.1135 1.21505 9.89844 2.69991 9.89844H5.39983C6.88469 9.89844 8.09974 11.1135 8.09974 12.5984Z'
                fill='currentColor'
              />
              <path
                d='M8.09974 2.69991V5.39983C8.09974 6.88469 6.88469 8.09974 5.39983 8.09974H2.69991C1.21505 8.09974 0 6.88469 0 5.39983V2.69991C0 1.21505 1.21505 0 2.69991 0H5.39983C6.88469 0 8.09974 1.21505 8.09974 2.69991Z'
                fill='currentColor'
              />
              <path
                d='M18.0001 12.5984V15.2983C18.0001 16.7831 16.7851 17.9982 15.3002 17.9982H12.6003C11.1154 17.9982 9.90039 16.7831 9.90039 15.2983V12.5984C9.90039 11.1135 11.1154 9.89844 12.6003 9.89844H15.3002C16.7851 9.89844 18.0001 11.1135 18.0001 12.5984Z'
                fill='currentColor'
              />
              <path
                d='M18.0001 2.69991V5.39983C18.0001 6.88469 16.7851 8.09974 15.3002 8.09974H12.6003C11.1154 8.09974 9.90039 6.88469 9.90039 5.39983V2.69991C9.90039 1.21505 11.1154 0 12.6003 0H15.3002C16.7851 0 18.0001 1.21505 18.0001 2.69991Z'
                fill='currentColor'
              />
            </svg>
            <span className='text-sm font-medium'>View as collection</span>
          </div>
        </div>
        <div className='text-[#009640] font-medium text-sm flex items-center gap-1.5 w-full lg:w-fit justify-center'>
          Share collection
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M16.6673 9.9974L11.334 4.16406V7.08073C8.66732 7.08073 3.33398 8.83073 3.33398 15.8307C3.33398 14.8582 4.93398 12.9141 11.334 12.9141V15.8307L16.6673 9.9974Z'
              fill='#009640'
              stroke='#009640'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'></div>
    </div>
  )
}
