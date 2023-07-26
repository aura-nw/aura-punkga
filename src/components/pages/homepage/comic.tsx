import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { IComic } from 'src/models/comic'

export default function Comic(props: IComic) {
  const { locale } = useRouter()
  const router = useRouter()
  return (
    <>
      <div className='hidden md:flex gap-[20px]'>
        <Link href={`/comic/${props.id}`} className='flex-auto w-1/3 xl:hidden'>
          <Image
            src={props.image || NoImage}
            alt=''
            width={180}
            height={240}
            className={`${
              props.image ? 'object-cover' : 'object-contain bg-light-gray'
            } rounded-[15px] w-[180px] aspect-[180/240]`}
          />
        </Link>
        <Link href={`/comic/${props.id}/chapter/1`} className='flex-auto w-1/3 hidden xl:block'>
          <Image
            src={props.image || NoImage}
            alt=''
            width={180}
            height={240}
            className={`${
              props.image ? 'object-cover' : 'object-contain bg-light-gray'
            } rounded-[15px] w-[180px] aspect-[180/240]`}
          />
        </Link>
        <div className='flex-auto w-2/3 flex flex-col justify-between gap-[10px]'>
          <div className='flex flex-col gap-[10px]'>
            <div>
              <Link href={`/comic/${props.id}`} className=' text-second-color font-bold text-[18px] xl:hidden'>
                {props[locale].title} <StatusLabel status={props.status.type}>{props.status.text}</StatusLabel>
              </Link>
              <Link
                href={`/comic/${props.id}/chapter/1`}
                className=' text-second-color font-bold text-[18px] hidden xl:block'>
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
          {!!props.latestChap.number && (
            <div className='leading-[20px]'>
              Latest:{' '}
              <Link
                href={`/comic/${props.id}/chapter/${props.latestChap.number}`}
                className='text-second-color font-[600]'>
                Chap #{props.latestChap.number}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='md:hidden'>
        <Link href={`/comic/${props.id}`} className='relative flex flex-col h-full'>
          <Image
            src={props.image || NoImage}
            alt=''
            width={180}
            height={240}
            className={`${
              props.image ? 'object-cover' : 'object-contain bg-light-gray'
            } rounded-md w-[180px] aspect-[123/164]`}
          />
          <div className='absolute top-0 left-1'>
            <StatusLabel status={props.status.type}>{props.status.text}</StatusLabel>
          </div>
          <div className='text-xs font-extrabold text-second-color mt-2'>{props[locale].title}</div>
          <div className='text-[10px] text-medium-gray flex-1'>
            by{' '}
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className='text-second-color font-[600] first:hidden'>, </span>
                <span className='text-second-color font-[600]'>{author}</span>
              </Fragment>
            ))}
          </div>
          <div className='flex justify-between items-center text-second-color text-xs mt-3'>
            <div className='flex items-center gap-1'>
              <EyeIcon className='w-4 h-4' />
              <strong>{props.views.toLocaleString('en-US')}</strong>
            </div>
            <div className='flex items-center gap-1'>
              <HeartIcon className='w-4 h-4' />
              <strong>{props.likes.toLocaleString('en-US')}</strong>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
