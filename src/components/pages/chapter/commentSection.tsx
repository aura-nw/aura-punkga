import Comment from 'components/Comment'
import ChatInput from 'components/Input/ChatInput'
import Modal from 'components/Modal'
import { useContext } from 'react'
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

  const length = comments.reduce((total, current) => {
    return total + 1 + current.replies.length
  }, 0)

  if (mode == 'fullscreen') {
    return (
      <Modal open={openComments} setOpen={setOpenComments}>
        <div className='h-[80vh] w-[50vw] overflow-auto'>
          <div className='w-full bg-light-medium-gray px-10 py-[16px] font-bold absolute top-0 right-0 left-0 z-10'>
            {`${length} comment${length > 1 ? 's' : ''}`}
          </div>
          <div className='bg-light-gray h-full pt-[66px] pb-[70px] px-10 flex flex-col gap-6 overflow-auto'>
            {comments.map((comment, index) => (
              <Comment reload={reload} key={index} data={comment} chapterId={chapterId} />
            ))}
          </div>
          {account?.verified && account?.name ? (
            <div className='bg-light-gray absolute bottom-0 right-0 left-0 w-full'>
              <ChatInput onSubmit={postComment} />
            </div>
          ) : (
            <div className='bg-light-gray absolute bottom-0 right-0 left-0 w-full py-5'>
              <div className=' text-sm font-medium text-center leading-6'>
                You must{' '}
                <span
                  className='text-second-color underline font-bold cursor-pointer'
                  onClick={() => {
                    ;(document.querySelector('#open-sign-in-btn') as any)?.click()
                  }}>
                  sign in
                </span>{' '}
                to comment
              </div>
            </div>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <div className='relative h-full'>
      <div className='w-full bg-light-medium-gray px-[60px] py-[16px] font-bold absolute top-0 right-0 left-0 z-10'>
        {`${length} comment${length > 1 ? 's' : ''}`}
      </div>
      <div className='bg-light-gray h-full pt-[66px] pb-[70px] px-10 flex flex-col gap-6 overflow-auto'>
        {comments.map((comment, index) => (
          <Comment reload={reload} key={index} data={comment} chapterId={chapterId} />
        ))}
      </div>
      {account?.verified && account?.name ? (
        <div className='bg-light-gray absolute bottom-0 right-0 left-0 w-full'>
          <ChatInput onSubmit={postComment} />
        </div>
      ) : (
        <div className='bg-light-gray absolute bottom-0 right-0 left-0 w-full py-5'>
          <div className=' text-sm font-medium text-center leading-6'>
            You must{' '}
            <span
              className='text-second-color underline font-bold cursor-pointer'
              onClick={() => {
                ;(document.querySelector('#open-sign-in-btn') as any)?.click()
              }}>
              sign in
            </span>{' '}
            to comment
          </div>
        </div>
      )}
    </div>
  )
}
