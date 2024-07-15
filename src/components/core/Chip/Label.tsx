import { ReactNode } from 'react'

export default function LabelChip({
  children,
  color = 'default',
  size = 'md',
  onClick,
  className,
}: {
  children: ReactNode | JSX.Element
  color?: 'success' | 'error' | 'process' | 'default'
  size?: 'md'
  onClick?: () => any
  className?: string
}) {
  const colorCn = {
    success: 'text-text-brand-defaul bg-feedback-success-100',
    error: 'text-text-error-primary-3 bg-feedback-error-100',
    process: 'text-text-info-primary bg-feedback-info-link-100',
    default: 'text-text-daily-primary bg-violet-100',
  }
  const sizeCn = {
    md: 'px-2.5 py-0.5 text-xxs leading-[15px]',
  }
  return (
    <div
      onClick={onClick}
      className={`text-center w-fit font-semibold rounded ${colorCn[color]} ${sizeCn[size]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}>
      {children}
    </div>
  )
}
