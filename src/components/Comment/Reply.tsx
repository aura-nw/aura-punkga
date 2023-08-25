import Avatar from 'images/avatar.svg'
import moment from 'moment'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { IReply } from 'src/models/comment'
export default function Reply({ data }: { data: IReply }) {
  const { t } = useTranslation()
  return (
    <div className='bg-white px-3 md:px-6 py-2 md:py-4 rounded-xl ml-16'>
      <div className='flex items-center'>
        <Image
          src={data.author?.image || Avatar}
          alt=''
          width={32}
          height={32}
          className='w-6 h-6 md:w-8 md:h-8 object-cover rounded-full'
        />
        <strong className={`ml-[10px]  text-xs md:text-base ${!data.author?.nickname ? 'italic' : ''}`}>
          {data.author?.nickname || t('Deleted user')}
        </strong>
        <p className='ml-4  text-xs md:text-base to-subtle-dark'>{moment(data.createAt).fromNow()}</p>
      </div>
      <div
        className={`md:mt-3 mt-[6px] text-xs md:text-sm font-[500] whitespace-pre-line text-subtle-dark ${
          !data.content ? 'italic' : ''
        }`}>
        {data.content || t('Deleted comment')}
      </div>
    </div>
  )
}
