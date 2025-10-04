export type ButtonVariant = 'default' | 'community' | 'event' | 'disabled' | 'plain' | 'gray';
export type ButtonSize = 'small' | 'large' | 'full';

export interface BaseButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    children?: React.ReactNode
    className?: string
    disabled?: boolean
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    iconOnly?: React.ReactNode
    iconOnlyMobile?: boolean
}

export interface ButtonAsButtonProps extends BaseButtonProps {
    as?: 'button'
    type?: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    loading?: boolean
}

export interface ButtonAsLinkProps extends BaseButtonProps {
    as: 'link'
    href: string
    target?: string
    rel?: string
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps