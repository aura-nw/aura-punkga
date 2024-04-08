import ProfileCard from 'components/Card/ProfileCard'
import ChatInput from 'components/Input/ChatInput'
import Popover from 'components/Popover'
import DOMPurify from 'dompurify'
import Avatar from 'images/avatar.svg'
import RepIcon from 'images/icons/reply.svg'
import moment from 'moment'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { IComment } from 'src/models/comment'
import { getUserData, replyComment } from 'src/services'
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
  const [userData, setUserData] = useState()

  const reply = async (content) => {
    const res = await replyComment(content, data.id, chapterId)
    if (res) {
      reload()
    }
  }

  const popoverRender = (open: boolean) => {
    useEffect(() => {
      if (open && !userData) {
        fetchUserData()
      }
    }, [open])

    const fetchUserData = async () => {
      try {
        const udata = await getUserData(data.author.id)
        setUserData(udata)
      } catch (error) {}
    }
    return <ProfileCard data={userData} />
  }

  return (
    <div className='flex flex-col gap-[10px] mb-4'>
      <div className='bg-light-gray px-3 md:px-6 py-2 md:py-4 rounded-xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            {data.author?.nickname ? (
              <Popover popoverRender={popoverRender}>
                <div className='flex items-center cursor-pointer'>
                  <Image
                    src={data.author?.image || Avatar}
                    alt=''
                    width={32}
                    height={32}
                    className='w-6 h-6 md:w-8 md:h-8 object-cover rounded-full'
                  />
                  <strong className={`ml-[10px] text-xs md:text-base ${!data.author?.nickname ? 'italic' : ''}`}>
                    {data.author?.nickname || t('Deleted user')}
                  </strong>
                </div>
              </Popover>
            ) : (
              <div className='flex items-center cursor-pointer'>
                <Image
                  src={data.author?.image || Avatar}
                  alt=''
                  width={32}
                  height={32}
                  className='w-6 h-6 md:w-8 md:h-8 object-cover rounded-full'
                />
                <strong className={`ml-[10px] text-xs md:text-base ${!data.author?.nickname ? 'italic' : ''}`}>
                  {data.author?.nickname || t('Deleted user')}
                </strong>
              </div>
            )}

            <p className='ml-4 text-xs md:text-base text-subtle-dark'>{moment(data.createAt).fromNow()}</p>
          </div>
          {account && (
            <strong
              className='flex items-center text-second-color cursor-pointer  text-xs md:text-sm'
              onClick={() => setShowInput(!showInput)}>
              <Image src={RepIcon} alt='' className='mr-2' />
              {t('Reply')}
            </strong>
          )}
        </div>
        <div
          className={`mt-[6px] md:mt-3 font-[500] text-xs md:text-sm text-subtle-dark whitespace-pre-wrap ${
            !data.content ? 'italic' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content || t('Deleted comment')) }}></div>
      </div>
      {showInput && account && (
        <div className='bg-light-gray rounded-xl ml-16'>
          <ChatInput onSubmit={reply} />
        </div>
      )}
      {!!data.replies.length && (
        <div className='flex flex-col gap-[10px]'>
          {data.replies?.map((d, i) => (
            <Reply key={i} data={d} />
          ))}
        </div>
      )}
    </div>
  )
}
