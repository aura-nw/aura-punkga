import { buttonClasses } from ".."

interface IOutlineButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg" | "xl"
  onClick?: () => void
  disabled?: boolean
}
export default function OutlineButton({ children, size = "md", onClick, disabled }: IOutlineButton) {
  const classes = {
    md: `${buttonClasses} text-[16px] leading-[20px] font-bold px-[14.5px] pt-[4.5px] pb-[7.5px] border-[1.5px] border-second-color text-second-color border-solid rounded-[12px]`,
    lg: `${buttonClasses} text-[20px] leading-[25px] font-bold px-[30px] pt-[8px] pb-[11px] border-[2px] border-second-color text-second-color border-solid rounded-[20px]`,
  }
  return (
    <button onClick={disabled ? () => {} : onClick} className={`${classes[size]} ${disabled ?'opacity-60 cursor-not-allowed':''}`}>
      {children}
    </button>
  )
}
