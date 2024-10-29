import { ReactNode } from 'react'

export default function Chip({
  children,
  color = 'default',
  size = 'sm',
  variant = 'normal',
  hasLeading,
  onClick,
  className,
}: {
  children: ReactNode | JSX.Element
  color?: 'success' | 'warning' | 'error' | 'process' | 'default' | 'unknown'
  size?: 'md' | 'sm' | 'xs' | 'lg'
  variant?: 'normal' | 'skew' | 'ghost'
  onClick?: () => any
  className?: string
  hasLeading?: boolean
}) {
  const colorCn = {
    normal: {
      success: 'bg-brand-default text-black',
      warning: 'bg-feedback-warning-400 text-black',
      error: 'bg-feedback-error-300 text-black',
      process: 'bg-ribbon-300 text-black',
      default: 'bg-gray-white text-black',
      unknown: 'bg-gray-200 text-black',
    },
    ghost: {
      success: 'text-text-success-primary',
      warning: 'text-text-warning-primary-2',
      error: 'text-text-error-primary-3',
      process: 'text-text-info-primary',
      default: 'text-white',
      unknown: 'text-text-quatenary',
    },
    skew: {
      success: '-skew-x-12 [&>div]:skew-x-12 bg-brand-default text-black',
      warning: '-skew-x-12 [&>div]:skew-x-12 bg-feedback-warning-400 text-black',
      error: '-skew-x-12 [&>div]:skew-x-12 bg-feedback-error-300 text-black',
      process: '-skew-x-12 [&>div]:skew-x-12 bg-ribbon-300 text-black',
      default: '-skew-x-12 [&>div]:skew-x-12 bg-gray-white text-black',
      unknown: '-skew-x-12 [&>div]:skew-x-12 bg-gray-200 text-black',
    },
  }
  const sizeCn = {
    xs: 'text-[9px] leading-[14px] font-medium px-2.5 py-0.5 rounded',
    sm: 'text-[10px] leading-[15px] font-medium px-2.5 py-[2.5px] rounded',
    md: 'text-xs leading-[18px] font-medium px-2.5 py-0.5 rounded',
    lg: 'text-sm leading-[21px] font-medium px-2.5 py-0.5 rounded',
  }
  if (hasLeading) {
    return (
      <div className='grid grid-cols-[12px_1fr] gap-1.5'>
        <PlaceholderChip />
        <div
          onClick={onClick}
          className={`${colorCn[variant][color]} ${sizeCn[size]} w-fit ${
            onClick ? 'cursor-pointer' : ''
          } ${className}`}>
          <div className=''>{children}</div>
        </div>
      </div>
    )
  }
  return (
    <div
      onClick={onClick}
      className={`${colorCn[variant][color]} ${sizeCn[size]} w-fit ${onClick ? 'cursor-pointer' : ''} ${className}`}>
      <div className=''>{children}</div>
    </div>
  )
}
export const PlaceholderChip = () => {
  return <div className='h-full w-3 -skew-x-12 rounded bg-white'></div>
}
