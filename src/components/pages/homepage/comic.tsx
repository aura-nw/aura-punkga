import StatusLabel from "components/Label/Status"
import Tag from "components/Label/Tag"
import Image from "next/image"
import Link from "next/link"

export interface IComic {
  image: any
  name: string
  status: "warning" | "success" | "error"
  author: string
  description: string
  tags: string[]
  views: number
  likes: number
  latestChap: number
}
export default function Comic(props: IComic) {
  return (
    <div className="flex gap-[20px]">
      <Link href="/comic/1/chapter/1" className="flex-auto w-1/3">
        <Image src={props.image} alt="" className="rounded-[15px]" />
      </Link>
      <div className="flex-auto w-2/3">
        <Link href="/comic/1/chapter/1" className=" text-second-color font-bold text-[18px]">
          {props.name} <StatusLabel status={props.status}>Ongoing</StatusLabel>
        </Link>
        <div>
          by <span className="text-second-color font-[600]">{props.author}</span>
        </div>
        <div className="flex gap-[8px] mt-[10px]">
          {props.tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>
          })}
        </div>
        <div className="mt-[10px] flex gap-[24px]">
          <div>
            <strong>{props.views.toLocaleString("en-US")}</strong> views
          </div>
          <div>
            <strong>{props.likes.toLocaleString("en-US")}</strong> likes
          </div>
        </div>
        <div className="mt-[10px] text-[16px] leading-[20px] line-clamp-3">{props.description}</div>
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
