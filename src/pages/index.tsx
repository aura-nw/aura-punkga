import { ChevronDownIcon } from '@heroicons/react/20/solid'
import XMasImg1 from 'assets/images/comic-banner/xmas-1.png'
import XMasImg2 from 'assets/images/comic-banner/xmas-2.jpg'
import DummyComic from 'components/DummyComponent/comic'
import Footer from 'components/Footer'
import Header from 'components/Header'
import FilledSelect from 'components/Select/FilledSelect'
import Comic from 'components/pages/homepage/comic'
import TrendingComic from 'components/pages/homepage/trendingComic'
import XMasComic from 'components/pages/homepage/xmasComic'
import _ from 'lodash'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'react-i18next'
import useApi from 'src/hooks/useApi'
import { IComic } from 'src/models/comic'
import { getAllTags, getLatestComic, getTrendingComic } from 'src/services'
import HamulageBanner from 'assets/images/comic-banner/hamulage.jpg'
import HeroCyberpunkBanner from 'assets/images/comic-banner/hero_cyberpunk.jpg'
import HeroicBanner from 'assets/images/comic-banner/heroic.png'
import TCOTPBanner from 'assets/images/comic-banner/the_chaos_of_the_past.jpg'
import UltraVBanner from 'assets/images/comic-banner/ultra_v.jpg'
import ErrantBanner from 'assets/images/comic-banner/errant.jpg'
import Carousel from 'components/Carousel'
import moment from 'moment'
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
      {moment('2024-01-09T00:00:00.000Z').isAfter() ? (
        <>
          <div className='lg:hidden'>
            <div className='rounded-b-[16px] p-[10px] bg-[#F2F2F2] flex flex-col gap-[10px]'>
              <Link
                href='https://drive.google.com/file/d/13BsvhyAtdrxfI6_y_bTSiSR737vBofYg/view?usp=drive_link'
                target='_blank'>
                <Image
                  src={moment('2024-01-02T18:00:00.000Z').isAfter() ? XMasImg1 : XMasImg2}
                  alt=''
                  className='rounded-[10px] w-full'
                />
              </Link>
              <div className='grid grid-cols-2 gap-[10px]'>
                <Link
                  href='https://airtable.com/appjewI8AfCHj8wJX/pag2JLOBTwVbChJJy/form'
                  target='_blank'
                  className='leading-5 font-bold bg-primary-color text-center py-2 px-6 rounded-[20px]'>
                  {t('Join now')}
                </Link>
                <Link
                  href='https://drive.google.com/file/d/13BsvhyAtdrxfI6_y_bTSiSR737vBofYg/view?usp=drive_link'
                  target='_blank'
                  className='leading-5 font-bold text-second-color border-second-color grid place-items-center text-center border-[2px] rounded-[20px]'>
                  {t('Learn more')}
                </Link>
              </div>
            </div>
            <div className='pk-container'>
              {moment('2024-01-02T18:00:00.000Z').isAfter() ? (
                <div className='mt-[10px] mx-5 rounded-[16px] p-[10px] bg-[#F2F2F2] relative'>
                  <Image src={XMasImg2} alt='' className='rounded-[10px]' />
                  <div className='absolute bottom-[26px] left-[18px]'>
                    <Countdown
                      date={new Date('2024-01-02T18:00:00.000Z')}
                      renderer={({ days, hours, minutes, seconds, completed }) => {
                        if (completed) {
                          return <></>
                        } else {
                          return (
                            <div className='text-xs leading-[15px] font-bold text-primary-color bg-[#414141] rounded-[20px] py-1 px-4'>
                              {days > 0
                                ? locale == 'vn'
                                  ? `Bắt đầu sau ${zeroPad(days)} ngày : ${zeroPad(hours)} giờ : ${zeroPad(
                                    minutes
                                  )} phút`
                                  : `Starts in ${zeroPad(days)}d : ${zeroPad(hours)}h : ${zeroPad(minutes)}m`
                                : locale == 'vn'
                                  ? `Bắt đầu sau ${zeroPad(hours)} giờ : ${zeroPad(minutes)} phút : ${zeroPad(
                                    seconds
                                  )} giây`
                                  : `Starts in ${zeroPad(hours)}h : ${zeroPad(minutes)}m : ${zeroPad(seconds)}s`}
                            </div>
                          )
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className='mt-[10px] mx-5 rounded-[16px] p-[10px] bg-[#F2F2F2] relative'>
                  <Carousel
                    setting={{
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      appendDots: () => <></>,
                      customPaging: () => <></>,
                    }}>
                    <div className='outline-none [&_*]:outline-none'>
                      <Link href='https://punkga.me/comic/hero_cyberpunk_1/chapter/1'>
                        <Image
                          className='w-full aspect-[370/166] rounded-[10px] object-cover'
                          src={HeroCyberpunkBanner}
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='outline-none [&_*]:outline-none '>
                      <Link href='https://punkga.me/comic/hamulage_3/chapter/1'>
                        <Image
                          className='w-full aspect-[370/166] rounded-[10px] object-cover'
                          src={HamulageBanner}
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='outline-none [&_*]:outline-none '>
                      <Link href='https://punkga.me/comic/heroic_librarian_5/chapter/1'>
                        <Image
                          className='w-full aspect-[370/166] rounded-[10px] object-cover'
                          src={HeroicBanner}
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='outline-none [&_*]:outline-none '>
                      <Link href='https://punkga.me/comic/era_of_chaos_4/chapter/1'>
                        <Image
                          className='w-full aspect-[370/166] rounded-[10px] object-cover'
                          src={TCOTPBanner}
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='outline-none [&_*]:outline-none '>
                      <Link href='https://punkga.me/comic/neon_force_2/chapter/1'>
                        <Image
                          className='w-full aspect-[370/166] rounded-[10px] object-cover'
                          src={UltraVBanner}
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='outline-none [&_*]:outline-none '>
                      <Link href='https://punkga.me/comic/errant_6/chapter/1'>
                        <Image
                          className='w-full aspect-[370/166] rounded-[10px] object-cover'
                          src={ErrantBanner}
                          alt=''
                        />
                      </Link>
                    </div>
                  </Carousel>
                </div>
              )}
            </div>
          </div>
          <div className='hidden lg:block'>
            <div className='pk-container'>
              <div className='grid grid-cols-2 gap-10 mt-10'>
                <div className='relative h-fit'>
                  <Link
                    href='https://drive.google.com/file/d/13BsvhyAtdrxfI6_y_bTSiSR737vBofYg/view?usp=drive_link'
                    target='_blank'>
                  </Link>
                  <Image
                    src={moment('2024-01-02T18:00:00.000Z').isAfter() ? XMasImg1 : XMasImg2}
                    alt=''
                    className='rounded-[30px] aspect-[80/36]'
                  />
                  <div className='flex gap-5 absolute bottom-[42px] left-[60px]'>
                    <Link
                      href='https://airtable.com/appjewI8AfCHj8wJX/pag2JLOBTwVbChJJy/form'
                      target='_blank'
                      className='leading-[25px] font-bold bg-primary-color text-center py-3 px-8 text-xl rounded-[20px] shadow-[0px_0px_15px_0px_#0000008c]'>
                      {t('Join now')}
                    </Link>
                    <Link
                      href='https://drive.google.com/file/d/13BsvhyAtdrxfI6_y_bTSiSR737vBofYg/view?usp=drive_link'
                      target='_blank'
                      className='leading-[25px] px-8 text-xl font-bold text-primary-color border-primary-color grid place-items-center text-center border-[2px] rounded-[20px] shadow-[0px_0px_20px_20px_#0000006b_inset] relative'>
                      <div className='absolute -inset-[2px] shadow-[0px_0px_15px_0px_#0000008c] rounded-[20px]'></div>
                      {t('Learn more')}
                    </Link>
                  </div>
                </div>
                <div className='relative'>
                  {moment('2024-01-02T18:00:00.000Z').isAfter() ? (
                    <>
                      <Image src={XMasImg2} alt='' className='rounded-[30px] aspect-[80/36]' />
                      <div className='absolute bottom-[42px] left-[30px]'>
                        <Countdown
                          date={new Date('2024-01-02T18:00:00.000Z')}
                          renderer={({ days, hours, minutes, seconds, completed }) => {
                            if (completed) {
                              return <></>
                            } else {
                              return (
                                <div className='text-xs leading-[15px] font-bold text-primary-color bg-[#414141] rounded-[20px] py-1 px-4'>
                                  {days > 0
                                    ? locale == 'vn'
                                      ? `Bắt đầu sau ${zeroPad(days)} ngày : ${zeroPad(hours)} giờ : ${zeroPad(
                                        minutes
                                      )} phút`
                                      : `Starts in ${zeroPad(days)}d : ${zeroPad(hours)}h : ${zeroPad(minutes)}m`
                                    : locale == 'vn'
                                      ? `Bắt đầu sau ${zeroPad(hours)} giờ : ${zeroPad(minutes)} phút : ${zeroPad(
                                        seconds
                                      )} giây`
                                      : `Starts in ${zeroPad(hours)}h : ${zeroPad(minutes)}m : ${zeroPad(seconds)}s`}
                                </div>
                              )
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <Carousel
                      setting={{
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        appendDots: () => <></>,
                        customPaging: () => <></>,
                      }}>
                      <div className='outline-none [&_*]:outline-none'>
                        <Link href='https://punkga.me/comic/hero_cyberpunk_1/chapter/1'>
                          <Image
                            className='w-full aspect-[370/166] rounded-[10px] object-cover'
                            src={HeroCyberpunkBanner}
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='outline-none [&_*]:outline-none '>
                        <Link href='https://punkga.me/comic/hamulage_3/chapter/1'>
                          <Image
                            className='w-full aspect-[370/166] rounded-[10px] object-cover'
                            src={HamulageBanner}
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='outline-none [&_*]:outline-none '>
                        <Link href='https://punkga.me/comic/heroic_librarian_5/chapter/1'>
                          <Image
                            className='w-full aspect-[370/166] rounded-[10px] object-cover'
                            src={HeroicBanner}
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='outline-none [&_*]:outline-none '>
                        <Link href='https://punkga.me/comic/era_of_chaos_4/chapter/1'>
                          <Image
                            className='w-full aspect-[370/166] rounded-[10px] object-cover'
                            src={TCOTPBanner}
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='outline-none [&_*]:outline-none '>
                        <Link href='https://punkga.me/comic/neon_force_2/chapter/1'>
                          <Image
                            className='w-full aspect-[370/166] rounded-[10px] object-cover'
                            src={UltraVBanner}
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='outline-none [&_*]:outline-none '>
                        <Link href='https://punkga.me/comic/errant_6/chapter/1'>
                          <Image
                            className='w-full aspect-[370/166] rounded-[10px] object-cover'
                            src={ErrantBanner}
                            alt=''
                          />
                        </Link>
                      </div>
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          </div>
          {moment('2024-01-09T00:00:00.000Z').isAfter() && (
            <div className='bg-[#E2D8FF] py-1 overflow-hidden mt-5 lg:mt-[17px] mb-10 lg:mb-2'>
              {locale == 'vn' ? (
                <div className='text-sm whitespace-nowrap px-10 w-max animate-textSlide10 md:animate-textSlide20'>
                  Tham gia cuộc thi vẽ truyện tranh cùng <span className='text-second-color'>Punkga Me</span> với tổng
                  giải thưởng 20 triệu đồng!
                </div>
              ) : (
                <div className='text-sm whitespace-nowrap px-10 w-max animate-textSlide10 md:animate-textSlide20'>
                  Join the comic creative contest with <span className='text-second-color'>Punkga Me</span> , with the
                  total prize $1000
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div className='pk-container'>
            <div className='mt-[40px] md:grid grid-cols-1 px-2 md:px-0 gap-[40px] hidden -mx-5 [&_.slick-dots]:-mx-5'>
              <Carousel>
                <div className='p-5 outline-none [&_*]:outline-none'>
                  <Link href='https://punkga.me/comic/hero_cyberpunk_1/chapter/1'>
                    <Image
                      className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                      src={HeroCyberpunkBanner}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='p-5 outline-none [&_*]:outline-none '>
                  <Link href='https://punkga.me/comic/hamulage_3/chapter/1'>
                    <Image
                      className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                      src={HamulageBanner}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='p-5 outline-none [&_*]:outline-none '>
                  <Link href='https://punkga.me/comic/heroic_librarian_5/chapter/1'>
                    <Image
                      className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                      src={HeroicBanner}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='p-5 outline-none [&_*]:outline-none '>
                  <Link href='https://punkga.me/comic/era_of_chaos_4/chapter/1'>
                    <Image
                      className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                      src={TCOTPBanner}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='p-5 outline-none [&_*]:outline-none '>
                  <Link href='https://punkga.me/comic/neon_force_2/chapter/1'>
                    <Image
                      className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                      src={UltraVBanner}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='p-5 outline-none [&_*]:outline-none '>
                  <Link href='https://punkga.me/comic/errant_6/chapter/1'>
                    <Image
                      className='w-full md:rounded-[18px] lg:rounded-[30px] md:h-[200px] lg:h-[280px] 2xl:h-[360px] object-fill'
                      src={ErrantBanner}
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
                <Link href='https://punkga.me/comic/hero_cyberpunk_1/chapter/1'>
                  <Image className='w-full aspect-[21/9] object-fill' src={HeroCyberpunkBanner} alt='' />
                </Link>
                <Link href='https://punkga.me/comic/hamulage_3/chapter/1'>
                  <Image className='w-full aspect-[21/9] object-fill' src={HamulageBanner} alt='' />
                </Link>
              </div>
              <div>
                <Link href='https://punkga.me/comic/heroic_librarian_5/chapter/1'>
                  <Image className='w-full aspect-[21/9] object-fill' src={HeroicBanner} alt='' />
                </Link>
                <Link href='https://punkga.me/comic/era_of_chaos_4/chapter/1'>
                  <Image className='w-full aspect-[21/9] object-fill' src={TCOTPBanner} alt='' />
                </Link>
              </div>
              <div>
                <Link href='https://punkga.me/comic/neon_force_2/chapter/1'>
                  <Image className='w-full aspect-[21/9] object-fill' src={UltraVBanner} alt='' />
                </Link>
                <Link href='https://punkga.me/comic/errant_6/chapter/1'>
                  <Image className='w-full aspect-[21/9] object-fill' src={ErrantBanner} alt='' />
                </Link>
              </div>
            </Carousel>
          </div>
        </>
      )}

      <div className='pk-container'>
        <div className='md:mb-[50px] 2xl:flex gap-[100px]'>
          <div className='2xl:flex-auto 2xl:w-[70%] px-5 md:px-0'>
            <div className='flex justify-between items-center lg:my-[10px]'>
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
            <div className='grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[80px] mt-5 lg:mt-[24px]'>
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
                      console.log()
                      if (index == 0) {
                        if (moment('2024-01-09T00:00:00.000Z').isAfter() && moment('2024-01-02T18:00:00.000Z').isBefore())
                          return <XMasComic key={index} {...data} />
                        return null
                      }
                      return <Comic key={index} {...data} />
                    })
                  : null}
            </div>
          </div>
          <div className='2xl:flex-auto 2xl:w-[24%] mt-6 2xl:mt-0 px-5 md:px-0'>
            <div className='md:text-[24px] text-sm leading-6 font-[800] lg:mt-[10px]'>{t('Trending')}</div>
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
