import Post from 'components/pages/homepage/post'
import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Context } from 'src/context'
import { PostListContext } from 'src/context/postList'
import { contentService } from 'src/services/contentService'
import 'swiper/css'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
export default function Desktop() {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const { postList, setPostData, selectedTags, setSelectedTags } = useContext(PostListContext)
  const { account } = useContext(Context)
  const fetchManga = async (isRefresh?: boolean) => {
    const data = await contentService.getPostList(20, isRefresh ? 0 : postList.offset, account?.id, selectedTags)
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
  return (
    <div className='min-h-screen relative flex justify-between bg-[#161619] text-white'>
      <LeftSection className='h-[calc(100vh-82px)] shrink-0 w-96 lg:w-[400px] sticky top-[82px] overflow-hidden hover:overflow-auto py-7 space-y-7 hidden xl:block' />
      <div className='w-full max-w-screen-md px-6 min-w-0 py-7'>
        <div className='text-white text-lg font-bold mb-8 leading-relaxed'>News feed</div>
        <InfiniteScroll
          className='space-y-10 relative'
          dataLength={postList.list.length}
          next={fetchManga}
          hasMore={postList.remaining}
          loader={<h4 className='w-full text-center font-medium text-sm'>Loading...</h4>}>
          {postList.list.map((post, index) => (
            <Post key={index} data={post} />
          ))}
        </InfiniteScroll>
      </div>
      <div className='h-[calc(100vh-82px)] w-96 lg:w-[400px] shrink-0 bg-[#111111] sticky top-14 lg:top-[82px] py-7 overflow-hidden hover:overflow-auto space-y-7'>
        <RightSection className='space-y-7' />
        <LeftSection className='space-y-7 xl:hidden' />
      </div>
    </div>
  )
}
