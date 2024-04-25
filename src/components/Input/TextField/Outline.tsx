import { CSSProperties, KeyboardEventHandler } from 'react'

interface IOutlineTextField {
  value?: string
  onChange?: (value: string) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  placeholder?: string
  leadingComponent?: JSX.Element
  trailingComponent?: JSX.Element
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
  type?: string
  errorMsg?: string
  disabled?: boolean
  inputRef?: any
  style?: CSSProperties
}
export default function OutlineTextField({
  value,
  onChange,
  placeholder,
  leadingComponent,
  trailingComponent,
  size = 'md',
  className = '',
  label,
  type = 'text',
  errorMsg,
  disabled,
  inputRef,
  onKeyDown,
  style,
}: IOutlineTextField) {
  return (
    <div className='w-full flex flex-col gap-1'>
      {label && <p className='leading-[18px] font-semibold text-sm text-[#414141]'>{label}</p>}
      <div className='relative w-full'>
        {leadingComponent && (
          <div className='absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]'>
            {leadingComponent}
          </div>
        )}
        <input
          autoComplete='one-time-code'
          ref={inputRef}
          type={type}
          value={value}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onChange={(event) => onChange && onChange(event.target.value)}
          style={style}
          id='input-group-1'
          className={`leading-[18px] text-sm rounded-[8px] w-full p-[10px] placeholder-medium-gray focus:outline-none border border-solid border-light-medium-gray ${
            leadingComponent ? 'pl-[45px]' : ''
          } ${trailingComponent ? 'pr-[45px]' : ''} ${
            disabled ? 'bg-light-medium-gray cursor-not-allowed' : 'bg-white'
          } ${className}`}
          placeholder={placeholder}></input>
        {trailingComponent && (
          <div className='absolute inset-y-0 right-0 flex items-center justify-center p-[10px]'>
            {trailingComponent}
          </div>
        )}
      </div>
      <p className='leading-[18px] text-sm text-[#F0263C] self-end min-h-[18px]'>{errorMsg || ''}</p>
    </div>
  )
}
