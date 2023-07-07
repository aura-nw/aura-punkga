import Spinner from "components/Spinner"
import { buttonClasses } from ".."

interface IFilledButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
}
export default function FilledButton({
  children,
  size = "md",
  onClick,
  fullWidth,
  disabled,
  className,
  loading,
}: IFilledButton) {
  const classes = {
    md: `${buttonClasses} text-[16px] leading-[20px] font-bold px-[16px] pt-[5px] pb-[9px] bg-primary-color rounded-[12px] ${
      fullWidth ? "w-full" : "w-max"
    } whitespace-nowrap`,
    lg: `${buttonClasses} text-[20px] leading-[25px] font-bold px-[32px] pt-[10px] pb-[13px] bg-primary-color rounded-[20px] ${
      fullWidth ? "w-full" : "w-max"
    } whitespace-nowrap`,
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${classes[size]} ${
        (disabled || loading) && "!bg-light-green text-[#84CCA3] cursor-no-drop"
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
