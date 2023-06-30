import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import Logo from "assets/images/header-logo.svg"
import OutlineButton from "components/Button/OutlineButton"
import PageMockup from "images/comicpage.png"
import ChatIcon from "images/icons/chat.svg"
import FullscreenIcon from "images/icons/fullscreen.svg"
import HeartIcon from "images/icons/heart.svg"
import InboxIcon from "images/icons/inbox.svg"
import MinscreenIcon from "images/icons/minscreen.svg"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { LanguageType } from "src/constants/global.types"
import { IChapter } from "src/models/chapter"
import { IComicDetail } from "src/models/comic"

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
  const [hovering, setHovering] = useState(false)
  const ref = useRef()

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
    if (position.bottom < window.innerHeight) {
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

  if (typeof chapterData == "undefined" || typeof data == "undefined") {
    return <></>
  }

  if (!data || !chapterData) {
    return <div>Không có dữ liệu</div>
  }

  return (
    <div className={`w-full h-full ${mode == "minscreen" ? "relative" : "fixed bg-black z-20 top-0 bottom-0"}`}>
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
        <div ref={ref} className={`${mode == "minscreen" ? "mt-0" : "mt-[60px]"} w-[70%] mx-auto mb-[60px]`}>
          {chapterData[language]?.map((page, index) => (
            <Image src={page || PageMockup} key={index} alt="" className="mx-auto" width={1000} height={1000} />
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
            onClick={() => setMode(mode == "minscreen" ? "fullscreen" : "minscreen")}
            src={mode == "minscreen" ? FullscreenIcon : MinscreenIcon}
            alt=""
          />
          <Image src={HeartIcon} alt="" />
          {mode == "fullscreen" ? (
            <></>
          ) : tab == "detail" ? (
            <Image src={ChatIcon} alt="" onClick={() => setTab("comment")} />
          ) : (
            <Image src={InboxIcon} alt="" onClick={() => setTab("detail")} />
          )}
        </div>
      </div>
    </div>
  )
}
