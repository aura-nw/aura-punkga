import { EyeIcon } from "@heroicons/react/20/solid"
import NoImage from "images/no_img.png"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"
import { IComic } from "src/models/comic"

export default function TrendingComic(props: IComic) {
  const { locale } = useRouter()
  return (
    <div className="flex gap-[20px]">
      <div className="flex-auto w-1/3">
        <Image src={props.image || NoImage} alt="" className={`rounded-[15px] w-[140px] h-[180px] ${props.image ? 'object-cover':'object-contain bg-light-gray'}`} />
      </div>
      <div className="flex-auto w-2/3 flex flex-col">
        <div className="font-bold text-[18px]">{props[locale].title}</div>
        <div>
          {props.authors.map((author, index) => (
            <Fragment key={index}>
              <span className="font-[500] first:hidden">, </span>
              <span className="font-[500]">{author}</span>
            </Fragment>
          ))}
        </div>
        <div className="text-medium-gray flex-1">
          <div className="flex items-center ">
            <EyeIcon className="w-5 inline mr-1" /> {props.views.toLocaleString('en-US')}
          </div>
        </div>
        <div className="mt-[10px] [20px]">
          Latest:{" "}
          <Link href={`/comic/${props.id}/chapter/${props.latestChap.id}`} className="text-second-color font-[600]">
            Chap #{props.latestChap.number}
          </Link>
        </div>
      </div>
    </div>
  )
}
