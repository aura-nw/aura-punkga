import Image from 'next/image'
import R1Mascot from './assets/r1-mascot.gif'
import R2Mascot from './assets/r2-mascot.gif'
import R3Mascot from './assets/r3-mascot.svg'
import R2GrayMascot from './assets/r2-gray-mascot.svg'
import R3GrayMascot from './assets/r3-gray-mascot.svg'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import CheckedRadio from 'assets/images/icons/radio-check.svg'
import UncheckedRadio from 'assets/images/icons/radio-uncheck.svg'
import moment from 'moment'
import useSWR from 'swr'
import Tooltip from 'components/Tooltip'
export default function TimeLine() {
  const { t } = useTranslation()
  const r2started = moment().isAfter('2024-07-24')
  const r3started = moment().isAfter('2024-07-31')
  const { data, isLoading } = useSWR(
    'https://script.google.com/macros/s/AKfycbxCf6YPrB9XE6DGlDStEGVa2J0THciOVqe8jnRt8XqA77P4Ce-1dH0kNVue8tjZDotqcA/exec',
    (url) => fetch(url).then((res) => res.json())
  )
  return (
    <div className='mt-6 md:mt-8 lg:flex-row lg:bg-white relative flex flex-col gap-4 lg:py-4 lg:rounded-mlg'>
      <div className='hidden lg:flex gap-1.5 items-center absolute w-[70%] left-1/2 -translate-x-1/2 h-[1px] bottom-[145px]'>
        <Image src={CheckedRadio} alt='' className='w-6 h-6 shrink-0' />
        <div className='border-t border-border-primary border-dashed w-full'></div>
        <Image src={r2started ? CheckedRadio : UncheckedRadio} alt='' className='w-6 h-6 shrink-0' />
        <div className='border-t border-border-primary border-dashed w-full'></div>
        <Image src={r3started ? CheckedRadio : UncheckedRadio} alt='' className='w-6 h-6 shrink-0' />
      </div>
      <div className='bg-white p-4 rounded-mlg w-full flex flex-col gap-3.5 lg:gap-14 items-center'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='h-[107px] grid place-items-center'>
            <Image src={R1Mascot} alt='' className='h-[103px] w-auto' />
          </div>
          <div className='font-semibold flex items-center gap-3'>
            {t('Round 1: To the Island!')}
            <Tooltip label={t('View on Facebook')}>
              <Link
                href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02yY6c5KZ9R897PP8WUZu7c1wxmMcJe7W3YRXPcRVUFoNysQFDMydNtqYbTP6bPZV6l'
                target='_blank'>
                <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
                  <path
                    d='M7.75 2.5H4.75C3.50736 2.5 2.5 3.50735 2.5 4.74999V12.25C2.5 13.4926 3.50736 14.5 4.75 14.5H12.25C13.4926 14.5 14.5 13.4926 14.5 12.25V9.24996M10.7496 2.50018L14.5 2.5M14.5 2.5V5.87507M14.5 2.5L8.12445 8.87478'
                    stroke='#2D72FB'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </Link>
            </Tooltip>
          </div>
        </div>
        <div
          className={`border lg:w-fit ${
            r2started ? 'border-none' : 'border-border-brand-defaul'
          } rounded-mlg p-4 flex gap-5 w-full`}>
          <div className=''>
            <div className='text-text-teriary text-sm font-medium'>{t('Start')}</div>
            <div className='font-semibold'>17/7 - 23/7</div>
          </div>
          <div className='h-[47px] w-[1px] bg-border-teriary'></div>
          <div className=''>
            <div className='text-text-teriary text-sm font-medium'>{t('Participants')}</div>
            <div className='font-semibold'>
              {+data?.generalData?.find((value) => value.key == 'Round 1 Participants')?.value || '---'}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-4 rounded-mlg w-full flex flex-col gap-3.5 lg:gap-14 items-center'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='h-[107px] grid place-items-center'>
            <Image src={r2started ? R2Mascot : R2GrayMascot} alt='' className='h-[107px] w-auto' />
          </div>
          <div className='font-semibold flex items-center gap-3'>{t('Round 2: Adventure Time!')}</div>
        </div>
        <div
          className={`border lg:w-fit ${
            r2started
              ? r3started
                ? 'border-none'
                : 'border-border-brand-defaul'
              : 'border-border-primary bg-neutral-50'
          } rounded-mlg p-4 flex gap-5 w-full`}>
          <div className=''>
            <div className='text-text-teriary text-sm font-medium'>{t('Start')}</div>
            <div className='font-semibold'>24/7 - 30/7</div>
          </div>
          <div className='h-[47px] w-[1px] bg-border-teriary'></div>
          <div className=''>
            <div className='text-text-teriary text-sm font-medium'>{t('Participants')}</div>
            <div className='font-semibold'>
              {+data?.generalData?.find((value) => value.key == 'Round 2 Participants')?.value || '---'}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-4 rounded-mlg w-full flex flex-col gap-3.5 lg:gap-14 items-center'>
        <div className='flex flex-col gap-4 items-center'>
          <div className='h-[107px] grid place-items-center'>
            <Image src={r3started ? R3Mascot : R3GrayMascot} alt='' className='h-[83px] w-auto' />
          </div>
          <div className='font-semibold flex items-center gap-3'>{t('Round 3: Golden Treasure!')}</div>
        </div>
        <div
          className={`border lg:w-fit ${
            r3started ? 'border-border-brand-defaul' : 'border-border-primary bg-neutral-50'
          } rounded-mlg p-4 flex gap-5 w-full`}>
          <div className=''>
            <div className='text-text-teriary text-sm font-medium'>{t('Start')}</div>
            <div className='font-semibold'>31/7 - 13/8</div>
          </div>
          <div className='h-[47px] w-[1px] bg-border-teriary'></div>
          <div className=''>
            <div className='text-text-teriary text-sm font-medium'>{t('Participants')}</div>
            <div className='font-semibold'>
              {+data?.generalData?.find((value) => value.key == 'Round 3 Participants')?.value || '---'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
