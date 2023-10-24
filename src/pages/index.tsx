import Carousel from 'components/Carousel'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import HamulageBanner from 'assets/images/comic-banner/hamulage.jpg'
import HeroCyberpunkBanner from 'assets/images/comic-banner/hero_cyberpunk.jpg'
import HeroicBanner from 'assets/images/comic-banner/heroic.png'
import TCOTPBanner from 'assets/images/comic-banner/the_chaos_of_the_past.jpg'
import UltraVBanner from 'assets/images/comic-banner/ultra_v.jpg'
import ErrantBanner from 'assets/images/comic-banner/errant.jpg'
import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FilledSelect from 'components/Select/FilledSelect'
import Comic from 'components/pages/homepage/comic'
import TrendingComic from 'components/pages/homepage/trendingComic'
import _ from 'lodash'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getAllTags, getLatestComic, getTrendingComic } from 'src/services'
import HeadComponent from 'components/Head'
import LeaderBoard from 'components/pages/homepage/leaderboard'
import TaskSlider from 'components/pages/homepage/taskSlider'
import SlideSection from 'components/pages/homepage/slideSection'

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

function Home() {
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
      <Header />
      <div className='pk-container'>
        <div className='md:my-[50px] lg:flex gap-[20px]'>
          <div className='lg:flex-auto lg:w-[67%] px-5 md:px-0'>
            <TaskSlider />
            <div className='mt-[60px] flex justify-between items-center px-2'>
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
          <div className='lg:flex-auto lg:w-[32%] mt-6 lg:mt-0 px-5 md:px-0'>
            <SlideSection />
            <LeaderBoard />
            <div className='md:text-[24px] text-sm leading-6 font-[800] mt-[60px]'>{t('Trending')}</div>
            <div className='flex flex-col gap-10 mt-2 md:mt-10'>
              {trendingComic.loading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : trendingComic.data.slice(0, 2).map((data, index) => {
                    return <TrendingComic key={index} {...data} />
                  })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Home />
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
