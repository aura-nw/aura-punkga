import ChatInput from 'components/Input/ChatInput'
import Avatar from 'images/avatar.png'
import RepIcon from 'images/icons/reply.svg'
import moment from 'moment'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { IComment } from 'src/models/comment'
import { replyComment } from 'src/services'
import Reply from './Reply'
export default function Comment({
  data,
  reload,
  chapterId,
}: {
  data: IComment
  reload: () => void
  chapterId: string
}) {
  const [showInput, setShowInput] = useState(false)
  const { t } = useTranslation()
  const { account } = useContext(Context)

  const reply = async (content) => {
    const res = await replyComment(content, data.id, chapterId)
    if (res) {
      reload()
    }
  }
  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='bg-white px-6 py-4 rounded-xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Image
              src={data.author.image || Avatar}
              alt=''
              width={32}
              height={32}
              className='w-8 h-8 object-cover rounded-full'
            />
            <strong className='ml-[10px] text-xs md:text-base'>{data.author.nickname}</strong>
            <p className='ml-4  text-xs md:text-base'>{moment(data.createAt).fromNow()}</p>
          </div>
          {account && (
            <strong
              className='flex items-center text-second-color cursor-pointer  text-xs md:text-base'
              onClick={() => setShowInput(!showInput)}>
              <Image src={RepIcon} alt='' className='mr-2 ' />
              {t('Reply')}
            </strong>
          )}
        </div>
        <div className='mt-3 font-[500] text-xs md:text-sm'>{data.content}</div>
      </div>
      {showInput && account && (
        <div className='bg-white rounded-xl ml-16'>
          <ChatInput onSubmit={reply} />
        </div>
      )}
      <div className='flex flex-col gap-[10px]'>
        {data.replies?.map((d, i) => (
          <Reply key={i} data={d} />
        ))}
      </div>
    </div>
  )
}
