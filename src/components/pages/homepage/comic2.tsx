import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'
import { ArrowRightIcon, BellAlertIcon, BellIcon, EyeIcon, HeartIcon } from '@heroicons/react/20/solid';
import StatusLabel from 'components/Label/Status'
import UpComing from './assets/upcoming-status.png'
import Finished from './assets/finished-status.png'

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
        <div>
            <div className='w-full aspect-[16/23] rounded overflow-hidden group'>
                <Link
                    href={`/comic/${props.slug}`}
                    className={`relative xl:hidden w-full h-full aspect-[160/230] mx-auto ${props.status.text == 'Upcoming' ? 'pointer-events-none' : 'pointer-events-auto'}`}
                >
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
                        <div className='group-hover:hidden absolute top-2 right-2'>
                            {props.status.text == 'Upcoming' ? (<Image
                                src={UpComing}
                                alt=''
                                width={91}
                                height={24}
                            />) : (
                                <Image
                                    src={Finished}
                                    alt=''
                                    width={77}
                                    height={24}
                                />
                            )}

                        </div>
                    )}
                    <div className="absolute overflow-hidden bottom-0 w-full h-[50px] p-2 transition-all duration-300 ease-in-out group-hover:h-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] to-[60%] group-hover:bg-[rgba(0,0,0,0.75)] group-hover:bg-none flex flex-col justify-between">
                        <div>
                            <p className='text-primary-color whitespace-nowrap text-ellipsis overflow-hidden text-base font-bold leading-5'>{props[locale].title}</p>
                            <div className='flex text-white gap-1 whitespace-nowrap text-ellipsis overflow-hidden text-sm font-semibold leading-[17px]'>
                                {t('by')}{' '}
                                {props.authors.map((author, index) => (
                                    <Fragment key={index}>
                                        <span className='text-primary-color font-[600] first:hidden'>, </span>
                                        <span className='text-primary-color font-[600]'>
                                            {author.slug ? (
                                                <div className='author'>{t(author.name)}</div>
                                            ) : (
                                                t(author.name)
                                            )}
                                        </span>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="flex gap-1 items-center text-sm mt-1 font-semibold text-white">
                                <div className="flex items-end gap-1">
                                    <span>{props.views}</span>
                                    <EyeIcon className="w-5 h-5" />
                                </div>
                                <div className="flex items-end gap-1">
                                    <span>{props.likes}</span>
                                    <HeartIcon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className='text-xs leading-4 mt-3 text-white' style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 8,
                                WebkitBoxOrient: 'vertical',
                                whiteSpace: 'normal'
                            }}>{props[locale].description}
                            </div>
                        </div>
                        <div>
                            {!!props.latestChap.number && (
                                <div className='flex self-end justify-self-end leading-[20px] text-white text-sm'>
                                    {t('Latest')}: <Link href={`/comic/${props.slug}/chapter/${props.latestChap.number}`} className='text-primary-color font-[600]'>{t('Chap')} #{props.latestChap.number}</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
                <Link
                    href={`/comic/${props.slug}/chapter/1`}
                    className={`xl:relative xl:block hidden w-full h-full aspect-[160/230] mx-auto ${props.status.text == 'Upcoming' ? 'pointer-events-none' : 'pointer-events-auto'}`}
                >
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
                        <div className='group-hover:hidden absolute top-2 right-2'>
                            {props.status.text == 'Upcoming' ? (<Image
                                src={UpComing}
                                alt=''
                                width={91}
                                height={24}
                            />) : (
                                <Image
                                    src={Finished}
                                    alt=''
                                    width={77}
                                    height={24}
                                />
                            )}

                        </div>
                    )}
                    <div className="absolute overflow-hidden bottom-0 w-full p-2 transition-all duration-300 ease-in-out h-full to-[rgba(0,0,0,0.75)] to-[60%] group-hover:bg-[rgba(0,0,0,0.75)] group-hover:bg-none group-hover:opacity-100 opacity-0 flex flex-col justify-between">
                        <div>
                            <p className='text-primary-color whitespace-nowrap text-ellipsis overflow-hidden text-base font-bold leading-5'>{props[locale].title}</p>
                            <div className='flex text-white gap-1 whitespace-nowrap text-ellipsis overflow-hidden text-sm font-semibold leading-[17px]'>
                                {t('by')}{' '}
                                {props.authors.map((author, index) => (
                                    <Fragment key={index}>
                                        <span className='text-primary-color font-[600] first:hidden'>, </span>
                                        <span className='text-primary-color font-[600]'>
                                            {author.slug ? (
                                                <div className='author'>{t(author.name)}</div>
                                            ) : (
                                                t(author.name)
                                            )}
                                        </span>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="flex gap-1 items-center text-sm mt-1 font-semibold text-white">
                                <div className="flex items-end gap-1">
                                    <span>{props.views}</span>
                                    <EyeIcon className="w-5 h-5" />
                                </div>
                                <div className="flex items-end gap-1">
                                    <span>{props.likes}</span>
                                    <HeartIcon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className='text-xs leading-4 mt-3 text-white' style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 8,
                                WebkitBoxOrient: 'vertical',
                                whiteSpace: 'normal'
                            }}>{props[locale].description}
                            </div>
                        </div>
                        <div>
                            {!!props.latestChap.number && (
                                <div className='flex self-end justify-self-end leading-[20px] text-white text-sm'>
                                    {t('Latest')}: <Link href={`/comic/${props.slug}/chapter/${props.latestChap.number}`} className='text-primary-color font-[600]'>{t('Chap')} #{props.latestChap.number}</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
