import moment from 'moment'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Timeline() {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col items-center w-full mt-10 xl:mt-8 xl:flex-row xl:max-w-[1280px] mx-auto'>
      <div
        className={`lg:min-h-[138px] max-w-[400px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
          moment().isAfter(moment('2024-06-03'))
            ? moment().isBefore(moment('2024-06-10'))
              ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
              : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
            : 'border-[#DEDEDE]'
        }`}>
        <div className='font-semibold leading-5'>{t('Round 1: Show YOURSELF')}</div>
        <div className='flex gap-6 justify-between'>
          <div className='flex flex-col gap-1 w-[40%]'>
            <div className='text-sm leading-[18px]'>{t('Start')}</div>
            <div className='font-semibold'>03/06 - 10/06</div>
          </div>
          <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
          <div className='flex flex-col gap-1 w-[40%]'>
            <div className='text-sm leading-[18px]'>{t('Participants')}:</div>
            <div className='font-semibold'>166</div>
          </div>
        </div>
        <Link
          href='https://www.facebook.com/PunkgaMeManga/posts/pfbid02fm2AemHFfMWPaZxPceJHyQbj1PsPUkfXCoJbLZJGAJuXCfpc49apQknwdkdEfkhbl?rdid=2Ew6QNhR0hxgSi2o'
          target='_blank'
          className='text-[#2684FC] text-sm'>
          {t('View on facebook')}
        </Link>
      </div>
      <div className='w-[1px] h-[32px] xl:flex-1 xl:h-[1px] xl:min-w-5 xl:shrink-0 bg-[#1C1C1C1A]'></div>
      <div
        className={`xl:min-h-[138px] max-w-[400px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
          moment().isAfter(moment('2024-06-11'))
            ? moment().isBefore(moment('2024-06-17'))
              ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
              : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
            : 'border-[#DEDEDE]'
        }`}>
        <div className='font-semibold leading-5'>{t('Round 2: Know YOURSELF')}</div>
        <div className='flex gap-6 justify-between'>
          <div className='flex flex-col gap-1 w-[40%]'>
            <div className='text-sm leading-[18px]'>{t('Start')}</div>
            <div className='font-semibold'>11/06 - 17/06</div>
          </div>
          <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
          <div className='flex flex-col gap-1 w-[40%]'>
            <div className='text-sm leading-[18px]'>{t('Participants')}:</div>
            <div className='font-semibold'>99</div>
          </div>
        </div>
        <Link
          href='https://www.facebook.com/share/p/jY6aHWWyANt7EzeU/'
          target='_blank'
          className='text-[#2684FC] text-sm'>
          {t('View on facebook')}
        </Link>
      </div>
      <div className='w-[1px] h-[32px] xl:flex-1 xl:h-[1px] xl:min-w-5 xl:shrink-0 bg-[#1C1C1C1A]'></div>
      <div
        className={`xl:min-h-[138px] max-w-[400px] w-full rounded-2xl py-3 px-4 flex flex-col gap-3 border-2 ${
          moment().isAfter(moment('2024-06-18'))
            ? moment().isBefore(moment('2024-06-30'))
              ? 'border-[#1FAB5E] shadow-[0px_0px_0px_2px_#23FF81]'
              : 'shadow-[0px_0px_0px_2px_#23FF81] bg-[#F6FEF9]'
            : 'border-[#DEDEDE]'
        }`}>
        <div className='font-semibold leading-5'>{t('Round 3: Grow YOURSELF')}</div>
        <div className='flex gap-6 justify-between'>
          <div className='flex flex-col gap-1 w-[40%]'>
            <div className='text-sm leading-[18px]'>{t('Start')}</div>
            <div className='font-semibold'>18/06 - 30/06</div>
          </div>
          <div className='w-[1px] h-[43px] bg-[#1C1C1C1A]'></div>
          <div className='flex flex-col gap-1 w-[40%]'>
            <div className='text-sm leading-[18px]'>{t('Participants')}:</div>
            <div className='font-semibold'>---</div>
          </div>
        </div>
        <Link
          href='https://www.facebook.com/PunkgaMeManga/posts/pfbid0kpG4XKiWEeC4GNfydCkAweTXsHTMJThpbSLH7cJpwC6NDAUifdPmsW3xfthVtLMPl'
          target='_blank'
          className='text-[#2684FC] text-sm'>
          {t('View on facebook')}
        </Link>
      </div>
    </div>
  )
}
