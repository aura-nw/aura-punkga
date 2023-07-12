import Image from "next/image"
import Avatar from "images/avatar.png"
import RepIcon from "images/icons/reply.svg"
import Reply from "./Reply"
import ChatInput from "components/Input/ChatInput"
import { IComment } from "src/models/comment"
import moment from "moment"
import { useContext, useState } from "react"
import { replyComment } from "src/services"
import { useRouter } from "next/router"
import { Context } from "src/context"
export default function Comment({ data, reload }: { data: IComment; reload: () => void }) {
  const [showInput, setShowInput] = useState(false)
  const { account } = useContext(Context)
  const { query } = useRouter()

  const reply = async (content) => {
    const res = await replyComment(content, data.id, query.chapterId as string)
    if (res) {
      reload()
    }
  }
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="bg-white px-6 py-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={Avatar} alt="" className="w-8 h-8" />
            <strong className="ml-[10px]">{data.author.nickname}</strong>
            <p className="ml-4">{moment(data.createAt).fromNow()}</p>
          </div>
          {account && (
            <strong
              className="flex items-center text-second-color cursor-pointer"
              onClick={() => setShowInput(!showInput)}>
              <Image src={RepIcon} alt="" className="mr-2" />
              Reply
            </strong>
          )}
        </div>
        <div className="mt-3 text-sm font-[500]">{data.content}</div>
      </div>
      {showInput && (
        <div className="bg-white rounded-xl ml-16">
          <ChatInput onSubmit={reply} />
        </div>
      )}
      <div className="flex flex-col gap-[10px]">
        {data.replies?.map((d, i) => (
          <Reply key={i} data={d} />
        ))}
      </div>
    </div>
  )
}
