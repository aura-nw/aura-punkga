import { useEffect, useRef, useState } from "react"

interface IAutoGrowingTextField {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  r?: any
}
export default function AutoGrowingTextField({
  value,
  onChange,
  placeholder,
  leadingComponent,
  trailingComponent,
  r
}: IAutoGrowingTextField) {
  const eRef = useRef()
  const ref = r || eRef
  useEffect(() => {
    const element = ref.current as Element
    element.addEventListener("input", function (event) {
      onChange((event.target as any).innerText)
    })
  }, [])
  return (
    <div className="relative w-full">
      <div
        ref={ref}
        placeholder={placeholder}
        contentEditable={true}
        className="whitespace-pre-wrap break-words min-h-[32px] w-full focus:outline-none text-[12px] leading-[20px] px-[10px] py-[7px] rounded-[12px] border-[1px] border-solid border-medium-gray"></div>
    </div>
  )
}
