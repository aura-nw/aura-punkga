import { ReactNode } from 'react'

export default function Chip({
  children,
  color,
  onClick
}: {
  children: ReactNode | JSX.Element
  color: 'success' | 'warning' | 'error' | 'process' | 'default'
  onClick?: () => any
}) {
  const colorCn = {
    success: ''
  }
  return <div onClick={onClick} className={`text-center text-sm font-medium leading-5 text-`}>
    {children}
  </div>
}
