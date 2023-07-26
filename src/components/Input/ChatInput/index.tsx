import Avatar from "images/avatar.png"
import SendIcon from "images/icons/send.svg"
import Image from "next/image"
import AutoGrowingTextField from "../TextField/AutoGrowing"
import classes from "./chatInput.module.scss"
import { useContext, useRef, useState } from "react"
import { Context } from "src/context"
export default function ChatInput({ onSubmit }) {
  const { account } = useContext(Context)
  const [content, setContent] = useState("")
  const ref = useRef<any>()
  const buttonRef = useRef<any>()
  return (
    <div className={`px-6 py-3 flex items-start gap-[10px] ${classes['chat-input']}`}>
      <div className='w-9 h-9 flex-none flex items-center justify-center'>
        <Image src={account?.image || Avatar} alt='' width={32} height={32} className='rounded-full' />
      </div>
      <AutoGrowingTextField
        r={ref}
        placeholder='Write a comment'
        value={content}
        onChange={setContent}
        onKeyDown={(e) => {
          if (e.which == 13 && !e.shiftKey) {
            buttonRef.current?.click()
            e.preventDefault()
          }
        }}
      />
      <div
        className='w-9 h-9 flex flex-none items-center justify-center'
        ref={buttonRef}
        onClick={async () => {
          await onSubmit(content)
          setContent('')
          ref.current.innerHTML = ''
        }}>
        <Image src={SendIcon} alt='' className='h-8 cursor-pointer' />
      </div>
    </div>
  )
}
