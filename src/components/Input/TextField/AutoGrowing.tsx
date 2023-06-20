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
        contentEditable={true}
        className="whitespace-pre-wrap break-words bg-white min-h-[32px] w-full focus:outline-none text-[16px] leading-[20px] px-[10px] py-[5px] rounded-[12px] border-[1px] border-solid border-medium-gray"></div>
    </div>
  )
}
