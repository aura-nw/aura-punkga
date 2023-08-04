import { EyeIcon } from '@heroicons/react/20/solid'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'

export default function TrendingComic(props: IComic) {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <div className={`flex gap-[20px] ${props.status.text == 'Upcoming' ? 'pointer-events-none' : ''}`}>
      <Link href={`/comic/${props.id}`} className='flex-auto w-1/3 xl:hidden'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={140}
          height={180}
          className={`rounded-[15px] w-[140px] aspect-[15/20] ${
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
        <Link
          href={`/comic/${props.id}`}
          className=' font-bold text-sm text-second-color md:text-black md:text-[18px] xl:hidden'>
          {props[locale].title}
        </Link>
        <Link href={`/comic/${props.id}/chapter/1`} className=' font-bold text-[18px] hidden xl:block'>
          {props[locale].title}
        </Link>
        <div className='text-sm md:text-base'>
          {t('by')}{' '}
          {props.authors.map((author, index) => (
            <Fragment key={index}>
              <span className='font-[500] first:hidden text-second-color md:text-black'>, </span>
              <span className='font-[500] text-second-color md:text-black'>{t(author)}</span>
            </Fragment>
          ))}
        </div>
        <div className='md:hidden text-sm line-clamp-4 my-2'>{props[locale].description}</div>
        <div className='text-second-color md:text-medium-gray flex-1'>
          <div className='flex items-center text-sm md:text-base'>
            <EyeIcon className='w-4 md:w-5 inline mr-1' /> {props.views.toLocaleString('en-US')}
          </div>
        </div>
        {!!props.latestChap.number && (
          <div className='mt-[10px] text-sm md:text-base'>
            {t('Latest')}:{' '}
            <Link
              href={`/comic/${props.id}/chapter/${props.latestChap.number}`}
              className='text-second-color font-[600]'>
              {t('Chap')} #{props.latestChap.number}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
