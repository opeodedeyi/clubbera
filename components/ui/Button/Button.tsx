import Link from 'next/link';
import styles from './Button.module.css';
import Icon from '@/components/ui/Icon/Icon';
import type { ButtonAsButtonProps, ButtonAsLinkProps } from '@/types/button';

export default function Button(props: ButtonAsButtonProps | ButtonAsLinkProps) {
    const {
        variant = 'default',
        size = 'large',
        children,
        className = '',
        disabled = false,
        iconLeft,
        iconRight,
        iconOnly,
        iconOnlyMobile
    } = props

    const isLoading = props.as !== 'link' && (props as ButtonAsButtonProps).loading

    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        isLoading && styles.loading,
        iconOnly && styles.iconOnly,
        iconOnlyMobile && styles.iconOnlyMobile,
        className
    ].filter(Boolean).join(' ')

    const renderContent = () => {
        // Icon-only button
        if (iconOnly) {
            return (
                <span className={styles.iconContainer}>
                    {iconOnly}
                </span>
            )
        }

        if (isLoading) {
            return (
                <>
                    <Icon
                        name="loadingEllipsis"
                        size='md'
                        className='animate-spin' />
                    {children && <span className={styles.loadingText}>{children}</span>}
                </>
            )
        }

        return (
            <>
                {iconLeft && (
                    <span className={styles.iconLeft}>
                        {iconLeft}
                    </span>
                )}
                {children && (
                    <span className={styles.buttonText}>
                        {children}
                    </span>
                )}
                {iconRight && (
                    <span className={styles.iconRight}>
                        {iconRight}
                    </span>
                )}
            </>
        )
    }

    if (props.as === 'link') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { as, ...linkProps } = props
        
        return (
            <Link 
                {...linkProps}
                className={buttonClasses}
                aria-disabled={disabled}>
                {renderContent()}
            </Link>
        )
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
        variant: _variant,
        size: _size,
        className: _className,
        iconLeft: _iconLeft,
        iconRight: _iconRight,
        iconOnly: _iconOnly,
        iconOnlyMobile: _iconOnlyMobile,
        loading: _loading,
        ...buttonProps
    } = props
    /* eslint-enable @typescript-eslint/no-unused-vars */
    
    return (
        <button
            {...buttonProps}
            disabled={disabled}
            className={buttonClasses}>
            {renderContent()}
        </button>
    )
}