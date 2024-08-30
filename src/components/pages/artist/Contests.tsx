import { Pagination, Skeleton } from '@mui/material'
import Mc from 'assets/images/mascot-empty.png'
import Modal from 'components/Modal'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null)
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
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowRight') {
        ;(document.querySelector('#next') as any)?.click()
      }
      if (e.key == 'ArrowLeft') {
        ;(document.querySelector('#prev') as any)?.click()
      }
    })
  }, [])
  if (isLoading)
    return (
      <div className='space-y-4'>
        <Skeleton className='w-full aspect-[343/256]' />
        <Skeleton className='w-full aspect-[343/256]' />
      </div>
    )
  const prevHandler = () => {
    const idx = contestData?.artworks?.artworks?.findIndex((artwork) => artwork.url == selectedArtwork.url)
    if (contestData?.artworks?.artworks[idx - 1]) {
      setSelectedArtwork(contestData?.artworks?.artworks[idx - 1])
    }
  }
  const nextHandler = () => {
    const idx = contestData?.artworks?.artworks?.findIndex((artwork) => artwork.url == selectedArtwork.url)
    if (contestData?.artworks?.artworks[idx + 1]) {
      setSelectedArtwork(contestData?.artworks?.artworks[idx + 1])
    }
  }
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
                setSelectedArtwork(artwork)
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
        <Modal
          open={open}
          setOpen={setOpen}
          preventClickOutsideToClose={false}
          className='[&_.static]:!overflow-visible'>
          <div className='relative'>
            <Image
              width={300}
              height={300}
              src={selectedArtwork?.url}
              alt=''
              className='w-auto h-full max-h-[80vh] rounded-md object-cover'
            />
            <div>
              <div
                onClick={prevHandler}
                id='prev'
                className='absolute -bottom-14 lg:top-1/2 -scale-x-100 left-[calc(50%-20px)] lg:-left-[98px] -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 cursor-pointer bg-[#FFFFFF] rounded-full text-[#B0B0B0] hover:text-border-brand-hover active:text-border-brand-focus w-8 lg:w-16 h-8 lg:h-16 grid place-items-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
                <svg xmlns='http://www.w3.org/2000/svg' width='7' height='12' viewBox='0 0 7 12' fill='none'>
                  <path
                    d='M1 1L6 6L1 11'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <div
                onClick={nextHandler}
                id='next'
                className='absolute -bottom-14 lg:top-1/2 right-[calc(50%-20px)] lg:-right-[98px] translate-x-1/2 lg:translate-x-0 -translate-y-1/2 cursor-pointer bg-[#FFFFFF] rounded-full text-[#B0B0B0] hover:text-border-brand-hover active:text-border-brand-focus w-8 lg:w-16 h-8 lg:h-16 grid place-items-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
                <svg xmlns='http://www.w3.org/2000/svg' width='7' height='12' viewBox='0 0 7 12' fill='none'>
                  <path
                    d='M1 1L6 6L1 11'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>
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
          <div className='font-medium'>{t('This artist has not joined any contest.')}</div>
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
