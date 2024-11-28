import Image1 from 'components/pages/event/your-city/assets/onboarding.png'
import Image2 from 'components/pages/event/your-city/assets/image716.png'
import Image from 'next/image'
import Logo from 'components/pages/event/your-city/assets/logo.svg'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <PageContent {...props} />
}
function PageContent() {
  const { t } = useTranslation()
  return (
    <div className='bg-[#ffffff] min-h-screen relative px-4 lg:px-32 py-10'>
      <Image src={Image1} alt='' className='absolute top-0 w-[40%] h-full right-0 hidden lg:block' />
      <div className='flex flex-col items-center w-full mx-auto max-w-sm lg:mx-0 lg:max-w-none lg:w-1/2'>
        <Image src={Image2} alt='' className='w-full' />
        <div className='relative'>
          <Image src={Logo} alt='' className='w-72 mt-9' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            className='animate-pulse absolute bottom-0 right-0'>
            <path
              d='M9.15055 0.617188L9.64284 3.60593C10.0831 6.27907 12.1783 8.3742 14.8514 8.8145L17.8402 9.3068L14.8514 9.79909C12.1783 10.2394 10.0831 12.3345 9.64284 15.0077L9.15055 17.9964L8.65825 15.0077C8.21795 12.3345 6.12281 10.2394 3.44968 9.79909L0.460938 9.3068L3.44968 8.8145C6.12282 8.3742 8.21795 6.27906 8.65825 3.60593L9.15055 0.617188Z'
              fill='#0B0B0B'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='13'
            viewBox='0 0 12 13'
            fill='none'
            className='absolute top-10 left-0 -translate-x-1/2 animate-[pulse_1.5s_ease-in-out_infinite]'>
            <path
              d='M5.90893 0.867188L6.24369 2.89953C6.5431 4.71727 7.96779 6.14195 9.78552 6.44136L11.8179 6.77612L9.78552 7.11088C7.96779 7.41029 6.5431 8.83498 6.24369 10.6527L5.90893 12.6851L5.57417 10.6527C5.27477 8.83498 3.85008 7.41029 2.03234 7.11088L0 6.77612L2.03235 6.44136C3.85008 6.14195 5.27477 4.71726 5.57417 2.89953L5.90893 0.867188Z'
              fill='#0B0B0B'
            />
          </svg>
        </div>
        <Link href='/events/your-city/home' className='p-2.5 text-center font-roboto text-[22px] uppercase font-bold bg-neutral-black text-white w-full lg:w-[418px] mt-20'>
          {t('START')}
        </Link>
      </div>
    </div>
  )
}
