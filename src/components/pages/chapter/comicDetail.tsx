import { Tab } from '@headlessui/react'
import { ArrowRightIcon, BellAlertIcon, BellIcon, EyeIcon, HeartIcon } from '@heroicons/react/20/solid'
import { BellAlertIcon as BellAlertIconOutline } from '@heroicons/react/24/outline'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import LazyImage from 'components/Image'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import CalendarIcon from 'images/icons/solar_calendar-linear.svg'
import Ninja from 'images/ninja-2.svg'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import mockBanner from 'src/assets/images/mockup3.png'
import mockAvar from 'src/assets/images/mockup4.png'
import { CHAPTER_STATUS } from 'src/constants/chapter.constant'
import { LanguageType } from 'src/constants/global.types'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { IComicDetail } from 'src/models/comic'
import { subscribe, unsubscribe } from 'src/services'
import Introduction from '../comic/Introduction'
import NFTsList from '../comic/NFTsList'
import ChapterList from './chapterList'

export default function ComicDetail({
  data,
  language,
  setLanguage,
  isSubscribe,
  setIsSubscribe,
  like,
  unlike,
  chapterId,
  comicLikes,
  likeHandler,
  chapterLikes,
  chapterIsLiked,
  setComicLikes,
  subscriptions,
}: {
  data: IComicDetail
  language: LanguageType
  setLanguage: any
  isSubscribe: boolean
  chapterIsLiked: boolean
  setIsSubscribe: any
  like: () => void
  unlike: () => void
  likeHandler: any
  setComicLikes: any
  chapterId: string
  comicLikes: number
  chapterLikes: number
  subscriptions: number
}) {
  const [expandDetail, setExpandDetail] = useState(false)
  const [expandDescription, setExpandDescription] = useState(false)
  const { setSignInOpen } = useContext(ModalContext)
  const { t } = useTranslation()
  const { account } = useContext(Context)
  const tabRef = useRef<any>()

  useEffect(() => {
    if (!expandDetail) {
      tabRef.current?.click()
    }
  }, [expandDetail])
  const [subChange, setSubChange] = useState(0)
  const subscribeHandler = (isSub: boolean) => {
    if (account?.verified && account?.name) {
      if (isSub) {
        subscribe(data.id)
        setSubChange(subChange + 1)
      } else {
        unsubscribe(data.id)
        setSubChange(subChange - 1)
      }
      setIsSubscribe(isSub)
      //refetch data
    } else {
      setSignInOpen(true)
    }
  }

  if (typeof data == 'undefined') {
    return <></>
  }

  if (!data) {
    return <div>{t('No data to show')}</div>
  }
  const selectedLanguage =
    data.languages.find((l) => l.shortLang == language) || data.languages.find((l) => l.isMainLanguage)
  return (
    <div
      className={`${
        expandDetail ? ' z-10' : 'z-[1] delay-500 transition-all'
      } absolute top-0 bottom-0 left-0 right-0 flex justify-end`}>
      <div
        className={`relative flex-auto h-full duration-500 transition-all bg-white ${
          expandDetail ? 'pk-width__ml-opposite opacity-1 ' : ' opacity-0 w-3/4'
        }`}></div>
      <div
        className={`relative flex-auto  h-full duration-500 transition-all ${
          expandDetail ? 'pk-width__ml bg-white' : 'w-1/4 overflow-auto bg-light-gray'
        }`}>
        <div className={`${expandDetail ? 'z-10 opacity-100' : ' opacity-0 -z-10'}`}>
          <div
            onClick={() => setExpandDetail(false)}
            className='absolute bg-green-600 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer top-1/2 left-0 -translate-x-1/2'>
            <ArrowRightIcon className='w-9 h-9 text-white' />
          </div>
        </div>
        <div className='relative'>
          <div className='max-h-[180px] aspect-[16/5]'>
            <LazyImage
              width={576}
              height={180}
              x
              src={data.cover || mockBanner}
              className={`h-full duration-500 transition-all object-cover w-full`}
              alt=''
            />
          </div>
          <div className='absolute right-0 bottom-0 p-2 flex items-end justify-end text-white w-full bg-gradient-to-b from-transparent to-gray-500 h-full'>
            <div className='flex gap-3 items-center text-xs mt-3 font-semibold'>
              <div className='flex items-end gap-1'>
                <span>{(data.subscriptions + subChange).toLocaleString('en-US')}</span>
                <BellIcon className='w-5 h-5' />
              </div>
              •
              <div className='flex items-end gap-1'>
                <span>{data.views.toLocaleString('en-US')}</span>
                <EyeIcon className='w-5 h-5' />
              </div>
              •
              <div className='flex items-end gap-1'>
                <span>{comicLikes.toLocaleString('en-US')}</span>
                <HeartIcon className='w-5 h-5' />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`px-[16px] flex flex-col gap-[10px] md:pl-[40px] 2xl:px-[40px] transition-all ${
            expandDetail ? 'mt-4' : 'mt-[10px]'
          }`}>
          <div className={` duration-500 transition-all flex gap-5`}>
            <LazyImage
              src={data.image || mockAvar}
              height={160}
              width={120}
              className={`${expandDetail ? ' w-[240px] h-[320px]' : ' w-[120px] h-[160px]'} ${
                expandDetail ? ' mt-[-198px]' : ' mt-[-58px]'
              } duration-500 transition-all object-cover rounded-[15px] overflow-hidden bg-medium-gray shrink-0`}
              alt=''
            />
            <div className={`flex-1 flex min-w-0 flex-col ${expandDetail ? 'gap-[5px]' : 'gap-[10px]'}`}>
              <div
                className={`font-bold ${
                  expandDetail ? 'text-black' : 'text-second-color'
                } transition-all text-2xl -mb-[7px] flex items-start gap-[10px]`}>
                <span className={`${!expandDetail ? 'truncate' : ''}`}>{data[selectedLanguage.shortLang]?.title}</span>
                {expandDetail && <StatusLabel status={data.status?.type}>{t(data.status?.text)}</StatusLabel>}
              </div>
              <p
                className={`${
                  expandDetail ? 'opacity-100 max-h-[100px]' : 'opacity-0 max-h-0 mt-[-10px]'
                } font-semibold text-xl leading-6 duration-500 transition-all text-second-color overflow-auto`}>
                {data.authors.map((author, index) => (
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
              </p>
              <div className='text-base font-semibold leading-5'>
                <span>
                  by{' '}
                  {data.authors.map((author, index) => (
                    <Fragment key={index}>
                      <span className='text-second-color font-[600]'>
                        {author.slug ? (
                          <Link className='author' href={`/artist/${author.slug}`}>
                            {t(author.name)}
                          </Link>
                        ) : (
                          t(author.name)
                        )}
                      </span>
                      {index !== data.authors.length - 1 && ', '}
                    </Fragment>
                  ))}
                </span>
              </div>
              {/* <p className="text-subtle-dark items-center">
                <strong>{data.views?.toLocaleString('en-US')}</strong>{' '}
                {data.views > 1 ? t('views') : t('view')}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3"
                  height="4"
                  viewBox="0 0 3 4"
                  fill="none"
                  className="inline mx-3"
                >
                  <circle cx="1.5" cy="2" r="1.5" fill="#61646B" />
                </svg>
                <strong>{comicLikes?.toLocaleString('en-US')}</strong>{' '}
                {comicLikes > 1 ? t('likes') : t('like')}
              </p> */}
              <div className={`${expandDetail ? '' : 'flex-col 2xl:flex-row'} 2xl:items-start  flex gap-[10px]`}>
                <div>
                  {isSubscribe ? (
                    <FilledButton>
                      <div onClick={() => subscribeHandler(false)} className='h-5 flex items-start'>
                        <BellAlertIcon className='w-6 h-6 mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                        {t('Subscribed')}
                      </div>
                    </FilledButton>
                  ) : (
                    <OutlineButton className=''>
                      <div onClick={() => subscribeHandler(true)} className='flex items-start '>
                        <BellAlertIconOutline className='w-6 h-6 mr-2 inline-block ' />
                        {t('Subscribe')}
                      </div>
                    </OutlineButton>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            {data.releaseDate && !moment().diff(moment(data.releaseDate)) && (
              <div
                className={` text-subtle-dark transition-all whitespace-nowrap overflow-hidden ${
                  expandDetail ? 'max-w-[300px] min-w-[260px] max-h-[50px]' : 'max-w-[0px] min-w-[0px] max-h-0'
                } `}>
                {t('Release date')}:{' '}
                <span className='text-gray-600 font-semibold'>{moment(data.releaseDate).format('DD/MM/yyyy')}</span>
              </div>
            )}
            {!account && (
              <p className='italic text-subtle-dark '>
                <a
                  className='text-second-color underline font-semibold cursor-pointer'
                  onClick={() => setSignInOpen(true)}>
                  {t('Sign in')}
                </a>{' '}
                {t('to unlock special chapters')}!
              </p>
            )}
          </div>
          {data.chapters.find((chapter) => chapter.status === CHAPTER_STATUS.UPCOMING)?.date && (
            <div
              className={`flex gap-2 items-center text-second-color text-sm font-semibold italic ${
                expandDetail ? ' h-6 opacity-100' : 'opacity-0 h-0'
              } duration-500 transition-all overflow-hidden`}>
              <Image src={CalendarIcon} alt='' className='w-5 h-5' />{' '}
              <div>
                {`${t('New chapter arrives on')} 
                ${moment(data.chapters.find((chapter) => chapter.status === CHAPTER_STATUS.UPCOMING)?.date).format(
                  'dddd, DD/MM/yyyy'
                )}.
                ${t('Don’t miss latest update, subscribe now')}!`}
              </div>
            </div>
          )}
          {/* <div className={`flex-wrap gap-2 flex`}>
            {data.tags.map((tag, index) => {
              return <Tag key={index}>{tag[selectedLanguage.shortLang]}</Tag>;
            })}
          </div>
          <p onClick={() => setExpandDescription(!expandDescription)}>
            <span className={`${expandDescription ? '' : 'line-clamp-3'}`}>
              {data[selectedLanguage.shortLang]?.description}{' '}
            </span>
          </p> */}
          <div className='flex gap-2 flex-wrap'>
            {data.languages.map((language, index) => {
              return (
                <Tag
                  selected={selectedLanguage.id == language.id}
                  key={index}
                  onClick={() => setLanguage(language.shortLang)}>
                  {t(language.shortLang)}
                </Tag>
              )
            })}
          </div>
        </div>
        <div className='mt-6'>
          <Tab.Group>
            <Tab.List
              className='border-b border-medium-gray'
              // className={`w-[calc(100%-140px)] flex transition-all overflow-hidden relative ${
              //   expandDetail ? 'opacity-100 h-9 mt-10' : 'opacity-0 h-0 mt-0'
              // }`}
            >
              <Tab
                ref={tabRef}
                className='ui-selected:text-second-color w-1/3 text-medium-gray z-10 relative ui-selected:font-extrabold ui-selected:border-b-[2px] border-second-color py-[5px] text-lg leading-6 font-medium'>
                <div className=''>{t('Chapters')}</div>
              </Tab>
              <Tab className='ui-selected:text-second-color w-1/3 text-medium-gray z-10 relative ui-selected:font-extrabold ui-selected:border-b-[2px] border-second-color py-[5px] text-lg leading-6 font-medium'>
                <div className=''>NFTs</div>
              </Tab>
              <Tab className='ui-selected:text-second-color w-1/3 text-medium-gray z-10 relative ui-selected:font-extrabold ui-selected:border-b-[2px] border-second-color py-[5px] text-lg leading-6 font-medium'>
                <div className=''>{t('Introduction')}</div>
              </Tab>
            </Tab.List>
            <Tab.Panels className='h-full flex-1 flex flex-col'>
              <Tab.Panel className='mt-5'>
                <ChapterList
                  data={data}
                  expandDetail={expandDetail}
                  setExpandDetail={setExpandDetail}
                  like={like}
                  unlike={unlike}
                  chapterId={chapterId}
                  likeHandler={likeHandler}
                  chapterLikes={chapterLikes}
                  chapterIsLiked={chapterIsLiked}
                  setComicLikes={setComicLikes}
                />
              </Tab.Panel>
              <Tab.Panel className='flex-1 flex flex-col'>
                {!!data.collections.length ? (
                  <NFTsList collections={data.collections} />
                ) : (
                  <div className='flex-1 w-full flex flex-col items-center justify-center my-[64px]'>
                    <Image src={Ninja} alt='' className='h-[260px] aspect-square mx-auto' />
                    <div className='font-extrabold text-xl leading-6 mt-[10px]'>{t('Artist Composing')}</div>
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel className='mt-5'>
                <Introduction data={data} language={language} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {/* <div className={`flex-auto ${expandDetail ? ' w-1/2' : ' w-full -mr-1'} duration-500 transition-all`}></div>
          <div
            className={`flex-auto ${
              expandDetail ? ' w-1/2 opacity-100' : 'opacity-0 w-0'
            } duration-500 transition-all overflow-hidden whitespace-nowrap`}>
            
          </div> */}
        </div>
      </div>
    </div>
  )
}
