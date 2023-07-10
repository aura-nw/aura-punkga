import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import Logo from "assets/images/header-logo.svg"
import OutlineButton from "components/Button/OutlineButton"
import PageMockup from "images/comicpage.png"
import ChatOutlineIcon from "images/icons/chat_outline.svg"
import ChatFillIcon from "images/icons/chat_fill.svg"
import FullscreenIcon from "images/icons/fullscreen.svg"
import BookOutlineIcon from "images/icons/book_outline.svg"
import BookFillIcon from "images/icons/book_fill.svg"
import HeartOutlineIcon from "images/icons/heart_outline.svg"
import HeartFillIcon from "images/icons/heart_fill.svg"
import InboxIcon from "images/icons/inbox.svg"
import MinscreenIcon from "images/icons/minscreen.svg"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { LanguageType } from "src/constants/global.types"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"
import FlashAnimation from "components/AnimationIconHOC/Flash"
import withFlashAnimation from "components/AnimationIconHOC/Flash"

export default function ReadingSection({
  tab,
  setTab,
  data,
  chapterData,
  language,
}: {
  tab: string
  setTab: any
  data: IComicDetail
  chapterData: IChapter
  language: LanguageType
}) {
  const [mode, setMode] = useState("minscreen")
  const [readingMode, setReadingMode] = useState("onePage")
  const [currentPage, setCurrentPage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const ref = useRef()
  const mainLanguage = data.languages.find((l) => l.isMainLanguage).shortLang
  const chapterLocale = chapterData[language] ? language : mainLanguage

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
    window.addEventListener("wheel", pageHandler)
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
  return (
    <div
      className={`w-full h-full overflow-hidden ${
        mode == "minscreen" ? "relative" : "fixed bg-black z-20 top-0 bottom-0"
      }`}>
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={`bg-light-gray absolute top-0 right-0 left-0 flex items-center duration-300 transition-[opacity] ${
          mode == "minscreen" ? "opacity-100 w-0" : hovering ? "w-full opacity-100" : "w-full opacity-0"
        }`}>
        <div className="pk-container py-[5px]">
          <div>
            <Link href="/" className="flex">
              <span className="sr-only">Your Company</span>
              <Image src={Logo} alt="header logo" className="h-[50px]" />
            </Link>
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
      <div
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={`peer bg-light-gray absolute bottom-0 right-0 left-0 w-full flex items-center px-[40px] py-[6px] duration-300 transition-all ${
          mode == "minscreen" ? "opacity-100" : hovering ? "opacity-100" : "opacity-0"
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
          <OutlineButton>
            <div className="flex items-center w-[130px] justify-between py-[3px] mx-[-6px]">
              <ChevronLeftIcon className="w-5 h-5" />
              Previous chap
            </div>
          </OutlineButton>
          <OutlineButton>
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
          <Image
            className="cursor-pointer"
            onClick={() => setMode(mode == "minscreen" ? "fullscreen" : "minscreen")}
            src={mode == "minscreen" ? FullscreenIcon : MinscreenIcon}
            alt=""
          />
          <FlashAnimation
            InactiveComponent={(props: any) => (
              <Image
                className="cursor-pointer"
                onClick={() => setIsLiked(true)}
                src={HeartOutlineIcon}
                alt=""
                {...props}
              />
            )}
            ActiveComponent={(props: any) => (
              <Image
                className="cursor-pointer"
                onClick={() => setIsLiked(false)}
                src={HeartFillIcon}
                alt=""
                {...props}
              />
            )}
            active={isLiked}
          />
          {mode == "fullscreen" ? (
            <></>
          ) : tab == "detail" ? (
            <Image src={ChatOutlineIcon} alt="" onClick={() => setTab("comment")} />
          ) : (
            <Image src={InboxIcon} alt="" onClick={() => setTab("detail")} />
          )}
        </div>
      </div>
    </div>
  )
}
