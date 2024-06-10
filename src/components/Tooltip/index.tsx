import { ReactNode } from 'react'

export default function Tooltip({
  children,
  label,
  className,
}: {
  children: JSX.Element | ReactNode
  label: string | JSX.Element
  className?: string
}) {
  return (
    <div className={`relative ${className} cursor-pointer [&:hover>.tooltip]:block`}>
      {children}
      <div className='absolute bottom-full left-1/2 -translate-x-1/2 rounded-xl bg-[#f2f2f2] px-3 py-1 mb-2 text-xs tooltip hidden whitespace-nowrap font-normal'>
        {label}
      </div>
    </div>
  )
}
