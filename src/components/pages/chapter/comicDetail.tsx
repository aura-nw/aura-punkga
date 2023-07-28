import { ArrowRightIcon, BellAlertIcon } from '@heroicons/react/20/solid'
import { BellAlertIcon as BellAlertIconOutline, EyeIcon } from '@heroicons/react/24/outline'
import FlashAnimation from 'components/AnimationIconHOC/Flash'
import FilledButton from 'components/Button/FilledButton'
import OutlineButton from 'components/Button/OutlineButton'
import TextField from 'components/Input/TextField'
import StatusLabel from 'components/Label/Status'
import Tag from 'components/Label/Tag'
import ArrowSwapIcon from 'images/icons/arrow-swap.svg'
import HeartFillIcon from 'images/icons/heart_fill.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import NoteIcon from 'images/icons/ic_note.svg'
import CalendarIcon from 'images/icons/solar_calendar-linear.svg'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect, useState } from 'react'
import mockBanner from 'src/assets/images/mockup3.png'
import mockAvar from 'src/assets/images/mockup4.png'
import LockIcon from 'images/icons/Lock.svg'
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
  const { account } = useContext(Context)
  const [searchChapter, setSearchChapter] = useState('')

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
    return <div>Không có dữ liệu</div>
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
                    <StatusLabel status={data.status?.type}>{data.status?.text}</StatusLabel>
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
                    <span className='text-second-color font-[600]'>{author}</span>
                  </Fragment>
                ))}
              </p>
              <p className=''>
                {' '}
                <strong>{data.views?.toLocaleString('en-US')}</strong> views •{' '}
                <strong>{comicLikes?.toLocaleString('en-US')}</strong> likes
              </p>
              <div className={`2xl:flex-row flex-col flex gap-[10px]`}>
                {isSubscribe ? (
                  <FilledButton>
                    <div onClick={() => subscribeHandler(false)} className='h-5 flex items-center'>
                      <BellAlertIcon className='w-6 h-6 mr-2 inline-block animate-[bell-ring_1s_ease-in-out]' />
                      Subscribed
                    </div>
                  </FilledButton>
                ) : (
                  <OutlineButton>
                    <div onClick={() => subscribeHandler(true)} className='h-5 flex items-center'>
                      <BellAlertIconOutline className='w-6 h-6 mr-2 inline-block ' />
                      Subscribe
                    </div>
                  </OutlineButton>
                )}
                <div>
                  <OutlineButton
                    className={`${!expandDetail ? 'opacity-100' : 'opacity-0'} duration-500 transition-all`}
                    onClick={() => setExpandDetail(true)}>
                    See Detail
                  </OutlineButton>
                </div>
              </div>
            </div>
          </div>
          <div className='flex'>
            {data.releaseDate && (
              <div
                className={` text-subtle-dark transition-all whitespace-nowrap overflow-hidden ${
                  expandDetail ? 'max-w-[300px] mr-[70px]' : 'max-w-[0px] mr-0'
                } `}>
                Release date:{' '}
                <span className='text-gray-600 font-semibold'>{moment(data.releaseDate).format('DD/MM/yyyy')}</span>
              </div>
            )}
            {!account && (
              <p className='italic text-subtle-dark '>
                <a
                  className='text-second-color underline font-semibold cursor-pointer'
                  onClick={() => (document.querySelector('#open-sign-in-btn') as any)?.click()}>
                  Sign in
                </a>{' '}
                to unlock special chapters!
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
                {`New chapter arrives on 
                ${moment(data.chapters.find((chapter) => chapter.status === 'Upcoming')?.date).format(
                  'dddd, DD/MM/yyyy'
                )}.
                Don’t miss latest update, subscribe now!`}
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
              <span className='text-second-color cursor-pointer'>see more...</span>
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
                <strong className='text-[16px]'>{`${data.chapters.length} chapter${
                  data.chapters.length > 1 ? 's' : ''
                }`}</strong>
                <span title='Only digits'>
                  <TextField
                    onChange={setSearchChapter}
                    value={searchChapter}
                    size='sm'
                    type='number'
                    placeholder='Enter chapter number'
                    leadingComponent={<Image alt='' src={NoteIcon} className='w-6 h-6 text-medium-gray' />}
                  />
                </span>
              </div>
              <div>
                <Image
                  alt=''
                  src={ArrowSwapIcon}
                  onClick={() => setIsDesc(!isDesc)}
                  className='cursor-pointer w-5 h-w-5 text-light-gray'
                />
              </div>
            </div>
            <div className='px-[16px] 2xl:px-[60px] py-[20px] flex flex-col gap-5'>
              {data.chapters
                .filter((chapter) => {
                  return searchChapter ? chapter?.number?.toString()?.includes(searchChapter) : true
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
                    defaultLike={chapterId == chapter.id ? chapterLikes : null}
                    defaultIsLiked={chapterId == chapter.id ? chapterIsLiked : null}
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
              Hero Cyberpunk’s NFTs
            </div>
            <div className='flex justify-center p-10 opacity-10'>
              <strong>Artist Composing</strong>
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
  const router = useRouter()
  useEffect(() => {
    setLikes(defaultLike)
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
      <div
        onClick={() => {
          if (chapter.status == 'Upcoming' || (!account && chapter.type == 'Account only')) return
          setExpandDetail(false)
          router.push(`/comic/${data.id}/chapter/${chapter.number}`)
        }}
        className='flex gap-4 cursor-pointer'>
        <Image
          src={chapter.thumbnail || m6}
          alt=''
          className={`transition-all duration-500 object-cover rounded-xl ${
            expandDetail ? 'w-[120px] h-[120px]' : 'w-[60px] h-[60px]'
          }`}
          width={60}
          height={60}
        />
        <div className='flex flex-col justify-center flex-1'>
          <div>
            <div className='flex items-center gap-5'>
              <p>{`Chapter ${chapter.number}`}</p>
              {(function () {
                switch (chapter.type) {
                  case 'Account only':
                    if (account) {
                      return (
                        <StatusLabel status='success'>
                          <>Account only</>
                        </StatusLabel>
                      )
                    } else {
                      return (
                        <StatusLabel status='error'>
                          <div className='flex gap-1'>
                            <Image src={LockIcon} alt='' />
                            Account only
                          </div>
                        </StatusLabel>
                      )
                    }
                  case 'Upcoming':
                    return (
                      <StatusLabel status='warning'>
                        <>Upcoming</>
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
                        <>Upcoming</>
                      </StatusLabel>
                    )
                  default:
                    return <div></div>
                }
              })()}
            </div>
            <div className='font-[600]'>{chapter.name}</div>
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
