interface HeadingIconProps {
    size?: number
    color?: string
    className?: string
}

export default function HeadingIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: HeadingIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            className={className}>
            <path 
                d="M3 1V17M15 1V17M5 1H1M15 9L3 9M5 17H1M17 17H13M17 1H13" 
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
