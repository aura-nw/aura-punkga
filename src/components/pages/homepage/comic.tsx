import { EyeIcon, HeartIcon } from '@heroicons/react/20/solid'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'

export default function Comic(props: IComic) {
  const { locale } = useRouter()
  const router = useRouter()
  const { t } = useTranslation()
  const infoRef = useRef()
  const [lineClamp, setLineClamp] = useState(0)
  useEffect(() => {
    const height = (infoRef?.current as any)?.getBoundingClientRect()?.height
    const res = Math.floor((200 - height) / 20)
    if (res >= 1) {
      setLineClamp(res > 3 ? 3 : res)
    }
  }, [])
  return (
    <div className={`${props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''}`}>
      <div className='hidden lg:grid lg:grid-cols-[180px_1fr] gap-[20px]'>
        <div>
          <Link href={`/comic/${props.slug}`} className=' xl:hidden block w-full h-fit aspect-[180/240] mx-auto'>
            <Image
              src={props.image || NoImage}
              alt=''
              width={180}
              height={240}
              className={`w-full h-full ${
                props.image ? 'object-cover' : 'object-contain bg-light-gray'
              } rounded-[15px] `}
            />
          </Link>
          <Link href={`/comic/${props.slug}/chapter/1`} className='w-full h-fit aspect-[180/240] hidden xl:block'>
            <Image
              src={props.image || NoImage}
              alt=''
              width={180}
              height={240}
              className={`w-full h-full ${
                props.image ? 'object-cover' : 'object-contain bg-light-gray'
              } rounded-[15px] `}
            />
          </Link>
        </div>
        <div className='flex-auto flex flex-col justify-between gap-[10px]'>
          <div className='flex flex-col gap-[10px]'>
            <div ref={infoRef} className='flex flex-col gap-[10px]'>
              <div>
                <div className='flex justify-between xl:hidden items-start flex-nowrap'>
                  <Link
                    href={`/comic/${props.slug}`}
                    className=' text-second-color font-bold text-[18px] leading-[23px]'>
                    {props[locale].title}
                  </Link>
                  {props.status.text != 'Ongoing' && (
                    <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
                  )}
                </div>
                <div className='justify-between items-start flex-nowrap hidden xl:flex'>
                  <Link
                    href={`/comic/${props.slug}/chapter/1`}
                    className='text-second-color font-bold text-[18px] leading-[23px]'>
                    {props[locale].title}
                  </Link>
                  {props.status.text != 'Ongoing' && (
                    <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
                  )}
                </div>
                <div>
                  {t('by')}{' '}
                  {props.authors.map((author, index) => (
                    <Fragment key={index}>
                      <span className='text-second-color font-[600] first:hidden'>, </span>
                      <span className='text-second-color font-[600]'>
                        {author.slug ? (
                          <Link className='author' href={`/artist/${author.slug}`}>
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
              <div className='flex gap-[8px] flex-wrap'>
                {props.tags.map((tag, index) => {
                  return <Tag key={index}>{tag[locale]}</Tag>
                })}
              </div>
              <div className='text-[#61646B] flex gap-[24px]'>
                <strong>
                  <span>{props.views.toLocaleString('en-US')}</span> {props.views > 1 ? t('views') : t('view')}
                </strong>
                <strong>
                  <span>{props.likes.toLocaleString('en-US')}</span> {props.likes > 1 ? t('likes') : t('like')}
                </strong>
              </div>
            </div>
            {!!lineClamp && (
              <div className={`text-[16px] leading-[20px] line-clamp-${lineClamp}`}>{props[locale].description}</div>
            )}
          </div>
          {!!props.latestChap.number && (
            <div className='leading-[20px]'>
              {t('Latest')}:{' '}
              <Link
                href={`/comic/${props.slug}/chapter/${props.latestChap.number}`}
                className='text-second-color font-[600]'>
                {t('Chap')} #{props.latestChap.number}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='lg:hidden h-full max-w-[180px] mx-auto'>
        <div
          onClick={() => {
            props.status.text == 'Upcoming' ? null : router.push(`/comic/${props.slug}`)
          }}
          className='relative flex flex-col h-full'>
          <Image
            src={props.image || NoImage}
            alt=''
            width={180}
            height={240}
            className={`${
              props.image ? 'object-cover' : 'object-contain bg-light-gray'
            } rounded-md w-[180px] aspect-[18/24] bg-gray-200`}
          />
          <div className='absolute top-[2px] left-[2px] [&>span]:absolute'>
            {props.status.text != 'Ongoing' && (
              <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
            )}
          </div>
          <div className='text-sm font-extrabold text-second-color mt-2'>{props[locale].title}</div>
          <div className='text-sm text-subtle-dark flex-1 h-full'>
            {t('by')}{' '}
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className='text-second-color font-[600] first:hidden'>, </span>
                <span className='text-second-color font-[600]'>
                  {author.slug ? (
                    <Link className='author' onClick={(e) => e.stopPropagation()} href={`/artist/${author.slug}`}>
                      {t(author.name)}
                    </Link>
                  ) : (
                    t(author.name)
                  )}
                </span>
              </Fragment>
            ))}
          </div>
          <div className='flex justify-between items-center text-subtle-dark text-sm mt-3'>
            <div className='flex items-center gap-1'>
              <EyeIcon className='w-4 h-4' />
              <div className='font-medium'>{props.views.toLocaleString('en-US')}</div>
            </div>
            <div className='flex items-center gap-1'>
              <HeartIcon className='w-4 h-4' />
              <div className='font-medium'>{props.likes.toLocaleString('en-US')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
