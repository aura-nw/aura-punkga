import RuleAndAward from 'components/pages/event/ava-2024/RuleAndAward'
import Background from 'components/pages/event/ava-2024/assets/Main_Map.png'
import Map from 'components/pages/event/ava-2024/assets/Map.svg'
import Decor from 'components/pages/event/ava-2024/assets/decor.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import Round1Submission from './round1Submission'
import Round2Submission from './round2Submission'

import DecorLeft from 'components/pages/event/ava-2024/assets/decor-left.png'
import DecorRight from 'components/pages/event/ava-2024/assets/decor-right.png'
import DecorMiddle from 'components/pages/event/ava-2024/assets/decor-middle.png'
export default function Event() {
  const { account } = useContext(Context)
  const { setSignInOpen } = useContext(ModalContext)
  const { t } = useTranslation()
  const searchParams = new URLSearchParams(location.search)
  const [round, setRound] = useState(
    searchParams.get('tab') == 'round-3' ? 3 : searchParams.get('tab') == 'round-2' ? 2 : 1
  )
  useEffect(() => {
    if (!account) {
      setSignInOpen(true)
    }
  }, [account])
  const guideContentRef = useRef<any>()
  return (
    <>
      <div
        className='bg-no-repeat min-h-screen w-full -mt-20 relative bg-cover'
        style={{ backgroundImage: `url(${Background.src})` }}>
        <div className='absolute left-0 bottom-0 h-screen'>
          <svg
            width='143'
            height='998'
            viewBox='0 0 143 998'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-full'>
            <path
              d='M33.1367 931.589L33.1367 953.562L55.1094 953.562L55.1094 887.644L143 887.644L143 997.507L99.0547 997.507L99.0547 953.562L110.041 953.562L110.041 931.589L88.0684 931.589L88.0684 997.507L0.177734 997.507L0.177729 887.644L44.123 887.644L44.123 931.589L33.1367 931.589ZM110.041 876.657L0.177729 876.657L0.177727 832.712L88.0684 832.712L110.041 810.739L0.177726 810.739L0.177724 766.794L143 766.794L143 843.698L110.041 876.657ZM110.041 711.862L110.041 689.89L88.0683 689.89L110.041 711.862ZM0.177724 755.808L0.177719 645.944L44.123 645.944L60.6025 662.424L77.082 645.944L143 645.944L143 755.808L0.177724 755.808ZM33.1367 711.862L55.1094 711.862L33.1367 689.89L33.1367 711.862ZM0.177714 536.081L0.177711 459.177L143 459.177L143 503.122L33.1367 503.122L55.1094 525.095L143 525.095L143 569.04L55.1094 569.04L33.1367 591.013L143 591.013L143 634.958L0.177718 634.958L0.177715 558.054L14.1304 547.067L0.177714 536.081ZM33.1367 448.19L0.17771 448.19L0.177708 404.245L33.1367 404.245L33.1367 448.19ZM44.123 404.245L143 404.245L143 448.19L44.123 448.19L44.123 404.245ZM33.1367 327.341L33.1367 349.313L55.1093 349.313L55.1093 283.396L143 283.395L143 393.259L99.0547 393.259L99.0547 349.313L110.041 349.313L110.041 327.341L88.0683 327.341L88.0683 393.259L0.177708 393.259L0.177703 283.396L44.123 283.396L44.123 327.341L33.1367 327.341ZM33.1367 206.491L33.1367 228.464L55.1093 228.464L55.1093 162.546L143 162.546L143 272.409L99.0547 272.409L99.0547 228.464L110.041 228.464L110.041 206.491L88.0683 206.491L88.0683 272.409L0.177702 272.409L0.177698 162.546L44.123 162.546L44.123 206.491L33.1367 206.491ZM33.1367 151.56L0.177697 151.56L0.177695 107.614L33.1367 107.614L33.1367 151.56ZM44.123 107.614L143 107.614L143 151.56L44.123 151.56L44.123 107.614ZM110.041 52.6826L110.041 30.71L33.1367 30.71L33.1367 52.6826L110.041 52.6826ZM143 96.6279L0.177695 96.6279L0.17769 -13.2354L143 -13.2354L143 96.6279ZM33.1367 -134.085L143 -134.085L143 -90.1397L55.1093 -90.1397L33.1367 -68.167L143 -68.167L143 -24.2217L0.177689 -24.2217L0.177686 -101.126L33.1367 -134.085ZM33.1367 -244.827L55.1093 -244.827L77.082 -266.8L33.1367 -266.8L33.1367 -244.827ZM121.027 -266.8L99.0546 -244.827L143 -244.827L143 -200.882L0.177682 -200.882L0.177677 -310.745L77.082 -310.745L121.027 -266.8ZM110.041 -365.677L110.041 -387.649L33.1367 -387.649L33.1367 -365.677L110.041 -365.677ZM143 -321.731L0.177676 -321.731L0.177672 -431.595L143 -431.595L143 -321.731ZM33.1367 -486.526L66.0956 -486.526L88.0683 -508.499L33.1367 -508.499L33.1367 -486.526ZM132.014 -508.499L110.041 -486.526L143 -486.526L143 -442.581L0.177671 -442.581L0.177666 -552.444L77.082 -552.444L99.0546 -530.472L121.027 -552.444L143 -552.444L143 -508.499L132.014 -508.499ZM33.1366 -640.335L143 -640.335L143 -596.39L33.1366 -596.39L33.1367 -563.431L0.177666 -563.431L0.177661 -673.294L33.1366 -673.294L33.1366 -640.335ZM110.041 -728.226L143 -728.226L143 -684.28L0.177661 -684.28L0.177657 -761.185L33.1366 -794.144L143 -794.144L143 -750.198L132.014 -750.198L110.041 -728.226ZM88.0683 -750.198L55.1093 -750.198L33.1366 -728.226L66.0956 -728.226L88.0683 -750.198ZM143 -805.13L0.177655 -805.13L0.177653 -849.075L110.041 -849.075L110.041 -871.048L88.0683 -871.048L88.0683 -914.993L143 -914.993L143 -805.13Z'
              fill='#222222'
            />
          </svg>
        </div>
        <Image src={DecorLeft} alt='' className='absolute top-16 left-0 w-[10%]' />
        <Image src={DecorMiddle} alt='' className='absolute top-[48px] lg:top-[68px] left-[60%] w-[10%]' />
        <Image src={DecorRight} alt='' className='absolute top-16 right-0 w-[10%]' />

        <div className='relative pk-container mx-auto pt-24 text-white'>
          <div className='py-10'>
            <div className='flex w-full flex-col-reverse lg:flex-row gap-5 justify-between lg:items-center relative z-10'>
              <div className='text-3xl font-medium'>{t('Submission Portal')}</div>
              <div className='flex w-full justify-between flex-row-reverse lg:w-fit lg:justify-end lg:flex-row pr-3 lg:pr-0 items-center gap-10'>
                <div className='w-[50px] lg:w-[16.5%]'>
                  <RuleAndAward />
                </div>
                <Link
                  href={`/events/ava-2024/map`}
                  className='flex items-center text-sm font-semibold gap-2 whitespace-nowrap '>
                  <Image src={Map} alt='' className='w-[50px]' />
                  {t('Back to map')}
                </Link>
              </div>
            </div>
            <div className='mt-4 flex gap-2 -skew-x-12'>
              <div className='h-9 w-3 rounded bg-white'></div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 1 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(1)}>
                <span className='skew-x-12'>{t('Round 1')}</span>
              </div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 2 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(2)}>
                <span className='skew-x-12'>{t('Round 2')}</span>
              </div>
              <div
                className={`h-9 grid place-items-center rounded ${
                  round == 3 ? 'bg-white text-black' : 'bg-gray-500 text-white'
                } text-sm font-semibold px-3.5 cursor-pointer`}
                onClick={() => setRound(3)}>
                <span className='skew-x-12'>{t('Round 3')}</span>
              </div>
            </div>
            <div className='mt-8'>
              {round == 1 ? (
                <>
                  <Round1Submission />
                </>
              ) : round == 2 ? (
                // <>
                //   <Round2Submission />
                // </>
                <>
                  <div className='font-jaro text-2xl w-full text-center h-[20vh] grid place-items-center'>
                    {t('Coming soon')}!
                  </div>
                </>
              ) : (
                <>
                  <div className='font-jaro text-2xl w-full text-center h-[20vh] grid place-items-center'>
                    {t('Coming soon')}!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
