import Carousel from 'components/Carousel'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Mock from 'assets/images/mokup1.png'
import Mock2 from 'assets/images/mokup2.png'
import SubFilledButton from 'components/Button/FilledButton/SubFilledButton'
import DummyComic from 'components/DummyComponent/comic'
import Header from 'components/Header'
import FilledSelect from 'components/Select/FilledSelect'
import Comic from 'components/pages/homepage/comic'
import TrendingComic from 'components/pages/homepage/trendingComic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MockupImage2 from 'src/assets/images/mockup5.png'
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

export default function Home() {
  const latestComic = useApi<IComic[]>(getLatestComic, true, [])
  const trendingComic = useApi<IComic[]>(getTrendingComic, true, [])
  const allTags = useApi<any[]>(getAllTags, true, [])
  const { locale } = useRouter()
  const config = getConfig()
  const [statusFilter, setStatusFilter] = useState({
    key: 'All status',
    value: 'All status',
  })
  const [gerneFilter, setGerneFilter] = useState({
    key: 'All gernes',
    value: 'All gernes',
  })

  return (
    <>
      <Header />
      <div className='pk-container'>
        <div className='mt-[40px] grid md:grid-cols-2 grid-cols-1 px-2 md:px-0 gap-[40px]'>
          <div>
            <Carousel>
              <div>
                <Image className='w-full' src={Mock} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
            </Carousel>
          </div>
          <div>
            <Carousel>
              <div>
                <Image className='w-full' src={Mock} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
              <div>
                <Image className='w-full' src={Mock2} alt='' />
              </div>
            </Carousel>
          </div>
        </div>
        <div className='my-[50px] lg:flex gap-[10%]'>
          <div className='lg:flex-auto lg:w-[70%] px-2 md:px-0'>
            <div className='flex justify-between items-center'>
              <div className='md:text-[24px] text-sm leading-6 font-[800]'>Latest Update</div>
              <div className='md:flex hidden gap-[20px] items-center'>
                <FilledSelect
                  icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                  selected={gerneFilter}
                  onChange={setGerneFilter}
                  options={
                    allTags?.data
                      ? [
                          {
                            key: 'All gernes',
                            value: 'All gernes',
                          },
                          ...allTags?.data?.map((tag) => ({
                            key: tag[locale],
                            value: tag[locale],
                          })),
                        ]
                      : [
                          {
                            key: 'All gernes',
                            value: 'All gernes',
                          },
                        ]
                  }
                  placeholder='All gernes'
                />
                <FilledSelect
                  icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                  selected={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    {
                      key: 'All status',
                      value: 'All status',
                    },
                    {
                      key: 'Finished',
                      value: 'Finished',
                    },
                    {
                      key: 'Ongoing',
                      value: 'On going',
                    },
                    {
                      key: 'Upcoming',
                      value: 'Upcoming',
                    },
                  ]}
                  placeholder='Status'
                />
              </div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-2 gap-10 md:gap-[80px] mt-3 md:mt-[76px]'>
              {latestComic.loading
                ? Array.apply(null, Array(2)).map((d, index) => {
                    return <DummyComic key={index} />
                  })
                : latestComic.data
                    .filter((data) =>
                      statusFilter?.key == 'All status' ? true : data.status.text == statusFilter?.key
                    )
                    .filter((data) => {
                      return gerneFilter.key == 'All gernes' || data.tags?.some((tag) => tag[locale] == gerneFilter.key)
                    })
                    .slice(0, 6)
                    .map((data, index) => {
                      return <Comic key={index} {...data} />
                    })}
            </div>
          </div>
          <div className='lg:flex-auto lg:w-[24%] mt-10 lg:mt-0 px-2 md:px-0'>
            <div className='relative w-full rounded-[30px] overflow-hidden'>
              <div className='absolute inset-0'>
                <Image src={MockupImage2} alt='' fill className='object-cover' />
              </div>
              <div className='relative z-10 flex flex-col items-center justify-center h-full py-[50px]'>
                <div className='font-bold text-xl text-white mb-[10px]'>Share your work to us</div>
                <SubFilledButton size='lg' onClick={() => window.open(config.ADMIN_URL)}>
                  Publish manga to Punkga
                </SubFilledButton>
              </div>
            </div>
            <div className='text-[24px] font-[800] mt-5'>Trending</div>
            <div className='flex flex-col gap-10 mt-10'>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
