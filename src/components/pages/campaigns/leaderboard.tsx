import Image from 'next/image'
import Frame from './assets/leaderboard-background.svg'
import { useState } from 'react'
export default function LeaderBoard() {
  return (
    <>
      <div className='relative w-[32%] aspect-[571/581]'>
        <Image src={Frame} alt='' className='absolute inset-0 w-full' />
        <div className='flex flex-col absolute inset-[1.6%] gap-2'>
          <div className='h-fit cursor-pointer relative'>
            <div className='absolute left-[50%] -translate-x-1/2 top-[36%] font-orbitron text-2xl font-extrabold grid place-items-center text-primary-color'>
              Leader board
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='506'
              height='76'
              viewBox='0 0 506 76'
              fill='none'
              className='w-full'>
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
          <div className='flex-1 px-4'>data here</div>
        </div>
      </div>
    </>
  )
}
