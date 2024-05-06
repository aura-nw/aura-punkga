import Spinner from 'components/Spinner'
import Image, { StaticImageData } from 'next/image'
import React, { MouseEvent } from 'react'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonStyle = 'primary' | 'secondary' | 'outline'

interface MainButtonProps {
  children?: JSX.Element | string
  size?: ButtonSize
  style?: ButtonStyle
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  buttonRef?: any
  leadingIcon?: string | StaticImageData
  trailingIcon?: string | StaticImageData
  iconOnly?: string | StaticImageData
  className?: string
  hasAvatar?: boolean
  loading?: boolean
}

const MainButton: React.FC<MainButtonProps> = ({
  children,
  size = 'medium',
  style = 'primary',
  disabled = false,
  onClick,
  buttonRef,
  leadingIcon,
  trailingIcon,
  iconOnly,
  className,
  hasAvatar = false,
  loading,
}) => {
  const getButtonStyleClasses = (): string => {
    switch (style) {
      case 'primary':
        return `bg-primary-color hover:bg-[#74EFA9] !focus:bg-medium-green border-second-color border-b-4 focus:border-b-0 focus:border-t-4 text-[#414141] ${disabled ? '!bg-light-medium-gray !text-medium-gray !border-b-2 !border-medium-gray' : ''
          }`
      case 'secondary':
        return `bg-light-medium-gray hover:bg-[#F0F0F0] !focus:bg-light-medium-gray border-medium-gray hover:border-light-medium-gray focus:border-medium-gray border-b-4 focus:border-b-0 focus:border-t-4 text-second-color ${disabled ? '!bg-light-medium-gray !text-medium-gray !border-b-2 !border-medium-gray' : ''
          }`
      case 'outline':
        return `bg-white border-light-medium-gray hover:border-medium-gray !focus:border-medium-gray border-[1px] text-medium-gray focus:text-light-medium-gray ${disabled ? '!text-light-medium-gray !border-light-medium-gray' : ''
          }`
      default:
        return `bg-primary-color hover:bg-[#74EFA9] !focus:bg-medium-green border-second-color border-b-4 focus:border-b-0 focus:border-t-4 text-[#414141] ${disabled ? '!bg-light-medium-gray !text-medium-gray border-b-2 !border-medium-gray' : ''
          }`
    }
  }

  const getButtonSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return `py-1 px-4 text-sm ${iconOnly ? `!px-2 !py-2` : ``}`
      case 'medium':
        return `py-2 px-4 text-base ${iconOnly ? `!px-3 !py-3` : ``}`
      case 'large':
        return `py-[10px] px-4 text-lg ${iconOnly ? `!px-3 !py-3` : ``}`
      default:
        return `py-2 px-4 text-base ${iconOnly ? `!px-3 !py-3` : ``}`
    }
  }

  const getOutlineButtonSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return `py-2 px-4 text-sm ${iconOnly ? `!px-[6px] !py-[6px]` : ``}`
      case 'medium':
        return `py-[10px] px-4 text-base ${iconOnly ? `!px-[10px] !py-[10px]` : ``}`
      case 'large':
        return `py-[12px] px-4 text-lg ${iconOnly ? `!px-3 !py-3` : ``}`
      default:
        return `py-[10px] px-4 text-base ${iconOnly ? `!px-[10px] !py-[10px]` : ``}`
    }
  }

  const getIconStyleClasses = (): string => {
    switch (style) {
      case 'primary':
        return `${hasAvatar ? 'rounded-full object-cover aspect-square' : ''}`
      case 'secondary':
        return `${hasAvatar ? 'rounded-full object-cover aspect-square' : ''}`
      case 'outline':
        return `${hasAvatar ? 'rounded-full object-cover aspect-square' : ''}`
      default:
        return `${hasAvatar ? 'rounded-full object-cover aspect-square' : ''}`
    }
  }

  const buttonStyleClasses = getButtonStyleClasses()
  const buttonSizeClasses = getButtonSizeClasses()
  const outlineButtonSizeClasses = getOutlineButtonSizeClasses()
  const iconStyleClasses = getIconStyleClasses()

  return (
    <button
      ref={buttonRef}
      className={`flex items-center justify-center ${buttonStyleClasses} ${style === 'outline' ? outlineButtonSizeClasses : buttonSizeClasses} font-bold rounded-lg gap-2 ${className}`}
      disabled={disabled}
      onClick={onClick}>
      {leadingIcon && children && (
        <span className='leading-icon'>
          <Image
            color={'#414141'}
            className={iconStyleClasses}
            width={size === 'large' ? 24 : 18}
            height={size === 'small' ? 24 : 18}
            src={leadingIcon}
            alt=''
          />
        </span>
      )}
      {iconOnly && !children && (
        <span className='icon-only'>
          <Image
            className={iconStyleClasses}
            width={size === 'large' ? 24 : 18}
            height={size === 'small' ? 24 : 18}
            src={iconOnly}
            alt=''
          />
        </span>
      )}
      {loading && <span
        className={`transition-all duration-300 pointer-events-none inline-block ${size == 'large' ? 'w-6 h-6' : size == 'small' ? 'w-3 h-3' : 'w-5 h-5'} opacity-100 mr-2`}>
        <Spinner
          className={`border-[#84CCA3] ${size == 'large' ? 'h-[25px] w-[25px]' : size == 'small' ? 'h-3 w-3 border-[2px]' : 'h-4 w-4'
            }`}
        />
      </span>}

      {children && !loading && !iconOnly && <span>{children}</span>}
      {trailingIcon && children && (
        <span className='trailing-icon'>
          <Image
            className={iconStyleClasses}
            width={size === 'large' ? 24 : 18}
            height={size === 'small' ? 24 : 18}
            src={trailingIcon}
            alt=''
          />
        </span>
      )}
    </button>
  )
}

export default MainButton
