import Post from 'components/pages/homepage/post'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Context } from 'src/context'
import { PostListContext } from 'src/context/postList'
import { contentService } from 'src/services/contentService'
import { eventService } from 'src/services/eventService'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'

const LIMIT = 10
export default function MobileVersion() {
  const config = getConfig()
  const { data } = useSWR('get-all-contest', eventService.getAll)
  const events = data?.data?.data?.contest || []
  const { postList, setPostData } = useContext(PostListContext)
  const { account } = useContext(Context)
  const fetchManga = async () => {
    const data = await contentService.getPostList(LIMIT, postList.offset, account?.id)
    if (data?.data?.posts?.length) {
      setPostData({
        list: [...postList.list, ...data?.data?.posts],
        offset: postList.offset + data?.data?.posts.length,
        remaining: true,
      })
    } else {
      setPostData({
        list: [...postList.list],
        offset: postList.offset,
        remaining: false,
      })
    }
  }
  useEffect(() => {
    if (postList.list.length > 0) return
    fetchManga()
  }, [])
  return (
    <main className='bg-neutral-black py-4 text-white'>
      <div className='space-y-4'>
        <Link
          href={config.ADMIN_URL}
          className='flex items-center gap-2 text-text-info-primary text-sm font-medium px-4'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3.33398 12.6703V15.7437C3.33398 16.2095 3.50958 16.6562 3.82214 16.9856C4.1347 17.315 4.55862 17.5 5.00065 17.5H15.0007C15.4427 17.5 15.8666 17.315 16.1792 16.9856C16.4917 16.6562 16.6673 16.2095 16.6673 15.7437V12.6703M10.0013 12.4521L10.0013 2.5M10.0013 2.5L6.19175 6.30265M10.0013 2.5L13.8108 6.30265'
              className='stroke-current'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Upload your manga or artwork</span>
        </Link>
        <div className=''>
          <Swiper slidesPerView='auto' slidesOffsetBefore={16} slidesOffsetAfter={16} spaceBetween={16}>
            {events.map((event, index) => (
              <SwiperSlide key={index} className='!h-[97px] !w-[143px] rounded-md overflow-hidden'>
                <Link href={event.slug} target='_blank'>
                  <Image src={event?.image} alt='' width={150} height={150} className='w-full h-full object-cover' />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <InfiniteScroll
          className='p-4 space-y-8'
          dataLength={postList.list.length}
          next={fetchManga}
          hasMore={postList.remaining}
          loader={<h4 className='w-full text-center font-medium text-sm'>Loading...</h4>}>
          {postList.list.map((post, index) => (
            <Post key={index} data={post} />
          ))}
        </InfiniteScroll>
      </div>
    </main>
  )
}
