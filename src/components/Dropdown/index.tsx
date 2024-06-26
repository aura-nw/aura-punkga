import { Fragment, createContext, useContext, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import { useClickOutside } from 'src/hooks/useClickOutside'

const ControlContext = createContext<{ open: boolean; setOpen: (o: boolean) => void }>({
  open: false,
  setOpen: () => {},
})
export default function Dropdown({ children }) {
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef()
  useClickOutside(ref, () => setOpen(false))

  return (
    <ControlContext.Provider value={{ open, setOpen }}>
      <div className='relative' ref={ref}>
        {children}
      </div>
    </ControlContext.Provider>
  )
}
export function DropdownToggle({ children }) {
  const { open, setOpen } = useContext(ControlContext)
  return <div onClick={() => setOpen(!open)}>{children instanceof Function ? children(open) : children}</div>
}

export function DropdownMenu({
  customClass = '',
  children,
  closeOnClick,
}: {
  customClass?: string
  children: JSX.Element
  closeOnClick?: boolean
}) {
  const { open, setOpen } = useContext(ControlContext)
  return (
    <Transition
      show={open}
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      enter='transition ease-in duration-100'
      enterFrom='opacity-0'
      enterTo='opacity-100'>
      <div
        onClick={() => (closeOnClick ? setOpen(false) : null)}
        className={`${customClass} absolute z-50 mt-1 w-full min-w-fit whitespace-nowrap max-w-[300px] truncate rounded-[12px] overflow-auto bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.15)]`}>
        {children}
      </div>
    </Transition>
  )
}
