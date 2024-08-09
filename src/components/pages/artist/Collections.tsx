import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getArtistArtworks, getArtistCollections } from 'src/services'
import useSWR from 'swr'
import Manga from '../homepage/manga'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function CollectionList({ id }) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSWR({ key: 'get-artist-collection', id }, ({ id }) =>
    id ? getArtistCollections(id) : null
  )
  const { t } = useTranslation()
  const { locale } = useRouter()
  if (isLoading) {
    ;<div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <Skeleton className='w-full aspect-[343/289]' />
          </div>
        ))}
    </div>
  }
  return (
    <div>
      {data?.count ? (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
          {data?.launchpads?.slice((page - 1) * 4, page * 4)?.map((launchpad, index) => (
            <Link
              href={`/collections/${launchpad.slug}`}
              className='w-full bg-white rounded-mlg p-4 lg:border lg:border-border-secondary'
              key={launchpad.id}>
              <div className='grid gap-2 grid-cols-3'>
                <Image
                  alt=''
                  src={launchpad.featured_images[0]}
                  width={343}
                  height={289}
                  className={`object-cover w-full rounded-mlg ${
                    launchpad.featured_images[2]
                      ? 'aspect-[239/235] col-span-2'
                      : 'aspect-[311/199] md:aspect-[373/235] col-span-3'
                  }`}
                />
                {launchpad.featured_images[2] && (
                  <div className={`flex flex-col gap-2 w-full col-span-1`}>
                    <Image
                      alt=''
                      src={launchpad.featured_images[1]}
                      width={343}
                      height={289}
                      className={`object-cover h-full rounded-mlg aspect-[126/113]`}
                    />
                    <Image
                      alt=''
                      src={launchpad.featured_images[2]}
                      width={343}
                      height={289}
                      className={`object-cover h-full rounded-mlg aspect-[126/114]`}
                    />
                  </div>
                )}
              </div>
              <div className='mt-4 flex items-center gap-2'>
                {launchpad.launchpad_creator.avatar_url && (
                  <Image
                    src={launchpad.launchpad_creator.avatar_url}
                    alt=''
                    width={36}
                    height={36}
                    className='rounded-full w-[36px] h-[36px]'
                  />
                )}
                <div>
                  <div className='text-sm font-medium'>{launchpad[locale].name}</div>
                  <div className='text-xs font-medium'>
                    {t('by')}{' '}
                    <Link href={`/artist/${launchpad.launchpad_creator.slug}`} className='text-text-brand-defaul'>
                      {launchpad.launchpad_creator.pen_name}
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No collection submitted')}</div>
        </div>
      )}
      {!!data?.count && (
        <div className='w-full flex justify-center mt-8'>
          <Pagination
            shape='rounded'
            count={Math.ceil(data?.count / 4)}
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
