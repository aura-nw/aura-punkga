import { ArrowRightIcon, BellAlertIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { BellAlertIcon as BellAlertIconOutline, EyeIcon } from '@heroicons/react/24/outline'
import FlashAnimation from 'components/AnimationIconHOC/Flash'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import TextField from 'components/Input/TextField'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import FilledSelect from 'components/Select/FilledSelect'
import LockIcon from 'images/icons/Lock.svg'
import ArrowSwapLightIcon from 'images/icons/arrow-swap-light.svg'
import ArrowSwapIcon from 'images/icons/arrow-swap.svg'
import HeartFillIcon from 'images/icons/heart_fill.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import NoteIcon from 'images/icons/ic_note.svg'
import CalendarIcon from 'images/icons/solar_calendar-linear.svg'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import mockBanner from 'src/assets/images/mockup3.png'
import mockAvar from 'src/assets/images/mockup4.png'
import m6 from 'src/assets/images/mockup6.png'
import { LanguageType } from 'src/constants/global.types'
import { Context } from 'src/context'
import { IComicDetail } from 'src/models/comic'
export default function ComicDetail({
  data,
  language,
  setLanguage,
  isSubscribe,
  setIsSubscribe,
  subscribe,
  unsubscribe,
  like,
  unlike,
  chapterId,
  comicLikes,
  likeHandler,
  chapterLikes,
  chapterIsLiked,
  setComicLikes,
}: {
  data: IComicDetail
  language: LanguageType
  setLanguage: any
  isSubscribe: boolean
  chapterIsLiked: boolean
  setIsSubscribe: any
  subscribe: () => void
  unsubscribe: () => void
  like: () => void
  unlike: () => void
  likeHandler: any
  setComicLikes: any
  chapterId: string
  comicLikes: number
  chapterLikes: number
}) {
  const [expandDetail, setExpandDetail] = useState(false)
  const [expandDescription, setExpandDescription] = useState(false)
  const [isDesc, setIsDesc] = useState(true)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { account } = useContext(Context)
  const [searchChapter, setSearchChapter] = useState('')
  const [chapterType, setChapterType] = useState({
    key: 'All types',
    value: t('All types'),
  })

  useEffect(() => {
    setChapterType((prev) => {
      return _.cloneDeep({
        key: prev.key,
        value: t(prev.key),
      })
    })
  }, [t('All status')])

  const subscribeHandler = (isSub: boolean) => {
    if (account?.verified && account?.name) {
      if (isSub) {
        subscribe()
      } else {
        unsubscribe()
      }
      setIsSubscribe(isSub)
    } else {
      ;(document.querySelector('#open-sign-in-btn') as any)?.click()
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
          expandDetail ? 'pk-width__ml-opposite opacity-1 z-10' : 'z-0 opacity-0 w-2/3'
        }`}>
        <div
          onClick={() => setExpandDetail(false)}
          className='absolute bg-green-600 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer top-1/2 right-0 translate-x-1/2 -translate-y-1/2'>
          <ArrowRightIcon className='w-9 h-9 text-white' />
        </div>
      </div>
      <div
        className={`relative flex-auto bg-light-gray h-full overflow-auto duration-500 transition-all ${
          expandDetail ? 'pk-width__ml' : 'w-1/3'
        }`}>
        <Image
          src={data.cover || mockBanner}
          height={280}
          width={1000}
          className={`${expandDetail ? 'h-[280px]' : 'h-[160px]'} duration-500 transition-all object-cover w-full`}
          alt=''
        />
        <div className='px-[16px] flex flex-col gap-[10px] mt-2 2xl:px-[60px]'>
          <div className={` duration-500 transition-all flex gap-5`}>
            <Image
              src={data.image || mockAvar}
              height={320}
              width={240}
              className={`${expandDetail ? ' w-[240px] aspect-[24/32]' : ' w-[120px] aspect-[12/16]'} ${
                expandDetail ? ' mt-[-180px]' : ' mt-[-50px]'
              } duration-500 transition-all object-cover rounded-[15px] overflow-hidden bg-medium-gray`}
              alt=''
            />
            <div className='flex-1 flex flex-col gap-[10px]'>
              <div className={`font-bold ${expandDetail ? 'text-black' : 'text-second-color'} transition-all text-2xl`}>
                <span className={`${!expandDetail ? 'line-clamp-1' : ''}`}>
                  {data[selectedLanguage.shortLang]?.title}
                </span>
                {expandDetail && (
                  <span className='ml-3'>
                    <StatusLabel status={data.status?.type}>{t(data.status?.text)}</StatusLabel>
                  </span>
                )}
              </div>
              <p
                className={`${
                  expandDetail ? 'opacity-100 max-h-[100px]' : 'opacity-0 max-h-0 mt-[-10px]'
                } font-semibold text-xl duration-500 transition-all text-second-color overflow-auto`}>
                {data.authors.map((author, index) => (
                  <Fragment key={index}>
                    <span className='text-second-color font-[600] first:hidden'>, </span>
                    <span className='text-second-color font-[600]'>{t(author)}</span>
                  </Fragment>
                ))}
              </p>
              <p className=''>
                {' '}
                <strong>{data.views?.toLocaleString('en-US')}</strong> {t('views')} •{' '}
                <strong>{comicLikes?.toLocaleString('en-US')}</strong> {t('likes')}
              </p>
              <div className={`2xl:flex-row 2xl:items-start flex-col flex gap-[10px]`}>
                <div>
                  {isSubscribe ? (
                    <FilledButton>
                      <div onClick={() => subscribeHandler(false)} className='h-5 flex items-start'>
                        <BellAlertIcon className='w-6 h-6 mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                        {t('Subscribed')}
                      </div>
                    </FilledButton>
                  ) : (
                    <OutlineButton>
                      <div onClick={() => subscribeHandler(true)} className='h-5 flex items-start '>
                        <BellAlertIconOutline className='w-6 h-6 mr-2 inline-block ' />
                        {t('Subscribe')}
                      </div>
                    </OutlineButton>
                  )}
                </div>
                <div>
                  <OutlineButton
                    className={`${!expandDetail ? 'opacity-100' : 'opacity-0'} duration-500 transition-all`}
                    onClick={() => setExpandDetail(true)}>
                    {t('See Detail')}
                  </OutlineButton>
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            {data.releaseDate && (
              <div
                className={` text-subtle-dark transition-all whitespace-nowrap overflow-hidden ${
                  expandDetail ? 'max-w-[300px] min-w-[260px]' : 'max-w-[0px] min-w-[0px]'
                } `}>
                {t('Release date')}:{' '}
                <span className='text-gray-600 font-semibold'>{moment(data.releaseDate).format('DD/MM/yyyy')}</span>
              </div>
            )}
            {!account && (
              <p className='italic text-subtle-dark '>
                <a
                  className='text-second-color underline font-semibold cursor-pointer'
                  onClick={() => (document.querySelector('#open-sign-in-btn') as any)?.click()}>
                  {t('Sign in')}
                </a>{' '}
                {t('to unlock special chapters')}!
              </p>
            )}
          </div>
          {data.chapters.find((chapter) => chapter.status === 'Upcoming')?.date && (
            <div
              className={`flex gap-2 items-center text-second-color text-sm font-semibold italic ${
                expandDetail ? ' h-6 opacity-100' : 'opacity-0 h-0'
              } duration-500 transition-all overflow-hidden`}>
              <Image src={CalendarIcon} alt='' className='w-5 h-5' />{' '}
              <div>
                {`${t('New chapter arrives on')} 
                ${moment(data.chapters.find((chapter) => chapter.status === 'Upcoming')?.date).format(
                  'dddd, DD/MM/yyyy'
                )}.
                ${t('Don’t miss latest update, subscribe now')}!`}
              </div>
            </div>
          )}
          <div className={`flex-wrap gap-2 flex`}>
            {data.tags.map((tag, index) => {
              return <Tag key={index}>{tag[selectedLanguage.shortLang]}</Tag>
            })}
          </div>
          <p
            className={`${expandDescription ? '' : 'line-clamp-3'} min-h-[72px]`}
            onClick={() => setExpandDescription(!expandDescription)}>
            {data[selectedLanguage.shortLang]?.description}{' '}
            {!expandDescription && data[selectedLanguage.shortLang]?.description?.length >= 210 && (
              <span className='text-second-color cursor-pointer'>{t('see more')}...</span>
            )}
          </p>
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
        <div className='flex gap-1'>
          <div className={`flex-auto ${expandDetail ? ' w-1/2' : ' w-full -mr-1'} duration-500 transition-all`}>
            <div className='w-full bg-medium-gray px-[16px] 2xl:px-[60px] py-[16px] flex items-center justify-between mt-[13px]'>
              <div className='flex gap-5 items-center whitespace-nowrap'>
                <strong className='text-[16px]'>
                  {locale == 'en'
                    ? `${data.chapters.length} chapter${data.chapters.length > 1 ? 's' : ''}`
                    : `${data.chapters.length} chương`}
                </strong>
                <div className='flex gap-3 2xl:gap-5'>
                  <span title={t('Only digits')}>
                    <TextField
                      onChange={setSearchChapter}
                      value={searchChapter}
                      size='sm'
                      type='number'
                      placeholder={t('Enter chapter number')}
                      leadingComponent={<Image alt='' src={NoteIcon} className='w-6 h-6 text-medium-gray' />}
                    />
                  </span>
                  <div
                    className={`${
                      expandDetail ? 'max-w-[180px] opacity-100' : 'max-w-0 overflow-hidden opacity-0'
                    } transition-all`}>
                    <FilledSelect
                      icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                      selected={chapterType}
                      onChange={setChapterType}
                      options={[
                        {
                          key: 'All types',
                          value: t('All types'),
                        },

                        {
                          key: 'Free',
                          value: t('Free'),
                        },
                        {
                          key: 'NFTs only',
                          value: t('NFTs only'),
                        },
                        {
                          key: 'Account only',
                          value: t('Account only'),
                        },
                      ]}
                      placeholder={t('All types')}
                    />
                  </div>
                  <div
                    className={`${
                      expandDetail ? 'max-w-[180px] opacity-100' : 'max-w-0 overflow-hidden opacity-0'
                    } transition-all flex items-center`}>
                    <button className='hidden 2xl:flex gap-3 items-center bg-[#f2f2f2] rounded-full py-[3px] px-[13px]'>
                      <div className='text-base leading-6 text-medium-gray truncate' onClick={() => setIsDesc(!isDesc)}>
                        {isDesc ? t('Sort by newest') : t('Sort by oldest')}
                      </div>
                      <Image
                        alt=''
                        src={ArrowSwapLightIcon}
                        onClick={() => setIsDesc(!isDesc)}
                        className='cursor-pointer w-6 h-w-6'
                      />
                    </button>
                    <Image
                      alt=''
                      src={ArrowSwapIcon}
                      onClick={() => setIsDesc(!isDesc)}
                      className='cursor-pointer w-6 h-w-6 text-light-gray 2xl:hidden'
                    />
                  </div>
                </div>
              </div>
              <div>
                {!expandDetail && (
                  <Image
                    alt=''
                    src={ArrowSwapIcon}
                    onClick={() => setIsDesc(!isDesc)}
                    className='cursor-pointer w-6 h-w-6 text-light-gray'
                  />
                )}
              </div>
            </div>
            <div className='px-[16px] 2xl:px-[60px] py-[20px] flex flex-col gap-5'>
              {data.chapters
                .filter((chapter) => {
                  return searchChapter ? chapter?.number?.toString()?.includes(searchChapter) : true
                })
                .filter((chapter) => {
                  return chapterType.key == 'All types' || chapterType.key.toLowerCase() == chapter.type.toLowerCase()
                })
                .sort(() => (isDesc ? 1 : -1))
                .map((chapter, index) => (
                  <Chapter
                    expandDetail={expandDetail}
                    data={data}
                    chapter={chapter}
                    key={index}
                    account={account}
                    like={like}
                    unlike={unlike}
                    setExpandDetail={setExpandDetail}
                    likeHandlerCallback={chapterId == chapter.id ? likeHandler : null}
                    defaultLike={chapterId == chapter.id ? chapterLikes : chapter.likes}
                    defaultIsLiked={chapterId == chapter.id ? chapterIsLiked : chapter.isLiked}
                    setComicLikes={chapterId != chapter.id ? setComicLikes : null}
                  />
                ))}
            </div>
          </div>
          <div
            className={`flex-auto ${
              expandDetail ? ' w-1/2 opacity-100' : 'opacity-0 w-0'
            } duration-500 transition-all overflow-hidden whitespace-nowrap`}>
            <div className={`px-[60px] py-[16px] bg-medium-gray font-bold mt-[13px] leading-[30px] text-center `}>
              NFTs
            </div>
            <div className='flex justify-center p-10 opacity-10'>
              <strong>{t('Artist Composing')}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Chapter = ({
  expandDetail,
  data,
  chapter,
  account,
  like,
  unlike,
  setExpandDetail,
  likeHandlerCallback,
  defaultLike,
  defaultIsLiked,
  setComicLikes,
}) => {
  const [isLiked, setIsLiked] = useState(defaultIsLiked || chapter.isLiked || false)
  const [likes, setLikes] = useState(defaultLike || chapter.likes || 0)
  const { t } = useTranslation()
  const router = useRouter()
  useEffect(() => {
    setLikes(defaultLike || 0)
  }, [defaultLike])
  useEffect(() => {
    setIsLiked(defaultIsLiked)
  }, [defaultIsLiked])
  const likeHandler = (isLike: boolean) => {
    if (account?.verified && account?.name) {
      likeHandlerCallback && likeHandlerCallback(isLike)
      if (isLike) {
        setLikes((like) => like + 1)
        setComicLikes && setComicLikes((like) => like + 1)
        !likeHandlerCallback && like(chapter.id)
      } else {
        setLikes((like) => like - 1)
        setComicLikes && setComicLikes((like) => like - 1)
        !likeHandlerCallback && unlike(chapter.id)
      }
      setIsLiked(isLike)
    } else {
      ;(document.querySelector('#open-sign-in-btn') as any)?.click()
    }
  }
  return (
    <>
      <div
        className={`w-full h-[1px] bg-light-medium-gray first:hidden transition-all duration-500 ${
          expandDetail ? 'my-[0px] opacity-100' : '-my-[10px] opacity-0'
        }`}></div>
      <div className='flex gap-4 cursor-pointer'>
        <Image
          src={chapter.thumbnail || m6}
          alt=''
          className={`transition-all duration-500 object-cover rounded-xl ${
            expandDetail ? 'w-[120px] h-[120px]' : 'w-[60px] h-[60px]'
          }`}
          width={60}
          height={60}
          onClick={() => {
            if (chapter.status == 'Upcoming' || (!account && chapter.type == 'Account only')) return
            setExpandDetail(false)
            router.push(`/comic/${data.id}/chapter/${chapter.number}`)
          }}
        />
        <div className='flex flex-col justify-center flex-1'>
          <div>
            <div className='flex items-center gap-5'>
              <p>{`${t('Chapter')} ${chapter.number}`}</p>
              {(function () {
                switch (chapter.type) {
                  case 'Account only':
                    if (account) {
                      return (
                        <StatusLabel status='success'>
                          <>{t('Account only')}</>
                        </StatusLabel>
                      )
                    } else {
                      return (
                        <StatusLabel status='error'>
                          <div className='flex gap-1'>
                            <Image src={LockIcon} alt='' />
                            {t('Account only')}
                          </div>
                        </StatusLabel>
                      )
                    }
                  case 'Upcoming':
                    return (
                      <StatusLabel status='warning'>
                        <>{t('Upcoming')}</>
                      </StatusLabel>
                    )
                  default:
                    return <div></div>
                }
              })()}
              {(function () {
                switch (chapter.status) {
                  case 'Upcoming':
                    return (
                      <StatusLabel status='warning'>
                        <>{t('Upcoming')}</>
                      </StatusLabel>
                    )
                  default:
                    return <div></div>
                }
              })()}
            </div>
            <div
              className='font-[600]'
              onClick={() => {
                if (chapter.status == 'Upcoming' || (!account && chapter.type == 'Account only')) return
                setExpandDetail(false)
                router.push(`/comic/${data.id}/chapter/${chapter.number}`)
              }}>
              {chapter.name}
            </div>
          </div>
          <div
            className={`flex justify-between items-end transition-all w-full duration-500 ${
              expandDetail ? 'h-full opacity-100  max-h-[100px]' : 'h-[0%] max-h-0 opacity-0'
            }`}>
            <div className='text-sm flex gap-10'>
              <div className='mr-3'>{moment(chapter.date).format('DD/MM/yyyy')}</div>
              <div className='flex gap-2'>
                <EyeIcon className='w-5 h-5 text-gray-600' />
                <span>{chapter.views}</span>
              </div>
            </div>
            <div className='flex items-center'>
              <FlashAnimation
                InactiveComponent={(props: any) => (
                  <Image
                    className='cursor-pointer w-5 h-5'
                    onClick={(e) => {
                      likeHandler(true)
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    src={HeartOutlineIcon}
                    alt=''
                    {...props}
                  />
                )}
                ActiveComponent={(props: any) => (
                  <Image
                    className='cursor-pointer w-5 h-5'
                    onClick={(e) => {
                      likeHandler(false)
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    src={HeartFillIcon}
                    alt=''
                    {...props}
                  />
                )}
                active={isLiked}
              />
              <span className='ml-2'>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
