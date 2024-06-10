import NoImage from 'images/no_img.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IComic } from 'src/models/comic'
import { ArrowRightIcon, BellAlertIcon, BellIcon, EyeIcon, HeartIcon } from '@heroicons/react/20/solid';

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
        <div className={`${props.status.text == 'Upcoming' ? '[&_a:not(.author)]:pointer-events-none' : ''}`}>
            <div className='w-full aspect-[16/23] rounded overflow-hidden'>
                <Link
                    href={`/comic/${props.slug}`}
                    className='relative w-full h-full aspect-[160/230] mx-auto group'
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
                    <div className="absolute overflow-hidden bottom-0 w-full h-[50px] p-2 transition-all duration-300 ease-in-out group-hover:h-full bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] to-[60%] group-hover:bg-[rgba(0,0,0,0.75)] group-hover:bg-none">

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
                        <div>
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
                            <div className='text-xs leading-4 mt-3 text-white'>{props[locale].description}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
