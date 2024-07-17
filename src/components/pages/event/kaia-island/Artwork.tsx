import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Mascot from './assets/Mascot2.png'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import Modal from 'components/Modal'
export default function Artworks() {
  const { t } = useTranslation()
  const { data, isLoading } = useSWR(
    'https://script.google.com/macros/s/AKfycbwK1f5NH_IILCflPI5645ivn-j9qEyWEcc94tD-EP1_M4bysVpXcFR8s8uW1XgaQOeezg/exec',
    (url) => fetch(url).then((res) => res.json())
  )
  const [tab, setTab] = useState(1)
  const [page, setPage] = useState(1)
  useEffect(() => {
    setPage(1)
  }, [tab])
  if (isLoading)
    return (
      <div className='mt-8'>
        <div className='text-xl font-medium'>{t('Artworks')}</div>
      </div>
    )
  if (!data?.round1?.length && !data?.round2?.length && !data?.round3?.length) {
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
  return (
    <div className='mt-8'>
      <div className='text-xl font-medium'>{t('Artworks')}</div>
      <div className='mt-4 flex gap-4 text-sm font-semibold'>
        {!!data?.round1?.length && (
          <div
            onClick={() => setTab(1)}
            className={`w-full cursor-pointer text-center max-w-[104px] rounded-lg py-1 px-2 ${
              tab == 1 ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}>
            Round 1
          </div>
        )}
        {!!data?.round2?.length && (
          <div
            onClick={() => setTab(2)}
            className={`w-full cursor-pointer text-center max-w-[104px] rounded-lg py-1 px-2 ${
              tab == 2 ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}>
            Round 2
          </div>
        )}
        {!!data?.round3?.length && (
          <div
            onClick={() => setTab(3)}
            className={`w-full cursor-pointer text-center max-w-[104px] rounded-lg py-1 px-2 ${
              tab == 3 ? 'bg-brand-100 text-text-brand-defaul' : ''
            }`}>
            Round 3
          </div>
        )}
      </div>
      <div className='mt-4 grid gap-4 grid-cols-2 lg:grid-cols-4'>
        {tab == 1 ? (
          <>
            {data?.round1?.slice((page - 1) * 8, page * 8)?.map((artwork, index) => (
              <Artwork artwork={artwork} key={artwork?.title + index} />
            ))}
          </>
        ) : tab == 2 ? (
          <>
            {data?.round2?.slice((page - 1) * 8, page * 8)?.map((artwork, index) => (
              <Artwork artwork={artwork} key={artwork?.title + index} />
            ))}
          </>
        ) : (
          <>
            {data?.round3?.slice((page - 1) * 8, page * 8)?.map((artwork, index) => (
              <Artwork artwork={artwork} key={artwork?.title + index} />
            ))}
          </>
        )}
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='flex justify-center'>
        <Pagination
          shape='rounded'
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value)
          }}
          count={
            tab == 1
              ? Math.ceil(data?.round1?.length / 8)
              : tab == 2
              ? Math.ceil(data?.round2?.length / 8)
              : Math.ceil(data?.round3?.length / 8)
          }
        />
      </div>
    </div>
  )
}
const Artwork = ({ artwork }) => {
  const [open, setOpen] = useState(false)
  const getImageSrc = (src: string) => {
    if (src.includes('https://drive.google.com/file')) {
      const id = src.split('/')?.[5]
      return `https://lh3.googleusercontent.com/d/${id}`
    }
    return src
  }
  if (!artwork?.title || !artwork?.image) return null
  return (
    <>
      <div className='cursor-pointer' onClick={() => setOpen(true)}>
        <Image
          width={300}
          height={300}
          className='w-full aspect-square rounded-md object-cover'
          src={getImageSrc(artwork?.image)}
          alt={artwork?.image}
        />
        <div className='mt-4 text-sm font-medium'>{artwork.title}</div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className='py-6 px-4'>
          <Image
            width={600}
            height={600}
            className='w-full aspect-square rounded-md object-cover max-w-[450px]'
            src={getImageSrc(artwork?.image)}
            alt={artwork?.image}
          />
          <div className='mt-4 text-lg font-medium'>{artwork.title}</div>
        </div>
      </Modal>
    </>
  )
}
