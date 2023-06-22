import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import OutlineButton from "components/Button/OutlineButton"
import FullscreenIcon from "images/icons/fullscreen.svg"
import HeartIcon from "images/icons/heart.svg"
import InboxIcon from "images/icons/inbox.svg"
import ChatIcon from "images/icons/chat.svg"
import PageMockup from "images/comicpage.png"
import Image from "next/image"
export default function ReadingSection({ tab, setTab }) {
  return (
    <div className="w-full relative h-full">
      <div className="h-full overflow-auto">
        <div className="w-[80%] mx-auto mb-[60px]">
          <Image src={PageMockup} alt="" />
        </div>
      </div>
      <div className="bg-light-gray absolute bottom-0 right-0 left-0 w-full">
        <div className="flex items-center px-[40px] py-[6px]">
          <div className="flex-1 self-center">
            <div>
              <strong>Anime name • Chapter 223 • Chapter name</strong>
              <p className="text-subtle-dark">20 likes • 1k views • 12 comments</p>
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
          <div className="flex-1 self-center flex gap-2 justify-end">
            <Image src={FullscreenIcon} alt="" />
            <Image src={HeartIcon} alt="" />
            {
              (tab == "detail" ? (
                <Image src={ChatIcon} alt="" onClick={() => setTab("comment")} />
              ) : (
                <Image src={InboxIcon} alt="" onClick={() => setTab("detail")} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
