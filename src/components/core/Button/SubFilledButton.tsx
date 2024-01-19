import Spinner from 'components/Spinner'
import Link from 'next/link'

interface ISubFilledButton {
  children: JSX.Element | string
  size?: 'md'
  onClick?: (event: any) => void
  disabled?: boolean
  loading?: boolean
  className?: string
  id?: string
  buttonRef?: any
  href?: string
  target?: string
}
export default function SubFilledButton({
  children,
  size = 'md',
  onClick,
  disabled,
  className,
  loading,
  id,
  buttonRef,
  href,
  target,
}: ISubFilledButton) {
  const classes = {
    md: `h-fit text-second-color bg-[#DEDEDE] font-bold rounded-[20px] text-base leading-5 px-[24px] pt-[8px] pb-[10px] [&>span>div]:h-5 lg:text-[20px] lg:leading-[22px] lg:px-[32px] lg:pt-[12px] lg:pb-[14px]`,
  }
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        ref={buttonRef}
        id={id}
        className={`${classes[size]} ${
          (disabled || loading) && 'cursor-no-drop pointer-events-none'
        } flex items-center justify-center whitespace-nowrap ${className}`}>
        <span
          className={`transition-all duration-300 pointer-events-none inline-block ${
            loading ? `h-full aspect-square opacity-100 mr-2` : 'w-0 h-0 opacity-0'
          }`}>
          <Spinner className={`border-second-color aspect-square`} />
        </span>
        <span>{children}</span>
      </Link>
    )
  }
  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      id={id}
      onClick={onClick}
      className={`${classes[size]} ${
        (disabled || loading) && ' cursor-no-drop pointer-events-none'
      } flex items-center justify-center whitespace-nowrap ${className}`}>
      <span
        className={`transition-all duration-300 pointer-events-none inline-block ${
          loading ? `h-full aspect-square opacity-100 mr-2` : 'w-0 h-0 opacity-0'
        }`}>
        <Spinner className={`border-second-color aspect-square`} />
      </span>
      <span>{children}</span>
    </button>
  )
}
