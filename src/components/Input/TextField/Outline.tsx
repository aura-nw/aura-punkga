import { KeyboardEventHandler } from 'react'

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
}: IOutlineTextField) {
  return (
    <div>
      {label && <p className='leading-6 font-medium'>{label}</p>}
      <div className='relative w-full'>
        {leadingComponent && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center p-[13px] max-w-[50px]'>
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
          id='input-group-1'
          className={` rounded-[12px] w-full px-[10px] py-[8px] placeholder-medium-gray focus:outline-none border border-solid border-medium-gray ${
            leadingComponent ? 'pl-[45px]' : ''
          } ${trailingComponent ? 'pr-[45px]' : ''} ${
            disabled ? 'bg-light-medium-gray cursor-not-allowed' : 'bg-white'
          } ${className}`}
          placeholder={placeholder}></input>
        {trailingComponent && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center p-[13px] max-w-[50px]'>
            {trailingComponent}
          </div>
        )}
      </div>
      {typeof errorMsg == 'undefined' ? (
        <></>
      ) : (
        <p className='leading-6 font-medium text-red-600 text-xs min-h-[24px]'>{errorMsg || ''}</p>
      )}
    </div>
  )
}
