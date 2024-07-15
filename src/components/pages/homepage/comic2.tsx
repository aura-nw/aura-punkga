import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline'
import StatusLabel from 'components/Label/Status'
import UpComing from './assets/upcoming-status.png'
import Finished from './assets/finished-status.png'
import { isMobile } from 'react-device-detect'

export default function Comic2(props: IComic) {
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
    <Link
      href={isMobile ? `/comic/${props.slug}` : `/comic/${props.slug}/chapter/1`}
      className='w-full aspect-[16/23] rounded-[4px] relative overflow-hidden'>
      <Image
        src={props.image || NoImage}
        alt=''
        width={180}
        height={240}
        className={`w-full h-full ${props.image ? 'object-cover' : 'object-contain bg-light-gray'} rounded-t`}
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
                {author.slug ? <div className='author'>{t(author.name)}</div> : t(author.name)}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </Link>
  )
  return (
    <div>
      <div className='w-full aspect-[16/23] rounded overflow-hidden group'>
        <Link
          href={`/comic/${props.slug}`}
          className={`relative xl:hidden w-full h-full aspect-[160/230] mx-auto ${
            props.status.text == 'Upcoming' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}>
          <div className='block h-full'>
            <Image
              src={props.image || NoImage}
              alt=''
              width={180}
              height={240}
              className={`w-full h-full ${props.image ? 'object-cover' : 'object-contain bg-light-gray'} rounded-t`}
            />
          </div>
          {props.status.text && props.status.text != 'Ongoing' && (
            <div className='group-hover:hidden absolute top-[10px] right-[10px]'>
              {props.status.text == 'Upcoming' ? (
                <Image src={UpComing} alt='' width={80} height={16} />
              ) : (
                <Image src={Finished} alt='' width={58} height={16} />
              )}
            </div>
          )}
          <div className='absolute overflow-hidden bottom-0 w-full h-[102px] p-[10px] transition-all duration-300 ease-in-out group-hover:h-full bg-gradient-to-b from-transparent from-6.71% to-black to-76.24% group-hover:bg-[rgba(0,0,0,0.75)] group-hover:bg-none flex flex-col justify-between'>
            <div>
              <p
                className='text-[#F6F6F6] text-sm font-medium leading-5'
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}>
                {props[locale].title}
              </p>
              <div className='flex text-[#F6F6F6] gap-1 whitespace-nowrap text-ellipsis overflow-hidden text-xs font-medium leading-[18px]'>
                {t('by')}{' '}
                {props.authors.map((author, index) => (
                  <Fragment key={index}>
                    <span className='text-[#00E160] first:hidden'>, </span>
                    <span className='text-[#00E160]'>
                      {author.slug ? <div className='author'>{t(author.name)}</div> : t(author.name)}
                    </span>
                  </Fragment>
                ))}
              </div>
              <div className='flex gap-4 items-center text-xs mt-1 font-medium text-[#F6F6F6]'>
                <div className='flex items-center gap-1 leading-[18px]'>
                  <EyeIcon className='w-5 h-5' />
                  <span>{props.views}</span>
                </div>
                <div className='flex items-center gap-1 leading-[18px]'>
                  <HeartIcon className='w-5 h-5' />
                  <span>{props.likes}</span>
                </div>
              </div>
              <div>
                {!!props.latestChap.number && (
                  <div className='flex self-end justify-self-end leading-[18px] text-[#F6F6F6] text-xs mt-[10px]'>
                    {t('Latest')}:{' '}
                    <Link
                      href={`/comic/${props.slug}/chapter/${props.latestChap.number}`}
                      className='text-[#00E160] font-medium'>
                      {t('Chap')} #{props.latestChap.number}
                    </Link>
                  </div>
                )}
              </div>
              <div
                className='text-xs leading-4 mt-1 text-white'
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 8,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}>
                {props[locale].description}
              </div>
            </div>
          </div>
        </Link>
        <Link
          href={`/comic/${props.slug}/chapter/1`}
          className={`xl:relative xl:block hidden w-full h-full aspect-[160/230] mx-auto ${
            props.status.text == 'Upcoming' ? 'pointer-events-none' : 'pointer-events-auto'
          }`}>
          <div className='block h-full'>
            <Image
              src={props.image || NoImage}
              alt=''
              width={180}
              height={240}
              className={`w-full h-full ${props.image ? 'object-cover' : 'object-contain bg-light-gray'} rounded-t`}
            />
          </div>
          {props.status.text && props.status.text != 'Ongoing' && (
            <div className='group-hover:hidden absolute top-[10px] right-[10px]'>
              {props.status.text == 'Upcoming' ? (
                <Image src={UpComing} alt='' width={80} height={16} />
              ) : (
                <Image src={Finished} alt='' width={58} height={16} />
              )}
            </div>
          )}
          <div
            className='group-hover:hidden absolute bottom-0 p-[10px] w-full'
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 6.71%, #000000 76.24%)',
            }}>
            <p
              className='text-[#F6F6F6] text-sm font-medium leading-5'
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
              }}>
              {props[locale].title}
            </p>
            <div className='flex text-[#F6F6F6] gap-1 whitespace-nowrap text-ellipsis overflow-hidden text-xs font-medium leading-[18px]'>
              {t('by')}{' '}
              {props.authors.map((author, index) => (
                <Fragment key={index}>
                  <span className='text-[#00E160] first:hidden'>, </span>
                  <span className='text-[#00E160]'>
                    {author.slug ? <div className='author'>{t(author.name)}</div> : t(author.name)}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <div className='absolute overflow-hidden bottom-0 w-full p-[10px] transition-all duration-300 ease-in-out h-full bg-gradient-to-b from-transparent from-6.71% to-black to-76.24% group-hover:bg-[rgba(0,0,0,0.75)] group-hover:bg-none group-hover:opacity-100 opacity-0 flex flex-col justify-between'>
            <div>
              <p
                className='text-[#F6F6F6] text-sm font-medium leading-5'
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}>
                {props[locale].title}
              </p>
              <div className='flex text-[#F6F6F6] gap-1 whitespace-nowrap text-ellipsis overflow-hidden text-xs font-medium leading-[18px]'>
                {t('by')}{' '}
                {props.authors.map((author, index) => (
                  <Fragment key={index}>
                    <span className='text-[#00E160] first:hidden'>, </span>
                    <span className='text-[#00E160]'>
                      {author.slug ? <div className='author'>{t(author.name)}</div> : t(author.name)}
                    </span>
                  </Fragment>
                ))}
              </div>
              <div className='flex gap-4 items-center text-xs mt-1 font-medium text-[#F6F6F6]'>
                <div className='flex items-center gap-1 leading-[18px]'>
                  <EyeIcon className='w-5 h-5' />
                  <span>{props.views}</span>
                </div>
                <div className='flex items-center gap-1 leading-[18px]'>
                  <HeartIcon className='w-5 h-5' />
                  <span>{props.likes}</span>
                </div>
              </div>
              <div>
                {!!props.latestChap.number && (
                  <div className='flex self-end justify-self-end leading-[18px] text-[#F6F6F6] text-xs mt-[10px]'>
                    {t('Latest')}:{' '}
                    <Link
                      href={`/comic/${props.slug}/chapter/${props.latestChap.number}`}
                      className='text-[#00E160] font-medium'>
                      {t('Chap')} #{props.latestChap.number}
                    </Link>
                  </div>
                )}
              </div>
              <div
                className='text-xs leading-[18px] mt-1 text-white'
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}>
                {props[locale].description}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
