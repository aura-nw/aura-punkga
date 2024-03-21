export default function Checkbox({ checked, onClick, label }) {
  return (
    <div className={`text-xs md:text-sm font-semibold cursor-pointer flex items-center`} onClick={onClick}>
      <div className={`mr-2 shrink-0`}>
        {checked ? (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z'
              fill='#1FAB5E'
            />
            <path
              d='M8.28033 11.7756C7.98744 11.4827 7.51256 11.4827 7.21967 11.7756C6.92678 12.0685 6.92678 12.5434 7.21967 12.8363L9.94202 15.5586C10.2349 15.8515 10.7098 15.8515 11.0027 15.5586L17.447 9.11431C17.7399 8.82142 17.7399 8.34655 17.447 8.05365C17.1541 7.76076 16.6792 7.76076 16.3863 8.05365L10.4724 13.9676L8.28033 11.7756Z'
              fill='white'
            />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <rect x='3.5' y='3.5' width='17' height='17' rx='3.5' stroke='#D8D8D8' />
          </svg>
        )}
      </div>
      {label && <span className='whitespace-nowrap'>{label}</span>}
    </div>
  )
}
