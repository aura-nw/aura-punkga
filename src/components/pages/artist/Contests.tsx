import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getContests } from 'src/services'
import useSWR from 'swr'
export default function Contests({ id }) {
  const [page, setPage] = useState(1)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { data, isLoading } = useSWR(
    {
      key: 'fetch-artist-contest',
      id,
    },
    ({ id }) => (id ? getContests(id) : null)
  )

  if (isLoading)
    return (
      <div className='space-y-4'>
        <Skeleton className='w-full aspect-[343/256]' />
        <Skeleton className='w-full aspect-[343/256]' />
      </div>
    )
    console.log(data)
  return (
    <div>
      {data?.contest?.length ? (
        <div className='grid grid-cols-1 gap-4'>
          {data?.contest?.map((event, index) => (
            <Link key={event.url} href={event.url} className='rounded-mlg p-4 bg-white relative'>
              <div className='relative'>
                <Image src={event[locale].image} alt='' className='w-full aspect-[310/166] object-cover' />
                {event.isLive && (
                  <div className='absolute top-2.5 right-2.5 text-xxs font-semibold leading-[15px] bg-error-100 text-text-error-primary-3 flex items-center gap-1 rounded px-2.5 py-0.5'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                      <circle cx='2' cy='2' r='2' fill='#F73B3B' />
                    </svg>
                    Live
                  </div>
                )}
              </div>
              <div className='mt-4'>
                <div className='text-sm font-medium'>{event[locale].title}</div>
                <div className='mt-1 text-xs text-text-teriary font-medium'>{event[locale].subtitle}</div>
              </div>
            </Link>
          ))}
          <div></div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No artwork found')}</div>
        </div>
      )}
      {!!data?.contest_aggregate?.aggregate?.count && (
        <div className='w-full flex justify-center -mt-8'>
          <Pagination
            shape='rounded'
            count={Math.ceil(data?.contest_aggregate?.aggregate?.count / 4)}
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
