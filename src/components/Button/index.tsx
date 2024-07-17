interface IButton {
  children: JSX.Element | string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

export const buttonClasses = 'flex items-center justify-center h-fit'
export default function Button({ children, size = 'md', onClick, className }: IButton) {
  const classes = {
    sm: `text-[14px] leading-[20px] font-bold`,
    md: `text-[16px] leading-[20px]`,
    lg: `text-[20px] leading-[25px] font-bold pt-[10px] pb-[13px]`,
  }
  return (
    <button onClick={onClick} className={`text-text-primary ${classes[size]} ${className}`}>
      {children}
    </button>
  )
}
