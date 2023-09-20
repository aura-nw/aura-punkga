import { Popover as DefaultPopover, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useRef, useState } from 'react'
import { usePopper } from 'react-popper'

export default function Popover({
  children,
  popoverRender,
}: {
  children: ReactNode
  popoverRender: (open: boolean) => ReactNode
}) {
  const buttonRef = useRef<any>(null)
  const panelRef = useRef<any>(null)
  const [showing, setShowing] = useState(false)
  let timeout
  let { styles, attributes } = usePopper(buttonRef?.current, panelRef?.current, {
    placement: 'bottom-start',
  })

  const onMouseEnter = (open) => {
    clearTimeout(timeout)
    if (open) return
    timeout = setTimeout(() => {
      buttonRef.current?.click()
      setShowing(true)
    }, 400)
  }

  const onMouseLeave = (open, close) => {
    clearTimeout(timeout)
    if (!open) return
    timeout = setTimeout(() => {
      setShowing(false)
      close()
    }, 150)
  }

  return (
    <DefaultPopover className='relative'>
      {({ open, close }) => {
        return (
          <>
            <div onMouseLeave={() => onMouseLeave(open, close)}>
              <DefaultPopover.Button
                ref={buttonRef}
                as='div'
                onMouseEnter={() => onMouseEnter(open)}
                onMouseLeave={() => onMouseLeave(open, close)}>
                {children}
              </DefaultPopover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'>
                <DefaultPopover.Panel
                  ref={panelRef}
                  className={`z-50 ${showing ? 'visible' : 'invisible'}`}
                  style={styles.popper}
                  {...attributes.popper}
                  onMouseEnter={() => onMouseEnter(open)}
                  onMouseLeave={() => onMouseLeave(open, close)}>
                  {popoverRender(open)}
                </DefaultPopover.Panel>
              </Transition>
            </div>
          </>
        )
      }}
    </DefaultPopover>
  )
}
