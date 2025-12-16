interface MenuIconProps {
    size?: number
    color?: string
    className?: string
}

export default function MenuIcon({
    size = 24,
    color = 'currentColor',
    className = ''
}: MenuIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}>
            <path
                d="M4 6H20"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path
                d="M4 12H20"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path
                d="M4 18H20"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}
