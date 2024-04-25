import Image from 'next/image';
import React, { MouseEvent } from 'react';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonStyle = 'primary' | 'secondary' | 'outline';

interface MainButtonProps {
    children: JSX.Element | string
    size?: ButtonSize;
    style?: ButtonStyle;
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    leadingIcon?: string
    trailingIcon?: string
    iconOnly?: string
}

const MainButton: React.FC<MainButtonProps> = ({
    children,
    size = 'medium',
    style = 'primary',
    disabled = false,
    onClick,
    leadingIcon,
    trailingIcon,
    iconOnly,
}) => {

    const getButtonStyleClasses = (): string => {
        switch (style) {
            case 'primary':
                return `bg-primary-color hover:bg-[#74EFA9] focus:bg-medium-green border-second-color border-b-4 focus:border-b-0 focus:border-t-4 text-[#414141] ${disabled ? 'disabled:bg-light-medium-gray text-medium-gray border-b-2 border-medium-gray' : ''}`;
            case 'secondary':
                return `bg-light-medium-gray hover:bg-[#F0F0F0] focus:bg-light-medium-gray border-medium-gray hover:border-light-medium-gray focus:border-medium-gray border-b-4 focus:border-b-0 focus:border-t-4 text-second-color ${disabled ? 'disabled:bg-light-medium-gray text-medium-gray border-b-2 border-medium-gray' : ''}`;
            case 'outline':
                return `bg-white border-light-medium-gray hover:border-medium-gray focus:border-medium-gray border-[1px] text-medium-gray focus:text-light-medium-gray ${disabled ? 'text-light-medium-gray border-light-medium-gray' : ''}`;
            default:
                return `bg-primary-color hover:bg-[#74EFA9] focus:bg-medium-green border-second-color border-b-4 focus:border-b-0 focus:border-t-4 text-[#414141] ${disabled ? 'disabled:bg-light-medium-gray text-medium-gray border-b-2 border-medium-gray' : ''}`;
        }
    };

    const getButtonSizeClasses = (): string => {
        switch (size) {
            case 'small':
                return 'py-1 text-sm';
            case 'medium':
                return 'py-2 text-base';
            case 'large':
                return 'py-[10px] text-lg';
            default:
                return 'py-2 text-base';
        }
    };

    const getIconStyleClasses = (): string => {
        switch (style) {
            case'primary':
                return 'text-[#414141]';
            case'secondary':
                return 'text-[#414141]';
            case 'outline':
                return 'text-[#414141]';
            default:
                return 'text-[#414141]';
        }
    };

    const buttonStyleClasses = getButtonStyleClasses();
    const buttonSizeClasses = getButtonSizeClasses();
    const iconStyleClasses = getIconStyleClasses();

    return (
        <button
            className={`flex items-center justify-center ${buttonStyleClasses} ${buttonSizeClasses} font-bold px-4 rounded-lg gap-2`}
            disabled={disabled}
            onClick={onClick}
        >
            {leadingIcon && <span className="leading-icon"><Image color={'#414141'} className={iconStyleClasses} width={size === 'large' ? 24 : 18} height={size === 'small' ? 24 : 18} src={leadingIcon} alt='' /></span>}
            {iconOnly && <span className="icon-only"><Image className={iconStyleClasses} width={size === 'large' ? 24 : 18} height={size === 'small' ? 24 : 18} src={iconOnly} alt='' /></span>}
            {children}
            {trailingIcon && <span className="trailing-icon"><Image className={iconStyleClasses} width={size === 'large' ? 24 : 18} height={size === 'small' ? 24 : 18} src={trailingIcon} alt='' /></span>}
        </button>
    );
};

export default MainButton;