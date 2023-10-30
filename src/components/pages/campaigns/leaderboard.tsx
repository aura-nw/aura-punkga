import Avatar from 'assets/images/avatar.svg'
import Image from 'next/image'
import { getLeaderboard } from 'src/services'
import useSWR from 'swr'
import Frame from './assets/leaderboard-background.svg'
import { useContext } from 'react'
import { Context } from 'src/context'
import QuestImage from './assets/complete-quest.png'
import Top1MedalImage from './assets/top-1-medal.png'
import Top1Bg from './assets/top-1-bg.svg'
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
    <div className='flex flex-col gap-8'>
      <div className='flex gap-[15px] items-end'>
        <div className='font-extrabold text-2xl leading-6'>Leaderboard</div>
      </div>
      <div className='flex gap-10'>
        <div className='flex-1 bg-[#f0f0f0] rounded-[10px]'>
          <div className='p-7 flex flex-col gap-7 items-center'>
            <div className='flex items-center gap-4'>
              <Image src={Top1MedalImage} alt='' />
              <div className='text-[32px] font-bold text-[#414141]'>TOP 1</div>
            </div>
            <div className='relative'>
              <Image alt='' src={Top1Bg} />
              <div className='absolute inset-0 flex justify-center items-center flex-col'>
                <div className='relative'>
                  <div className='absolute inset-y-0 -inset-x-1 flex justify-center items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='144' height='122' viewBox='0 0 144 122' fill='none'>
                      <path d='M3 15.4109V3.30664H18.0735' stroke='#1FAB5E' stroke-width='6' />
                      <path d='M140.98 15.4109V3.30664H125.907' stroke='#1FAB5E' stroke-width='6' />
                      <path d='M3 106.658V118.762H18.0735' stroke='#1FAB5E' stroke-width='6' />
                      <path d='M140.98 106.658V118.762H125.907' stroke='#1FAB5E' stroke-width='6' />
                    </svg>
                  </div>
                  <Image
                    src={data?.[0]?.authorizer_user?.picture || Avatar}
                    width={137}
                    height={137}
                    alt=''
                    className='w-[137px] aspect-square rounded-full'
                  />
                </div>
                <div className='mt-[6px] font-bold text-subtle-dark'>{data?.[0]?.authorizer_user?.nickname}</div>
                <div className='mt-3 flex flex-col gap-[6px] text-subtle-dark text-xs'>
                  <div>
                    <strong>Quests: </strong>
                    {data?.[0]?.authorizer_user?.user_quests_aggregate?.aggregate?.count || 0}
                  </div>
                  <div>
                    <strong>XP: </strong>
                    {data?.[0]?.xp || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-[2] bg-[#f0f0f0] rounded-[10px]'>
          <div className='py-4 px-[32px] w-full h-full flex flex-col'>
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
            <div className='h-full flex flex-col relative'>
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
        <div className='flex-1'>
          <Image src={QuestImage} alt='' />
        </div>
      </div>
    </div>
  )
}
