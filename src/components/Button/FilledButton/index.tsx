interface IFilledButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}
export default function FilledButton({ children, size = "md", onClick }: IFilledButton) {
  const classes = {
    md: `flex items-center text-[16px] leading-[20px] font-bold px-[16px] pt-[5px] pb-[9px] bg-primary-color rounded-[12px] w-max whitespace-nowrap`,
    lg: `flex items-center text-[20px] leading-[25px] font-bold px-[32px] pt-[10px] pb-[13px] bg-primary-color rounded-[20px] w-max whitespace-nowrap`,
  }
  return (
    <button onClick={onClick} className={classes[size]}>
      {children}
    </button>
  )
}
