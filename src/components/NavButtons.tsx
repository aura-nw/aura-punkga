export function LeftButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className='rounded-full w-8 h-8 grid place-items-center cursor-pointer bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-border-primary hover:text-border-brand-hover active:text-border-brand-focus'>
      <svg xmlns='http://www.w3.org/2000/svg' width='7' height='12' viewBox='0 0 7 12' fill='none'>
        <path d='M6 11L1 6L6 1' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </div>
  )
}

export function RightButton({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className='rounded-full w-8 h-8 grid place-items-center cursor-pointer bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-border-primary hover:text-border-brand-hover active:text-border-brand-focus'>
      <svg xmlns='http://www.w3.org/2000/svg' width='7' height='12' viewBox='0 0 7 12' fill='none'>
        <path d='M1 1L6 6L1 11' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </div>
  )
}
