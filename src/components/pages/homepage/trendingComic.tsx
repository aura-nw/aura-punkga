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
      <Link href={`/comic/${props.id}`} className='xl:hidden relative w-fit shrink-0'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={150}
          height={200}
          className={`rounded-[10px] w-[115px] aspect-square ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
        <div className='absolute top-[2px] left-[2px] [&>span]:absolute'>
          {props.status.text != 'Ongoing' && (
            <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
          )}
        </div>
      </Link>
      <Link href={`/comic/${props.id}/chapter/1`} className='shrink-0 hidden xl:block w-fit'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={140}
          height={180}
          className={`rounded-[15px] w-[115px] aspect-square ${
            props.image ? 'object-cover' : 'object-contain bg-light-gray'
          }`}
        />
      </Link>
      <div className='flex-auto w-[calc(100%-170px)] flex flex-col gap-[10px] min-h-full justify-between'>
        <div className='flex flex-col gap-[10px]'>
          <div>
            <Link
              href={`/comic/${props.id}`}
              className='font-extrabold text-sm leading-[18px] text-second-color md:text-base md:leading-5 xl:hidden'>
              {props[locale].title}
            </Link>
            <Link
              href={`/comic/${props.id}/chapter/1`}
              className='font-extrabold text-second-color text-base leading-5 hidden xl:block'>
              {props[locale].title}
            </Link>
            <div className='text-sm leading-4 md:text-base text-subtle-dark '>
              <span>{t('by')} </span>
              {props.authors.map((author, index) => (
                <Fragment key={index}>
                  <span className='font-semibold text-second-color'>
                    {author.id ? (
                      <Link className='author' href={`/artist/${author.id}`}>
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
          </div>
        </div>
        <div>
          <div className='text-subtle-dark md:text-medium-gray flex gap-[10px]'>
            <div className='flex items-center text-sm leading-4 md:leading-5 font-medium text-subtle-dark'>
              <span className='inline mr-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='w-[14px] aspect-square'>
                  <path
                    d='M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z'
                    fill='currentColor'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z'
                    fill='currentColor'
                  />
                </svg>
              </span>{' '}
              {props.views.toLocaleString('en-US')}
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
    </div>
  )
}
