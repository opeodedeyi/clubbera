import ClubberaLogoLongIcon from './icons/ClubberaLogoLongIcon'

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl'
export type LogoVariant = 'full-color' | 'monochrome' | 'text-only' | 'logo-only' | 'custom'

interface ClubberaLogoProps {
    size?: LogoSize
    variant?: LogoVariant
    textColor?: string
    logoColor?: string
    className?: string
    hover?: 'none' | 'scale' | 'opacity'
}

const sizeMap = {
    sm: 120,
    md: 144,
    lg: 180,
}

export default function ClubberaLogo({
    size = 'md',
    variant = 'full-color',
    textColor,
    logoColor,
    className = '',
    hover = 'none'
}: ClubberaLogoProps) {
    const logoSize = sizeMap[size]
    
    const hoverClass = hover !== 'none' ? `hover-${hover}` : ''
    const classes = [className, hoverClass].filter(Boolean).join(' ')

    // Determine props based on variant
    const getLogoProps = () => {
        switch (variant) {
        case 'full-color':
            return {
                preserveColors: true,
                size: logoSize,
                className: classes
            }
        
        case 'monochrome':
            return {
                color: textColor || logoColor || 'currentColor',
                size: logoSize,
                className: classes
            }
        case 'text-only':
            return {
                textColor: textColor || 'currentColor',
                preserveColors: false,
                size: logoSize,
                className: classes
            }
        default:
            return {
                textColor,
                logoColor,
                size: logoSize,
                className: classes
            }
        }
    }

    return <ClubberaLogoLongIcon {...getLogoProps()} />
}