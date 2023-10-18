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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1079'
                  height='130'
                  viewBox='0 0 1079 130'
                  fill='none'
                  className='w-full relative'>
                  <path
                    d='M1079 129.5H0V70.2843C0 64.9799 2.10714 59.8929 5.85787 56.1421L56.1421 5.85786C59.8929 2.10714 64.9799 0 70.2843 0H515.216C520.52 0 525.607 2.10714 529.358 5.85786L538.642 15.1421C542.393 18.8929 547.48 21 552.784 21H1025.72C1031.02 21 1036.11 23.1071 1039.86 26.8579L1073.14 60.1421C1076.89 63.8929 1079 68.9799 1079 74.2843V129.5Z'
                    fill='#F4F4F4'
                  />
                </svg>
                {!hideClose && (
                  <div
                    className='absolute z-50 right-10 top-12 cursor-pointer text-gray-600'
                    onClick={() => setOpen(false)}>
                    <XMarkIcon className='w-7 h-7' />
                  </div>
                )}
                <div className='bg-[#F4F4F4] -mt-1 -mb-10 relative z-10 px-14'>{children}</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1080'
                  height='176'
                  viewBox='0 0 1080 176'
                  fill='none'
                  className='w-full relative'>
                  <path
                    d='M0 0.146484H1080V113.646L1017.94 175.646H556.015L534.995 154.646H45.0417L0 109.646V0.146484Z'
                    fill='#F4F4F4'
                  />
                </svg>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
