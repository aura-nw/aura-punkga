import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import Logo from "assets/images/header-logo.svg"
import FlashAnimation from "components/AnimationIconHOC/Flash"
import OutlineButton from "components/Button/OutlineButton"
import PageMockup from "images/comicpage.png"
import BookFillIcon from "images/icons/book_fill.svg"
import BookOutlineIcon from "images/icons/book_outline.svg"
import ChatOutlineIcon from "images/icons/chat_outline.svg"
import ChatFillIcon from "images/icons/chat_fill.svg"
import FullscreenIcon from "images/icons/fullscreen.svg"
import HeartFillIcon from "images/icons/heart_fill.svg"
import HeartOutlineIcon from "images/icons/heart_outline.svg"
import MinscreenIcon from "images/icons/minscreen.svg"
import SquareArrowLeftIcon from "images/icons/square_arrow_left_outline.svg"
import SquareArrowRightIcon from "images/icons/square_arrow_right_outline.svg"
import _ from "lodash"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { LanguageType } from "src/constants/global.types"
import { Context } from "src/context"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"

export default function ReadingSection({
  openComments,
  setOpenComments,
  data,
  chapterData,
  language,
  like,
  unlike,
}: {
  openComments: boolean
  setOpenComments: any
  data: IComicDetail
  chapterData: IChapter
  language: LanguageType
  like: () => void
  unlike: () => void
}) {
  const [mode, setMode] = useState("minscreen")
  const [readingMode, setReadingMode] = useState("onePage")
  const [currentPage, setCurrentPage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [showChapterList, setShowChapterList] = useState(false)
  const mainLanguage = data?.languages?.find((l) => l.isMainLanguage).shortLang
  const chapterLocale = chapterData[language] ? language : mainLanguage
  const ref = useRef()
  const { account } = useContext(Context)
  const router = useRouter()
  const onMouseEnterHandler = () => {
    if ((window as any).timeoutId) {
      clearTimeout((window as any).timeoutId)
    }
    setHovering(true)
  }

  const onMouseLeaveHandler = () => {
    if ((window as any).timeoutId) {
      clearTimeout((window as any).timeoutId)
    }
    ;(window as any).timeoutId = setTimeout(() => setHovering(false), 2000)
  }

  const onScrollHandler = () => {
    const position = (ref as any).current.getBoundingClientRect()
    if (position.bottom < window.innerHeight && readingMode == "onePage") {
      if ((window as any).timeoutId) {
        clearTimeout((window as any).timeoutId)
      }
      setHovering(true)
    } else {
      setHovering(false)
    }
  }

  const likeHandler = (isLike: boolean) => {
    if (account) {
      if (isLike) {
        like()
      } else {
        unlike()
      }
      setIsLiked(isLike)
    } else {
      ;(document.querySelector("#open-sign-in-btn") as any)?.click()
    }
  }

  useEffect(() => {
    window.onresize = function (event) {
      var maxHeight = window.screen.height,
        curHeight = window.innerHeight

      if (maxHeight == curHeight) {
        setMode("fullscreen")
      } else {
        setMode("minscreen")
      }
    }
  }, [mode])

  useEffect(() => {
    const pageHandler = (event: any) => {
      if (event.deltaY < 0 || event.which == 37 || event.which == 38) {
        setCurrentPage((prevState) => (prevState - 2 < 0 ? 0 : prevState - 2))
      } else if (event.deltaY > 0 || event.which == 39 || event.which == 40) {
        setCurrentPage((prevState) => (prevState + 2 > chapterData[chapterLocale].length ? prevState : prevState + 2))
      }
    }
    window.addEventListener("wheel", _.throttle(pageHandler, 500, { trailing: false, leading: true }))
    window.addEventListener("keydown", pageHandler)
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [readingMode])

  if (typeof chapterData == "undefined" || typeof data == "undefined") {
    return <></>
  }

  if (!data || !chapterData) {
    return <div>Không có dữ liệu</div>
  }

  const currentChapIndex = data.chapters.findIndex((chap) => chap.id == chapterData.id)

  const goToChap = (direction: "Prev" | "Next") => {
    if (direction == "Prev") {
      const prevChap = data.chapters[currentChapIndex + 1]
      router.push(`/comic/${data.id}/chapter/${prevChap?.id}`)
    } else {
      const nextChap = data.chapters[currentChapIndex - 1]
      router.push(`/comic/${data.id}/chapter/${nextChap?.id}`)
    }
  }

  return (
    <div
      className={`w-full h-full overflow-hidden ${
        mode == "minscreen" ? "relative" : "fixed bg-black z-20 top-0 bottom-0"
      }`}>
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={`bg-light-gray absolute top-0 right-0 left-0 flex items-center duration-300 transition-[opacity] ${
          mode == "minscreen" ? "opacity-100 w-0 overflow-hidden" : hovering ? "w-full opacity-100" : "w-full opacity-0"
        }`}>
        <div className="pk-container py-[5px] flex justify-between items-center">
          <div>
            <Link href="/" className="flex">
              <span className="sr-only">Your Company</span>
              <Image src={Logo} alt="header logo" className="h-[50px]" />
            </Link>
          </div>
          <div
            className="px-4 py-1 rounded-xl border-second-color border flex gap-[10px] items-center cursor-pointer"
            onClick={() => setMode("minscreen")}>
            <Image className="cursor-pointer h-6 w-6" src={MinscreenIcon} alt="" />
            <span className="text-second-color font-bold">Exit Fullscreen</span>
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto" onScroll={onScrollHandler}>
        <div
          ref={ref}
          className={`${mode == "minscreen" ? "" : ""} ${
            readingMode == "onePage" ? "w-[70%]" : "flex h-full"
          } mx-auto `}>
          {chapterData[chapterLocale]
            ?.slice(
              readingMode == "onePage" ? 0 : currentPage,
              readingMode == "onePage" ? chapterData[chapterLocale].length : currentPage + 2
            )
            ?.map((page, index) => (
              <Image
                src={page || PageMockup}
                key={index}
                alt=""
                className={`${
                  readingMode == "onePage" ? "mx-auto" : "h-full w-auto max-w-[50%] first:ml-auto last:mr-auto"
                } `}
                width={1000}
                height={1000}
              />
            ))}
        </div>
      </div>
      {mode == "minscreen" ? (
        <div
          className={`peer bg-light-gray absolute bottom-0 right-0 left-0 w-full flex items-center px-[40px] py-[6px] duration-300 transition-all`}>
          <div className="flex-1 self-center">
            <div>
              <strong>{`${data[language].title} • Chapter ${chapterData.number} • ${chapterData.name}`}</strong>
              <p className="text-subtle-dark">
                {(chapterData.likes || 0).toLocaleString("en-US")} likes •{" "}
                {(chapterData.views || 0).toLocaleString("en-US")} views •{" "}
                {(chapterData.comments || 0).toLocaleString("en-US")} comments
              </p>
            </div>
          </div>
          <div className="flex-1 self-center flex gap-2 justify-center">
            <OutlineButton onClick={() => goToChap("Prev")} disabled={currentChapIndex == data.chapters.length - 1}>
              <div className="flex items-center w-[130px] justify-between py-[3px] mx-[-6px]">
                <ChevronLeftIcon className="w-5 h-5" />
                Previous chap
              </div>
            </OutlineButton>
            <OutlineButton onClick={() => goToChap("Next")} disabled={currentChapIndex == 0}>
              <div className="flex items-center w-[130px] justify-between py-[3px] mx-[-6px]">
                Next chap
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </OutlineButton>
          </div>
          <div className={`flex-1 self-center flex gap-2 justify-end`}>
            <Image
              className="cursor-pointer"
              onClick={() => setReadingMode(readingMode == "onePage" ? "twoPage" : "onePage")}
              src={readingMode == "onePage" ? BookOutlineIcon : BookFillIcon}
              alt=""
            />
            <Image className="cursor-pointer" onClick={() => setMode("fullscreen")} src={FullscreenIcon} alt="" />
            <FlashAnimation
              InactiveComponent={(props: any) => (
                <Image
                  className="cursor-pointer"
                  onClick={() => likeHandler(true)}
                  src={HeartOutlineIcon}
                  alt=""
                  {...props}
                />
              )}
              ActiveComponent={(props: any) => (
                <Image
                  className="cursor-pointer"
                  onClick={() => likeHandler(false)}
                  src={HeartFillIcon}
                  alt=""
                  {...props}
                />
              )}
              active={isLiked}
            />
            {!openComments ? (
              <Image src={ChatOutlineIcon} alt="" onClick={() => setOpenComments(true)} />
            ) : (
              <Image src={ChatFillIcon} alt="" onClick={() => setOpenComments(false)} />
            )}
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={`peer bg-light-gray absolute bottom-0 right-0 left-0 w-full flex items-center px-[40px] py-[6px] duration-300 transition-all ${
            true ? "opacity-100" : "opacity-0"
          }`}>
          <div className="flex-1 self-center">
            <div>
              <strong>{`${data[language].title} • Chapter ${chapterData.number} • ${chapterData.name}`}</strong>
              <p className="text-subtle-dark">
                {(chapterData.likes || 0).toLocaleString("en-US")} likes •{" "}
                {(chapterData.views || 0).toLocaleString("en-US")} views •{" "}
                {(chapterData.comments || 0).toLocaleString("en-US")} comments
              </p>
            </div>
          </div>
          <div className="flex-1 self-center flex gap-2 justify-center">
            <Image
              className="cursor-pointer"
              onClick={() => setReadingMode(readingMode == "onePage" ? "twoPage" : "onePage")}
              src={readingMode == "onePage" ? BookOutlineIcon : BookFillIcon}
              alt=""
            />
            <Image className="cursor-pointer" onClick={() => setMode("minscreen")} src={MinscreenIcon} alt="" />
            <Image
              className={`cursor-pointer ${
                currentChapIndex == data.chapters.length - 1 ? "opacity-60 cursor-not-allowed " : ""
              }`}
              onClick={() => goToChap("Prev")}
              src={SquareArrowLeftIcon}
              alt=""
            />
            <div className="relative px-[10px] py-[4px] rounded-xl border-second-color border-[1.5px] flex gap-[10px] items-center justify-between cursor-pointer w-[200px]">
              <span
                onClick={() => setShowChapterList(!showChapterList)}
                className="text-second-color w-full text-xs leading-5">{`Chapter ${chapterData.number}`}</span>
              <ChevronUpIcon
                onClick={() => setShowChapterList(!showChapterList)}
                className={`h-6 w-6 text-second-color transition-all ${showChapterList ? "rotate-180" : "rotate-0"}`}
              />
              <div
                className={`absolute bg-light-gray bottom-[120%] left-0 px-[10px] py-[6px] border-[1.5px] border-second-color rounded-xl w-full flex gap-[10px] flex-col-reverse transition-all ${
                  showChapterList ? "max-h-[135px] overflow-auto opacity-100" : "max-h-[0px] overflow-hidden opacity-0"
                }`}>
                {data?.chapters?.map((chapter, index) => {
                  return (
                    <div
                      onClick={() => router.push(`/comic/${data.id}/chapter/${chapter?.id}`)}
                      key={index}
                      className={`cursor-pointer text-xs hover:bg-light-medium-gray ${
                        currentChapIndex == index ? "text-second-color" : ""
                      }`}>
                      Chapter {chapter.number}
                    </div>
                  )
                })}
              </div>
            </div>
            <Image
              className={`cursor-pointer ${currentChapIndex == 0 ? "opacity-60 cursor-not-allowed " : ""}`}
              onClick={() => goToChap("Next")}
              src={SquareArrowRightIcon}
              alt=""
            />
            <FlashAnimation
              InactiveComponent={(props: any) => (
                <Image
                  className="cursor-pointer"
                  onClick={() => likeHandler(true)}
                  src={HeartOutlineIcon}
                  alt=""
                  {...props}
                />
              )}
              ActiveComponent={(props: any) => (
                <Image
                  className="cursor-pointer"
                  onClick={() => likeHandler(false)}
                  src={HeartFillIcon}
                  alt=""
                  {...props}
                />
              )}
              active={isLiked}
            />
            {!openComments ? (
              <Image src={ChatOutlineIcon} alt="" onClick={() => setOpenComments(true)} />
            ) : (
              <Image src={ChatFillIcon} alt="" onClick={() => setOpenComments(false)} />
            )}
          </div>
          <div className={`flex-1 self-center flex gap-2 justify-end`}></div>
        </div>
      )}
    </div>
  )
}
