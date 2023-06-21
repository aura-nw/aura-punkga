interface IFilledButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  fullWidth?: boolean
}
export default function FilledButton({ children, size = "md", onClick, fullWidth }: IFilledButton) {
  const classes = {
    md: `flex items-center justify-center text-[16px] leading-[20px] font-bold px-[16px] pt-[5px] pb-[9px] bg-primary-color rounded-[12px] ${
      fullWidth ? "w-full" : "w-max"
    } whitespace-nowrap`,
    lg: `flex items-center justify-center text-[20px] leading-[25px] font-bold px-[32px] pt-[10px] pb-[13px] bg-primary-color rounded-[20px] ${
      fullWidth ? "w-full" : "w-max"
    } whitespace-nowrap`,
  }
  return (
    <button onClick={onClick} className={classes[size]}>
      {children}
    </button>
  )
}
