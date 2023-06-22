import { buttonClasses } from ".."

interface ISubFilledButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  fullWidth?: boolean
}
export default function SubFilledButton({ children, size = "md", onClick, fullWidth }: ISubFilledButton) {
  const classes = {
    md: `${buttonClasses} text-[16px] leading-[20px] font-bold px-[16px] pt-[5px] pb-[9px] bg-light-gray text-second-color rounded-[12px] ${
      fullWidth ? "w-full" : "w-max"
    }  whitespace-nowrap`,
    lg: `${buttonClasses} text-[20px] leading-[25px] font-bold px-[32px] pt-[10px] pb-[13px] bg-light-gray text-second-color rounded-[20px] ${
      fullWidth ? "w-full" : "w-max"
    }  whitespace-nowrap`,
  }
  return (
    <button onClick={onClick} className={classes[size]}>
      {children}
    </button>
  )
}
