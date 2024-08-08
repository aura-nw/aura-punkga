import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getArtistArtworks } from 'src/services'
import useSWR from 'swr'
import Manga from '../homepage/manga'
import Modal from 'components/Modal'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper/modules'
export default function ArtworkList({ id }) {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(1)
  const { data, isLoading } = useSWR(
    {
      key: 'fetch-artist-artworks',
      id,
    },
    ({ id }) => (id ? getArtistArtworks(id) : null)
  )

  const { t } = useTranslation()
  if (isLoading) {
    return (
      <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4'>
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
        <>
          <Modal open={open} setOpen={setOpen} preventClickOutsideToClose={false}>
            <Swiper slidesPerView={1} autoHeight initialSlide={index} >
              {data?.artworks?.map((artwork, index) => (
                <SwiperSlide key={index}>
                  <Image
                    width={300}
                    height={300}
                    src={artwork.url}
                    alt=''
                    className='w-full h-auto rounded-md object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Modal>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4'>
            {data?.artworks?.slice((page - 1) * 12, page * 12)?.map((artwork, index) => (
              <div
                key={index}
                onClick={() => {
                  setIndex(index)
                  setOpen(true)
                }}>
                <Image
                  width={300}
                  height={300}
                  src={artwork.url}
                  alt=''
                  className='w-full aspect-square rounded-md object-cover'
                />
              </div>
            ))}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No artwork found')}</div>
        </div>
      )}
      {!!data?.artworks_aggregate?.aggregate?.count && (
        <div className='w-full flex justify-center'>
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
