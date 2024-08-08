import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getArtistArtworks } from 'src/services'
import useSWR from 'swr'
import Manga from '../homepage/manga'
export default function ArtworkList({ id }) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSWR(
    {
      key: 'fetch-artist-artworks',
      id,
      page,
    },
    ({ id, page }) => (id ? getArtistArtworks(id, (page - 1) * 12) : null)
  )

  const { t } = useTranslation()
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4'>
        {Array(6)
          .fill(0)
          ?.map((c, index) => (
            <div key={index}>
              <Skeleton className='w-full aspect-square' />
            </div>
          ))}
      </div>
    )
  }
  return (
    <div>
      {data?.artworks?.length ? (
        <div className='grid grid-cols-2 gap-4'>
          {data?.artworks?.map((comic, index) => (
            <div key={index}>
              <Manga {...comic} />
            </div>
          ))}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No artwork found')}</div>
        </div>
      )}
      {!!data?.artworks_aggregate?.aggregate?.count && (
        <div className='w-full flex justify-center -mt-8'>
          <Pagination
            shape='rounded'
            count={Math.ceil(data?.artworks_aggregate?.aggregate?.count / 12)}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
          />
        </div>
      )}
    </div>
  )
}
