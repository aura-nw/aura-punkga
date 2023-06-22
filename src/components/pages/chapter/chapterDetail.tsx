import { ArrowsUpDownIcon, BellAlertIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import OutlineButton from "components/Button/OutlineButton"
import TextField from "components/Input/TextField"
import Tag from "components/Label/Tag"
import Image from "next/image"
import React from "react"
import mockBanner from "src/assets/images/mockup3.png"
import m6 from "src/assets/images/mockup6.png"
import mockAvar from "src/assets/images/mockup4.png"
import StatusLabel from "components/Label/Status"
import { LockClosedIcon } from "@heroicons/react/20/solid"

export default function ChapterDetail() {
  return (
    <>
      <Image src={mockBanner} className="h-[160px] object-cover" alt="" />
      <div className="px-[60px] flex flex-col gap-[10px]">
        <div className="flex gap-5 mt-[-44px]">
          <Image src={mockAvar} className="w-[120px] h-[160px] object-cover rounded-[15px] overflow-hidden " alt="" />
          <div className="flex-1 flex flex-col justify-end">
            <p className="font-bold text-second-color text-[24px]">Hero Cyberpunk</p>
            <p className="mt-[10px]">
              <strong>1,234</strong> views • <strong>1,000</strong> likes
            </p>
            <div className="flex gap-[10px] mt-[10px] ">
              <OutlineButton>
                <div className="h-5 flex items-center">
                  <BellAlertIcon className="w-6 h-6 mr-2 inline-block" />
                  Subscribe
                </div>
              </OutlineButton>
              <OutlineButton>See Detail</OutlineButton>
            </div>
          </div>
        </div>
        <p className="italic text-subtle-dark ">
          <a className="text-second-color underline font-semibold">Sign in</a> to unlock special chapters!
        </p>
        <div className=" flex gap-2 flex-wrap">
          <Tag>Low-Life</Tag>
          <Tag>Shonen 18+</Tag>
          <Tag>Hi-tech</Tag>
        </div>
        <p className="line-clamp-3 ">
          Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng
          ký một cuộc thi ...
        </p>
        <div className="flex gap-2 flex-wrap">
          <Tag selected={true}>English</Tag>
          <Tag>Vietnamese</Tag>
        </div>
      </div>
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
    </>
  )
}
