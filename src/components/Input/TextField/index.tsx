interface ITextField {
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  size?: "sm" | "md" | "lg"
  className?: string
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  onChange?: (value: string) => void
  value?: string
  inputref?: any
}
export default function TextField({
  placeholder,
  leadingComponent,
  trailingComponent,
  size = "md",
  className = "bg-white",
  onFocus,
  onBlur,
  onChange,
  value,
  inputref,
}: ITextField) {
  if (size == "lg") {
    return (
      <div className={`relative w-full  rounded-[20px] ${className}`}>
        {leadingComponent && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]">
            {leadingComponent}
          </div>
        )}
        <input
          ref={inputref}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={(event) => onChange && onChange(event.target.value)}
          type="text"
          id="input-group-1"
          className={`bg-transparent rounded-[20px] w-full p-[13px] placeholder-medium-gray focus:outline-none ${
            leadingComponent ? "pl-[50px]" : ""
          } ${trailingComponent ? "pr-[45px]" : ""} `}
          placeholder={placeholder}></input>
        {trailingComponent && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center p-[13px] max-w-[50px]">
            {trailingComponent}
          </div>
        )}
      </div>
    )
  }
  if (size == "sm") {
    return (
      <div className="relative w-full h-fit">
        {leadingComponent && (
          <div className="pointer-events-none absolute top-[3px] left-[13px] flex items-center justify-center w-6 h-6">
            {leadingComponent}
          </div>
        )}
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          id="input-group-1"
          className={` rounded-[12px] w-full px-[13px] py-[3px] placeholder-medium-gray focus:outline-none ${
            leadingComponent ? "pl-10" : ""
          } ${className}`}
          placeholder={placeholder}></input>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {leadingComponent && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]">
          {leadingComponent}
        </div>
      )}
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        id="input-group-1"
        className={` rounded-[12px] w-full px-[10px] py-[8px] placeholder-medium-gray focus:outline-none ${
          leadingComponent ? "pl-[45px]" : ""
        } ${className}`}
        placeholder={placeholder}></input>
    </div>
  )
}
