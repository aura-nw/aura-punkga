import Chip from 'components/core/Chip'
import GallerySwiper from 'components/pages/launchpad/GallerySwiper'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Launchpad } from 'src/models/launchpad'
import { getLaunchPadDetail } from 'src/services'
import { useReadContract } from 'wagmi'
import useSWR from 'swr'

export default function Page() {
  const { query, locale } = useRouter()
  const { t } = useTranslation()
  const slug = query.slug as string
  const { data, isLoading } = useSWR<Launchpad>({ key: 'fecth-launchpad-detail', slug }, ({ slug }) =>
    getLaunchPadDetail(slug)
  )
  console.log(data)
  if (!data) {
    return null
  }
  const getChip = () => {
    return <Chip color='error'>{t('Ended')}</Chip>
  }
  return (
    <div className='py-8 px-4 pk-container'>
      <GallerySwiper images={data?.featured_images} />
      <div className='mt-8'>
        <div className='flex gap-2.5'>
          {getChip()}
        </div>
      </div>
    </div>
  )
}
