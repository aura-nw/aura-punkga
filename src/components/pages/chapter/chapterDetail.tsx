import { ArrowRightIcon, LockClosedIcon } from "@heroicons/react/20/solid"
import { ArrowsUpDownIcon, BellAlertIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import OutlineButton from "components/Button/OutlineButton"
import TextField from "components/Input/TextField"
import StatusLabel from "components/Label/Status"
import Tag from "components/Label/Tag"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import mockBanner from "src/assets/images/mockup3.png"
import mockAvar from "src/assets/images/mockup4.png"
import m6 from "src/assets/images/mockup6.png"

export default function ChapterDetail() {
  const [expandDetail, setExpandDetail] = useState(false)
  return (
    <div
      className={`${
        expandDetail ? " z-10" : "z-[1] duration-1000 transition-all"
      }   absolute top-0 bottom-0 left-0 right-0 flex justify-end`}>
      <div
        className={`relative flex-auto h-full duration-500 transition-all bg-white ${
          expandDetail ? "pk-width__ml-opposite opacity-1 z-10" : "z-0 opacity-0 w-2/3"
        }`}>
        <div
          onClick={() => setExpandDetail(false)}
          className="absolute bg-green-600 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
          <ArrowRightIcon className="w-9 h-9 text-white" />
        </div>
      </div>
      <div
        className={`relative flex-auto bg-light-gray h-full overflow-auto duration-500 transition-all ${
          expandDetail ? "pk-width__ml" : "w-1/3"
        }`}>
        <Image
          src={mockBanner}
          className={`${expandDetail ? "h-[280px]" : "h-[160px]"} duration-500 transition-all object-cover w-full`}
          alt=""
        />
        <div className="px-[60px] flex flex-col gap-[10px]">
          <div className={`${expandDetail ? " mt-[-180px]" : " mt-[-44px]"} duration-500 transition-all flex gap-5`}>
            <Image
              src={mockAvar}
              className={`${
                expandDetail ? " w-[240px] h-[320px]" : " w-[120px] h-[160px]"
              } duration-500 transition-all object-cover rounded-[15px] overflow-hidden `}
              alt=""
            />
            <div className="flex-1 flex flex-col justify-end gap-[10px]">
              <p className="font-bold text-second-color text-2xl leading-6">Hero Cyberpunk</p>
              <p
                className={`${
                  expandDetail ? "opacity-100 h-6" : "opacity-0 h-0 mt-[-10px]"
                } font-semibold text-xl duration-500 transition-all text-second-color`}>
                Hanz
              </p>
              <p className="">
                <strong>1,234</strong> views • <strong>1,000</strong> likes
              </p>
              <div
                className={`${
                  !expandDetail ? "opacity-100 h-[34px]" : "opacity-0 h-0  mt-[-10px]"
                } duration-500 transition-all flex gap-[10px]`}>
                <OutlineButton>
                  <Link href="/sample" className="h-5 flex items-center">
                    <BellAlertIcon className="w-6 h-6 mr-2 inline-block" />
                    Subscribe
                  </Link>
                </OutlineButton>
                <OutlineButton onClick={() => setExpandDetail(true)}>See Detail</OutlineButton>
              </div>
              <div
                className={`${
                  expandDetail ? "opacity-100 h-6" : "opacity-0 h-0  mt-[-10px]"
                } duration-500 transition-all flex gap-2 flex-wrap`}>
                <Tag>Low-Life</Tag>
                <Tag>Shonen 18+</Tag>
                <Tag>Hi-tech</Tag>
              </div>
            </div>
          </div>
          <p className="italic text-subtle-dark ">
            <a className="text-second-color underline font-semibold">Sign in</a> to unlock special chapters!
          </p>
          <div
            className={`${
              !expandDetail ? "opacity-100 h-6" : "opacity-0 h-0  mt-[-10px]"
            } duration-500 transition-all flex-wrap`}>
            <Tag>Low-Life</Tag>
            <Tag>Shonen 18+</Tag>
            <Tag>Hi-tech</Tag>
          </div>
          <p className="line-clamp-3 ">
            Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã
            đăng ký một cuộc thi Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu
            Cyber-Soccer, cậu đã đăng ký một cuộc thi Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi
            xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi Main hack được một năng lực cực mạnh tên là Dark
            Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi Main hack được một năng lực cực
            mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi Main hack được
            một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc
            thi Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã
            đăng ký một cuộc thi
          </p>
          <div className="flex gap-2 flex-wrap">
            <Tag selected={true}>English</Tag>
            <Tag>Vietnamese</Tag>
          </div>
        </div>
        <div className="flex gap-1">
          <div className={`flex-auto ${expandDetail ? " w-1/2" : " w-full -mr-1"} duration-500 transition-all`}>
            <div className="w-full bg-medium-gray px-[60px] py-[16px] flex items-center justify-between mt-[13px]">
              <div className="flex gap-5 items-center whitespace-nowrap">
                <strong className="text-[16px]">233 chapters</strong>
                <TextField
                  size="sm"
                  placeholder="Enter chapter number"
                  leadingComponent={<DocumentTextIcon className="w-[18px] h-[18px] text-medium-gray" />}
                />
              </div>
              <div>
                <ArrowsUpDownIcon className="w-[14px] h-[14px] text-light-gray" />
              </div>
            </div>
            <div className="px-[60px] py-[20px] flex flex-col gap-5">
              {Array.apply(null, Array(10)).map((v, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Image src={m6} alt="" className="w-[60px] h-[60px]" />
                  <div>
                    <div className="flex items-center gap-5">
                      <p>Chapter 231</p>
                      <StatusLabel status="error">
                        <>
                          <LockClosedIcon className="w-5 h-5" />
                          Account Only
                        </>
                      </StatusLabel>
                    </div>
                    <div className="font-[600]">This is the chapter name #233</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex-auto ${
              expandDetail ? " w-1/2 opacity-100" : "opacity-0 w-0"
            } duration-500 transition-all overflow-hidden whitespace-nowrap`}>
            <div className={`px-[60px] py-[16px] bg-medium-gray font-bold mt-[13px] leading-[30px] text-center `}>
              Hero Cyberpunk’s NFTs
            </div>
            <div className="flex justify-center p-10 opacity-10">
              <strong>Artist Composing</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
