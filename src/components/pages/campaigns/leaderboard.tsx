import Image from 'next/image'
import Frame from './assets/leaderboard-background.svg'
import { useEffect, useState } from 'react'
import Avatar from 'assets/images/avatar.svg'
import { getLeaderboard } from 'src/services'
export default function LeaderBoard() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchLeaderboard()
  }, [])
  const fetchLeaderboard = async () => {
    const data = await getLeaderboard()
    setData(data?.user_level || [])
  }
  return (
    <>
      <div className='relative w-[32%] aspect-[571/581]'>
        <Image src={Frame} alt='' className='absolute inset-0 w-full' />
        <div className='flex flex-col absolute inset-[1.6%] gap-2'>
          <div className='h-fit cursor-pointer relative'>
            <div className='absolute left-[50%] -translate-x-1/2 top-[36%] font-orbitron text-2xl font-extrabold grid place-items-center text-primary-color whitespace-nowrap'>
              Leader board
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='506'
              height='26'
              viewBox='0 0 506 76'
              fill='none'
              className='w-full h-full aspect-[506/76]'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M27.1192 0L0.458984 26.6602V75H19.459L30.459 64H121.459L132.459 75H244.959V75.0303H492.586L505.146 62.4753L505.144 22.3918L482.777 0.0302734H438.598L418.463 20.0303H258.459V20L238.459 0H27.1192Z'
                fill='#61646B'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M27.1192 0L0.458984 26.6602V75H19.459L30.459 64H121.459L132.459 75H244.959V75.0303H492.586L505.146 62.4753L505.144 22.3918L482.777 0.0302734H438.598L418.463 20.0303H258.459V20L238.459 0H27.1192Z'
                fill='black'
                fillOpacity='0.2'
              />
            </svg>
          </div>
          <div className='flex-1 grid grid-rows-[repeat(10,1fr)] border-[length:1.5px] border-light-medium-gray rounded-[20px] mx-4 divide-y-[1.5px] overflow-auto'>
            <div className='grid grid-cols-[56px_1fr_130px_100px] h-[48px] font-orbitron text-base font-semibold place-items-center pl-3'>
              <div>Rank</div>
              <div>User</div>
              <div>Quests</div>
              <div>XP</div>
            </div>
            {data?.map((item, index) => (
              <div key={index} className='grid grid-cols-[56px_1fr_130px_100px] place-items-center py-[10px]'>
                <div>#{index + 1}</div>
                <div className='flex items-center gap-[10px] justify-self-start px-[10px]'>
                  <Image className='w-7 h-7 rounded-full' src={item.authorizer_user.picture || Avatar} alt='' />
                  <div className='font-medium'>{item.authorizer_user.nickname}</div>
                </div>
                <div>{item.authorizer_user.user_quests_aggregate.aggregate.count || 0}</div>
                <div>{item.xp}XP</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
