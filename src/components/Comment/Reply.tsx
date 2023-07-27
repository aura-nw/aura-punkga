import Avatar from 'images/avatar.png'
import moment from 'moment'
import Image from 'next/image'
import { IReply } from 'src/models/comment'
export default function Reply({ data }: { data: IReply }) {
  return (
    <div className='bg-white px-6 py-4 rounded-xl ml-16'>
      <div className='flex items-center'>
        <Image src={Avatar} alt='' className='w-8 h-8' />
        <strong className='ml-[10px]  text-xs md:text-base'>{data.author.nickname}</strong>
        <p className='ml-4  text-xs md:text-base'>{moment(data.createAt).fromNow()}</p>
      </div>
      <div className='mt-3  text-xs md:text-sm font-[500] whitespace-pre-line'>{data.content}</div>
    </div>
  )
}
