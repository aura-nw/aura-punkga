import { BellAlertIcon } from '@heroicons/react/20/solid'
import {
  BellAlertIcon as BellAlertIconOutline,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import Logo from 'assets/images/header-logo.svg'
import FlashAnimation from 'components/AnimationIconHOC/Flash'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import LazyImage from 'components/Image'
import Popover from 'components/Popover'
import PageMockup from 'images/comicpage.png'
import BookFillIcon from 'images/icons/book_fill.svg'
import BookOutlineIcon from 'images/icons/book_outline.svg'
import ChatFillIcon from 'images/icons/chat_fill.svg'
import ChatOutlineIcon from 'images/icons/chat_outline.svg'
import FullscreenIcon from 'images/icons/fullscreen.svg'
import HeartFillIcon from 'images/icons/heart_fill.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import MinscreenIcon from 'images/icons/minscreen.svg'
import SquareArrowLeftIcon from 'images/icons/square_arrow_left_outline.svg'
import SquareArrowRightIcon from 'images/icons/square_arrow_right_outline.svg'
import _ from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { CHAPTER_STATUS, CHAPTER_TYPE } from 'src/constants/chapter.constant'
import { LanguageType } from 'src/constants/global.types'
import { Context } from 'src/context'
import { IChapter } from 'src/models/chapter'
import { IComicDetail } from 'src/models/comic'
import { subscribe, unsubscribe } from 'src/services'
import { getItem, setItem } from 'src/utils/localStorage'
export default function ReadingSection({
  openComments,
  setOpenComments,
  mode,
  setMode,
  data,
  chapterData,
  language,
  isSubscribe,
  setIsSubscribe,
  likeHandler,
  goToChap,
  isLiked,
  commentNumber,
  chapterLikes,
}: {
  mode: 'minscreen' | 'fullscreen'
  setMode: (mode: 'minscreen' | 'fullscreen') => void
  openComments: boolean
  setOpenComments: any
  data: IComicDetail
  chapterData: IChapter
  language: LanguageType
  isSubscribe: boolean
  setIsSubscribe: any
  goToChap: (d: 'Prev' | 'Next') => void
  likeHandler: (isLiked: boolean) => void
  isLiked: boolean
  commentNumber: number
  chapterLikes: number
}) {
  const [readingMode, setReadingMode] = useState('twoPage')
  const [currentPage, setCurrentPage] = useState(0)
  const [showChapterList, setShowChapterList] = useState(false)
  const mainLanguage = data?.languages?.find((l) => l.isMainLanguage).shortLang
  const chapterLocale = chapterData?.[language] ? language : mainLanguage
  const ref = useRef<any>()
  const chapterLengthRef = useRef(chapterData?.[chapterLocale]?.length)
  const { account } = useContext(Context)
  const { t } = useTranslation()
  const router = useRouter()

  const subscribeHandler = (isSub: boolean) => {
    if (account?.verified && account?.name) {
      if (isSub) {
        subscribe(data.id)
      } else {
        unsubscribe(data.id)
      }
      setIsSubscribe(isSub)
    } else {
      ;(document.querySelector('#open-sign-in-btn') as any)?.click()
    }
  }

  const setReadingModeHandler = (mode: string) => {
    if (mode == 'onePage') {
      setReadingMode(mode)
      document.querySelector(`#page_${currentPage}`)?.scrollIntoView()
    } else {
      for (let index = 0; index < chapterLengthRef.current; index++) {
        if ((document.querySelector(`#page_${index}`) as any).y > 0) {
          setCurrentPage(index % 2 == 1 ? index - 1 : index)
          break
        }
      }
      setReadingMode(mode)
    }
    setItem('reading_mode', mode)
  }

  useEffect(() => {
    window.onresize = function (event) {
      var maxHeight = window.screen.height,
        curHeight = window.innerHeight

      if (maxHeight == curHeight) {
        setMode('fullscreen')
      } else {
        setMode('minscreen')
      }
    }
  }, [mode])

  useEffect(() => {
    const pageHandler = (event: any) => {
      if (
        !chapterData ||
        !chapterData?.[chapterLocale] ||
        (window as any).isSearchFocused ||
        !ref.current?.matches(':hover')
      )
        return
      let mode
      setReadingMode((prevState) => {
        mode = prevState
        return prevState
      })
      if (mode == 'twoPage') {
        if (event.deltaY < 0 || event.which == 37 || event.which == 38) {
          setCurrentPage((prevState) => (prevState - 2 < 0 ? 0 : prevState - 2))
        } else if (event.deltaY > 0 || event.which == 39 || event.which == 40) {
          setCurrentPage((prevState) => (prevState + 2 >= chapterLengthRef.current ? prevState : prevState + 2))
        }
      }
    }
    window.addEventListener('wheel', _.throttle(pageHandler, 500, { trailing: false, leading: true }))
    window.addEventListener('keydown', pageHandler)
  }, [readingMode])

  useEffect(() => {
    const lsReadingMode = getItem('reading_mode')
    if (lsReadingMode) {
      setReadingMode(lsReadingMode)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [chapterLocale])

  if (typeof chapterData == 'undefined' || typeof data == 'undefined') {
    return <></>
  }

  if (!data || !chapterData) {
    return <div>{t('No data to show')}</div>
  }
  const currentChapIndex = data.chapters.findIndex((chap) => chap.id == chapterData.id)
  chapterLengthRef.current = chapterData[chapterLocale]?.length
  return (
    <div
      className={`w-full h-full overflow-hidden ${
        mode == 'minscreen' ? 'relative' : 'fixed bg-black z-20 top-0 bottom-0'
      }`}>
      <div
        className={`absolute top-[82px] right-[69px] duration-300 transition-[opacity] ${
          mode == 'minscreen' ? 'opacity-100 w-0 overflow-hidden' : 'w-fit opacity-100'
        }`}>
        <div
          className='px-4 py-1 rounded-xl border-second-color border flex gap-[10px] items-center cursor-pointer'
          onClick={() => setMode('minscreen')}>
          <Image className='cursor-pointer h-6 w-6' src={MinscreenIcon} alt='' />
          <span className='text-second-color font-bold'>{t('Exit Fullscreen')}</span>
        </div>
      </div>
      {!account && chapterData.type == CHAPTER_TYPE.ACCOUNT_ONLY ? (
        <div className='h-full w-full flex justify-center items-center'>
          <div>
            <p className='italic text-subtle-dark '>
              {t('This is account only chapter')}. {t('Please')}{' '}
              <a
                className='text-second-color underline font-semibold cursor-pointer'
                onClick={() => (document.querySelector('#open-sign-in-btn') as any)?.click()}>
                {t('sign in')}
              </a>{' '}
              {t('to countinue reading')}!
            </p>
          </div>
        </div>
      ) : chapterData[chapterLocale] ? (
        <div className='h-[calc(100%-60px)] overflow-auto'>
          <div
            ref={ref}
            className={`${mode == 'minscreen' ? '' : ''} ${
              readingMode == 'onePage' ? 'w-[90%] max-w-[940px] mx-auto' : 'flex h-full items-center justify-center'
            }`}>
            {chapterData[chapterLocale]
              ?.slice(
                readingMode == 'onePage' ? 0 : currentPage,
                readingMode == 'onePage'
                  ? chapterLengthRef.current
                  : currentPage + 2 > chapterLengthRef.current
                  ? chapterLengthRef.current
                  : currentPage + 4
              )
              ?.map((page, index) =>
                isMobile ? null : (
                  <LazyImage
                    src={page || PageMockup}
                    key={index}
                    id={`page_${index}`}
                    alt=''
                    className={`${
                      readingMode == 'onePage'
                        ? 'mx-auto'
                        : `h-full w-1/2 [&>img]:!w-fit ${index % 2 == 0 ? '[&>img]:ml-auto' : '[&>img]:mr-auto'}`
                    } ${readingMode != 'onePage' && index > 1 && 'hidden'}`}
                    width={1900}
                    height={1000}
                    priority={index < 4}
                  />
                )
              )}
          </div>
        </div>
      ) : (
        <div className='h-full w-full flex justify-center items-center'>
          <div>{t('No data to show')}</div>
        </div>
      )}
      <div
        className={`peer bg-light-gray absolute bottom-0 right-0 left-0 w-full flex items-center px-[40px] py-[6px] ${
          mode == 'minscreen' ? 'visible' : 'invisible -z-10'
        }`}>
        <div className='flex-auto w-1/3 self-center'>
          <div className='text-ellipsis max-w-[90%] overflow-hidden whitespace-nowrap'>
            <div className='font-bold truncate'>{`Chapter ${chapterData.number} • ${chapterData.name}`}</div>
            <p className='text-subtle-dark truncate'>
              {(chapterLikes || 0).toLocaleString('en-US')} {chapterLikes > 1 ? t('likes') : t('like')} •{' '}
              {(chapterData.views || 0).toLocaleString('en-US')} {chapterData.views > 1 ? t('views') : t('view')} •{' '}
              {(commentNumber || 0).toLocaleString('en-US')} {commentNumber > 1 ? t('comments') : t('comment')}
            </p>
          </div>
        </div>
        <div className='flex-auto w-1/3 self-center flex gap-2 justify-center'>
          <OutlineButton onClick={() => goToChap('Prev')} disabled={currentChapIndex == data.chapters.length - 1}>
            <div className='flex items-center w-[130px] justify-between py-[3px] mx-[-6px] whitespace-nowrap'>
              <ChevronLeftIcon className='w-5 h-5' />
              {t('Previous chap')}
            </div>
          </OutlineButton>
          <OutlineButton
            onClick={() => goToChap('Next')}
            disabled={
              currentChapIndex == 0 || data.chapters?.[currentChapIndex - 1]?.status == CHAPTER_STATUS.UPCOMING
            }>
            <div className='flex items-center w-[130px] justify-between py-[3px] mx-[-6px] whitespace-nowrap'>
              {t('Next chap')}
              <ChevronRightIcon className='w-5 h-5' />
            </div>
          </OutlineButton>
        </div>
        <div className={`flex-auto w-1/3 self-center flex gap-2 justify-end`}>
          <Popover
            popoverRender={() => (
              <div className='p-3 bg-white rounded-lg relative -translate-x-[35%] text-xs whitespace-nowrap shadow-[0px_8px_16px_-2px_rgba(27,33,44,0.12)] mb-2'>
                {isLiked ? 'Unlike this chapter' : 'Like this chapter'}
                <div className='border-t-[6px] border-x-4 border-t-white border-x-transparent absolute bottom-0 translate-y-full right-1/2'></div>
              </div>
            )}>
            <div>
              <FlashAnimation
                InactiveComponent={(props: any) => (
                  <Image
                    className='cursor-pointer'
                    onClick={() => {
                      likeHandler(true)
                    }}
                    src={HeartOutlineIcon}
                    alt=''
                    {...props}
                  />
                )}
                ActiveComponent={(props: any) => (
                  <Image
                    className='cursor-pointer'
                    onClick={() => {
                      likeHandler(false)
                    }}
                    src={HeartFillIcon}
                    alt=''
                    {...props}
                  />
                )}
                active={isLiked}
              />
            </div>
          </Popover>
          <Image
            className='cursor-pointer'
            onClick={() => setReadingModeHandler(readingMode == 'onePage' ? 'twoPage' : 'onePage')}
            src={readingMode == 'onePage' ? BookOutlineIcon : BookFillIcon}
            alt=''
          />
          <Image className='cursor-pointer' onClick={() => setMode('fullscreen')} src={FullscreenIcon} alt='' />

          {!openComments ? (
            <Image src={ChatOutlineIcon} className='cursor-pointer' alt='' onClick={() => setOpenComments(true)} />
          ) : (
            <Image src={ChatFillIcon} className='cursor-pointer' alt='' onClick={() => setOpenComments(false)} />
          )}
        </div>
      </div>
      <div
        className={`peer bg-light-gray absolute bottom-0 right-0 left-0 w-full flex items-center px-[40px] py-[6px] duration-300 transition-opacity ${
          mode != 'minscreen' ? 'visible' : 'invisible -z-10'
        } opacity-100`}>
        <div className='flex-auto w-1/3 self-center'>
          <div className='text-ellipsis max-w-[90%] overflow-hidden whitespace-nowrap'>
            <strong className='font-bold'>{`${t('Chapter')} ${chapterData.number} • ${chapterData.name}`}</strong>
            <p className='text-subtle-dark truncate'>
              {(chapterLikes || 0).toLocaleString('en-US')} {chapterLikes > 1 ? t('likes') : t('like')} •{' '}
              {(chapterData.views || 0).toLocaleString('en-US')} {chapterData.views > 1 ? t('views') : t('view')} •{' '}
              {(commentNumber || 0).toLocaleString('en-US')} {commentNumber > 1 ? t('comments') : t('comment')}
            </p>
          </div>
        </div>
        <div className='flex-auto w-1/3 self-center flex gap-2 items-center'>
          {isSubscribe ? (
            <FilledButton onClick={() => subscribeHandler(false)}>
              <div className='h-6 flex items-center'>
                <BellAlertIcon className='w-6 h-6 mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                {t('Subscribed')}
              </div>
            </FilledButton>
          ) : (
            <OutlineButton onClick={() => subscribeHandler(true)}>
              <div className='h-6 flex items-center'>
                <BellAlertIconOutline className='w-6 h-6 mr-2 inline-block ' />
                {t('Subscribe')}
              </div>
            </OutlineButton>
          )}

          <Image
            className={`cursor-pointer ${
              currentChapIndex == data.chapters.length - 1 ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''
            }`}
            onClick={() => goToChap('Prev')}
            src={SquareArrowLeftIcon}
            alt=''
          />
          <div className='relative px-[10px] py-[4px] rounded-xl border-second-color border-[1.5px] flex gap-[10px] items-center justify-between cursor-pointer w-[200px]'>
            <span
              onClick={() => setShowChapterList(!showChapterList)}
              className='text-second-color w-full text-xs leading-5'>{`${t('Chapter')} ${chapterData.number}`}</span>
            <ChevronUpIcon
              onClick={() => setShowChapterList(!showChapterList)}
              className={`h-6 w-6 text-second-color transition-all ${showChapterList ? 'rotate-180' : 'rotate-0'}`}
            />
            <div
              className={`absolute bg-light-gray bottom-[120%] left-0 px-[10px] py-[6px] border-[1.5px] border-second-color rounded-xl w-full flex gap-[10px] flex-col-reverse transition-all ${
                showChapterList
                  ? 'max-h-[135px] overflow-auto opacity-100'
                  : 'max-h-[0px] overflow-hidden opacity-0 pointer-events-none'
              }`}>
              {data?.chapters
                ?.filter((chapter) => chapter.status == 'Published')
                ?.map((chapter, index) => {
                  return (
                    <div
                      onClick={() => router.push(`/comic/${data.slug}/chapter/${chapter?.number}`)}
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
            className={`cursor-pointer ${
              currentChapIndex == 0 || data.chapters?.[currentChapIndex - 1]?.status == CHAPTER_STATUS.UPCOMING
                ? 'opacity-60 cursor-not-allowed pointer-events-none'
                : ''
            }`}
            onClick={() => goToChap('Next')}
            src={SquareArrowRightIcon}
            alt=''
          />
          <Popover
            popoverRender={() => (
              <div className='p-3 bg-white rounded-lg relative -translate-x-[35%] text-xs whitespace-nowrap shadow-[0px_8px_16px_-2px_rgba(27,33,44,0.12)] mb-2'>
                {isLiked ? 'Unlike this chapter' : 'Like this chapter'}
                <div className='border-t-[6px] border-x-4 border-t-white border-x-transparent absolute bottom-0 translate-y-full right-1/2'></div>
              </div>
            )}>
            <div>
              <FlashAnimation
                InactiveComponent={(props: any) => (
                  <Image
                    className='cursor-pointer'
                    onClick={() => {
                      likeHandler(true)
                    }}
                    src={HeartOutlineIcon}
                    alt=''
                    {...props}
                  />
                )}
                ActiveComponent={(props: any) => (
                  <Image
                    className='cursor-pointer'
                    onClick={() => {
                      likeHandler(false)
                    }}
                    src={HeartFillIcon}
                    alt=''
                    {...props}
                  />
                )}
                active={isLiked}
              />
            </div>
          </Popover>
          <Image
            className='cursor-pointer'
            onClick={() => setReadingModeHandler(readingMode == 'onePage' ? 'twoPage' : 'onePage')}
            src={readingMode == 'onePage' ? BookOutlineIcon : BookFillIcon}
            alt=''
          />
          <Image className='cursor-pointer' onClick={() => setMode('minscreen')} src={MinscreenIcon} alt='' />
          {!openComments ? (
            <Image src={ChatOutlineIcon} alt='' className='cursor-pointer' onClick={() => setOpenComments(true)} />
          ) : (
            <Image src={ChatFillIcon} alt='' className='cursor-pointer' onClick={() => setOpenComments(false)} />
          )}
        </div>
        <div className={`flex-auto w-1/3 self-center flex gap-2 justify-end`}></div>
      </div>
    </div>
  )
}
