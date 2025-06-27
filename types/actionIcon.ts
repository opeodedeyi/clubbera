import type { IconProps } from './icon'

export interface RegularIconConfig {
    name: 'balloon' | 'bin' | 'megaphone' | 'heart' | 'help' | 'notification' | 'plusCustom' | 'signout' | 'toggle'
    size?: IconProps['size']
    color?: string
    fillColor?: string
    strokeColor?: string
    hover?: IconProps['hover']
    className?: string
}

export interface BrandIconConfig {
    name: 'clubbera' | 'clubberaGame' | 'clubberaHex' | 'clubberaOreo' | 'clubberaPlay' | 'clubberaTaiwo' | 'clubberaTriangle' | 'clubberaKehinde' |'google' | 'instagram' | 'x'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'cHeader'
    color?: string
    hover?: 'none' | 'scale' | 'opacity'
    className?: string
}

export type IconConfig = RegularIconConfig | BrandIconConfig

interface BaseActionIconProps {
    icon: IconConfig
    className?: string
    disabled?: boolean
    'aria-label': string
}

export interface ActionIconAsButtonProps extends BaseActionIconProps {
    as?: 'button'
    type?: 'button' | 'submit' | 'reset'
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface ActionIconAsLinkProps extends BaseActionIconProps {
    as: 'link'
    href: string
    target?: string
    rel?: string
}

export type ActionIconProps = ActionIconAsButtonProps | ActionIconAsLinkProps