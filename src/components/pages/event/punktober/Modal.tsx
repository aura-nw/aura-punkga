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
          className=''
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/70 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-2 items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
