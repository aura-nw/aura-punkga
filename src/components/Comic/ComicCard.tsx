import StatusLabel from 'components/Label/Status'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'

export default function ComicCard(props: IComic) {
  const { locale } = useRouter()
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div
      className={`h-full w-full mx-auto bg-neutral-black rounded-md overflow-hidden ${
        props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''
      }`}>
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
          } w-[180px] aspect-[18/24] bg-gray-200`}
        />
        <div className='absolute top-1.5 left-1.5 [&>span]:absolute'>
          {props.status.text != 'Ongoing' && (
            <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
          )}
        </div>
        <div className='p-1.5'>
          <div className='text-sm font-medium text-white'>{props[locale].title}</div>
          <div className='text-xs text-white font-medium flex-1 h-full'>
            {t('by')}{' '}
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className='text-text-brand-hover first:hidden'>, </span>
                <span className='text-text-brand-hover'>
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
        </div>
      </div>
    </div>
  )
}
