import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import Backdrop9 from '../assets/backdrop-9.svg'
import Backdrop10 from '../assets/backdrop-10.svg'
export default function Modal({ open, title, children }: any) {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={() => {}}>
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
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-2xl text-left shadow-[0px_20px_60px_0px_rgba(0,0,0,0.20)] transition-all sm:my-8'>
                <div
                  style={{ backgroundImage: `url(${Backdrop9.src})`, backgroundSize: '100% 100%' }}
                  className='w-[933px] h-[564px] font-atlantis px-7 pt-5'>
                  <div className='text-[#002D9D] drop-shadow-md text-3xl leading-[64px] text-center'>{title}</div>
                  <div
                    style={{ backgroundImage: `url(${Backdrop10.src})`, backgroundSize: '100% 100%' }}
                    className='w-[843px] h-[421px] grid place-items-center mt-2 text-white'>
                    <div>{children}</div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
