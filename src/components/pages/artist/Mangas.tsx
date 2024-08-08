import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getArtistMangas } from 'src/services'
import useSWR from 'swr'
import Manga from '../homepage/manga'
export default function MangaList({ id }) {
  const { data, isLoading } = useSWR({
    key: 'fetch-artist-mangas',
    id,
  }, ({id}) => id ? getArtistMangas(id):null)
  const [page, setPage] = useState(1)
  const { t } = useTranslation()
  if (isLoading) {
    return (
      <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-y-8 gap-x-[22px]'>
        {Array(10)
          .fill(0)
          ?.map((c, index) => (
            <div key={index}>
              <Skeleton className='w-full aspect-[16/23]' />
            </div>
          ))}
      </div>
    )
  }
  return (
    <div className='w-full'>
      {data?.length ? (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-y-8 gap-x-[22px]'>
          {data?.slice((page - 1) * 20, page * 20)?.map((comic, index) => (
            <div key={index}>
              <Manga {...comic} />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8 mx-auto w-full'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No manga found')}</div>
        </div>
      )}
      {!!data?.length && (
        <div className='w-full flex justify-center mt-8'>
          <Pagination
            shape='rounded'
            count={Math.ceil(data?.length / 20)}
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
