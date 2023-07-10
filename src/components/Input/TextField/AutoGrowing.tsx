import { useEffect, useRef } from "react"

interface IAutoGrowingTextField {
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
}
export default function AutoGrowingTextField({
  defaultValue,
  onChange,
  placeholder,
  leadingComponent,
  trailingComponent,
}: IAutoGrowingTextField) {
  const ref = useRef()
  useEffect(() => {
    const element = ref.current as Element
    element.addEventListener("input", function (event) {
      onChange((event.target as any).innerText)
    })
    element.innerHTML = defaultValue || ""
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
