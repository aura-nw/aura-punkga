interface IOutlineTextField {
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  size?: "sm" | "md" | "lg"
  bgColor?: "bg-light-gray" | "bg-white"
}
export default function OutlineTextField({
  placeholder,
  leadingComponent,
  trailingComponent,
  size = "md",
  bgColor = "bg-white",
}: IOutlineTextField) {
  return (
    <div className="relative w-full">
      {leadingComponent && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]">
          {leadingComponent}
        </div>
      )}
      <input
        type="text"
        id="input-group-1"
        className={`${bgColor} rounded-[12px] w-full px-[10px] py-[8px] placeholder-medium-gray focus:outline-none ${
          leadingComponent ? "pl-[45px]" : ""
        }`}
        placeholder={placeholder}></input>
    </div>
  )
}
