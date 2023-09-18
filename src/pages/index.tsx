import Carousel from 'components/Carousel'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import HeroCyberpunkBanner from 'assets/images/comic-banner/hero_cyberpunk.jpg'
import HamulageBanner from 'assets/images/comic-banner/hamulage.jpg'
import HeroicBanner from 'assets/images/comic-banner/heroic.png'
import TCOTPBanner from 'assets/images/comic-banner/the_chaos_of_the_past.jpg'
import UltraVBanner from 'assets/images/comic-banner/ultra_v.jpg'
import DummyComic from 'components/DummyComponent/comic'
import Header from 'components/Header'
import FilledSelect from 'components/Select/FilledSelect'
import Comic from 'components/pages/homepage/comic'
import TrendingComic from 'components/pages/homepage/trendingComic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getAllTags, getLatestComic, getTrendingComic } from 'src/services'
import { i18n } from 'next-i18next'
import _ from 'lodash'
import HeadComponent from 'components/Head'
import Link from 'next/link'

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    keplr: any
    getOfflineSigner: any
    coin98: any
    logoutTimeoutId: any
    config: any
  }
}

export default function Home() {
  const latestComic = useApi<IComic[]>(getLatestComic, true, [])
  const trendingComic = useApi<IComic[]>(getTrendingComic, true, [])
  const allTags = useApi<any[]>(getAllTags, true, [])
  const { locale } = useRouter()
  const { t } = useTranslation()
  const [statusFilter, setStatusFilter] = useState([
    {
      key: 'All status',
      value: t('All status'),
    },
  ])
  const [genreFilter, setGenreFilter] = useState([
    {
      key: 'All genres',
      value: t('All genres'),
    },
  ])

  useEffect(() => {
    setStatusFilter((prev) => {
      return _.cloneDeep(
        prev.map((v) => ({
          key: v.key,
          value: t(v.key),
        }))
      )
    })
    setGenreFilter((prev) => {
      return _.cloneDeep(
        prev.map((v) =>
          v.key == 'All genres'
            ? {
                key: v.key,
                value: t(v.key),
              }
            : v
        )
      )
    })
  }, [t('All status')])
  return (
    <>
      <HeadComponent />
      <Header />
      <div className='pk-container'>
        <div className='mt-[40px] md:grid grid-cols-1 px-2 md:px-0 gap-[40px] hidden -mx-5 [&_.slick-dots]:-mx-5'>
          <Carousel>
            <div className='p-5 outline-none'>
              <Link href='https://punkga.me/comic/1/chapter/1'>
                <Image
                  className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                  src={HeroCyberpunkBanner}
                  alt=''
                />
              </Link>
            </div>
            <div className='p-5 outline-none '>
              <Link href='https://punkga.me/comic/3/chapter/1'>
                <Image
                  className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                  src={HamulageBanner}
                  alt=''
                />
              </Link>
            </div>
            <div className='p-5 outline-none '>
              <Link href='#'>
                <Image
                  className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                  src={HeroicBanner}
                  alt=''
                />
              </Link>
            </div>
            <div className='p-5 outline-none '>
              <Link href='https://punkga.me/comic/4/chapter/1'>
                <Image
                  className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                  src={TCOTPBanner}
                  alt=''
                />
              </Link>
            </div>
            <div className='p-5 outline-none '>
              <Link href='https://punkga.me/comic/2/chapter/1'>
                <Image
                  className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                  src={UltraVBanner}
                  alt=''
                />
              </Link>
            </div>
          </Carousel>
        </div>
      </div>
      <div className='md:hidden md:px-0 gap-[40px]'>
        <Carousel
          setting={{
            slidesToShow: 1,
            slidesToScroll: 1,
            appendDots: () => <></>,
            customPaging: () => <></>,
          }}>
          <div>
            <Link href='https://punkga.me/comic/1/chapter/1'>
              <Image className='w-full aspect-[21/9] object-fill' src={HeroCyberpunkBanner} alt='' />
            </Link>
            <Link href='https://punkga.me/comic/3/chapter/1'>
              <Image className='w-full aspect-[21/9] object-fill' src={HamulageBanner} alt='' />
            </Link>
          </div>
          <div>
            <Link href='#'>
              <Image className='w-full aspect-[21/9] object-fill' src={HeroicBanner} alt='' />
            </Link>
            <Link href='https://punkga.me/comic/4/chapter/1'>
              <Image className='w-full aspect-[21/9] object-fill' src={TCOTPBanner} alt='' />
            </Link>
          </div>
          <div>
            <Link href='https://punkga.me/comic/2/chapter/1'>
              <Image className='w-full aspect-[21/9] object-fill' src={UltraVBanner} alt='' />
            </Link>
            <Link href='https://punkga.me/comic/1/chapter/1'>
              <Image className='w-full aspect-[21/9] object-fill' src={HeroCyberpunkBanner} alt='' />
            </Link>
          </div>
        </Carousel>
      </div>
      <div className='pk-container'>
        <div className='md:my-[50px] lg:flex gap-[10%]'>
          <div className='lg:flex-auto lg:w-[70%] px-5 md:px-0'>
            <div className='flex justify-between items-center'>
              <div className='md:text-[24px] text-sm leading-6 font-[800]'>{t('Latest update')}</div>
              <div className='md:flex hidden gap-[20px] items-center'>
                <FilledSelect
                  label='genres'
                  icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                  selected={genreFilter}
                  multiple={true}
                  onChange={setGenreFilter}
                  allKey='All genres'
                  options={
                    allTags?.data
                      ? [
                          {
                            key: 'All genres',
                            value: t('All genres'),
                          },
                          ...allTags?.data?.map((tag) => ({
                            key: tag[locale],
                            value: tag[locale],
                          })),
                        ]
                      : [
                          {
                            key: 'All genres',
                            value: t('All genres'),
                          },
                        ]
                  }
                  placeholder={t('All genres')}
                />
                <FilledSelect
                  label='status'
                  multiple={true}
                  icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                  selected={statusFilter}
                  onChange={setStatusFilter}
                  allKey='All status'
                  options={[
                    {
                      key: 'All status',
                      value: t('All status'),
                    },
                    {
                      key: 'Finished',
                      value: t('Finished'),
                    },
                    {
                      key: 'Ongoing',
                      value: t('Ongoing'),
                    },
                    {
                      key: 'Upcoming',
                      value: t('Upcoming'),
                    },
                  ]}
                  placeholder='All status'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-10 md:gap-[80px] mt-2 md:mt-[76px]'>
              {latestComic.loading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : latestComic.data?.length
                ? latestComic.data
                    .filter((data) =>
                      statusFilter.length && !statusFilter.some((s) => s.key == 'All status')
                        ? statusFilter.some((filter) => data.status.text == filter?.key)
                        : true
                    )
                    .filter((data) =>
                      genreFilter.length && !genreFilter.some((s) => s.key == 'All genres')
                        ? genreFilter.some((filter) => data.tags?.some((tag) => tag[locale] == filter.key))
                        : true
                    )
                    .slice(0, 6)
                    .map((data, index) => {
                      return <Comic key={index} {...data} />
                    })
                : null}
            </div>
          </div>
          <div className='lg:flex-auto lg:w-[24%] mt-6 lg:mt-0 px-5 md:px-0'>
            <div className='md:text-[24px] text-sm leading-6 font-[800]'>{t('Trending')}</div>
            <div className='flex flex-col gap-10 mt-2 md:mt-10'>
              {trendingComic.loading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : trendingComic.data.map((data, index) => {
                    return <TrendingComic key={index} {...data} />
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
