import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'
import { useWindowSize } from 'usehooks-ts'

export default function Manga(props: IComic) {
  const { locale } = useRouter()
  const router = useRouter()
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const infoRef = useRef()
  const [lineClamp, setLineClamp] = useState(0)
  useEffect(() => {
    const height = (infoRef?.current as any)?.getBoundingClientRect()?.height
    const res = Math.floor((200 - height) / 20)
    if (res >= 1) {
      setLineClamp(res > 3 ? 3 : res)
    }
  }, [])
  console.log(props)
  return (
    <Link
      href={width < 1280 ? `/comic/${props.slug}` : `/comic/${props.slug}/chapter/1`}
      className='w-full block aspect-[16/23] rounded-md relative overflow-hidden'>
      <Image
        src={props.image || NoImage}
        alt=''
        width={180}
        height={240}
        className={`w-full aspect-[16/23] ${props.image ? 'object-cover' : 'object-contain bg-light-gray'} rounded-t`}
      />

      {props.status.text && props.status.text != 'Ongoing' && (
        <>
          {props.status.text == 'Upcoming' ? (
            <div className='uppercase text-xxs leading-[15px] text-white bg-red-500 rounded px-1.5 absolute top-2.5 right-2.5'>
              up comming
            </div>
          ) : (
            <div className='uppercase text-xxs leading-[15px] text-white bg-feedback-info-link-defaul border-border-info border-x-[1.5px] rounded px-[4.5px] absolute top-2.5 right-2.5'>
              Finished
            </div>
          )}
        </>
      )}
      <div className='absolute inset-x-0 bottom-0 p-2.5 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_6.71%,#000_76.24%)] h-[102px] flex flex-col justify-end gap-0.5'>
        <div className='text-sm text-text-white font-medium line-clamp-2'>{props[locale].title}</div>
        <div className='flex text-text-white gap-1 whitespace-nowrap text-ellipsis overflow-hidden text-xs font-medium leading-[18px]'>
          {t('by')}{' '}
          {props.authors.map((author, index) => (
            <Fragment key={index}>
              <span className='text-text-brand-hover first:hidden'>, </span>
              <span className='text-text-brand-hover'>
                {author.slug ? (
                  <div
                    className='author'
                    onClick={(e) => {
                      router.push(`/artist/${author.slug}`)
                      e.stopPropagation()
                      e.preventDefault()
                    }}>
                    {t(author.name)}
                  </div>
                ) : (
                  t(author.name)
                )}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </Link>
  )
}
