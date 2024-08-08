import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Modal from 'components/Modal'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getContestMangaAndArtwork, getContests } from 'src/services'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import Manga from '../homepage/manga'
export default function Contests({ id }) {
  const [page, setPage] = useState(1)
  const [index, setIndex] = useState(1)
  const [open, setOpen] = useState(false)
  const [artworkPage, setArtworkPage] = useState(1)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [selectedContest, setSelectedContest] = useState<any>()
  const { data, isLoading } = useSWR(
    {
      key: 'fetch-artist-contest',
      id,
    },
    ({ id }) => (id ? getContests(id) : null)
  )
  const { data: contestData } = useSWR(
    {
      key: 'fetch-artist-contest-manga-artworks',
      id,
      selectedContestId: selectedContest?.id,
    },
    ({ id, selectedContestId }) => (id && selectedContestId ? getContestMangaAndArtwork(id, selectedContestId) : null)
  )
  console.log(contestData)
  if (isLoading)
    return (
      <div className='space-y-4'>
        <Skeleton className='w-full aspect-[343/256]' />
        <Skeleton className='w-full aspect-[343/256]' />
      </div>
    )
  if (contestData) {
    return (
      <div className='-mt-4 lg:mt-0'>
        <div className='text-sm font-medium flex items-center justify-between'>
          <div
            className='flex items-center text-text-primary-on-brand cursor-pointer'
            onClick={() => setSelectedContest(undefined)}>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 15L7 10L12 5'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='lg:hidden'>{t('Back')}</span>
            <span className='lg:block hidden'>{selectedContest[locale].title}</span>
          </div>
          <Link href={`/events/${selectedContest.slug}`} className='text-text-info-primary'>
            {t('View Contest')}
          </Link>
        </div>
        <div className='mt-3 text-sm font-semibold'>{t('Mangas')}</div>
        <div className='mt-4 gap-6 lg:gap-2.5 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]'>
          {contestData.mangas.map((manga, index) => (
            <div className='' key={index}>
              <Manga {...manga} />
            </div>
          ))}
        </div>
        <div className='mt-8 lg:mt-4 text-sm font-semibold'>{t('Artworks')}</div>
        <div className='mt-4 gap-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
          {contestData?.artworks?.artworks?.slice((artworkPage - 1) * 12, artworkPage * 12)?.map((artwork, index) => (
            <div
              key={index}
              onClick={() => {
                setIndex(index)
                setOpen(true)
              }}>
              <Image
                src={artwork?.url}
                width={400}
                height={400}
                className='w-full aspect-square rounded-md object-cover'
                alt=''
              />
            </div>
          ))}
        </div>
        {!!data?.count && (
          <div className='w-full flex justify-center mt-8 lg:mt-4'>
            <Pagination
              shape='rounded'
              count={Math.ceil(contestData?.artworks?.artworks?.length / 12)}
              page={artworkPage}
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                setArtworkPage(value)
              }}
            />
          </div>
        )}
        <Modal open={open} setOpen={setOpen} preventClickOutsideToClose={false}>
          <Swiper slidesPerView={1} autoHeight initialSlide={index}>
            {contestData?.artworks?.artworks?.map((artwork, index) => (
              <SwiperSlide key={index}>
                <Image
                  width={300}
                  height={300}
                  src={artwork.url}
                  alt=''
                  className='w-full h-auto rounded-md object-cover lg:max-w-[40vw]'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal>
      </div>
    )
  }
  return (
    <div>
      {data?.contests?.length ? (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4'>
          {data?.contests?.map((contest, index) => (
            <div
              onClick={() => setSelectedContest(contest)}
              key={contest.slug}
              className='rounded-mlg p-4 bg-white relative lg:border lg:border-border-secondary cursor-pointer'>
              <div className='relative'>
                <Image
                  src={contest[locale].image}
                  width={400}
                  height={400}
                  alt=''
                  className='w-full aspect-[310/166] object-cover'
                />
                {moment().isAfter(contest.start_date) && moment().isBefore(contest.end_date) && (
                  <div className='absolute top-2.5 right-2.5 text-xxs font-semibold leading-[15px] bg-error-100 text-text-error-primary-3 flex items-center gap-1 rounded px-2.5 py-0.5'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4' fill='none'>
                      <circle cx='2' cy='2' r='2' fill='#F73B3B' />
                    </svg>
                    Live
                  </div>
                )}
              </div>
              <div className='mt-4'>
                <div className='text-sm font-medium'>{contest[locale].title}</div>
                <div className='mt-1 text-xs text-text-teriary font-medium'>
                  {locale == 'vn'
                    ? `${moment(contest.start_date).format('DD/MM/yyyy')} - ${moment(contest.end_date).format(
                        'DD/MM/yyyy'
                      )}`
                    : `${moment(contest.start_date).format('MM/DD/yyyy')} - ${moment(contest.end_date).format(
                        'MM/DD/yyyy'
                      )}`}
                </div>
              </div>
            </div>
          ))}
          <div></div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 py-8'>
          <Image src={Mc} alt='' className='w-[160px] h-[160px]' />
          <div className='font-medium'>{t('No contest applied')}</div>
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
