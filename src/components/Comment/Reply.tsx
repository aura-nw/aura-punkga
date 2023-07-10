import Image from "next/image"
import Avatar from "images/avatar.png"
import RepIcon from "images/icons/reply.svg"
import { IReply } from "src/models/comment"
import moment from "moment"
export default function Reply({data}:{data:IReply}) {
  return (
    <div className="bg-white px-6 py-4 rounded-xl ml-16">
      <div className="flex items-center">
        <Image src={Avatar} alt="" className="w-8 h-8" />
        <strong className="ml-[10px]">{data.author.nickname}</strong>
        <p className="ml-4">{moment(data.createAt).fromNow()}</p>
      </div>
      <div className="mt-3 text-sm font-[500]">{data.content}</div>
    </div>
  )
}
