import { useContext } from 'react'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { getAvailableQuests } from 'src/services'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import QuestItem from '../campaigns/questItem'

export default function Quest() {
  const { account } = useContext(Context)
  const { data } = useSWR(
    { key: 'get_available_quests', account },
    ({ account }) => (account ? getAvailableQuests() : null),
    { refreshInterval: 30000 }
  )

  return (
    <div className='md:mt-10'>
      <div className='flex items-center gap-5'>
        <div className='text-base md:text-xl leading-5 md:leading-[25px] font-bold text-[#1C1C1C]'>Available Quests</div>
      </div>
      {!!data?.length && (
        <div className='w-full relative mt-5 h-[244px]'>
          <div className='absolute inset-0 [&_.swiper-button-prev]:text-[#61646B] [&_.swiper-button-next]:text-[#61646B] flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='37'
              height='36'
              viewBox='0 0 37 36'
              fill='none'
              className='shrink-0 cursor-pointer swiper-prev mr-10'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M23.7321 6.64586C24.2039 7.05021 24.2585 7.76042 23.8542 8.23216L15.4817 18L23.8542 27.7679C24.2585 28.2396 24.2039 28.9498 23.7321 29.3542C23.2604 29.7585 22.5502 29.7039 22.1458 29.2322L13.1458 18.7322C12.7847 18.3109 12.7847 17.6892 13.1458 17.2679L22.1458 6.76788C22.5502 6.29614 23.2604 6.24151 23.7321 6.64586Z'
                fill='#61646B'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M23.7321 6.64586C24.2039 7.05021 24.2585 7.76042 23.8542 8.23216L15.4817 18L23.8542 27.7679C24.2585 28.2396 24.2039 28.9498 23.7321 29.3542C23.2604 29.7585 22.5502 29.7039 22.1458 29.2322L13.1458 18.7322C12.7847 18.3109 12.7847 17.6892 13.1458 17.2679L22.1458 6.76788C22.5502 6.29614 23.2604 6.24151 23.7321 6.64586Z'
                fill='black'
                fill-opacity='0.2'
              />
            </svg>
            <Swiper
              autoplay={{
                delay: 4000,
              }}
              loop
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              breakpoints={{
                1500: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={50}
              slidesPerView={1}
              modules={[Navigation]}>
              {data?.map((quest: Quest) => {
                return (
                  <SwiperSlide key={quest.id}>
                    <QuestItem quest={quest} />
                  </SwiperSlide>
                )
              })}
              {data.length < 2 && <SwiperSlide></SwiperSlide>}
            </Swiper>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='37'
              height='36'
              viewBox='0 0 37 36'
              fill='none'
              className='shrink-0 cursor-pointer swiper-next ml-10'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.2679 6.64586C13.7396 6.24151 14.4498 6.29614 14.8542 6.76788L23.8542 17.2679C24.2153 17.6892 24.2153 18.3109 23.8542 18.7322L14.8542 29.2322C14.4498 29.7039 13.7396 29.7585 13.2679 29.3542C12.7961 28.9498 12.7415 28.2396 13.1459 27.7679L21.5183 18L13.1459 8.23216C12.7415 7.76042 12.7961 7.05021 13.2679 6.64586Z'
                fill='#61646B'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M13.2679 6.64586C13.7396 6.24151 14.4498 6.29614 14.8542 6.76788L23.8542 17.2679C24.2153 17.6892 24.2153 18.3109 23.8542 18.7322L14.8542 29.2322C14.4498 29.7039 13.7396 29.7585 13.2679 29.3542C12.7961 28.9498 12.7415 28.2396 13.1459 27.7679L21.5183 18L13.1459 8.23216C12.7415 7.76042 12.7961 7.05021 13.2679 6.64586Z'
                fill='black'
                fill-opacity='0.2'
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
