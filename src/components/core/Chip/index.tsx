import { ReactNode } from 'react'

export default function Chip({
  children,
  color = 'default',
  onClick,
}: {
  children: ReactNode | JSX.Element
  color: 'success' | 'warning' | 'error' | 'process' | 'default'
  onClick?: () => any
}) {
  const colorCn = {
    success: 'text-text-success-primary',
    warning: 'text-text-warning-primary-2',
    error: 'text-text-error-primary-3',
    process: 'text-text-info-primary',
    default: 'text-text-teriary',
  }
  return (
    <div onClick={onClick} className={`text-center text-sm font-medium leading-5`}>
      {children}
    </div>
  )
}
