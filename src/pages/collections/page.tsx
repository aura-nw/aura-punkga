import { Pagination, Skeleton } from '@mui/material'
import Banner from 'components/pages/collections/assets/banner.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getAllLaunchPad } from 'src/services'
import useSWR from 'swr'

const LIMIT = 6
export default function Page() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useSWR(
    { key: 'get-all-launch-pad', page },
    ({ page }) => getAllLaunchPad((page - 1) * LIMIT, LIMIT),
    {
      refreshInterval: 30000,
    }
  )
  return (
    <div className='py-8 px-4 pk-container'>
      <Image
        src={Banner}
        alt=''
        className='w-full aspect-[343/156] object-cover rounded-mlg overflow-hidden md:hidden'
      />
      <Image
        src={Banner}
        alt=''
        className='w-full aspect-[1280/220] object-cover rounded-mlg overflow-hidden hidden md:block'
      />
      <div className='mt-4 md:mt-8 md:text-xl text-lg font-medium'>{t('Collections')}</div>
      <div className='mt-4 grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 xl:grid-cols-3'>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((v, i) => (
                <div className='w-full aspect-[343/289] bg-white rounded-mlg p-4' key={i}>
                  <Skeleton
                    variant='rounded'
                    width={'100%'}
                    height={'auto'}
                    className='aspect-[311/199] md:aspect-[373/235]'
                  />
                  <div className='mt-4 flex items-center gap-2'>
                    <Skeleton variant='circular' width={36} height={36} />
                    <div>
                      <Skeleton variant='text' width={266} />
                      <Skeleton variant='text' width={100} />
                    </div>
                  </div>
                </div>
              ))
          : data?.launchpads?.map((launchpad, index) => (
              <Link
                href={`/collections/${launchpad.slug}`}
                className='w-full bg-white rounded-mlg p-4'
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
                      by{' '}
                      <Link href={`/artist/${launchpad.launchpad_creator.slug}`} className='text-text-brand-defaul'>
                        {launchpad.launchpad_creator.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      {data && (
        <div className='w-fit mx-auto'>
          <Pagination
            shape='rounded'
            page={page}
            className='[&_.Mui-selected]:!text-text-primary [&_.MuiPaginationItem-root:not(.Mui-selected)]:!text-text-quatenary mt-4 '
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              setPage(value)
            }}
            count={Math.ceil(data?.count / LIMIT)}
          />
        </div>
      )}
    </div>
  )
}
