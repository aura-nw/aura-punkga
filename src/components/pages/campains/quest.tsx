import Image from 'next/image'
import QuestBackground from './assets/quest-background.svg'
import LockQuestBackground from './assets/lock-quest-background.svg'
import LockImage from './assets/lock-image.svg'
import { useState } from 'react'
import Modal from './modal'
export default function Quest({ isLocked }) {
  const [open, setOpen] = useState(false)
  if (isLocked)
    return (
      <div className='relative'>
        <Image src={LockQuestBackground} alt='' />
        <div className='absolute inset-0'>
          <div className='p-6 flex gap-5 flex-col items-center justify-center h-full'>
            <Image src={LockImage} alt='' />
            <div className='text-xl font-bold text-center'>Lorem ipsum dolor sit amet, consectetur</div>
            <div className='text-sm text-second-color text-center'>
              <span className='font-bold'>CONDITION:</span> dolor sit amet, consectetur adipiscin elit. Phasellus mattis
              tristique to UNLOCK
            </div>
          </div>
        </div>
        <div className='absolute top-8 right-6 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
          <div className='bg-white m-1 font-bold text-sm'>
            <span className='text-second-color'>100</span> EXP
          </div>
        </div>
      </div>
    )
  return (
    <>
      <Modal open={open} setOpen={setOpen} onClose={() => setOpen(false)}>
        abc
      </Modal>
      <div className='relative cursor-pointer' onClick={() => setOpen(true)}>
        <Image src={QuestBackground} alt='' />
        <div className='absolute top-9 left-5 bottom-6 right-5 flex flex-col justify-between'>
          <div className='h-20 flex flex-col gap-3'>
            <div className='text-xl font-bold max-w-[240px] leading-5 h-10'>
              Lorem ipsum dolor sit amet, consectetur
            </div>
            <div className='uppercase font-bold text-lg border py-2 px-3 w-fit leading-3 rounded-sm border-[#414141]'>
              week
            </div>
          </div>
          <div className='flex flex-col gap-14'>
            <div className='text-sm text-[#61646B]'>
              <span className='font-bold'>MISSION:</span>
              Lorem ipsum dolor sit amet, consectet adipiscin elit. Phasellus mattis tristique risus vel...
            </div>
            <div className='text-sm text-second-color'>
              <span className='font-bold'>CONDITION:</span> dolor sit amet, consectetur adipiscin elit. Phasellus mattis
              tristique to UNLOCK
            </div>
          </div>
        </div>
        <div className='absolute top-8 right-6 bg-gradient-to-l from-black/[0.0001] via-slate-600/40 to-black/[0.0001]'>
          <div className='bg-white m-1 font-bold text-sm'>
            <span className='text-second-color'>100</span> EXP
          </div>
        </div>
      </div>
    </>
  )
}
