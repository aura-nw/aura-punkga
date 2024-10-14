import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useRef } from 'react'

export default function Modal({
  open,
  setOpen,
  children,
  className,
  title,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode | JSX.Element
  hideClose?: boolean
  className?: string
  title?: string
}) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className={`relative z-50 ${className}`} initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as='div'
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-70'
          leave='ease-in duration-200'
          leaveFrom='opacity-70'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/80 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-2 text-center items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='static max-w-[570px] transform p-8 pt-4 text-white overflow-hidden rounded-2xl bg-neautral-700 text-left shadow-[0px_20px_60px_0px_rgba(0,0,0,0.20)] transition-all sm:my-8'>
                <svg
                  width='207'
                  height='135'
                  viewBox='0 0 207 135'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-0 right-0'>
                  <path
                    d='M53.3262 0H0L56.5685 67.5L0 135H53.3262L109.895 67.5L53.3262 0Z'
                    fill='black'
                    fillOpacity='0.1'
                  />
                  <path
                    d='M149.484 0H96.1582L152.727 67.5L96.1582 135H149.484L206.053 67.5L149.484 0Z'
                    fill='black'
                    fillOpacity='0.1'
                  />
                </svg>
                <div className='flex justify-end absolute top-4 right-4 z-20'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => setOpen(false)}
                    className='cursor-pointer'>
                    <path d='M16 8L8 16M16 16L8 8' stroke='white' stroke-width='1.5' stroke-linecap='round' />
                  </svg>
                </div>
                {title && <div className='text-lg font-semibold w-full text-center relative my-4'>{title}</div>}
                <div className='relative'>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
