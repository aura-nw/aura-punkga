import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Frame from './assets/quest-background.svg'
import { useContext, useRef, useState } from 'react'
import useSWR from 'swr'
import { Context } from 'src/context'
import { getAvailableQuests } from 'src/services'
export default function Quest() {
  const swiperRef = useRef<any>()
  const { account } = useContext(Context)
  const { data } = useSWR({ key: 'get_available_quests', account }, ({ account }) =>
    account ? getAvailableQuests() : null
  )
  return (
    <>
      <div className='relative w-[35%] aspect-[571/581] mr-6'>
        <Image src={Frame} alt='' className='absolute inset-0 w-full h-full' />
        <div className='relative font-orbitron text-primary-color font-extrabold text-2xl mt-[2.5%] ml-[12%] w-fit'>
          Available Quest
        </div>
        <div className='absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 w-full'>
          <div className='flex justify-between w-[85%] translate-x-[1.5%] gap-2 m-auto'>
            <button onClick={() => swiperRef.current?.slidePrev()}>
              <svg xmlns='http://www.w3.org/2000/svg' width='50' height='40' viewBox='0 0 50 40' fill='none'>
                <path
                  d='M0.462656 20L10.3027 10.17H14.9027L24.5727 0.5H29.9727L10.4627 20L29.9727 39.51H24.5727L14.9027 29.84H10.3027L0.462656 20Z'
                  fill='#61646B'
                />
                <path
                  d='M0.462656 20L10.3027 10.17H14.9027L24.5727 0.5H29.9727L10.4627 20L29.9727 39.51H24.5727L14.9027 29.84H10.3027L0.462656 20Z'
                  fill='black'
                  fillOpacity='0.2'
                />
                <path
                  d='M39.4627 0.330078H49.3027L29.6327 20.0001L49.3027 39.6701H39.4627L19.7927 20.0001L39.4627 0.330078Z'
                  fill='#ABABAB'
                />
              </svg>
            </button>
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}
              autoplay={{
                delay: 4000,
              }}
              loop
              spaceBetween={50}
              slidesPerView={1}
              modules={[Navigation]}>
              {data?.map((quest, index) => (
                <SwiperSlide key={index}>
                  <div className='relative'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='381'
                      height='310'
                      viewBox='0 0 381 310'
                      fill='none'
                      className='w-full'>
                      <path
                        d='M379.362 294.064C379.362 296.164 378.628 298.197 377.287 299.813L372.406 305.692C370.696 307.752 368.158 308.944 365.481 308.944H165.357C163.828 308.944 162.325 308.554 160.988 307.812L152.892 303.316C151.258 302.409 149.42 301.932 147.552 301.932H14.5449C11.9646 301.932 9.50841 300.825 7.80003 298.891L3.71806 294.271C2.2649 292.626 1.46289 290.507 1.46289 288.312V24.3321C1.46289 21.9477 2.40908 19.6608 4.09372 17.9734L18.4023 3.64126C20.0906 1.95024 22.382 1 24.7715 1H178.129C180.101 1 182.017 1.64711 183.585 2.84194L187.988 6.19803C189.905 7.65838 192.247 8.44929 194.656 8.44929H359.502C361.678 8.44929 363.781 9.23798 365.421 10.6693L376.281 20.1504C378.239 21.8595 379.362 24.3315 379.362 26.9303V294.064Z'
                        fill='#F4F4F4'
                        stroke='#DEDEDE'
                        strokeWidth='2'
                      />
                    </svg>
                    <div className='inset-0 absolute flex justify-center items-center'>{`${quest.name}`}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button onClick={() => swiperRef.current?.slideNext()}>
              <svg xmlns='http://www.w3.org/2000/svg' width='50' height='40' viewBox='0 0 50 40' fill='none'>
                <path
                  d='M49.4631 20L39.6231 10.17H35.0231L25.3531 0.5H19.9531L39.4631 20L19.9531 39.51H25.3531L35.0231 29.84H39.6231L49.4631 20Z'
                  fill='#61646B'
                />
                <path
                  d='M49.4631 20L39.6231 10.17H35.0231L25.3531 0.5H19.9531L39.4631 20L19.9531 39.51H25.3531L35.0231 29.84H39.6231L49.4631 20Z'
                  fill='black'
                  fillOpacity='0.2'
                />
                <path
                  d='M10.463 0.330078H0.623047L20.293 20.0001L0.623047 39.6701H10.463L30.133 20.0001L10.463 0.330078Z'
                  fill='#ABABAB'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='absolute cursor-pointer left-[50%] bottom-[6%] -translate-x-1/2 w-[35%]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='192'
            height='58'
            viewBox='0 0 192 58'
            fill='none'
            className='w-full aspect-[192/58] h-full'>
            <path
              d='M1.46094 23.8579V11C1.46094 5.47715 5.93809 1 11.4609 1H172.319C174.971 1 177.515 2.05357 179.39 3.92893L188.39 12.9289C192.295 16.8342 192.295 23.1658 188.39 27.0711L161.39 54.0711C159.515 55.9464 156.971 57 154.319 57H34.6031C31.9509 57 29.4074 55.9464 27.532 54.0711L4.38987 30.9289C2.51451 29.0536 1.46094 26.51 1.46094 23.8579Z'
              stroke='#1FAB5E'
            />
          </svg>
          <div className='absolute inset-0 grid place-items-center text-second-color font-semibold whitespace-nowrap'>
            See all Quests
          </div>
        </div>
      </div>
    </>
  )
}
