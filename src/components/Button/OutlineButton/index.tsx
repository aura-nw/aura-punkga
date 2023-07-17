import Spinner from "components/Spinner"
import { buttonClasses } from ".."

interface IOutlineButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg" | "xl"
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}
export default function OutlineButton({
  children,
  size = "md",
  onClick,
  disabled,
  loading,
  className,
}: IOutlineButton) {
  const classes = {
    md: `${buttonClasses} text-[16px] leading-[20px] font-bold px-[14.5px] pt-[4.5px] pb-[7.5px] border-[1.5px] border-second-color text-second-color border-solid rounded-[12px]`,
    lg: `${buttonClasses} text-[20px] leading-[25px] font-bold px-[30px] pt-[8px] pb-[11px] border-[2px] border-second-color text-second-color border-solid rounded-[20px]`,
  }
  return (
    <button
      onClick={disabled ? () => {} : onClick}
      className={`${classes[size]} ${
        (disabled || loading) && "opacity-60 cursor-no-drop pointer-events-none"
      } ${className}`}>
      <span
        className={`transition-all duration-300 pointer-events-none ${
          loading ? `${size == "lg" ? "w-[25px]" : "w-5"} opacity-100 mr-2` : "w-0 opacity-0"
        }`}>
        <Spinner className={`border-[#84CCA3] ${size == "lg" ? "h-[25px] w-[25px]" : "h-4 w-4"}`} />
      </span>
      <span>{children}</span>
    </button>
  )
}
