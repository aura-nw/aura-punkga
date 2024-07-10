import { ReactNode } from 'react'

export default function Chip({
  children,
  color = 'default',
  size = 'md',
  onClick,
  className,
}: {
  children: ReactNode | JSX.Element
  color?: 'success' | 'warning' | 'error' | 'process' | 'default'
  size?: 'md' | 'sm'
  onClick?: () => any
  className?: string
}) {
  const colorCn = {
    success: 'text-text-success-primary bg-emerald-200',
    warning: 'text-text-warning-primary-2 bg-carot-200',
    error: 'text-text-error-primary-3 bg-red-200',
    process: 'text-text-info-primary bg-info-200',
    default: 'text-text-teriary border border-border-primary !px-[5px] !py-[1px]',
  }
  const sizeCn = {
    md: ''
  }
  return (
    <div
      onClick={onClick}
      className={`text-center text-sm font-medium leading-5 px-1.5 py-0.5 min-w-[69px] rounded ${colorCn[color]} ${
        sizeCn[size]
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}
