import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import { isBrandIcon, isRegularIcon } from '@/utils/iconUtils';
import type { ActionIconProps, ActionIconAsLinkProps, ActionIconAsButtonProps } from '@/types/actionIcon';
import styles from './ActionIcon.module.css';


export default function ActionIcon(props: ActionIconProps) {
    const {
        icon,
        className = '',
        disabled = false,
        'aria-label': ariaLabel,
        ...otherProps
    } = props

    const actionClasses = [
        styles.actionIcon,
        disabled && styles.disabled,
        className
    ].filter(Boolean).join(' ')

    const renderIcon = () => {
        if (isBrandIcon(icon)) {
            return (
                <BrandIcon
                    name={icon.name}
                    size={icon.size}
                    color={icon.color}
                    hover={icon.hover}
                    className={icon.className} />
            )
        } else if (isRegularIcon(icon)) {
            if (icon.name === 'notification') {
                return (
                    <Icon
                        name={icon.name}
                        size={icon.size}
                        color={icon.color}
                        fillColor={icon.fillColor}
                        strokeColor={icon.strokeColor}
                        hover={icon.hover}
                        className={icon.className} />
                )
            } else {
                return (
                    <Icon
                        name={icon.name}
                        size={icon.size}
                        color={icon.color}
                        hover={icon.hover}
                        className={icon.className} />
                )
            }
        }
        return null
    }

    if (props.as === 'link') {
        const { href, target, rel } = props as ActionIconAsLinkProps
        
        return (
            <Link 
                href={href}
                target={target}
                rel={rel}
                className={actionClasses}
                aria-label={ariaLabel}
                aria-disabled={disabled}>
                {renderIcon()}
            </Link>
        )
    }

    const { type = 'button', onClick } = props as ActionIconAsButtonProps
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={actionClasses}
            aria-label={ariaLabel}>
            {renderIcon()}
        </button>
    )
}