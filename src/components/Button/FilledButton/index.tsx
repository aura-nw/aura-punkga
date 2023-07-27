import Spinner from 'components/Spinner'
import { buttonClasses } from '..'

interface IFilledButton {
  children: JSX.Element | string
  size?: 'sm' | 'md' | 'lg' | 'xs'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  id?: string
  buttonRef?: any
}
export default function FilledButton({
  children,
  size = 'md',
  onClick,
  disabled,
  className,
  loading,
  id,
  buttonRef,
}: IFilledButton) {
  const classes = {
    xs: `${buttonClasses} text-[12px] leading-[15px] font-bold px-[8px] pt-[2px] pb-[2px] bg-primary-color rounded-[5px]  whitespace-nowrap`,
    sm: `${buttonClasses} text-[14px] leading-[17.5px] font-bold px-[18px] pt-[4px] pb-[4px] bg-primary-color rounded-[12px]  whitespace-nowrap`,
    md: `${buttonClasses} text-[16px] leading-[20px] font-bold px-[16px] pt-[5px] pb-[9px] bg-primary-color rounded-[12px]  whitespace-nowrap`,
    lg: `${buttonClasses} text-[20px] leading-[25px] font-bold px-[32px] pt-[10px] pb-[13px] bg-primary-color rounded-[20px]  whitespace-nowrap`,
  }
  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      id={id}
      onClick={onClick}
      className={`${classes[size]} ${
        (disabled || loading) && '!bg-light-green text-[#84CCA3] cursor-no-drop pointer-events-none'
      } ${className}`}>
      <span
        className={`transition-all duration-300 pointer-events-none ${
          loading ? `${size == 'lg' ? 'w-[25px]' : 'w-5'} opacity-100 mr-2` : 'w-0 h-0 opacity-0'
        }`}>
        <Spinner className={`border-[#84CCA3] ${size == 'lg' ? 'h-[25px] w-[25px]' : 'h-4 w-4'}`} />
      </span>
      <span>{children}</span>
    </button>
  )
}
