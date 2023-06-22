interface IButton {
  children: JSX.Element | string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export const buttonClasses = "flex items-center justify-center h-fit"
export default function Button({ children, size = "md", onClick }: IButton) {
  const classes = {
    md: `text-[16px] leading-[20px]`,
    lg: `text-[20px] leading-[25px] font-bold pt-[10px] pb-[13px]`,
  }
  return (
    <button onClick={onClick} className={classes[size]}>
      {children}
    </button>
  )
}
