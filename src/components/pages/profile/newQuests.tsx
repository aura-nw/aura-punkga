import Link from 'next/link'
import { useContext } from 'react'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { getAvailableQuests } from 'src/services'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR, { useSWRConfig } from 'swr'
import QuestItem from '../campaigns/questItem'
import Image from 'next/image'
import EnrollNow from './assets/enroll-now.svg'
import EnrollNowLarge from './assets/enroll-now_large.svg'
import EnrollNowVN from './assets/enroll-now_vn.svg'
import EnrollNowLargeVN from './assets/enroll-now_large_vn.svg'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
export default function NewQuestSection() {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const { account, getProfile } = useContext(Context)
  const { data } = useSWR(
    { key: 'get_available_quests', account: account?.id },
    ({ account }) => (account ? getAvailableQuests() : null),
    { refreshInterval: 30000 }
  )
  const { mutate } = useSWRConfig()
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <div className='text-xl text-medium leading-[28px] text-text-primary'>{t('Available quests')}</div>
        {!!data?.length && (<Link href='/campaigns' className='text-text-info-primary text-sm leading-5 font-medium'>See all</Link>)}
      </div>
      {!!data?.length ? (
        <>
          <div className='w-full relative mt-4 block'>
            <div className='block'>
              <div className='flex [&_.swiper-button-prev]:text-[#61646B] [&_.swiper-button-next]:text-[#61646B] items-center'>
                <div className='max-w-full'>
                  <Swiper
                    spaceBetween={33}
                    slidesPerView={isMobile ? 1 : 2}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                      clickable: true,
                      bulletClass: `swiper-pagination-bullet`,
                      bulletActiveClass: 'swiper-pagination-bullet-active',
                      renderBullet: (index, className) => {
                        return `<span class="${className}"></span>`;
                      }
                    }}
                    modules={[Navigation, Pagination]}>
                    {data?.map((quest: Quest) => {
                      return (
                        <SwiperSlide key={`${quest.id}`}>
                          <QuestItem
                            quest={quest}
                            refreshCallback={() =>
                              setTimeout(() => {
                                mutate({ key: 'get_available_quests', account: account?.id })
                                mutate('get_leaderboard')
                                getProfile()
                              }, 2000)
                            }
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href='/campaigns'>
            {locale === 'vn' ? (
              <Image src={EnrollNowVN} alt='' className='w-full mt-[10px] md:hidden ' />) : (
              <Image src={EnrollNow} alt='' className='w-full mt-[10px] md:hidden ' />)
            }
            {locale === 'vn' ? (<Image src={EnrollNowLargeVN} alt='' className='w-full mt-10 hidden md:block' />) : (
              <Image src={EnrollNowLarge} alt='' className='w-full mt-10 hidden md:block' />
            )}
          </Link>
        </>
      )
      }
    </div >
  )
}
