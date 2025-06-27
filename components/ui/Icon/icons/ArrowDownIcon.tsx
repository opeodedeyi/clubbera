interface ArrowDownIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ArrowDownIcon({ 
    size = 11,
    color = 'currentColor',
    className = ''
}: ArrowDownIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 11 6"
            fill="none"
            className={className}>
            <path 
                d="M1 1L5.65517 5L10 1"
                stroke={color}
                strokeWidth="1.5" />
        </svg>
    )
}