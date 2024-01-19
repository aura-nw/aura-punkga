import Image from 'next/image'
import Modal from '.'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function ClaimNftSuccessModal({ image, name, open, setOpen }) {
  useEffect(() => {
    if (open)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
  }, [open])
  return (
    <Modal open={open} hideClose setOpen={setOpen}>
      <div className='w-[90vw] max-w-[656px] p-8 flex flex-col items-center gap-5'>
        <div className='font-bold leading-5 text-[#292929]'>Congratulation!</div>
        <div className='border border-second-color bg-[#1FAB5E]/10 rounded text-xs leading-3 font-medium w-[167px] aspect-square'>
          <Image src={image} width={167} height={167} alt='' className='object-cover h-full w-full' />
        </div>
        <div className='font-bold leading-[15px] text-xs text-[#61646B]'>{name}</div>
      </div>
    </Modal>
  )
}
