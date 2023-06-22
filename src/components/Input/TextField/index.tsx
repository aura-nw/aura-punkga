interface ITextField {
  placeholder?: string;
  leadingComponent?: JSX.Element;
  trailingComponent?: JSX.Element;
  size?: "sm" | "md" | "lg";
  bgColor?: "bg-light-gray" | "bg-white";
}
export default function TextField({
  placeholder,
  leadingComponent,
  trailingComponent,
  size = "md",
  bgColor = "bg-white",
}: ITextField) {
  if (size == "lg") {
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
          className={`${bgColor} rounded-[20px] w-full p-[13px] placeholder-medium-gray focus:outline-none ${
            leadingComponent ? "pl-[50px]" : ""
          }`}
          placeholder={placeholder}
        ></input>
      </div>
    );
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
          type="text"
          id="input-group-1"
          className={`${bgColor} rounded-[12px] w-full px-[13px] py-[3px] placeholder-medium-gray focus:outline-none ${
            leadingComponent ? "pl-10" : ""
          }`}
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
        type="text"
        id="input-group-1"
        className={`${bgColor} rounded-[12px] w-full px-[10px] py-[8px] placeholder-medium-gray focus:outline-none ${
          leadingComponent ? "pl-[45px]" : ""
        }`}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
