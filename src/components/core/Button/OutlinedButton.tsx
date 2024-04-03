import Spinner from 'components/Spinner'
import Link from 'next/link'

interface IOutlinedButton {
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
export default function OutlineButton({
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
}: IOutlinedButton) {
  const classes = {
    md: ` h-fit text-[#1FAB5E] font-bold rounded-[20px] border-[#1FAB5E] border-[2px] text-base leading-5 px-[22px] pt-[6px] pb-[6px] [&>span>div]:h-5 lg:text-[20px] lg:leading-[22px] lg:px-[30px] lg:pt-[10px] lg:pb-[12px]`,
  }
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        ref={buttonRef}
        id={id}
        className={`${classes[size]} ${loading && 'pointer-events-none'} ${
          disabled && 'pointer-events-none !bg-[#ABABAB] !text-[#DEDEDE]'
        } flex items-center justify-center whitespace-nowrap ${className}`}>
        <span
          className={`transition-all duration-300 pointer-events-none inline-block ${
            loading ? `h-full aspect-square opacity-100 mr-2` : 'w-0 h-0 opacity-0'
          }`}>
          <Spinner className={`border-black aspect-square`} />
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
      className={`${classes[size]} ${loading && 'pointer-events-none'} ${
        disabled && 'pointer-events-none !bg-[#ABABAB] !text-[#DEDEDE]'
      } flex items-center justify-center whitespace-nowrap ${className}`}>
      <span
        className={`transition-all duration-300 pointer-events-none inline-block ${
          loading ? `h-full aspect-square opacity-100 mr-2` : 'w-0 h-0 opacity-0'
        }`}>
        <Spinner className={`border-black aspect-square`} />
      </span>
      <span>{children}</span>
    </button>
  )
}
