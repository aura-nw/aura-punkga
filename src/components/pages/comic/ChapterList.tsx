import { ArrowsUpDownIcon, DocumentTextIcon, EyeIcon } from '@heroicons/react/20/solid'
import StatusLabel from 'components/Label/Status'
import LockIcon from 'images/icons/Lock.svg'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import m6 from 'src/assets/images/mockup6.png'
import TextField from 'components/Input/TextField'
import HeartFillIcon from 'images/icons/heart_fill.svg'
import HeartOutlineIcon from 'images/icons/heart_outline.svg'
import { useContext, useState } from 'react'
import { Context } from 'src/context'
export default function ChapterList({ list }) {
  const { query } = useRouter()
  const router = useRouter()
  const [isDesc, setIsDesc] = useState(true)
  const [searchChapter, setSearchChapter] = useState('')
  const { account } = useContext(Context)
  return (
    <div>
      <div className='w-full bg-[#414141] text-medium-gray py-2 px-5 flex items-center justify-between'>
        <div className='flex gap-5 items-center whitespace-nowrap'>
          <strong className='text-[14px]'>{`${list.length} chapter${list.length > 1 ? 's' : ''}`}</strong>
          <TextField
            onChange={setSearchChapter}
            value={searchChapter}
            size='sm'
            type='number'
            placeholder='Enter chapter number'
            leadingComponent={<DocumentTextIcon className='w-[18px] h-[18px] text-medium-gray' />}
          />
        </div>
        <div>
          <ArrowsUpDownIcon onClick={() => setIsDesc(!isDesc)} className='cursor-pointer w-5 h-w-5 text-light-gray' />
        </div>
      </div>
      <div className='grid grid-cols-1 divide-y'>
        {list
          .filter((chapter) => {
            return searchChapter ? chapter?.number?.toString()?.includes(searchChapter) : true
          })
          .sort(() => (isDesc ? 1 : -1))
          .map((chapter, index) => (
            <div
              key={index}
              onClick={() =>
                chapter.status != 'Upcoming' ? router.push(`/comic/${query.comicId}/chapter/${chapter.number}`) : null
              }
              className='flex border-bottom bg-[#212121] text-white'>
              <Image
                src={chapter.thumbnail || m6}
                alt=''
                className={`transition-all duration-500 object-cover w-[100px] h-[100px]`}
                width={100}
                height={100}
              />
              <div className='flex flex-col justify-between flex-1 p-4'>
                <div>
                  <div className='flex items-center gap-5'>
                    <p className='text-[10px]'>{`Chapter ${chapter.number}`}</p>
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
                        default:
                          return <div></div>
                      }
                    })()}
                    {(function () {
                      switch (chapter.status) {
                        case 'Published':
                          return <></>
                        case 'Upcoming':
                          return (
                            <StatusLabel status='warning'>
                              <>Upcoming</>
                            </StatusLabel>
                          )
                        default:
                          return (
                            <div>
                              <>{chapter.status}</>
                            </div>
                          )
                      }
                    })()}
                  </div>
                  <div className='font-[600] text-xs'>{chapter.name}</div>
                </div>
                <div className={`flex justify-between items-end w-full `}>
                  <div className='text-xs flex gap-10'>
                    <div className='mr-3'>{moment(chapter.date).format('DD/MM/yyyy')}</div>
                    <div className='flex gap-2'>
                      <EyeIcon className='w-4 h-4 text-gray-600' />
                      <span>{chapter.views}</span>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    {chapter.isLiked ? (
                      <Image className='cursor-pointer w-4 h-4' src={HeartOutlineIcon} alt='' />
                    ) : (
                      <Image className='cursor-pointer w-4 h-4' src={HeartFillIcon} alt='' />
                    )}
                    <span className='ml-2 text-xs'>{chapter.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
