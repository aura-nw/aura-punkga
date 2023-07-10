import Avatar from "images/avatar.png"
import SendIcon from "images/icons/send.svg"
import Image from "next/image"
import AutoGrowingTextField from "../TextField/AutoGrowing"
import classes from "./chatInput.module.scss"
import { useContext, useState } from "react"
import { Context } from "src/context"
export default function ChatInput({ onSubmit }) {
  const { account } = useContext(Context)
  const [content, setContent] = useState("")
  return (
    <div className={`px-6 py-3 flex items-start gap-[10px] ${classes["chat-input"]}`}>
      <div className="w-9 h-9 flex-none flex items-center justify-center">
        <Image src={account?.image || Avatar} alt="" width={32} height={32} className="rounded-full" />
      </div>
      <AutoGrowingTextField placeholder="Write a comment" defaultValue={content} onChange={setContent} />
      <div
        className="w-9 h-9 flex flex-none items-center justify-center"
        onClick={async () => {
          await onSubmit(content)
          setContent("")
        }}>
        <Image src={SendIcon} alt="" className="h-8 cursor-pointer" />
      </div>
    </div>
  )
}
