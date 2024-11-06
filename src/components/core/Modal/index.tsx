import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useRef } from 'react'

export default function Modal({
  open,
  setOpen,
  children,
  hideClose,
  preventClickOutsideToClose = true,
  className,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode | JSX.Element
  hideClose?: boolean
  preventClickOutsideToClose?: boolean
  className?: string
}) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className={`relative z-50 ${className}`}
        initialFocus={cancelButtonRef}
        onClose={preventClickOutsideToClose ? () => {} : setOpen}>
        <Transition.Child as='div'>
          <div className='fixed inset-0 bg-black/80 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='static transform overflow-hidden rounded-2xl text-white bg-[#2E2E2E] outline outline-[3px] outline-black text-left shadow-[0px_20px_60px_0px_rgba(0,0,0,0.20)] transition-all sm:my-8'>
                {!hideClose && (
                  <div
                    className='absolute z-50 right-3 top-3 cursor-pointer text-gray-600'
                    onClick={() => setOpen(false)}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M18 6.00005L6 18M5.99995 6L17.9999 18'
                        stroke='#6D6D6D'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
