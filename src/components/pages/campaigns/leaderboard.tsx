import Avatar from 'assets/images/avatar.svg'
import ProfileCard from 'components/Card/ProfileCard'
import Popover from 'components/Popover'
import Image from 'next/image'
import { useContext } from 'react'
import { Context } from 'src/context'
export default function LeaderBoard({ data }: { data: any[] }) {
  const { account } = useContext(Context)
  return (
    <div className='overflow-auto'>
      <div className='bg-[#f0f0f0] rounded-[10px] mt-10 min-w-[300px] md:min-w-[400px]'>
        <div className='py-3 md:py-4 px-4 md:px-[32px] w-full h-full flex flex-col'>
          <div
            className={`leading-5 md:text-xl md:leading-[25px] cursor-pointer font-bold w-full text-center  pb-[2px] mb-2 md:mb-3 text-[#414141] border-[#414141] border-b-[3px]`}>
            Leaderboard
          </div>
          <div className='flex px-[6px] py-2 md:px-[18px] md:py-[11px] border-b-[1px] border-medium-gray text-subtle-dark font-bold text-xs leading-[15px] md:text-sm md:leading-[18px]'>
            <div className='mr-14 md:mr-[70px]'>Rank</div>
            <div className='w-full'>User</div>
            <div className='w-[98px] md:w-[88px] shrink-0 text-center'>Level</div>
            <div className='w-12 shrink-0 text-center'>XP</div>
          </div>
          <div className='h-[405px] md:h-[484px] flex flex-col relative'>
            <div className={`absolute inset-0  gap-2 flex flex-col text-subtle-dark h-full py-2`}>
              {data?.map((item, index) => (
                <div key={index} className='cursor-pointer bg-white rounded-[10px]'>
                  <Popover
                    freeMode
                    popoverRender={() => <ProfileCard hideEmail data={item.user_campaign_authorizer_user} />}>
                    <div className='flex py-1 md:py-[6px] px-4 md:px-[18px] text-xs leading-[15px] md:text-sm md:leading-[18px] items-center'>
                      <div className='w-[24px] md:w-9 mr-[10px]'>#{index + 1}</div>
                      <div className='flex items-center gap-[5px] md:gap-[10px] justify-self-start w-full min-w-[80px] md:min-w-[150px]'>
                        <Image
                          className='w-6 h-6 md:w-7 md:h-7 rounded-full'
                          width={28}
                          height={28}
                          src={item.user_campaign_authorizer_user.picture || Avatar}
                          alt=''
                        />
                        <div className='truncate'>{item.user_campaign_authorizer_user.nickname}</div>
                      </div>
                      <div className='w-[98px] md:w-[88px] shrink-0 text-center'>{item.user_campaign_authorizer_user.levels[0].level || 0}</div>
                      <div className='w-12 shrink-0 text-center'>{item.total_reward_xp}</div>
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
        </div>
      </div>
    </div>
  )
}
