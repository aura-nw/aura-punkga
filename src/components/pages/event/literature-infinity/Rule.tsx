import Modal from 'components/Modal'
import Link from 'next/link'
import { useState } from 'react'

export default function Rule({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div onClick={() => setOpen(!open)}>{children}</div>
      <Modal open={open} setOpen={setOpen}>
        <div className='px-8 pt-4 pb-8 bg-white rounded-[10px] border-2 border-[#0b0b0b] flex-col justify-start items-center gap-4 inline-flex'>
          <div className='self-stretch h-[26px] flex-col justify-start items-start gap-2 flex'>
            <div className='self-stretch text-center text-[#0b0b0b] text-lg font-semibold leading-relaxed'>
              CONTEST RULES
            </div>
          </div>
          <div className='self-stretch p-4 bg-neutral-50 rounded-md justify-start items-start gap-4 inline-flex'>
            <div className='grow shrink basis-0 justify-start items-center gap-[5px] flex'>
              <div className='grow shrink basis-0'>
                <span className='text-[#0b0b0b] text-sm font-semibold leading-tight'>
                  Literature Infinity Contest: Celebrate the Year of the Snake with 20M VND in Prizes!
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-medium leading-tight'>
                  Round 1: OC Design (Jan 25 - Feb 2, 2025)
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  Create an original character (OC) based on the snake mascot. See materials here:{' '}
                </span>
                <Link
                  href='https://bit.ly/literature-Infinity'
                  target='_blank'
                  className='text-info-default text-sm font-normal underline leading-tight'>
                  https://bit.ly/literature-Infinity
                  <br />
                </Link>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  Theme: Year of the Snake, colors red and green.
                  <br />
                  Attach Tet At Ty wishes (in English or Vietnamese) to your work.
                  <br />
                  All participants get Lucky Money rewards (details later).
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-medium leading-tight'>
                  Round 2: One-shot Comics (Feb 3 - Feb 23, 2025)
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  Create an 8-20 page comic reimagining a Vietnamese literary scene.
                  <br />
                  Include a brief reflection and historical context if needed.
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-bold leading-tight'>
                  Prizes
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  🏆 01 Grand Prize: 6M VND
                  <br />
                  🥇 01 First Prize: 4M VND
                  <br />
                  🥈 01 Second Prize: 3M VND
                  <br />
                  🥉 01 Third Prize: 2M VND
                  <br />
                  🎁 300 Lucky Money: Total 5M VND
                  <br />
                  <br />
                </span>
                <span className='text-[#0b0b0b] text-sm font-medium leading-tight'>Note:</span>
                <span className='text-[#0b0b0b] text-sm font-normal leading-tight'>
                  {' '}
                  Round 1 participation is not mandatory for Round 2, but only Round 1 participants receive Lucky Money.
                  <br />
                  <br />
                  Unleash your creativity and celebrate Vietnamese literature. Let’s make this Year of the Snake
                  unforgettable!
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
