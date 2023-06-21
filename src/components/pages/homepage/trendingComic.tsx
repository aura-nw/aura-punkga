import { EyeIcon } from "@heroicons/react/20/solid"
import StatusLabel from "components/Label/Status"
import Image from "next/image"

interface ITrendingComic {
  image: any
  name: string
  status: string
  author: string
  description: string
  tags: string[]
  views: number
  likes: number
  latestChap: number
}
export default function TrendingComic(props: ITrendingComic) {
  return (
    <div className="flex gap-[20px]">
      <div className="flex-auto w-1/3">
        <Image src={props.image} alt="" className="rounded-[15px]" />
      </div>
      <div className="flex-auto w-2/3 flex flex-col">
        <div className="font-bold text-[18px]">{props.name}</div>
        <div className="font-[500]">{props.author}</div>
        <div className="text-medium-gray flex-1">
          <div className="flex items-center ">
            <EyeIcon className="w-5 inline mr-1" /> 123,456
          </div>
        </div>
        <div className="mt-[10px] [20px]">
          Latest:{" "}
          <a href="" className="text-second-color font-[600]">
            Chap #{props.latestChap}
          </a>
        </div>
      </div>
    </div>
  )
}
