import { BellAlertIcon } from "@heroicons/react/20/solid"
import { BellIcon } from "@heroicons/react/24/outline"
import FilledButton from "components/Button/FilledButton"
import OutlineButton from "components/Button/OutlineButton"
import StatusLabel from "components/Label/Status"
import Tag from "components/Label/Tag"
import NoImage from "images/no_img.png"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useState } from "react"
import { IComic } from "src/models/comic"

export default function Comic(props: IComic & { unsubscribe?: () => void; subscribe?: () => void }) {
  const { locale } = useRouter()
  const [isSub, setIsSub] = useState(true)
  return (
    <div className='flex gap-[20px]'>
      <Link href={`/comic/${props.id}/chapter/1`} className='flex-auto w-1/3'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={180}
          height={240}
          className={`${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          } rounded-[15px] w-[180px] aspect-[18/24]`}
        />
      </Link>
      <div className='flex-auto w-2/3 flex flex-col justify-between gap-[10px]'>
        <div className='flex flex-col gap-2'>
          <Link href={`/comic/${props.id}/chapter/1`} className=' text-second-color font-bold text-[18px]'>
            {props[locale].title} <StatusLabel status={props.status.type}>{props.status.text}</StatusLabel>
          </Link>
          <div>
            by{' '}
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className='text-second-color font-[600] first:hidden'>, </span>
                <span className='text-second-color font-[600]'>{author}</span>
              </Fragment>
            ))}
          </div>
          <div className='flex gap-[8px] flex-wrap'>
            {props.tags.map((tag, index) => {
              return <Tag key={index}>{tag[locale]}</Tag>
            })}
          </div>
          <div className=' flex gap-[24px]'>
            <div>
              <strong>{props.views.toLocaleString('en-US')}</strong> views
            </div>
            <div>
              <strong>{props.likes.toLocaleString('en-US')}</strong> likes
            </div>
          </div>
          <div className=' text-[16px] leading-[20px] line-clamp-3'>{props[locale].description}</div>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <div className=' leading-[20px]'>
            Latest:{' '}
            <Link
              href={`/comic/${props.id}/chapter/${props.latestChap.number}`}
              className='text-second-color font-[600]'>
              Chap #{props.latestChap.number}
            </Link>
          </div>
          {props.nearestUpcoming && (
            <div className='leading-5'>
              New chapter arrives:{' '}
              <span className='font-semibold'>{moment(props.nearestUpcoming).format('DD/MM/YYYY')}</span>
            </div>
          )}
          {!!props.subscribe && (
            <div>
              {isSub ? (
                <OutlineButton
                  onClick={() => {
                    setIsSub(false)
                    props.unsubscribe()
                  }}>
                  <div className='h-5 flex items-center'>
                    <BellIcon className='w-6 h-6 mr-2 inline-block' />
                    Unsubscribe
                  </div>
                </OutlineButton>
              ) : (
                <FilledButton
                  onClick={() => {
                    setIsSub(true)
                    props.subscribe()
                  }}>
                  <div className='h-5 flex items-center'>
                    <BellAlertIcon className='w-6 h-6 mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                    Subscribe
                  </div>
                </FilledButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
