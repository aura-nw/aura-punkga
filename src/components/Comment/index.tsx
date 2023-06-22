import Image from "next/image"
import Avatar from "images/avatar.png"
import RepIcon from "images/icons/reply.svg"
import Reply from "./Reply"
import ChatInput from "components/Input/ChatInput"
export default function Comment() {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="bg-white px-6 py-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={Avatar} alt="" className="w-8 h-8" />
            <strong className="ml-[10px]">amyrobson</strong>
            <p className="ml-4">1 month ago</p>
          </div>
          <strong className="flex items-center text-second-color cursor-pointer">
            <Image src={RepIcon} alt="" className="mr-2" />
            Reply
          </strong>
        </div>
        <div className="mt-3 text-sm font-[500]">
          Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed
          the design and the responsiveness at various breakpoints works really well.
        </div>
      </div>
      {Math.random() && (
        <div className="bg-white rounded-xl ml-16">
          <ChatInput/>
        </div>
      )}
      {Array.apply(null, Array(Math.floor(Math.random() * 3))).map((v, i) => (
        <Reply key={i} />
      ))}
    </div>
  )
}
