import {
    ClubberaIcon,
    ClubberaGameIcon,
    ClubberaHexIcon,
    ClubberaOreoIcon,
    ClubberaPlayIcon,
    ClubberaTaiwoIcon,
    ClubberaTriangleIcon,
    ClubberaKehindeIcon,
    GoogleIcon,
    InstagramIcon,
    XIcon,
} from './icons/';
import type { IconProps, BrandIconProps } from '@/types/icon';
import styles from './Icon.module.css';


const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36
}

const getHoverClass = (hoverEffect?: string) => {
    switch (hoverEffect) {
        case 'scale':
            return styles.hoverable
        case 'opacity':
            return styles.hoverable
        case 'none':
        default:
            return ''
    }
}

export default function BrandIcon(props: IconProps) {
    const { name, size = 'md', className = '', hover = 'none' } = props
    const iconSize = sizeMap[size]
    
    const iconClasses = [
        styles.icon,
        styles[size],
        getHoverClass(hover),
        className
    ].filter(Boolean).join(' ')

    switch (name) {
        case 'clubbera':
            const clubberaProps = props as BrandIconProps
            return (
                <ClubberaIcon
                    size={iconSize}
                    color={clubberaProps.color}
                    className={iconClasses} />
            )
        case 'clubberaGame':
            const clubberaGameProps = props as BrandIconProps
            return (
                <ClubberaGameIcon
                    size={iconSize}
                    color={clubberaGameProps.color}
                    className={iconClasses} />
            )
        case 'clubberaHex':
            const clubberaHexProps = props as BrandIconProps
            return (
                <ClubberaHexIcon
                    size={iconSize}
                    color={clubberaHexProps.color}
                    className={iconClasses} />
            )
        case 'clubberaOreo':
            const clubberaOreoProps = props as BrandIconProps
            return (
                <ClubberaOreoIcon
                    size={iconSize}
                    color={clubberaOreoProps.color}
                    className={iconClasses} />
            )
        case 'clubberaPlay':
            const clubberaPlayProps = props as BrandIconProps
            return (
                <ClubberaPlayIcon
                    size={iconSize}
                    color={clubberaPlayProps.color}
                    className={iconClasses} />
            )
        case 'clubberaTaiwo':
            const clubberaTaiwoProps = props as BrandIconProps
            return (
                <ClubberaTaiwoIcon
                    size={iconSize}
                    color={clubberaTaiwoProps.color}
                    className={iconClasses} />
            )
        case 'clubberaTriangle':
            const clubberaTriangleProps = props as BrandIconProps
            return (
                <ClubberaTriangleIcon
                    size={iconSize}
                    color={clubberaTriangleProps.color}
                    className={iconClasses} />
            )
        case 'clubberaKehinde':
            const clubberaKehindeProps = props as BrandIconProps
            return (
                <ClubberaKehindeIcon
                    size={iconSize}
                    color={clubberaKehindeProps.color}
                    className={iconClasses} />
            )
        case 'google':
            const googleProps = props as BrandIconProps
            return (
                <GoogleIcon
                    size={iconSize}
                    color={googleProps.color}
                    className={iconClasses} />
            )
        case 'instagram':
            const instagramProps = props as BrandIconProps
            return (
                <InstagramIcon 
                    size={iconSize} 
                    color={instagramProps.color}
                    className={iconClasses} />
            )
        case 'x':
            const xProps = props as BrandIconProps
            return (
                <XIcon
                    size={iconSize}
                    color={xProps.color}
                    className={iconClasses} />
            )
        default:
            return null
    }
}