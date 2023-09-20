import Comment from 'components/Comment'
import ChatInput from 'components/Input/ChatInput'
import Modal from 'components/Modal'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Context } from 'src/context'
import { IComment } from 'src/models/comment'

export default function CommentSection({
  postComment,
  comments,
  reload,
  mode,
  openComments,
  setOpenComments,
  chapterId,
}: {
  postComment: (content: string) => void
  reload: () => void
  comments: IComment[]
  mode: 'minscreen' | 'fullscreen'
  openComments: boolean
  setOpenComments: any
  chapterId: string
}) {
  const { account } = useContext(Context)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const length = comments.reduce((total, current) => {
    return total + 1 + current.replies.length
  }, 0)

  if (mode == 'fullscreen') {
    return (
      <Modal open={openComments} setOpen={setOpenComments}>
        <div className='h-[80vh] w-[50vw] flex flex-col'>
          <div className='w-full bg-light-medium-gray px-10 py-[16px] font-bold'>
            {locale == 'en' ? `${length} comment${length > 1 ? 's' : ''}` : `${length} bình luận`}
          </div>
          <div className='bg-light-gray py-10 px-10 flex flex-col gap-6 overflow-auto flex-auto'>
            {comments.map((comment, index) => (
              <Comment reload={reload} key={index} data={comment} chapterId={chapterId} />
            ))}
          </div>
          {account?.verified && account?.name ? (
            <div className='bg-light-gray w-full'>
              <ChatInput onSubmit={postComment} />
            </div>
          ) : (
            <div className='bg-light-gray w-full py-5'>
              <div className=' text-sm font-medium text-center leading-6'>
                {t('You must')}{' '}
                <span
                  className='text-second-color underline font-bold cursor-pointer'
                  onClick={() => {
                    ;(document.querySelector('#open-sign-in-btn') as any)?.click()
                  }}>
                  {t('sign in')}
                </span>{' '}
                {t('to comment')}
              </div>
            </div>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <div className='relative h-full flex flex-col'>
      <div className='w-full bg-light-medium-gray px-[60px] py-[16px] font-bold'>
        {locale == 'en' ? `${length} comment${length > 1 ? 's' : ''}` : `${length} bình luận`}
      </div>
      <div className='bg-light-gray h-full py-10 px-10 flex flex-col gap-6 overflow-auto flex-auto'>
        {comments.map((comment, index) => (
          <Comment reload={reload} key={index} data={comment} chapterId={chapterId} />
        ))}
      </div>
      {account?.verified && account?.name ? (
        <div className='bg-light-gray w-full'>
          <ChatInput onSubmit={postComment} />
        </div>
      ) : (
        <div className='bg-light-gray w-full py-5'>
          <div className=' text-sm font-medium text-center leading-6'>
            {t('You must')}{' '}
            <span
              className='text-second-color underline font-bold cursor-pointer'
              onClick={() => {
                ;(document.querySelector('#open-sign-in-btn') as any)?.click()
              }}>
              {t('sign in')}
            </span>{' '}
            {t('to comment')}
          </div>
        </div>
      )}
    </div>
  )
}
