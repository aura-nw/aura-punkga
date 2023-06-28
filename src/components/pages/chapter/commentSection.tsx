import Comment from "components/Comment";
import ChatInput from "components/Input/ChatInput";

export default function CommentSection() {
  return (
    <div className="relative h-full">
      <div className="w-full bg-light-medium-gray px-[60px] py-[16px] font-bold absolute top-0 right-0 left-0 z-10">
        23 comment
      </div>
      <div className="bg-light-gray h-full pt-[66px] pb-[70px] px-10 flex flex-col-reverse gap-6 overflow-auto">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <div className="bg-light-gray absolute bottom-0 right-0 left-0 w-full">
        <ChatInput />
      </div>
    </div>
  )
}
