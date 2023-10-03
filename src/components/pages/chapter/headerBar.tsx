import { ChevronUpIcon } from '@heroicons/react/24/outline'
import FlashAnimation from 'components/AnimationIconHOC/Flash'
import Comment from 'components/Comment'
import ChatInput from 'components/Input/ChatInput'
import ChatOutlineIcon from 'images/icons/chat_outline.svg'
import HeartFillIcon from 'images/icons/heart_fill.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import SquareArrowLeftIcon from 'images/icons/square_arrow_left_outline.svg'
import SquareArrowRightIcon from 'images/icons/square_arrow_right_outline.svg'
import XIcon from 'images/icons/x-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CHAPTER_STATUS } from 'src/constants/chapter.constant'
import { Context } from 'src/context'
export default function HeaderBar({
  openComments,
  setOpenComments,
  currentChapIndex,
  comicDetails,
  goToChap,
  chapterDetails,
  likeHandler,
  isLiked,
  chapterComments,
  postComment,
}: any) {
  const [showChapterList, setShowChapterList] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()
  const { account } = useContext(Context)

  return (
    <div className={`sticky top-[-1px] z-10 w-full`}>
      <div className='flex justify-between items-center px-5 py-3 bg-black w-full'>
        <div>
          {openComments ? (
            <Image src={XIcon} alt='' className='w-5 h-5' onClick={() => setOpenComments(false)} />
          ) : (
            <Image src={ChatOutlineIcon} alt='' className='w-6 h-6' onClick={() => setOpenComments(true)} />
          )}
        </div>
        <div className='flex justify-center items-center'>
          <Image
            className={`w-6 h-6 cursor-pointer ${
              currentChapIndex == comicDetails.data.chapters.length - 1
                ? 'opacity-60 cursor-not-allowed pointer-events-none'
                : ''
            }`}
            onClick={() => goToChap('Prev')}
            src={SquareArrowLeftIcon}
            alt=''
          />
          <div className='relative px-[10px] mx-2 rounded-lg border-second-color border-[1.5px] flex gap-[10px] items-center justify-between cursor-pointer '>
            <span
              onClick={() => setShowChapterList(!showChapterList)}
              className='text-second-color w-full text-xs leading-5'>{`${t('Chapter')} ${
              chapterDetails.data.number
            }`}</span>
            <ChevronUpIcon
              onClick={() => setShowChapterList(!showChapterList)}
              className={`h-6 w-6 text-second-color transition-all ${showChapterList ? 'rotate-0' : 'rotate-180'}`}
            />
            <div
              className={`absolute bg-light-gray top-[120%] left-0 px-[10px] py-[6px] border-[1.5px] border-second-color rounded-xl w-full flex gap-[10px] flex-col-reverse transition-all ${
                showChapterList
                  ? 'max-h-[135px] overflow-auto opacity-100'
                  : 'max-h-[0px] overflow-hidden opacity-0 pointer-events-none'
              }`}>
              {comicDetails.data?.chapters
                ?.filter((chapter) => chapter.status == 'Published')
                ?.map((chapter, index) => {
                  return (
                    <div
                      onClick={() => {
                        setShowChapterList(false)
                        router.push(`/comic/${comicDetails.data.slug}/chapter/${chapter?.number}`)
                      }}
                      key={index}
                      className={`cursor-pointer text-xs hover:bg-light-medium-gray ${
                        currentChapIndex == index ? 'text-second-color' : ''
                      }`}>
                      {t('Chapter')} {chapter.number}
                    </div>
                  )
                })}
            </div>
          </div>
          <Image
            className={`cursor-pointer w-6 h-6 ${
              currentChapIndex == 0 ||
              comicDetails.data.chapters?.[currentChapIndex - 1]?.status == CHAPTER_STATUS.UPCOMING
                ? 'opacity-60 cursor-not-allowed pointer-events-none'
                : ''
            }`}
            onClick={() => goToChap('Next')}
            src={SquareArrowRightIcon}
            alt=''
          />
        </div>
        <div>
          <FlashAnimation
            InactiveComponent={(props: any) => (
              <Image
                className='cursor-pointer w-6 h-6'
                onClick={() => likeHandler(true)}
                src={HeartOutlineIcon}
                alt=''
                {...props}
              />
            )}
            ActiveComponent={(props: any) => (
              <Image
                className='cursor-pointer w-6 h-6'
                onClick={() => likeHandler(false)}
                src={HeartFillIcon}
                alt=''
                {...props}
              />
            )}
            active={isLiked}
          />
        </div>
      </div>
      <div
        className={`${
          openComments ? 'pb-[20px] h-[calc(100dvh-100px)]' : 'pb-0 h-0'
        } w-full overflow-auto absolute top-full bg-[#000000b2]`}>
        <div className='flex flex-col gap-5 overflow-auto p-5'>
          {!!chapterComments.data?.length &&
            chapterComments.data.map((comment, index) => (
              <Comment
                reload={() => chapterComments.callApi(true)}
                key={index}
                data={comment}
                chapterId={chapterDetails.data.id}
              />
            ))}
        </div>
        {openComments ? (
          account?.verified && account?.name ? (
            <div className='bg-light-gray fixed bottom-0 right-0 left-0 w-full'>
              <ChatInput onSubmit={postComment} />
            </div>
          ) : (
            <div className='bg-light-gray fixed bottom-0 right-0 left-0 w-full py-[14px]'>
              <div className=' text-sm font-medium text-center leading-6 text-subtle-dark'>
                {t('You must')}{' '}
                <span
                  className='text-second-color underline font-bold cursor-pointer'
                  onClick={() => {
                    ;(document.querySelector('#open-sign-in-btn') as any)?.click()
                  }}>
                  {t('sign in')}
                </span>{' '}
                {t('to comment')}
              </div>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
