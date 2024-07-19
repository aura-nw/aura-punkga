import { useEffect, useRef, useState } from "react"

interface IAutoGrowingTextField {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  r?: any
  onKeyDown?: any
  className?: string
  maxLength?: number
  placeholderClassName?: string // Add this line
}

export default function AutoGrowingTextField({
  value,
  onChange,
  placeholder,
  leadingComponent,
  trailingComponent,
  className,
  onKeyDown,
  r,
  maxLength,
  placeholderClassName, // Add this line
}: IAutoGrowingTextField) {
  const eRef = useRef<HTMLDivElement>(null)
  const ref = r || eRef

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (maxLength && event.currentTarget.innerText.length >= maxLength && !event.metaKey && !event.ctrlKey && event.key.length === 1) {
      event.preventDefault()
    }
    onKeyDown && onKeyDown(event)
  }

  return (
    <div
      ref={ref}
      data-placeholder={placeholder} // Use data attribute for placeholder text
      onKeyDown={handleKeyDown}
      contentEditable={true}
      className={`
        whitespace-pre-wrap break-words truncate hyphens-auto min-h-[26px] md:min-h-[32px] w-full 
        focus:outline-none text-[12px] leading-[20px] px-[10px] py-1 md:py-[7px] rounded-[8px] 
        border-[1.5px] border-solid border-[#D1D1D1]
        ${className}
        [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-text-quatenary !font-normal
        [&:empty]:before:pointer-events-none
        ${placeholderClassName}
      `}
    ></div>
  )
}