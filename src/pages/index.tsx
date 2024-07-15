import CheckboxDropdown from 'components/CheckBox/CheckBoxDropDown'
import DummyComic from 'components/DummyComponent/comic'
import Layout from 'components/Layout'
import Comic2 from 'components/pages/homepage/comic2'
import TaskSlider from 'components/pages/homepage/comicSlider'
import SlideSection from 'components/pages/homepage/slideSection'
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
  const useableTags = allTags?.data?.filter((item) => item.en !== 'Invent contest' && item.vn !== 'Invent contest')
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
  console.log('genreFilter', genreFilter)
  return (
    <div className='bg-gray-50'>
      <div className='md:hidden'>
        <TaskSlider sliderNavRef={sliderNavRef} />
        {/* <SlideSection sliderNavRef={sliderNavRef} /> */}
      </div>
      <div className='pk-container'>
        <div className='lg:pb-[54px] lg:pt-8 lg:flex gap-10'>
          <div className='lg:flex-auto lg:w-[65%] relative'>
            <div className='hidden md:block'>
              <TaskSlider sliderNavRef={sliderNavRef} />
            </div>
            <div className='mt-4 md:mt-8 flex flex-row justify-between gap-5'>
              <div className='text-lg leading-[26px] md:leading-7 md:text-xl font-medium text-text-primary'>
                {t('Latest update')}
              </div>
              <div className='md:flex hidden gap-[20px] items-center'>
                <CheckboxDropdown
                  allKey={'All genres'}
                  selected={genreFilter}
                  onChange={setGenreFilter}
                  options={
                    useableTags
                      ? [
                          {
                            key: 'All genres',
                            value: t('All genres'),
                          },
                          ...useableTags?.map((tag) => ({
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
                />
                <div className='w-[1px] h-4 bg-[#E0E0E0]' />
                <CheckboxDropdown
                  allKey={'All status'}
                  selected={statusFilter}
                  onChange={setStatusFilter}
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
                />
              </div>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5 mt-4 md:mt-10 md:pb-7'>
              {latestComic.loading
                ? Array.apply(null, Array(20)).map((d, index) => {
                    return (
                      <div className='md:flex gap-[20px] animate-pulse bg-light-gray rounded-s p-1' key={index}>
                        <div className='flex-auto md:w-1/3'>
                          <div className='rounded-s w-full aspect-[16/23] bg-light-medium-gray' />
                        </div>
                      </div>
                    )
                  })
                : latestComic.data?.length
                ? latestComic.data
                    .filter((data: any) => data.tags.every((lang: any) => lang.en.toLowerCase() != 'invent contest'))
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
                    .map((data, index) => {
                      return <Comic2 key={index} {...data} />
                    })
                : null}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className='lg:flex-auto lg:w-[calc(33.6%-40px)] mt-6 lg:mt-0 pb-8'>
            <div className='hidden md:block'>
              <SlideSection sliderNavRef={sliderNavRef} />
              {/* <LeaderBoard /> */}
            </div>
            <div className='flex flex-col p-4 bg-white text-[#333333] rounded-[10px]'>
              <div className='md:text-xl text-sm md:leading-[25px] font-[500]'>🔥{t('Trending')}</div>
              <div className='flex flex-col gap-4 mt-2 md:mt-4'>
                {trendingComic.loading
                  ? Array.apply(null, Array(5)).map((d, index) => {
                      return (
                        <div className='md:flex gap-[20px] animate-pulse bg-light-gray rounded-s p-1' key={index}>
                          <div className='flex-auto md:w-1/3'>
                            <div className='rounded-s w-full h-[90px] bg-light-medium-gray' />
                          </div>
                        </div>
                      )
                    })
                  : trendingComic.data.slice(0, 8).map((data, index) => {
                      return <TrendingComic key={index} {...data} />
                    })}
              </div>
            </div>

            {/* <div className='md:hidden'>
              <LeaderBoard />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Home />
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
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
