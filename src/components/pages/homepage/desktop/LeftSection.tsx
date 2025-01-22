import useSWR from 'swr'
import DailyQuest from './DailyQuest'
import { useContext } from 'react'
import { Context } from 'src/context'
import { userService } from 'src/services/userService'
import ComicCard from 'components/Comic/ComicCard'
import classNames from 'classnames'

export default function LeftSection({ className }: { className?: string }) {
  const { account } = useContext(Context)
  const { data: subscriptionList } = useSWR({ key: 'get-subscriptions', id: account?.id }, ({ id }) =>
    id ? userService.getSubscriptionList(id) : null
  )
  return (
    <div className={className}>
      <div className='px-7 space-y-4'>
        <div className='text-[#f6f6f6] text-lg font-bold leading-relaxed'>Daily quests</div>
        <DailyQuest />
      </div>
      <div className='px-7'>
        <div className='text-[#f6f6f6] text-lg font-bold leading-relaxed'>Subscribed manga's</div>
        <div className='grid grid-cols-2 gap-3 mt-4'>
          {subscriptionList?.slice(0, 4)?.map((manga, index) => (
            <ComicCard key={index} {...manga} />
          ))}
        </div>
      </div>
    </div>
  )
}
