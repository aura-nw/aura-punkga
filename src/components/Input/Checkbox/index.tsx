export default function Checkbox({
  checked,
  onClick,
  label,
}: {
  checked?: boolean
  onClick?: () => void
  label?: string
}) {
  return (
    <div className={`text-sm font-medium cursor-pointer gap-3 flex items-center`} onClick={onClick}>
      <div className={`shrink-0`}>
        {checked ? (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM17.6629 8.91291C18.029 8.5468 18.029 7.9532 17.6629 7.58709C17.2968 7.22097 16.7032 7.22097 16.3371 7.58709L10.125 13.7992L7.66291 11.3371C7.2968 10.971 6.7032 10.971 6.33709 11.3371C5.97097 11.7032 5.97097 12.2968 6.33709 12.6629L9.46209 15.7879C9.8282 16.154 10.4218 16.154 10.7879 15.7879L17.6629 8.91291Z'
              fill='#10B970'
            />
          </svg>
        ) : (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='2.5' y='2.5' width='19' height='19' rx='1.5' fill='white' stroke='#D1D1D1' />
          </svg>
        )}
      </div>
      {label && <span className='whitespace-nowrap '>{label}</span>}
    </div>
  )
}
