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
  return (
    <div className='overflow-auto'>
      <div className='bg-[#f0f0f0] rounded-[10px] mt-10 min-w-[350px]'>
        <div className='py-3 md:py-4 px-4 md:px-[32px] w-full h-full flex flex-col'>
          <div className='flex'>
            <div
              className={`leading-5 md:text-xl md:leading-[25px] cursor-pointer font-bold w-full text-center  pb-[2px] mb-2 md:mb-3 ${
                active == 1
                  ? 'text-[#414141] border-[#414141] border-b-[3px]'
                  : 'text-[#ABABAB] border-[#ABABAB] border-b-2'
              }`}
              onClick={() => setActive(1)}>
              Completed Quests
            </div>
            <div
              className={`leading-5 md:text-xl md:leading-[25px] cursor-pointer font-bold w-full text-center  pb-[2px] mb-2 md:mb-3 ${
                active == 2
                  ? 'text-[#414141] border-[#414141] border-b-[3px]'
                  : 'text-[#ABABAB] border-[#ABABAB] border-b-2'
              }`}
              onClick={() => setActive(2)}>
              Leaderboard
            </div>
          </div>
          {active == 1 ? (
            <div className='h-[405px] md:h-[430px] flex flex-col relative gap-2 md:gap-3 overflow-auto'>
              {account.completedQuests?.map((data: { quest: Quest; created_at: string }, index) => (
                <div key={index} className='flex gap-3 items-center bg-white py-[10px] px-3 rounded-[10px]'>
                  <div className='shrink-0'>
                    <Image src={data.quest.reward?.nft?.img_url ? Nft : Xp} alt='' />
                  </div>
                  <div className='flex-1 truncate'>
                    <div className='font-bold text-base leading-5 text-subtle-dark truncate'>{data.quest.name}</div>
                    <div className='mt-[5px] text-xs leading-[15px] text-[#61646B]'>{`Completed: ${moment(
                      data.created_at
                    ).fromNow()}`}</div>
                  </div>
                  {data.quest.reward?.nft?.img_url ? (
                    <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-sm leading-3 font-medium w-[38px] h-[38px] shrink-0'>
                      <Image
                        src={data.quest.reward.nft.img_url}
                        width={38}
                        height={38}
                        alt=''
                        className='object-cover w-full h-full'
                      />
                    </div>
                  ) : null}
                  <div className='border border-second-color px-2 py-[2px] bg-[#1FAB5E]/10 rounded text-sm leading-[16px] text-center whitespace-nowrap h-fit shrink-0'>
                    <div className='text-second-color font-bold'>{data.quest.reward.xp}</div>
                    <div className='font-medium'>XP</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className='flex px-[6px] py-2 md:px-[18px] md:py-[11px] border-b-[1px] border-medium-gray text-subtle-dark font-bold text-xs leading-[15px] md:text-sm md:leading-[18px]'>
                <div className='mr-14 md:mr-[70px]'>Rank</div>
                <div className='w-full'>User</div>
                <div className='w-[98px] md:w-[88px] shrink-0 text-center'>Level</div>
                <div className='w-12 shrink-0 text-center'>XP</div>
              </div>
              <div className='h-[405px] md:h-[484px] flex flex-col relative'>
                <div className={`absolute inset-0 overflow-auto  gap-2 flex flex-col text-subtle-dark h-full py-2`}>
                  {data?.map((item, index) => (
                    <div key={index} className='cursor-pointer bg-white rounded-[10px]'>
                      <Popover freeMode popoverRender={() => <ProfileCard hideEmail data={item.authorizer_user} />}>
                        <div className='flex py-1 md:py-[6px] px-4 md:px-[18px] text-xs leading-[15px] md:text-sm md:leading-[18px] items-center'>
                          <div className='w-[24px] md:w-9 mr-[10px]'>#{index + 1}</div>
                          <div className='flex items-center gap-[5px] md:gap-[10px] justify-self-start w-full min-w-[80px] md:min-w-[150px]'>
                            <Image
                              className='w-6 h-6 md:w-7 md:h-7 rounded-full'
                              width={28}
                              height={28}
                              src={item.authorizer_user.picture || Avatar}
                              alt=''
                            />
                            <div className='truncate'>{item.authorizer_user.nickname}</div>
                          </div>
                          <div className='w-[98px] md:w-[88px] shrink-0 text-center'>{item.level || 0}</div>
                          <div className='w-12 shrink-0 text-center'>{item.xp}</div>
                        </div>
                      </Popover>
                    </div>
                  ))}
                </div>
              </div>
              {account && (
                <div className='flex justify-between py-2 md:py-0 md:pt-5 px-3 md:px-[10px] border-t-[1px] border-medium-gray text-subtle-dark text-xs leading-[15px] md:text-sm md:leading-[18px]'>
                  <div>
                    Your rank: <strong>#{account.rank}</strong>
                  </div>
                  <div>
                    Your level: <strong>{account.level}</strong>
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
    </div>
  )
}
