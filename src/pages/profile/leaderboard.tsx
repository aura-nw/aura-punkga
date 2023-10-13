import Image from 'next/image'
import Frame from './assets/leaderboard-background.svg'
export default function LeaderBoard() {
  return (
    <>
      <div className='relative w-[32%] aspect-[571/581]'>
        <Image src={Frame} alt='' className='absolute inset-0 w-full h-full' />
      </div>
    </>
  )
}
