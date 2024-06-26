import Spinner from 'components/Spinner'
import { buttonClasses } from '..'

interface IFilledButton {
  children: JSX.Element | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onClick?: (event: any) => void
  disabled?: boolean
  loading?: boolean
  className?: string
  id?: string
  buttonRef?: any
  isGray?: boolean
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
  isGray,
}: IFilledButton) {
  const classes = {
    xs: `${buttonClasses} border-b-4 ${isGray ? 'border-[#ABABAB]' : 'border-[#1FAB5E]'} text-[12px] leading-[15px] font-medium px-[8px] py-[1px] ${isGray ? 'bg-[#DEDEDE]' : 'bg-primary-color'} rounded-[5px]  whitespace-nowrap`,
    sm: `${buttonClasses} border-b-4 ${isGray ? 'border-[#ABABAB]' : 'border-[#1FAB5E]'} text-[14px] leading-[17.5px] font-bold px-[18px] pt-[4px] pb-[4px] ${isGray ? 'bg-[#DEDEDE]' : 'bg-primary-color'} rounded-[12px]  whitespace-nowrap`,
    md: `${buttonClasses} border-b-4 ${isGray ? 'border-[#ABABAB]' : 'border-[#1FAB5E]'} text-[16px] md:[&>span]:min-h-[24px] [&>span]:min-h-[20px] leading-[20px] font-bold px-6 md:px-[12px] md:pt-[5px] pt-[8px] md:pb-[5px] pb-[10px] ${isGray ? 'bg-[#DEDEDE]' : 'bg-primary-color'} rounded-[20px] md:rounded-[12px]  whitespace-nowrap`,
    lg: `${buttonClasses} border-b-4 ${isGray ? 'border-[#ABABAB]' : 'border-[#1FAB5E]'} text-[20px] h-[48px] leading-[25px] font-bold px-[16px] pt-[10px] pb-[13px] ${isGray ? 'bg-[#DEDEDE]' : 'bg-primary-color'} rounded-[12px]  whitespace-nowrap`,
  }
  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      id={id}
      onClick={onClick}
      className={`${classes[size]} ${
        (disabled || loading) && '!bg-light-green text-[#84CCA3] border-[#30BB68] cursor-no-drop pointer-events-none'
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
