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
import SnowTop from 'src/assets/images/snow_top.png'
import AvatarFrame from 'src/assets/images/frame_avt.png'
export default function XMasComic(props: IComic) {
  const { locale } = useRouter()
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <div
      className={`bg-gradient-to-b relative from-[#3A3D47] to-[#1E2C62] rounded-2xl ${
        props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''
      }`}>
      <div className='absolute inset-0 top-2 overflow-hidden'>
        {Array(100)
          .fill(null)
          .map((d, index) => (
            <div className='snow' key={index}></div>
          ))}
      </div>
      <div className='hidden relative md:flex gap-[20px]'>
        <Link
          href={`/comic/${props.slug}`}
          className=' xl:hidden shrink-0 block w-[180px] h-fit aspect-[180/240] mx-auto'>
          <Image
            src={props.image || NoImage}
            alt=''
            width={180}
            height={240}
            className={`w-full h-full ${props.image ? 'object-cover' : 'object-contain bg-light-gray'} rounded-[15px] `}
          />
        </Link>
        <Link
          href={`/comic/${props.slug}/chapter/1`}
          className='shrink-0 w-[180px] h-fit aspect-[180/240] hidden xl:block relative rounded-2xl overflow-hidden'>
          <Image
            src={props.image || NoImage}
            alt=''
            width={180}
            height={240}
            className={`w-full h-full ${props.image ? 'object-cover' : 'object-contain bg-light-gray'} rounded-[15px] `}
          />
          <Image src={AvatarFrame} alt='' className='absolute inset-0' />
        </Link>
        <div className='flex-auto w-[calc(100%-200px)] flex flex-col justify-between gap-[10px] py-[10px]'>
          <div className='flex flex-col gap-[10px] text-[#F2F2F2]'>
            <div>
              <div className='flex justify-between xl:hidden items-start flex-nowrap'>
                <Link href={`/comic/${props.slug}`} className=' text-primary-color font-bold text-[18px] '>
                  {props[locale].title}
                </Link>
                {props.status.text != 'Ongoing' && (
                  <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
                )}
              </div>
              <div className='justify-between items-start flex-nowrap hidden xl:flex'>
                <Link href={`/comic/${props.slug}/chapter/1`} className='text-primary-color font-bold text-[18px]'>
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
                    <span className='text-primary-color font-[600] first:hidden'>, </span>
                    <span className='text-primary-color font-[600]'>
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
            <div className=' flex gap-[24px]'>
              <div>
                <strong>{props.views.toLocaleString('en-US')}</strong> {props.views > 1 ? t('views') : t('view')}
              </div>
              <div>
                <strong>{props.likes.toLocaleString('en-US')}</strong> {props.likes > 1 ? t('likes') : t('like')}
              </div>
            </div>
            <div className=' text-[16px] leading-[20px] line-clamp-3 break-words'>{props[locale].description}</div>
          </div>
          {!!props.latestChap.number && (
            <div className='leading-[20px] text-[#F2F2F2]'>
              {t('Latest')}:{' '}
              <Link
                href={`/comic/${props.slug}/chapter/${props.latestChap.number}`}
                className='text-primary-color font-[600]'>
                {t('Chap')} #{props.latestChap.number}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='md:hidden relative h-full w-fit mx-auto'>
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
          <div className='text-sm font-extrabold text-primary-color mt-2'>{props[locale].title}</div>
          <div className='text-sm text-subtle-dark flex-1 h-full'>
            {t('by')}{' '}
            {props.authors.map((author, index) => (
              <Fragment key={index}>
                <span className='text-primary-color font-[600] first:hidden'>, </span>
                <span className='text-primary-color font-[600]'>
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
      <Image src={SnowTop} alt='' className='absolute min-h-[60px] -top-[20px] -left-1' />
    </div>
  )
}
