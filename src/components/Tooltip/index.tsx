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
    <div className={`relative ${className} cursor-pointer md:[&:hover>.tooltip]:block`}>
      {children}
      <div className='absolute hidden bottom-full left-1/2 -translate-x-1/2 rounded-md text-[#FDFDFD] bg-[#323339B2] px-4 py-2 mb-2 text-xxs tooltip whitespace-nowrap font-normal'>
        {label}
      </div>
    </div>
  )
}
