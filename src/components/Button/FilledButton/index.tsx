import Spinner from 'components/Spinner'
import { buttonClasses } from '..'

interface IFilledButton {
  children: JSX.Element | string
  size?: 'sm' | 'md' | 'lg' | 'xs'
  onClick?: (event: any) => void
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
    xs: `${buttonClasses} text-[12px] leading-[15px] font-medium px-[8px] pt-[2px] pb-[2px] bg-primary-color rounded-[5px]  whitespace-nowrap`,
    sm: `${buttonClasses} text-[14px] leading-[17.5px] font-bold px-[18px] pt-[4px] pb-[4px] bg-primary-color rounded-[12px]  whitespace-nowrap`,
    md: `${buttonClasses} text-[16px] md:[&>span]:min-h-[24px] [&>span]:min-h-[20px] leading-[20px] font-bold px-6 md:px-[16px] md:pt-[5px] pt-[8px] md:pb-[5px] pb-[10px] bg-primary-color rounded-[20px] md:rounded-[12px]  whitespace-nowrap`,
    lg: `${buttonClasses} text-[20px] h-[48px] leading-[25px] font-bold px-[32px] pt-[10px] pb-[13px] bg-primary-color rounded-[20px]  whitespace-nowrap`,
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
        className={`transition-all duration-300 pointer-events-none inline-block ${
          loading ? `${size == 'lg' ? 'w-6 h-6' : size == 'xs' ? 'w-3 h-3' : 'w-5 h-5'} opacity-100 mr-2` : 'w-0 h-0 opacity-0'
        }`}>
        <Spinner
          className={`border-[#84CCA3] ${
            size == 'lg' ? 'h-[25px] w-[25px]' : size == 'xs' ? 'h-3 w-3 border-[2px]' : 'h-4 w-4'
          }`}
        />
      </span>
      <span>{children}</span>
    </button>
  )
}
