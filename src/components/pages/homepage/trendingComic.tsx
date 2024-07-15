import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'
import EyeOpen from 'images/icons/eye-open.svg'

export default function TrendingComic(props: IComic) {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <div className={`flex gap-4 ${props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''}`}>
      <Link href={`/comic/${props.slug}`} className='xl:hidden relative w-fit shrink-0'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={150}
          height={200}
          className={`rounded-[5px] w-[70px] aspect-[7/9] ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
      </Link>
      <Link href={`/comic/${props.slug}/chapter/1`} className='shrink-0 hidden xl:block w-fit'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={70}
          height={90}
          className={`rounded-[5px] w-[70px] aspect-[7/9] ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
      </Link>
      <div className='flex-1 flex flex-col gap-1'>
        <Link href={`/comic/${props.slug}`} className='font-semibold text-sm xl:hidden'>
          {props[locale].title}
        </Link>
        <Link href={`/comic/${props.slug}/chapter/1`} className='font-semibold text-sm hidden xl:block'>
          {props[locale].title}
        </Link>
        <div className='flex flex-col gap-1 md:flex-row md:gap-4'>
          <div className='text-xs leading-[18px]'>
            <span>{t('by')} </span>
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span
                  style={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    maxWidth: '100px',
                  }}>
                  {author.slug ? (
                    <Link className='author text-text-brand-defaul font-medium' href={`/artist/${author.slug}`}>
                      {t(author.name)}
                    </Link>
                  ) : (
                    t(author.name)
                  )}
                </span>
                <span className='font-[500] last:hidden text-second-color'>, </span>
              </Fragment>
            ))}
          </div>
          <div className='flex items-center gap-1 font-medium text-xs leading-[18px]'>
            <Image src={EyeOpen} alt='' className='w-[16px] h-[16px] cursor-pointer' />
            {props.views.toLocaleString('en-US')}
          </div>
        </div>
      </div>
    </div>
  )
}
