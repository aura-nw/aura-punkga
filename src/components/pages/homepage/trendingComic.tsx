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
    <div
      className={`flex gap-[20px] ${props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''}`}>
      <Link href={`/comic/${props.slug}`} className='xl:hidden relative w-fit shrink-0'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={150}
          height={200}
          className={`rounded-[5px] w-[115px] ${props.image ? 'object-cover' : 'object-contain bg-light-gray'
            }`}
        />
        <div className='absolute top-[2px] left-[2px] [&>span]:absolute'>
          {props.status.text != 'Ongoing' && (
            <StatusLabel status={props.status.type}>{t(props.status.text)}</StatusLabel>
          )}
        </div>
      </Link>
      <Link href={`/comic/${props.slug}/chapter/1`} className='shrink-0 hidden xl:block w-fit'>
        <Image
          src={props.image || NoImage}
          alt=''
          width={70}
          height={90}
          className={`rounded-[5px] w-[70px] h-[90px] ${props.image ? 'object-cover' : 'object-contain bg-light-gray'
            }`}
        />
      </Link>
      <div className='flex-auto w-[calc(100%-170px)] flex flex-col gap-[10px] min-h-full justify-between'>
        <div className='flex flex-col gap-[10px]'>
          <div>
            <Link
              href={`/comic/${props.slug}`}
              className='font-bold text-xs leading-[18px] text-[#4F4F4F] md:text-sm md:leading-5 xl:hidden'>
              {props[locale].title}
            </Link>
            <Link
              href={`/comic/${props.slug}/chapter/1`}
              className='font-semibold text-[#4F4F4F] text-sm leading-5 hidden xl:block'>
              {props[locale].title}
            </Link>
            <div className='flex lg:flex-row flex-col lg:items-center mt-[10px] gap-4 justify-start w-full'>
              <div className='text-xs leading-4 text-[#828282]'>
                <span>{t('by')} </span>
                {props.authors.map((author, index) => (
                  <Fragment key={index}>
                    <span style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      maxWidth: '100px'
                    }}>
                      {author.slug ? (
                        <Link className='author text-[#009640]' href={`/artist/${author.slug}`}>
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
              <div className='flex items-center gap-[5px] font-medium text-xs leading-4 text-[#3D3D3D]'>
                <Image
                  src={EyeOpen}
                  alt=''
                  className='w-[16px] h-[16px] cursor-pointer'
                />
                {props.views.toLocaleString('en-US')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
