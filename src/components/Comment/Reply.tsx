import ProfileCard from 'components/Card/ProfileCard'
import Popover from 'components/Popover'
import DOMPurify from 'dompurify'
import Avatar from 'images/avatar.svg'
import moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IReply } from 'src/models/comment'
import { getUserData } from 'src/services'

export default function Reply({ data }: { data: IReply }) {
  const { t } = useTranslation()
  const [userData, setUserData] = useState()
  const popoverRender = (open: boolean) => {
    useEffect(() => {
      if (open && !userData) {
        fetchUserData()
      }
    }, [open])

    const fetchUserData = async () => {
      try {
        const udata = await getUserData(data.author.id)
        setUserData(udata)
      } catch (error) {}
    }
    return <ProfileCard data={userData} />
  }
  return (
    <div className='bg-light-gray px-3 md:px-6 py-2 md:py-4 rounded-xl ml-16'>
      <div className='flex items-center'>
        {data.author?.nickname ? (
          <Popover popoverRender={popoverRender}>
            <div className='flex items-center cursor-pointer'>
              <Image
                src={data.author?.image || Avatar}
                alt=''
                width={32}
                height={32}
                className='w-6 h-6 md:w-8 md:h-8 object-cover rounded-full'
              />
              <strong className={`ml-[10px] text-xs md:text-base ${!data.author?.nickname ? 'italic' : ''}`}>
                {data.author?.nickname || t('Deleted user')}
              </strong>
            </div>
          </Popover>
        ) : (
          <div className='flex items-center cursor-pointer'>
            <Image
              src={data.author?.image || Avatar}
              alt=''
              width={32}
              height={32}
              className='w-6 h-6 md:w-8 md:h-8 object-cover rounded-full'
            />
            <strong className={`ml-[10px] text-xs md:text-base ${!data.author?.nickname ? 'italic' : ''}`}>
              {data.author?.nickname || t('Deleted user')}
            </strong>
          </div>
        )}

        <p className='ml-4  text-xs md:text-base to-subtle-dark'>{moment(data.createAt).fromNow()}</p>
      </div>
      <div
        className={`md:mt-3 mt-[6px] text-xs md:text-sm font-[500] text-subtle-dark whitespace-pre-wrap ${
          !data.content ? 'italic' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content || t('Deleted comment')) }}></div>
    </div>
  )
}
