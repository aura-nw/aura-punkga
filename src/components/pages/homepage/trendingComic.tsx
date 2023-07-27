import { EyeIcon } from '@heroicons/react/20/solid'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { IComic } from 'src/models/comic'

export default function TrendingComic(props: IComic) {
  const { locale } = useRouter()
  return (
    <div className={`flex gap-[20px] ${props.status.text == 'Upcoming' ? 'pointer-events-none' : ''}`}>
      <Link href={`/comic/${props.id}`} className='flex-auto w-1/3 xl:hidden'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={140}
          height={180}
          className={`rounded-[15px] w-[140px] aspect-[14/18] ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
      </Link>
      <Link href={`/comic/${props.id}/chapter/1`} className='flex-auto w-1/3 hidden xl:block'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={140}
          height={180}
          className={`rounded-[15px] w-[140px] aspect-[14/18] ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
      </Link>
      <div className='flex-auto w-2/3 flex flex-col'>
        <Link href={`/comic/${props.id}`} className=' font-bold text-[18px] xl:hidden'>
          {props[locale].title}
        </Link>
        <Link href={`/comic/${props.id}/chapter/1`} className=' font-bold text-[18px] hidden xl:block'>
          {props[locale].title}
        </Link>
        <div>
          {props.authors.map((author, index) => (
            <Fragment key={index}>
              <span className='font-[500] first:hidden'>, </span>
              <span className='font-[500]'>{author}</span>
            </Fragment>
          ))}
        </div>
        <div className='text-medium-gray flex-1'>
          <div className='flex items-center '>
            <EyeIcon className='w-5 inline mr-1' /> {props.views.toLocaleString('en-US')}
          </div>
        </div>
        {!!props.latestChap.number && (
          <div className='mt-[10px] [20px]'>
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
  )
}
