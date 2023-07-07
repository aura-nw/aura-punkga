import React, { memo, useMemo } from "react"

const withFlashAnimation = (InactiveComponent: any, ActiveComponent: any) => (props: any) => {
  if (props.active) {
    return (
      <span className="relative">
        <ActiveComponent className={`animate-flash absolute h-full w-full`} />
        <ActiveComponent />
      </span>
    )
  }
  return <InactiveComponent />
}

function FlashAnimationElement({ ActiveComponent, InactiveComponent, active }: any) {
  const Element = withFlashAnimation(InactiveComponent, ActiveComponent)
  return <Element active={active} />
}
export default function FlashAnimation(props: any) {
  return useMemo(() => <FlashAnimationElement {...props} />, [props.active])
}
