import Avatar from 'assets/images/avatar.svg'
import Image from 'next/image'
import { useContext } from 'react'
import { Context } from 'src/context'
import { getLeaderboard } from 'src/services'
import useSWR from 'swr'

export default function LeaderBoard() {
  const { account } = useContext(Context)
  const { data } = useSWR(
    'get_leaderboard',
    async () => {
      const data = await getLeaderboard()
      return data?.user_level || []
    },
    { refreshInterval: 10000 }
  )
  return (
    <div className='bg-[#f0f0f0] rounded-[10px] mt-10'>
      <div className='py-4 px-[32px] w-full h-full flex flex-col'>
        <div className='text-xl leading-[25px] font-bold w-full text-center border-b-[3px] pb-[2px] mb-3 text-[#414141] border-[#414141]'>
          Leaderboard
        </div>
        <div className='flex justify-between px-[32px] pb-3 pt-1 border-b-[1px] border-medium-gray text-subtle-dark font-bold'>
          <div className='flex gap-16'>
            <div>Rank</div>
            <div>User</div>
          </div>
          <div className='flex gap-16'>
            <div>Quests</div>
            <div>XP</div>
          </div>
        </div>
        <div className='h-[321px] flex flex-col relative'>
          <div
            className={`absolute inset-0 overflow-auto  gap-3 flex flex-col text-subtle-dark text-sm font-semibold h-full py-3`}>
            {data?.map((item, index) => (
              <div key={index} className='grid grid-cols-[1fr_115px] py-[6px] px-[32px] bg-white rounded-[10px]'>
                <div className='flex items-center'>
                  <div className='w-[45px]'>#{index + 1}</div>
                  <div className='flex items-center gap-[10px] justify-self-start px-[10px]'>
                    <Image
                      className='w-7 h-7 rounded-full'
                      width={28}
                      height={28}
                      src={item.authorizer_user.picture || Avatar}
                      alt=''
                    />
                    <div className='line-clamp-1'>{item.authorizer_user.nickname}</div>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div>{item.authorizer_user.user_quests_aggregate.aggregate.count || 0}</div>
                  <div>{item.xp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {account && (
          <div className='flex justify-between pt-3 border-t-[1px] pr-5 border-medium-gray text-subtle-dark'>
            <div>
              Your rank: <strong>#{account.rank}</strong>
            </div>
            <div>
              Quests: <strong>{account.quests}</strong>
            </div>
            <div>
              XP: <strong>{account.xp}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
