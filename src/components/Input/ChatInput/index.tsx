import Avatar from "images/avatar.png"
import SendIcon from "images/icons/send.svg"
import Image from "next/image"
import AutoGrowingTextField from "../TextField/AutoGrowing"
import classes from "./chatInput.module.scss"
export default function ChatInput() {
  return (
    <div className={`px-6 py-3 flex items-start gap-[10px] ${classes["chat-input"]}`}>
      <div className="w-9 h-9 flex-none flex items-center justify-center">
        <Image src={Avatar} alt="" className="w-8 h-8" />
      </div>
      <AutoGrowingTextField placeholder="Write a comment" />
      <div className="w-9 h-9 flex flex-none items-center justify-center">
        <Image src={SendIcon} alt="" className="h-8 cursor-pointer" />
      </div>
    </div>
  )
}
