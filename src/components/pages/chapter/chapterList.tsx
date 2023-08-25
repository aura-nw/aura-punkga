import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { EyeIcon } from '@heroicons/react/24/outline'
import FlashAnimation from 'components/AnimationIconHOC/Flash'
import TextField from 'components/Input/TextField'
import StatusLabel from 'components/Label/Status'
import FilledSelect from 'components/Select/FilledSelect'
import LockIcon from 'images/icons/Lock.svg'
import ArrowSwapLightIcon from 'images/icons/arrow-swap-light.svg'
import ArrowSwapIcon from 'images/icons/arrow-swap.svg'
import HeartFillIcon from 'images/icons/heart_fill.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import NoteIcon from 'images/icons/ic_note.svg'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import m6 from 'src/assets/images/mockup6.png'
import { Context } from 'src/context'
import { getBlurUrl } from 'src/utils'

export default function ChapterList({
  data,
  expandDetail,
  setExpandDetail,
  like,
  unlike,
  chapterId,
  likeHandler,
  chapterLikes,
  chapterIsLiked,
  setComicLikes,
}: any) {
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
  return (
    <>
      <div className='w-full bg-[#DEDEDE] px-[16px] 2xl:px-[60px] py-[16px] flex items-center justify-between'>
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
      <div className='px-[16px] 2xl:pl-[60px] 2xl:pr-[140px] py-[20px] flex flex-col gap-5'>
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
    </>
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
          placeholder='blur'
          blurDataURL={getBlurUrl()}
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
              expandDetail ? 'h-full opacity-100  max-h-[100px]' : 'h-[0%] max-h-0 opacity-0 pointer-events-none'
            }`}>
            <div className='text-sm flex gap-10'>
              <div className='flex gap-2 mr-3'>
                <EyeIcon className='w-5 h-5 text-gray-600' />
                <span>{chapter.views}</span>
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

            <div>{moment(chapter.date).format('DD/MM/yyyy')}</div>
          </div>
        </div>
      </div>
    </>
  )
}
