import Image from "next/image"
import Avatar from "images/avatar.png"
import RepIcon from "images/icons/reply.svg"
export default function Reply() {
  return (
    <div className="bg-white px-6 py-4 rounded-xl ml-16">
      <div className="flex items-center">
        <Image src={Avatar} alt="" className="w-8 h-8" />
        <strong className="ml-[10px]">amyrobson</strong>
        <p className="ml-4">1 month ago</p>
      </div>
      <div className="mt-3 text-sm font-[500]">Impressive! Though it seems the drag feature could be improved.</div>
    </div>
  )
}
