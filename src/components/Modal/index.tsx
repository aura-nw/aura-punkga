import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useRef } from 'react'

export default function Modal({ open, setOpen, children, hideClose }: any) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as='div'
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-70'
          leave='ease-in duration-200'
          leaveFrom='opacity-70'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-transparent transition-opacity' />
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
              <Dialog.Panel className='relative transform overflow-hidden rounded-2xl bg-white text-left shadow-[0px_20px_60px_0px_rgba(0,0,0,0.20)] transition-all sm:my-8'>
                {!hideClose && (
                  <div
                    className='absolute z-50 right-[15px] top-[15px] cursor-pointer text-gray-600'
                    onClick={() => setOpen(false)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      className='w-[14px] h-[14px]'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11.1541 13.5135C11.4788 13.8404 11.9057 14.0028 12.3327 14.0028C12.7574 14.0028 13.1866 13.8404 13.5113 13.5135C14.1629 12.862 14.1629 11.8079 13.5113 11.1563L9.3563 7.00041L13.5058 2.85087C14.1574 2.19929 14.1574 1.14521 13.5058 0.49363C12.8543 -0.157946 11.8002 -0.157946 11.1486 0.49363L6.9993 4.64293L2.84592 0.488682C2.19657 -0.162894 1.14248 -0.162894 0.488682 0.488682C-0.162894 1.14026 -0.162894 2.19435 0.488682 2.84592L4.64206 7.00017L0.492101 11.1501C-0.159476 11.8017 -0.159476 12.8558 0.492101 13.5074C0.816778 13.8343 1.24375 13.9966 1.67072 13.9966C2.09769 13.9966 2.52466 13.8343 2.84934 13.5074L6.99906 9.35765L11.1541 13.5135Z'
                        fill='#B4B8C0'
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
