import { EyeIcon } from '@heroicons/react/20/solid'
import TextField from 'components/Input/TextField'
import StatusLabel from 'components/Label/Status'
import LockIcon from 'images/icons/Lock.svg'
import ArrowSwapIcon from 'images/icons/arrow-swap-light.svg'
import HeartFillIcon from 'images/icons/heart_fill_primary.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import NoteIcon from 'images/icons/ic_note.svg'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import m6 from 'src/assets/images/mockup6.png'
import { CHAPTER_STATUS, CHAPTER_TYPE } from 'src/constants/chapter.constant'
import { Context } from 'src/context'
import { ModalContext } from 'src/context/modals'
import { IChapter } from 'src/models/chapter'

export default function ChapterList({ list, like, unlike, setComicLikes, hasAccess }) {
  const { account } = useContext(Context);
  const { t } = useTranslation()
  const [isDesc, setIsDesc] = useState(true)
  const [searchChapter, setSearchChapter] = useState('')
  const { setSignInOpen } = useContext(ModalContext)
  return (
    <div>
      <div className='w-full bg-[#414141] text-medium-gray py-2 px-6 flex items-center justify-between'>
        <div className='flex gap-5 items-center whitespace-nowrap'>
          <TextField
            onChange={setSearchChapter}
            value={searchChapter}
            size='xs'
            type='number'
            placeholder={t('Enter chapter number')}
            className='bg-subtle-dark'
            leadingComponent={<Image alt='' src={NoteIcon} className='w-5 h-5 text-medium-gray' />}
          />
        </div>
        <div>
          <Image alt='' src={ArrowSwapIcon} onClick={() => setIsDesc(!isDesc)} className='cursor-pointer w-5 h-w-5' />
        </div>
      </div>
      {!account && (
        <div className='px-5 bg-black/60'>
          <p className='italic text-subtle-dark text-xs leading-8'>
            <a
              className='text-second-color underline font-semibold cursor-pointer'
              onClick={() => setSignInOpen(true)}>
              {t('Sign in')}
            </a>{' '}
            {t('to unlock special chapters')}!
          </p>
        </div>
      )}
      <div className='bg-[#292929]/80 min-h-[40vh]'>
        <div className='grid grid-cols-1 divide-y'>
          {list
            .filter((chapter) => {
              return searchChapter ? chapter?.number?.toString()?.includes(searchChapter) : true
            })
            .sort(() => (isDesc ? 1 : -1))
            .map((chapter, index) => (
              <Chapter
                chapter={chapter}
                key={index}
                like={like}
                hasAccess={hasAccess}
                unlike={unlike}
                setComicLikes={setComicLikes}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
const Chapter = ({
  chapter,
  like,
  unlike,
  setComicLikes,
  hasAccess,
}: {
  chapter: IChapter
  like: any
  unlike: any
  setComicLikes: any
  hasAccess: boolean
}) => {
  const router = useRouter()
  const { query } = useRouter()
  const { account } = useContext(Context)
  const { t } = useTranslation()
  const [isLiked, setIsLiked] = useState(chapter.isLiked)
  const [likes, setLikes] = useState(chapter.likes)
  const {setSignInOpen} = useContext(ModalContext)
  const likeHandler = (isLike: boolean) => {
    if (account?.verified && account?.name) {
      if (isLike) {
        like(chapter.id)
        setLikes((l) => l + 1)
        setComicLikes((l) => l + 1)
      } else {
        unlike(chapter.id)
        setLikes((l) => l - 1)
        setComicLikes((l) => l - 1)
      }
      setIsLiked(isLike)
    } else {
      setSignInOpen(true)
    }
  }
  const unavailable =
    chapter.status == CHAPTER_STATUS.UPCOMING ||
    (!account && chapter.type == CHAPTER_TYPE.ACCOUNT_ONLY) ||
    (!hasAccess && chapter.type == CHAPTER_TYPE.NFTS_ONLY)
  return (
    <div
      onClick={() => (!unavailable ? router.push(`/comic/${query.comicSlug}/chapter/${chapter.number}`) : null)}
      className='flex border-bottom border-[#414141] text-white relative'>
      <Image
        src={chapter.thumbnail || m6}
        alt=''
        className={`transition-all duration-500 object-cover w-[100px] h-[100px]`}
        width={100}
        height={100}
      />
      <div className='absolute top-0 left-0 [&>*]:absolute [&>*]:w-[100px] [&>*]:rounded-none [&_span]:text-xs [&_span]:px-0 [&_span]:w-[100px] [&_span]:flex [&_span]:justify-center'>
        {(function () {
          switch (chapter.type) {
            case CHAPTER_TYPE.ACCOUNT_ONLY:
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
            case CHAPTER_TYPE.NFTS_ONLY:
              if (hasAccess) {
                return (
                  <StatusLabel status='success'>
                    <>{t('NFTs only')}</>
                  </StatusLabel>
                )
              } else {
                return (
                  <StatusLabel status='error'>
                    <div className='flex gap-1'>
                      <Image src={LockIcon} alt='' />
                      {t('NFTs only')}
                    </div>
                  </StatusLabel>
                )
              }
            default:
              return <div></div>
          }
        })()}
      </div>
      <div className='flex flex-col justify-between flex-1 p-4'>
        <div>
          <div className='flex items-center gap-5'>
            <p className='text-[10px]'>{`${t('Chapter')} ${chapter.number}`}</p>
          </div>
          <div className='font-[600] text-xs'>{chapter.name}</div>
        </div>
        <div className={`flex justify-between items-end w-full text-xs`}>
          <div className='mr-3'>{moment(chapter.date).format('DD/MM/yyyy')}</div>
          <div className='flex gap-3'>
            <div className='flex gap-2  text-primary-color'>
              <EyeIcon className='w-4 h-4' />
              <span>{chapter.views}</span>
            </div>
            <div className='flex items-center text-primary-color'>
              {isLiked ? (
                <Image
                  className='cursor-pointer w-4 h-4'
                  src={HeartFillIcon}
                  alt=''
                  onClick={(e) => {
                    likeHandler(false)
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                />
              ) : (
                <Image
                  className='cursor-pointer w-4 h-4'
                  src={HeartOutlineIcon}
                  alt=''
                  onClick={(e) => {
                    likeHandler(true)
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                />
              )}
              <span className='ml-2 text-xs'>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
