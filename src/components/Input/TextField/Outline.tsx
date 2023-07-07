interface IOutlineTextField {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  size?: "sm" | "md" | "lg"
  className?: string
  label?: string
  type?: string
  errorMsg?: string
}
export default function OutlineTextField({
  value,
  onChange,
  placeholder,
  leadingComponent,
  trailingComponent,
  size = "md",
  className = "",
  label,
  type = "text",
  errorMsg,
}: IOutlineTextField) {
  return (
    <div>
      {label && <p className="leading-6 font-medium">{label}</p>}
      <div className="relative w-full">
        {leadingComponent && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]">
            {leadingComponent}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange && onChange(event.target.value)}
          id="input-group-1"
          className={`bg-white rounded-[12px] w-full px-[10px] py-[8px] placeholder-medium-gray focus:outline-none border border-solid border-medium-gray ${
            leadingComponent ? "pl-[45px]" : ""
          } ${className}`}
          placeholder={placeholder}></input>
      </div>
      {typeof errorMsg == "undefined" ? (
        <></>
      ) : (
        <p className="leading-6 font-medium text-medium-red text-xs min-h-[24px]">{errorMsg || ""}</p>
      )}
    </div>
  )
}
