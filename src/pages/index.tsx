import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FilledSelect from 'components/Select/FilledSelect'
import Comic2 from 'components/pages/homepage/comic2'
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
import Layout from 'components/Layout'

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
      <div className='md:hidden'>
        <TaskSlider sliderNavRef={sliderNavRef} />
        <SlideSection sliderNavRef={sliderNavRef} />
      </div>
      <div className='pk-container'>
        <div className='md:my-[50px] lg:flex gap-10'>
          <div className='lg:flex-auto lg:w-[65%]  relative'>
            <div className='hidden md:block'>
              <TaskSlider sliderNavRef={sliderNavRef} />
            </div>
            <div className='mt-10 md:mt-6 flex flex-col gap-5 px-2'>
              <div className='md:text-xl text-sm md:leading-[25px] font-[800]'>{t('Latest update')}</div>
              <div className='md:flex hidden gap-[20px] items-center'>
                <FilledSelect
                  label='genres'
                  icon={<ChevronDownIcon className='h-5 w-5 text-subtle-dark' aria-hidden='true' />}
                  leadingIcon={
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M3.35288 14.8117L4.08229 14.6372L3.35288 14.8117ZM3.35288 8.83297L4.08229 9.00752L3.35288 8.83297ZM20.6471 8.83298L19.9177 9.00752L20.6471 8.83298ZM20.6471 14.8117L19.9177 14.6372L20.6471 14.8117ZM15.0496 20.2988L14.8815 19.5679L15.0496 20.2988ZM8.95044 20.2988L8.78237 21.0297L8.95044 20.2988ZM8.95043 3.34591L9.1185 4.07684L8.95043 3.34591ZM15.0496 3.34591L14.8815 4.07684L15.0496 3.34591ZM4.08229 14.6372C3.63924 12.7857 3.63924 10.859 4.08229 9.00752L2.62347 8.65843C2.12551 10.7394 2.12551 12.9053 2.62347 14.9863L4.08229 14.6372ZM19.9177 9.00752C20.3608 10.859 20.3608 12.7857 19.9177 14.6372L21.3765 14.9863C21.8745 12.9053 21.8745 10.7394 21.3765 8.65844L19.9177 9.00752ZM14.8815 19.5679C12.9863 20.0036 11.0137 20.0036 9.1185 19.5679L8.78237 21.0297C10.8988 21.5164 13.1012 21.5164 15.2176 21.0297L14.8815 19.5679ZM9.1185 4.07684C11.0137 3.64105 12.9863 3.64105 14.8815 4.07684L15.2176 2.61498C13.1012 2.12834 10.8988 2.12834 8.78237 2.61499L9.1185 4.07684ZM9.1185 19.5679C6.61229 18.9916 4.66599 17.0765 4.08229 14.6372L2.62347 14.9863C3.34276 17.9922 5.73374 20.3287 8.78237 21.0297L9.1185 19.5679ZM15.2176 21.0297C18.2663 20.3287 20.6572 17.9922 21.3765 14.9863L19.9177 14.6372C19.334 17.0765 17.3877 18.9916 14.8815 19.5679L15.2176 21.0297ZM14.8815 4.07684C17.3877 4.65311 19.334 6.56823 19.9177 9.00752L21.3765 8.65844C20.6572 5.65253 18.2663 3.31598 15.2176 2.61498L14.8815 4.07684ZM8.78237 2.61499C5.73373 3.31598 3.34276 5.65252 2.62347 8.65843L4.08229 9.00752C4.66599 6.56823 6.61228 4.65311 9.1185 4.07684L8.78237 2.61499ZM14.8305 21C14.8305 19.5363 14.8322 18.5154 14.9378 17.7451C15.0403 16.998 15.2278 16.5993 15.5196 16.3132L14.4696 15.242C13.8474 15.852 13.5778 16.6223 13.4518 17.5413C13.3289 18.4372 13.3305 19.5795 13.3305 21H14.8305ZM20.3222 14.1316C18.8718 14.1316 17.7101 14.13 16.7998 14.25C15.8695 14.3726 15.0897 14.6341 14.4696 15.242L15.5196 16.3132C15.8135 16.0251 16.2264 15.8385 16.9958 15.7371C17.7852 15.6331 18.8302 15.6316 20.3222 15.6316V14.1316Z'
                        fill='#ABABAB'
                      />
                      <path d='M9 9H12M9 12H14' stroke='#ABABAB' strokeWidth='1.5' strokeLinecap='round' />
                    </svg>
                  }
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
                  leadingIcon={
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4V6.4C12.75 6.81421 12.4142 7.15 12 7.15C11.5858 7.15 11.25 6.81421 11.25 6.4V4C11.25 3.58579 11.5858 3.25 12 3.25ZM18.1872 5.81282C18.4801 6.10571 18.4801 6.58058 18.1872 6.87348L16.4901 8.57053C16.1972 8.86343 15.7224 8.86343 15.4295 8.57053C15.1366 8.27764 15.1366 7.80277 15.4295 7.50987L17.1265 5.81282C17.4194 5.51992 17.8943 5.51992 18.1872 5.81282ZM5.8126 5.81299C6.1055 5.5201 6.58037 5.5201 6.87326 5.81299L8.57032 7.51005C8.86321 7.80294 8.86321 8.27782 8.57032 8.57071C8.27743 8.8636 7.80255 8.8636 7.50966 8.57071L5.8126 6.87365C5.51971 6.58076 5.51971 6.10589 5.8126 5.81299ZM3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H6.4C6.81421 11.25 7.15 11.5858 7.15 12C7.15 12.4142 6.81421 12.75 6.4 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12ZM16.85 12C16.85 11.5858 17.1858 11.25 17.6 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H17.6C17.1858 12.75 16.85 12.4142 16.85 12ZM8.57053 15.4295C8.86343 15.7224 8.86343 16.1972 8.57053 16.4901L6.87348 18.1872C6.58058 18.4801 6.10571 18.4801 5.81282 18.1872C5.51992 17.8943 5.51992 17.4194 5.81282 17.1265L7.50987 15.4295C7.80276 15.1366 8.27764 15.1366 8.57053 15.4295ZM15.4293 15.4296C15.7221 15.1368 16.197 15.1368 16.4899 15.4296L18.187 17.1267C18.4799 17.4196 18.4799 17.8945 18.187 18.1874C17.8941 18.4803 17.4192 18.4803 17.1263 18.1874L15.4293 16.4903C15.1364 16.1974 15.1364 15.7225 15.4293 15.4296ZM12 16.85C12.4142 16.85 12.75 17.1858 12.75 17.6V20C12.75 20.4142 12.4142 20.75 12 20.75C11.5858 20.75 11.25 20.4142 11.25 20V17.6C11.25 17.1858 11.5858 16.85 12 16.85Z'
                        fill='#ABABAB'
                      />
                    </svg>
                  }
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
            <div className='grid auto-fit sm:grid-cols-3 xl:grid-cols-4 grid-cols-2 2xl:grid-cols-5 gap-[10px] mt-2 md:mt-10 gap-y-5'>
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
                    .map((data, index) => {
                      return <Comic2 key={index} {...data} />
                    })
                  : null}
            </div>
          </div>
          <div className='lg:flex-auto lg:w-[32%] mt-6 lg:mt-0 '>
            <div className='hidden md:block'>
              <SlideSection sliderNavRef={sliderNavRef} />
              {/* <LeaderBoard /> */}
            </div>
            <div className='flex flex-col p-6 bg-[#292929] text-white rounded-[10px] mt-10'>
              <div className='md:text-xl text-sm md:leading-[25px] font-[800] mb-4 md:mb-6'>
                🔥{t('Trending')}
              </div>
              <div className='flex flex-col gap-10 mt-2 md:mt-6'>
                {trendingComic.loading
                  ? Array.apply(null, Array(5)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                  : trendingComic.data.slice(0, 5).map((data, index) => {
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
    </>
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
