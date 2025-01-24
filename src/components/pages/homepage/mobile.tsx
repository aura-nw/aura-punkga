import useDetectScroll from '@smakss/react-scroll-direction'
import Post from 'components/pages/homepage/post'
import getConfig from 'next/config'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
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
  const { data: tags } = useSWR('get-all-tag', contentService.getTagList)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const { postList, setPostData, selectedTags, setSelectedTags } = useContext(PostListContext)
  const { account } = useContext(Context)
  const { scrollDir } = useDetectScroll({
    thr: 50,
  })
  const fetchManga = async (isRefresh?: boolean) => {
    const data = await contentService.getPostList(LIMIT, isRefresh ? 0 : postList.offset, account?.id, selectedTags)
    if (data?.data?.posts?.length) {
      if (isRefresh) {
        setPostData({
          list: [...data?.data?.posts],
          offset: data?.data?.posts.length,
          remaining: true,
        })
      } else {
        setPostData({
          list: [...postList.list, ...data?.data?.posts],
          offset: postList.offset + data?.data?.posts.length,
          remaining: true,
        })
      }
    } else {
      if (isRefresh) {
        setPostData({
          list: [],
          offset: 0,
          remaining: false,
        })
      } else {
        setPostData({
          offset: postList.offset,
          remaining: false,
        })
      }
    }
  }
  useEffect(() => {
    if (isFirstLoad && postList.list.length === 0) {
      fetchManga()
    }
    setIsFirstLoad(false)
  }, [])
  useEffect(() => {
    if (!isFirstLoad) {
      fetchManga(true)
    }
  }, [selectedTags.length])
  return (
    <div className='bg-background py-4 text-white min-h-screen'>
      <div className='space-y-4'>
        <div className=''>
          <Swiper slidesPerView='auto' slidesOffsetBefore={16} slidesOffsetAfter={16} spaceBetween={16}>
            {events.map((event, index) => (
              <SwiperSlide key={index} className='!h-[97px] !w-[143px] rounded-md overflow-hidden'>
                {event?.image && (
                  <Link href={event.slug} target='_blank'>
                    <Image src={event?.image} alt='' width={150} height={150} className='w-full h-full object-cover' />
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={`sticky z-10 py-5 transition-all bg-background ${scrollDir == 'up' ? 'top-14' : '-top-5'}`}>
        <Swiper slidesPerView='auto' slidesOffsetBefore={16} slidesOffsetAfter={16} spaceBetween={16}>
          {tags?.map((tag, index) => (
            <SwiperSlide
              key={index}
              onClick={() =>
                selectedTags.includes(tag.id)
                  ? setSelectedTags(selectedTags.filter((id) => id != tag.id))
                  : setSelectedTags([...selectedTags, tag.id])
              }
              className={`text-xs !h-8 !w-fit font-medium px-1.5 border-[2px] !max-w-48 !overflow-hidden text-ellipsis !min-w-0 !flex items-center whitespace-nowrap text-white rounded-full ${
                selectedTags.includes(tag.id) ? 'border-white/90' : 'border-transparent'
              } ${index % 3 == 1 ? 'bg-blue-400' : index % 3 == 2 ? 'bg-violet-400' : 'bg-carot-400'}`}>
              {tag['en']}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <InfiniteScroll
        className='px-4 space-y-8 pb-8 relative'
        dataLength={postList.list.length}
        next={fetchManga}
        hasMore={postList.remaining}
        loader={<h4 className='w-full text-center font-medium text-sm'>Loading...</h4>}>
        {postList.list.map((post, index) => (
          <Post key={index} data={post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
