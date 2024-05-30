import React, { memo, useMemo } from 'react'

const withFlashAnimation = (InactiveComponent: any, ActiveComponent: any, className?: any) => (props: any) => {
  if (props.active) {
    return (
      <span className={`relative ${className}`}>
        <ActiveComponent className={`animate-flash absolute h-full w-full`} />
        <ActiveComponent />
      </span>
    )
  }
  return (
    <span className={`relative ${className}`}>
      <InactiveComponent />
    </span>
  )
}

function FlashAnimationElement({ ActiveComponent, InactiveComponent, active, className }: any) {
  const Element = withFlashAnimation(InactiveComponent, ActiveComponent, className)
  return <Element active={active} />
}
export default function FlashAnimation(props: any) {
  return useMemo(() => <FlashAnimationElement {...props} />, [props.active])
}
