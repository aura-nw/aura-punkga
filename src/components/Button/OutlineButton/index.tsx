import Spinner from 'components/Spinner'
import { buttonClasses } from '..'

interface IOutlineButton {
  children: JSX.Element | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}
export default function OutlineButton({
  children,
  size = 'md',
  onClick,
  disabled,
  loading,
  className,
}: IOutlineButton) {
  const classes = {
    xs: `${buttonClasses} text-[12px] leading-[15px] font-bold px-[8px] py-[1px] border-[1px] border-second-color text-second-color border-solid rounded-[6px]`,
    sm: `${buttonClasses} text-[12px] leading-[15px] font-bold px-[8px] border-[1.5px] border-second-color text-second-color border-solid rounded-[6px]`,
    md: `${buttonClasses} text-[16px] [&>span]:min-h-[24px] leading-[20px] font-bold px-[14.5px] pt-[3.5px] pb-[3.5px] border-[1.5px] border-second-color text-second-color border-solid rounded-[12px]`,
    lg: `${buttonClasses} text-[20px] leading-[25px] font-bold px-[30px] pt-[7.5px] pb-[9.5px] border-[3px] border-second-color text-second-color border-solid rounded-[20px]`,
  }
  return (
    <button
      onClick={disabled ? () => {} : onClick}
      className={`${classes[size]} ${
        (disabled || loading) && 'opacity-60 cursor-no-drop pointer-events-none'
      } ${className}`}>
      {typeof loading != 'undefined' && (
        <span
          className={`transition-all duration-300 pointer-events-none overflow-hidden ${
            loading ? `${size == 'lg' ? 'h-[25px] w-[25px]' : 'w-5'} opacity-100 mr-2` : 'w-0 h-0 opacity-0'
          }`}>
          <Spinner className={`border-[#84CCA3] ${size == 'lg' ? 'h-[25px] w-[25px]' : 'h-4 w-4'}`} />
        </span>
      )}
      <span>{children}</span>
    </button>
  )
}
