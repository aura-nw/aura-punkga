import { Popover as DefaultPopover, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useRef, useState } from 'react'
import { usePopper } from 'react-popper'

export default function Popover({
  children,
  popoverRender,
  freeMode,
}: {
  children: ReactNode
  popoverRender: (open: boolean) => ReactNode
  freeMode?: boolean
}) {
  const buttonRef = useRef<any>(null)
  const panelRef = useRef<any>(null)
  const [showing, setShowing] = useState(false)
  let timeout
  let { styles, attributes } = usePopper(
    buttonRef?.current,
    panelRef?.current,
    freeMode
      ? {}
      : {
          placement: 'bottom-start',
        }
  )
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
              <DefaultPopover.Panel
                ref={panelRef}
                className={`z-50 ${showing ? 'visible' : 'invisible'}`}
                style={styles.popper}
                {...attributes.popper}
                onMouseEnter={() => onMouseEnter(open)}
                onMouseLeave={() => onMouseLeave(open, close)}>
                {popoverRender(open)}
              </DefaultPopover.Panel>
            </div>
          </>
        )
      }}
    </DefaultPopover>
  )
}
