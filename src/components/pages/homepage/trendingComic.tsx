import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
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
    <div
      className={`flex gap-[20px] ${props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''}`}>
      <Link href={`/comic/${props.id}`} className='xl:hidden relative w-[150px] shrink-0'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={150}
          height={200}
          className={`rounded-[10px] w-[150px] aspect-[15/20] ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
        <div className='absolute top-[2px] left-[2px] [&>span]:absolute'>
          {props.status.text != 'Ongoing' && (
            <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
          )}
        </div>
      </Link>
      <Link href={`/comic/${props.id}/chapter/1`} className='shrink-0 hidden xl:block w-[140px]'>
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
      <div className='flex-1 flex flex-col gap-[10px]'>
        <div>
          <Link
            href={`/comic/${props.id}`}
            className=' font-bold text-sm text-second-color md:text-black md:text-[18px] xl:hidden'>
            {props[locale].title}
          </Link>
          <Link href={`/comic/${props.id}/chapter/1`} className=' font-bold text-[18px] hidden xl:block'>
            {props[locale].title}
          </Link>
          <div className='text-sm md:text-base text-subtle-dark'>
            {t('by')}{' '}
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className='font-[500] first:hidden text-second-color md:text-black'>, </span>
                <span className='font-[500] text-second-color md:text-black'>
                  {author.id ? (
                    <Link className='author' href={`/artist/${author.id}`}>
                      {t(author.name)}
                    </Link>
                  ) : (
                    t(author.name)
                  )}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        <div className='flex gap-x-[8px] gap-y-1 flex-wrap'>
          {props.tags.map((tag, index) => {
            return <Tag key={index}>{tag[locale]}</Tag>
          })}
        </div>
        <div className='md:hidden text-sm line-clamp-4 text-subtle-dark'>{props[locale].description}</div>
        <div className='text-second-color md:text-medium-gray flex gap-[11px]'>
          <div className='flex items-center text-sm md:text-base leading-4'>
            <EyeIcon className='w-4 md:w-5 inline mr-1' /> {props.views.toLocaleString('en-US')}
          </div>
          <div className='flex items-center text-sm md:text-base leading-4'>
            <HeartIcon className='w-4 h-4' /> {props.likes.toLocaleString('en-US')}
          </div>
        </div>
        {!!props.latestChap.number && (
          <div className='text-sm md:text-base text-subtle-dark'>
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
