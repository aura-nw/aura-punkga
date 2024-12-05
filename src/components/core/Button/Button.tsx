import React, { ButtonHTMLAttributes } from 'react'
import Image, { StaticImageData } from 'next/image'
import Spinner from 'components/Spinner'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type ButtonVariant = 'filled' | 'outlined'
type ButtonColor = 'green' | 'dark' | 'neutral'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
  color?: ButtonColor
  leadingIcon?: string | StaticImageData
  trailingIcon?: string | StaticImageData
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  size = 'lg',
  variant = 'filled',
  color = 'green',
  children,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  loading = false,
  ...props
}) => {
  const getSizeClasses = (): string => {
    switch (size) {
      case 'xs':
        return 'text-xs px-2 py-[5px] leading-[18px] gap-0.5'
      case 'sm':
        return 'text-sm px-[10px] py-[10px] gap-1'
      case 'md':
        return 'text-sm px-3 py-3 gap-1'
      case 'lg':
        return 'text-md px-[15px] py-3 gap-[6px]'
      case 'xl':
        return 'text-lg px-[18px] py-[15px] gap-[6px]'
      case '2xl':
        return 'text-xl px-[18px] py-4 gap-[6px]'
      default:
        return 'text-sm px-3 py-3 gap-1'
    }
  }

  const getIconSize = (): number => {
    switch (size) {
      case 'xs':
        return 12
      case 'sm':
        return 16
      case 'md':
        return 20
      case 'lg':
        return 24
      case 'xl':
        return 24
      case '2xl':
        return 24
      default:
        return 24
    }
  }

  const getVariantClasses = (): string => {
    const baseClasses = 'transition-colors duration-300 border-[1px] w-fit'
    if (variant === 'filled') {
      if (color === 'green') {
        return `${baseClasses} bg-[#00E160] border-[#00E160] text-[#0B0B0B]
                hover:bg-[#2BFD84] hover:border-[#2BFD84]
                focus:bg-[#00C04D] focus:border-[#00C04D]
                disabled:bg-[#B0B0B0] disabled:border-[#B0B0B0]`
      }
      if (color === 'neutral') {
        return `${baseClasses} text-text-primary-on-brand bg-neutral-100 border-neutral-100
              hover:bg-neutral-50 hover:border-neutral-50
              focus:bg-neutral-white focus:border-neutral-white
              disabled:bg-neutral-300 disabled:border-neutral-300`
      }
      return `${baseClasses} bg-[#183442] border-gray-800 text-[#F6F6F6]
              hover:bg-[#3D5059] hover:border-[#3D5059]
              focus:bg-[#0A161C] focus:border-[#0A161C]
              disabled:bg-[#B0B0B0] disabled:border-[#B0B0B0]`
    } else {
      if (color === 'dark') {
        return `${baseClasses} bg-transparent border-[#183442] text-[#183442]
                hover:text-[#3D5059] hover:border-[#183442]
                focus:text-[#0A161C] focus:border-[#0A161C]
                disabled:border-[#B0B0B0] disabled:text-[#B0B0B0]`
      }
      if (color === 'neutral') {
        return `${baseClasses} bg-transparent border-neutral-100 text-neutral-100
              hover:text-neutral-50 hover:border-neutral-50
              focus:text-neutral-white focus:border-neutral-white
              disabled:border-neutral-300 disabled:text-neutral-300`
      }
      return `${baseClasses} bg-transparent border-[#009640] text-[#009640]
              hover:text-[#00E160] hover:border-[#00E160]
              focus:text-[#00C04D] focus:border-[#00C04D]
              disabled:border-[#B0B0B0] disabled:text-[#B0B0B0]`
    }
  }

  const sizeClasses = getSizeClasses()
  const variantClasses = getVariantClasses()
  const iconSize = getIconSize()

  return (
    <button
      className={`flex items-center justify-center font-semibold rounded-lg ${sizeClasses} ${variantClasses} ${className} disabled:cursor-not-allowed`}
      disabled={disabled || loading}
      {...props}>
      { leadingIcon && !loading && (
        <span className='inline-flex items-center justify-center'>
          <Image src={leadingIcon} alt='Leading icon' width={iconSize} height={iconSize} />
        </span>
      )}
      {loading ? (
        <div className='relative'>
          <div className='absolute inset-0 grid place-items-center'>
            <Spinner size={iconSize} color={'#F6F6F6'} />
          </div>
          <span className='px-1 opacity-0'>{children}</span>
        </div>
      ) : (
        <span className='px-1'>{children}</span>
      )}
      { trailingIcon && !loading && (
        <span className='inline-flex items-center justify-center'>
          <Image src={trailingIcon} alt='Trailing icon' width={iconSize} height={iconSize} />
        </span>
      )}
    </button>
  )
}

export default Button
