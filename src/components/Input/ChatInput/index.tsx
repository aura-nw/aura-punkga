import Avatar from 'images/avatar.svg'
import SendIcon from 'images/icons/send.svg'
import Image from 'next/image'
import AutoGrowingTextField from '../TextField/AutoGrowing'
import classes from './chatInput.module.scss'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from 'src/context'
import { useTranslation } from 'react-i18next'
export default function ChatInput({ onSubmit }) {
  const { account } = useContext(Context)
  const [content, setContent] = useState('')
  const ref = useRef<any>()
  const buttonRef = useRef<any>()
  const { t } = useTranslation()
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div className={`px-4 md:px-6 py-2 md:py-3 flex items-center gap-[10px] ${classes['chat-input']}`}>
      <div className='w-9 h-9 flex-none flex items-center justify-center'>
        <Image
          src={account?.image || Avatar}
          alt=''
          width={32}
          height={32}
          className='rounded-full w-8 h-8 object-cover'
        />
      </div>
      <AutoGrowingTextField
        r={ref}
        placeholder={t('Write a comment')}
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
        className='w-6 md:w-9 h-9 flex flex-none items-center justify-center'
        ref={buttonRef}
        onClick={async () => {
          if (content) {
            await onSubmit(content)
            setContent('')
            ref.current.innerHTML = ''
          }
        }}>
        <Image src={SendIcon} alt='' className='h-8 cursor-pointer' />
      </div>
    </div>
  )
}
