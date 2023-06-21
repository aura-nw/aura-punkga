import StatusLabel from "components/Label/Status"
import Image from "next/image"

interface IComic {
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
export default function Comic(props: IComic) {
  return (
    <div className="flex gap-[20px]">
      <div className="flex-auto w-1/3">
        <Image src={props.image} alt="" className="rounded-[15px]" />
      </div>
      <div className="flex-auto w-2/3">
        <div className="text-second-color font-bold text-[18px]">
          {props.name} <StatusLabel status={props.status} />
        </div>
        <div>
          by <span className="text-second-color font-[600]">{props.author}</span>
        </div>
        <div className="flex gap-[8px] mt-[10px]">
          {props.tags.map((tag, index) => {
            return (
              <div
                className="text-medium-gray rounded-full border-solid border-[1px] border-medium-gray px-[12px] "
                key={index}>
                {tag}
              </div>
            )
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
