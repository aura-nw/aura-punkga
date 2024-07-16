import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Mascot from './assets/Mascot2.png'
export default function Artworks() {
  const {t} = useTranslation()
  return (
    <div className='mt-8'>
      <div className='text-xl font-medium'>{t('Artworks')}</div>
      <div className='mt-8 flex justify-center items-center gap-4 flex-col py-8'>
        <Image src={Mascot} alt='' className='w-[160px]' />
        <div className='font-medium text-center'>{t('Artist composing')}</div>
      </div>
    </div>
  )
}
