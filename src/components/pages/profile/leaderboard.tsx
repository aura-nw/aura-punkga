import Avatar from 'assets/images/avatar.svg'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { Context } from 'src/context'
import { Quest } from 'src/models/campaign'
import { getLeaderboard } from 'src/services'
import useSWR from 'swr'
import Nft from './assets/nft.svg'
import Xp from './assets/xp.svg'
import moment from 'moment'
import Popover from 'components/Popover'
import ProfileCard from 'components/Card/ProfileCard'
export default function LeaderBoard() {
  const { account } = useContext(Context)
  const [active, setActive] = useState(2)
  const { data } = useSWR(
    'get_leaderboard',
    async () => {
      const data = await getLeaderboard()
      return data?.user_level || []
    },
    { refreshInterval: 10000 }
  )
  console.log(account.completedQuests)
  return (
    <div className='bg-[#f0f0f0] rounded-[10px] mt-10'>
      <div className='py-4 px-[32px] w-full h-full flex flex-col'>
        <div className='flex'>
          <div
            className={`text-xl leading-[25px] cursor-pointer font-bold w-full text-center  pb-[2px] mb-3 ${
              active == 1
                ? 'text-[#414141] border-[#414141] border-b-[3px]'
                : 'text-[#ABABAB] border-[#ABABAB] border-b-2'
            }`}
            onClick={() => setActive(1)}>
            Completed Quests
          </div>
          <div
            className={`text-xl leading-[25px] cursor-pointer font-bold w-full text-center  pb-[2px] mb-3 ${
              active == 2
                ? 'text-[#414141] border-[#414141] border-b-[3px]'
                : 'text-[#ABABAB] border-[#ABABAB] border-b-2'
            }`}
            onClick={() => setActive(2)}>
            Leaderboard
          </div>
        </div>
        {active == 1 ? (
          <div className='h-[608px] flex flex-col relative gap-3 overflow-auto'>
            {account.completedQuests?.map((data: { quest: Quest; created_at: string }, index) => (
              <div key={index} className='flex gap-3 items-center bg-white py-[10px] px-3 rounded-[10px]'>
                <div className='shrink-0'>
                  <Image src={data.quest.reward.xp ? Xp : Nft} alt='' />
                </div>
                <div className='flex-1 truncate'>
                  <div className='font-bold leading-5 text-subtle-dark truncate'>{data.quest.name}</div>
                  <div className='mt-[5px] text-xs text-[#61646B]'>{`Completed: ${moment(
                    data.created_at
                  ).fromNow()}`}</div>
                </div>
                {data.quest.reward.nft ? (
                  <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium w-[38px] h-[38px] shrink-0'>
                    <Image
                      src={data.quest.reward.nft.img_url}
                      width={38}
                      height={38}
                      alt=''
                      className='object-cover w-full h-full'
                    />
                  </div>
                ) : (
                  <div className='border border-second-color p-2 bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium whitespace-nowrap h-fit shrink-0'>
                    <span className='text-second-color font-bold'>{data.quest.reward.xp}</span> XP
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
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
            <div className='h-[530px] flex flex-col relative'>
              <div
                className={`absolute inset-0 overflow-auto  gap-3 flex flex-col text-subtle-dark text-sm font-semibold h-full py-3`}>
                {data?.map((item, index) => (
                  <div key={index} className='cursor-pointer bg-white rounded-[10px]'>
                    <Popover freeMode popoverRender={() => <ProfileCard data={item.authorizer_user} />}>
                      <div className='grid grid-cols-[1fr_115px] py-[6px] px-[32px]'>
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
                    </Popover>
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
          </>
        )}
      </div>
    </div>
  )
}
