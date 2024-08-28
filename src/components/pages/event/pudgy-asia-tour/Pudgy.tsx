import Image from 'next/image'
import { pudgyData } from './assets/pubdyData'
import { Pagination } from '@mui/material'
import { useState } from 'react'
import Modal from 'components/Modal'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import Logo from './assets/Punkga logo.svg'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
export default function PudgyList() {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(pudgyData[0])
  const [selectedPudgy, setSelectedPudgy] = useState(pudgyData[0])
  const [scope, animate] = useAnimate()
  return (
    <>
      <style jsx>{`
        .pudgy-scrollbar::-webkit-scrollbar {
          width: 20px;
        }
        .pudgy-scrollbar::-webkit-scrollbar-track {
          background: #d1e6df;
          border-radius: 100px;
          border: 1px solid #000;
          width: 20px;
        }
        .pudgy-scrollbar::-webkit-scrollbar-thumb {
          border-radius: 100px;
          border: 1px solid #000;
          background: #3b86f7;
        }
        .card {
          width: 405px;
          height: 648px;
          perspective: 1000px;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className='pt-20 pk-container hidden xl:block'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[64px] leading-[84px] font-black text-stroke'>
          {t('Pudgy friends')}
        </div>
        <div className='flex gap-11 mt-16'>
          <div className='w-[405px] shrink-0'>
            <div className='card' ref={scope}>
              <div className='card-inner'>
                <div className='card-front rounded-mlg border border-black p-8 bg-white'>
                  <Image src={selected.image} alt='' className='w-full aspect-square rounded-mlg border border-black' />
                  <div className='mt-4 trailer-font font-black text-[40px] leading-[52px] uppercase'>
                    {selected.name}
                  </div>
                  <div className='font-semibold text-lg line-clamp-4'>
                    {locale == 'vn' ? selected.descriptionvn : selected.description}
                  </div>
                  <div className='flex gap-3 items-center font-semibold text-lg mt-4'>
                    <Image src={selected.flag} alt='' className='h-6 w-auto rounded-sm' />
                    <span className='text-[#2D72FB]'>
                      <Link href={`https://x.com/${selected.owner}`} target='_blank'>
                        @{selected.owner}
                      </Link>
                    </span>
                  </div>
                </div>
                <div className='card-back grid place-items-center rounded-mlg bg-[#3b86f7]'>
                  <Image src={Logo} alt='' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-10 gap-y-[22px] pr-9 max-h-[666px] overflow-auto pudgy-scrollbar'>
            {pudgyData.map((data, index) => (
              <div
                className='cursor-pointer'
                key={index}
                onClick={() => {
                  if (selected.name != data.name) {
                    animate(
                      '.card-inner',
                      { transform: ['rotateY(180deg)', 'rotateY(360deg)', 'rotateY(0deg)'] },
                      { duration: 1, times: [0.5, 1, 1], ease: 'linear' }
                    )
                    setSelectedPudgy(data)
                    setTimeout(() => setSelected(data), 500)
                  }
                }}>
                <div className='relative'>
                  <Image src={data.image} alt='' className='w-full aspect-square rounded-mlg border border-black' />
                  {selectedPudgy.name == data.name && (
                    <div className='absolute inset-0 rounded-mlg border-[3px] border-text-info-primary'></div>
                  )}
                </div>
                <div className='mt-4 trailer-font font-black text-lg uppercase'>{data.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='pt-24 pk-container xl:hidden'>
        <div className='uppercase text-white text-center w-full drop-shadow-[2px_2px_0px_#000] trailer-font text-[36px] leading-[48px] font-black text-stroke'>
          Pudgy friends
        </div>
        <div className='mt-11 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-4 gap-y-2.5'>
          {pudgyData.slice((page - 1) * 10, page * 10).map((data, index) => (
            <Pudgy data={data} key={index} />
          ))}
        </div>
        <div className='flex justify-center mt-11'>
          <Pagination
            className='[&_.Mui-selected]:!bg-[#FABA77] [&_.Mui-selected]:!text-text-primary '
            shape='rounded'
            count={Math.ceil(pudgyData.length / 10)}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </div>
      </div>
    </>
  )
}
const Pudgy = ({ data }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='cursor-pointer' onClick={() => setOpen(true)}>
        <Image src={data.image} alt='' className='w-full aspect-square rounded-mlg border border-black' />
        <div className='mt-4 trailer-font font-black text-lg uppercase'>{data.name}</div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        hideClose
        preventClickOutsideToClose
        className='[&_.static]:overflow-visible'>
        <div className='flex flex-col items-center gap-6 p-4 text-text-primary relative'>
          <div className='w-full'>
            <Image
              src={data.image}
              alt=''
              className='w-full aspect-[312/342] max-w-md mx-auto rounded-mlg border border-black'
            />
            <div className='mt-4 trailer-font font-black text-[40px] leading-[52px] uppercase'>{data.name}</div>
            <div className='font-semibold text-lg'>{data.description}</div>
            <div className='flex gap-3 items-center font-semibold text-lg mt-4'>
              <Image src={data.flag} alt='' className='h-6 w-auto rounded-sm' />
              <Link href={`https://x.com/${data.owner}`} target='_blank'>
                @{data.owner}
              </Link>
            </div>
          </div>
          <div className='absolute -bottom-20 left-1/2 -translate-x-1/2' onClick={() => setOpen(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
              <path
                d='M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z'
                fill='white'
              />
              <path d='M32 16L16 32M32 32L16 16' stroke='#6D6D6D' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
          </div>
        </div>
      </Modal>
    </>
  )
}
