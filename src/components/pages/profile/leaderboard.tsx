import Image from 'next/image'
import Frame from './assets/leaderboard-background.svg'
import { useContext, useState } from 'react'
import Avatar from 'assets/images/avatar.svg'
import { Context } from 'src/context'
import { getLeaderboard } from 'src/services'
import useSWR from 'swr'
export default function LeaderBoard() {
  const [active, setActive] = useState(1)
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
    <>
      <div className='relative w-[32%] aspect-[571/581]'>
        <Image src={Frame} alt='' className='absolute inset-0 w-full h-full' />
        <div className='flex relative mt-[3%] ml-[2%] w-full'>
          <div className='w-[48.5%] h-fit cursor-pointer relative' onClick={() => setActive(1)}>
            <div
              className={`absolute inset-0 top-[18%] font-orbitron text-2xl font-extrabold grid place-items-center ${
                active == 1 ? 'text-primary-color' : 'text-subtle-dark'
              }`}>
              Leader board
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='259'
              height='75'
              viewBox='0 0 259 75'
              fill='none'
              className='w-full h-full'>
              <path
                d='M0.462891 28.7312C0.462891 27.4051 0.989675 26.1334 1.92736 25.1957L25.6586 1.46447C26.5963 0.526786 27.868 0 29.1941 0L236.392 0C237.718 0 238.99 0.526784 239.927 1.46447L256.998 18.5355C257.936 19.4732 258.463 20.745 258.463 22.0711V70C258.463 72.7614 256.224 75 253.463 75H134.534C133.208 75 131.936 74.4732 130.998 73.5355L122.927 65.4645C121.99 64.5268 120.718 64 119.392 64H32.534C31.2079 64 29.9361 64.5268 28.9984 65.4645L20.9274 73.5355C19.9897 74.4732 18.7179 75 17.3918 75H5.46289C2.70147 75 0.462891 72.7614 0.462891 70V28.7312Z'
                fill={active == 1 ? '#61646B' : '#DEDEDE'}
              />
            </svg>
          </div>
          <div className='w-[48%] h-fit cursor-pointer relative' onClick={() => setActive(2)}>
            <div
              className={`absolute inset-0 top-[18%] font-orbitron text-2xl font-extrabold grid place-items-center ${
                active == 2 ? 'text-primary-color' : 'text-subtle-dark'
              }`}>
              Completed quests
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='245'
              height='75'
              viewBox='0 0 245 75'
              fill='none'
              className='w-full h-full'>
              <path
                d='M0.460216 24.9999C0.460277 22.2385 2.69884 20 5.46022 20H155.402C156.722 20 157.989 19.4778 158.925 18.5474L176.135 1.4526C177.072 0.52218 178.339 0 179.659 0H219.706C221.032 0 222.303 0.526617 223.241 1.46404L242.679 20.8972C243.617 21.8348 244.144 23.1066 244.144 24.4328L244.146 60.3731C244.146 61.6997 243.619 62.9719 242.681 63.9097L233.05 73.5363C232.113 74.4735 230.841 75 229.515 75H5.45921C2.69775 75 0.459156 72.7614 0.459217 69.9999L0.460216 24.9999Z'
                fill={active == 2 ? '#61646B' : '#DEDEDE'}
              />
              <path
                d='M0.460216 24.9999C0.460277 22.2385 2.69884 20 5.46022 20H155.402C156.722 20 157.989 19.4778 158.925 18.5474L176.135 1.4526C177.072 0.52218 178.339 0 179.659 0H219.706C221.032 0 222.303 0.526617 223.241 1.46404L242.679 20.8972C243.617 21.8348 244.144 23.1066 244.144 24.4328L244.146 60.3731C244.146 61.6997 243.619 62.9719 242.681 63.9097L233.05 73.5363C232.113 74.4735 230.841 75 229.515 75H5.45921C2.69775 75 0.459156 72.7614 0.459217 69.9999L0.460216 24.9999Z'
                fill='black'
                fillOpacity='0.2'
              />
            </svg>
          </div>
        </div>
        {active == 1 && (
          <>
            <div className='flex-1 grid grid-rows-[repeat(8,1fr)] my-5 border-[length:1.5px] border-light-medium-gray rounded-[20px] mx-5 divide-y-[1.5px] overflow-auto'>
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
                    <div className='font-medium line-clamp-1'>{item.authorizer_user.nickname}</div>
                  </div>
                  <div>{item.authorizer_user.user_quests_aggregate.aggregate.count || 0}</div>
                  <div>{item.xp}XP</div>
                </div>
              ))}
            </div>
            {account && (
              <div className='relative mx-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='960'
                  height='123'
                  viewBox='0 0 320 41'
                  fill='none'
                  className='w-full h-full'>
                  <path d='M320 0.250244H0V22.4351L18.0426 40.2502H301.957L320 22.4351V0.250244Z' fill='#DEDEDE' />
                </svg>
                <div className='inset-0 absolute flex items-center justify-between pl-5 pr-4'>
                  <div>
                    <span className='font-orbitron font-extralight'>Current rank: </span>
                    <strong>#{account.rank}</strong>
                  </div>
                  <div>
                    <span className='font-orbitron font-extralight'>Quests: </span>
                    <strong>{account.completedQuests?.length}</strong>
                  </div>
                  <div>
                    <span className='font-orbitron font-extralight'>XP: </span>
                    <strong>{account.xp}</strong>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {active == 2 && (
          <div>
            {account.completedQuests?.map((quest, index) => (
              <div key={index}>{quest.quest?.name}</div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
