import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FilledSelect from 'components/Select/FilledSelect'
import Comic from 'components/pages/homepage/comic'
import LeaderBoard from 'components/pages/homepage/leaderboard'
import SlideSection from 'components/pages/homepage/slideSection'
import TaskSlider from 'components/pages/homepage/comicSlider'
import TrendingComic from 'components/pages/homepage/trendingComic'
import _ from 'lodash'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getAllTags, getLatestComic, getTrendingComic } from 'src/services'

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
  const sliderNavRef = useRef<any>()
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
      <div className='md:hidden'>
        <TaskSlider sliderNavRef={sliderNavRef} />
        <SlideSection sliderNavRef={sliderNavRef} />
      </div>
      <div className='pk-container'>
        <div className='md:my-[50px] lg:flex gap-10'>
          <div className='lg:flex-auto lg:w-[65%] px-5 md:px-0 relative'>
            <div className='hidden md:block'>
              <TaskSlider sliderNavRef={sliderNavRef} />
            </div>
            <div className='mt-10 md:mt-[60px] flex flex-col gap-5 px-2'>
              <div className='md:text-[24px] text-sm leading-6 font-[800]'>{t('Latest update')}</div>
              <div className='md:flex hidden gap-[20px] items-center'>
                <FilledSelect
                  label='genres'
                  icon={<ChevronDownIcon className='h-5 w-5 text-subtle-dark' aria-hidden='true' />}
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
                  icon={<ChevronDownIcon className='h-5 w-5 text-subtle-dark' aria-hidden='true' />}
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
            <div className='grid grid-cols-2 gap-10 mt-2 md:mt-10'>
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
            <div className='hidden md:block'>
              <SlideSection sliderNavRef={sliderNavRef} />
              <LeaderBoard />
            </div>
            <div className='md:text-[24px] text-sm leading-6 font-[800] mt-10 md:mt-[60px]'>{t('Trending')}</div>
            <div className='flex flex-col gap-10 mt-2 md:mt-10'>
              {trendingComic.loading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : trendingComic.data.slice(0, 2).map((data, index) => {
                    return <TrendingComic key={index} {...data} />
                  })}
            </div>
            <div className='md:hidden'>
              <LeaderBoard />
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
