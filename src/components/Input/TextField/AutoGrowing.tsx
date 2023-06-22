interface IAutoGrowingTextField {
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
}
export default function AutoGrowingTextField({
  placeholder,
  leadingComponent,
  trailingComponent,
}: IAutoGrowingTextField) {
  return (
    <div className="relative w-full">
      <div
        placeholder={placeholder}
        contentEditable={true}
        className="whitespace-pre-wrap break-words min-h-[32px] w-full focus:outline-none text-[12px] leading-[20px] px-[10px] py-[7px] rounded-[12px] border-[1px] border-solid border-medium-gray"></div>
    </div>
  )
}
