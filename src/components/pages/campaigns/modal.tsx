import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useRef } from 'react'

export default function Modal({ open, setOpen, children, hideClose }: any) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-25'
          leave='ease-in duration-200'
          leaveFrom='opacity-25'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
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
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8'>
                {!hideClose && (
                  <div
                    className='absolute z-50 right-10 top-12 cursor-pointer text-gray-600'
                    onClick={() => setOpen(false)}>
                    <XMarkIcon className='w-7 h-7' />
                  </div>
                )}
                <div className='bg-[#f4f4f4] p-8 rounded-[10px] w-[656px]'>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
