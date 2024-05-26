
interface ITextField {
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  onChange?: (value: string) => void
  value?: string
  type?: string
  inputref?: any,
  disabled?: boolean
}
export default function TextField({
  placeholder,
  leadingComponent,
  trailingComponent,
  size = 'md',
  className = 'bg-white',
  onFocus,
  onBlur,
  onChange,
  type = 'text',
  value,
  inputref,
  disabled
}: ITextField) {
  const ex = ['e', '-', '=', '*', '(', ')', '+', '.']
  if (size == 'lg') {
    return (
      <div className={`relative w-full flex rounded-[20px] ${className}`}>
        {leadingComponent && (
          <div className=' absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]'>
            {leadingComponent}
          </div>
        )}
        <input
          ref={inputref}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          type={type}
          disabled={disabled}
          onKeyDown={(event) => {
            if (type == 'number' && ex.includes(event.key)) {
              event.preventDefault()
              event.stopPropagation()
              return false
            }
          }}
          onChange={(event) => {
            onChange && onChange(event.target.value)
          }}
          id='input-group-1'
          className={`bg-transparent rounded-[20px] w-full p-[13px] placeholder-medium-gray focus:outline-none ${leadingComponent ? 'pl-[50px]' : ''
            } ${trailingComponent ? 'pr-[45px]' : ''} `}
          placeholder={placeholder}></input>
        {trailingComponent && (
          <div className=' absolute inset-y-0 right-0 flex items-center justify-center p-[13px] max-w-[50px]'>
            {trailingComponent}
          </div>
        )}
      </div>
    )
  }
  if (size == 'sm') {
    return (
      <div className='relative w-full flex'>
        {leadingComponent && (
          <div className=' absolute top-[2px] left-[10px] flex items-center justify-center w-5 h-5'>
            {leadingComponent}
          </div>
        )}
        <input
          onKeyDown={(event) => {
            if (type == 'number' && ex.includes(event.key)) {
              event.preventDefault()
              event.stopPropagation()
              return false
            }
          }}
          autoComplete='one-time-code'
          ref={inputref}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          type={type}
          disabled={disabled}
          onChange={(event) => onChange && onChange(event.target.value)}
          id='input-group-1'
          className={` rounded-[12px] text-base leading-6 w-full px-[13px] py-[2px] placeholder-medium-gray focus:outline-none ${leadingComponent ? 'pl-10' : ''
            } ${className}`}
          placeholder={placeholder}></input>
        {trailingComponent && (
          <div className=' absolute inset-y-0 right-[10px] flex items-center justify-center p-[13px] max-w-[50px]'>
            {trailingComponent}
          </div>
        )}
      </div>
    )
  }
  if (size == 'xs') {
    return (
      <div className='relative w-full flex'>
        {leadingComponent && (
          <div className=' absolute top-[2px] left-[10px] flex items-center justify-center w-5 h-5'>
            {leadingComponent}
          </div>
        )}
        <input
          onKeyDown={(event) => {
            if (type == 'number' && ex.includes(event.key)) {
              event.preventDefault()
              event.stopPropagation()
              return false
            }
          }}
          autoComplete='one-time-code'
          ref={inputref}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          type={type}
          disabled={disabled}
          onChange={(event) => onChange && onChange(event.target.value)}
          id='input-group-1'
          className={` rounded-[12px] text-xs leading-6 w-full px-[13px] placeholder-medium-gray focus:outline-none ${leadingComponent ? 'pl-10' : ''
            } ${className}`}
          placeholder={placeholder}></input>
      </div>
    )
  }

  return (
    <div className={`relative w-full flex rounded-[20px] ${className}`}>
      {leadingComponent && (
        <div className=' absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]'>
          {leadingComponent}
        </div>
      )}
      <input
        onKeyDown={(event) => {
          if (type == 'number' && ex.includes(event.key)) {
            event.preventDefault()
            event.stopPropagation()
            return false
          }
        }}
        autoComplete='one-time-code'
        ref={inputref}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        type={type}
        disabled={disabled}
        onChange={(event) => onChange && onChange(event.target.value)}
        id='input-group-1'
        className={`bg-transparent rounded-[12px] w-full px-[10px] py-[8px] placeholder-medium-gray focus:outline-none ${leadingComponent ? 'pl-[45px]' : ''
          } ${trailingComponent ? 'pr-[45px]' : ''} `}
        placeholder={placeholder}></input>
      {trailingComponent && (
        <div className=' absolute inset-y-0 right-0 flex items-center justify-center p-[13px] max-w-[50px]'>
          {trailingComponent}
        </div>
      )}
    </div>
  )
}
