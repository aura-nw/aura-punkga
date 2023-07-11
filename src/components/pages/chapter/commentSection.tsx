import Comment from "components/Comment"
import ChatInput from "components/Input/ChatInput"
import { useContext } from "react"
import { Context } from "src/context"
import { IComment } from "src/models/comment"

export default function CommentSection({
  postComment,
  comments,
  reload,
}: {
  postComment: (content: string) => void
  reload: () => void
  comments: IComment[]
}) {
  const { account } = useContext(Context)

  return (
    <div className="relative h-full">
      <div className="w-full bg-light-medium-gray px-[60px] py-[16px] font-bold absolute top-0 right-0 left-0 z-10">
        {`${comments.length} comment`}
      </div>
      <div className="bg-light-gray h-full pt-[66px] pb-[70px] px-10 flex flex-col gap-6 overflow-auto">
        {comments.map((comment, index) => (
          <Comment reload={reload} key={index} data={comment} />
        ))}
      </div>
      {account ? (
        <div className="bg-light-gray absolute bottom-0 right-0 left-0 w-full">
          <ChatInput onSubmit={postComment} />
        </div>
      ) : (
        <div className="bg-light-gray absolute bottom-0 right-0 left-0 w-full py-5">
          <div className=" text-sm font-medium text-center leading-6">
            You must{" "}
            <span
              className="text-second-color underline font-bold cursor-pointer"
              onClick={() => {
                ;(document.querySelector("#open-sign-in-btn") as any)?.click()
              }}>
              sign in
            </span>{" "}
            to comment
          </div>
        </div>
      )}
    </div>
  )
}
