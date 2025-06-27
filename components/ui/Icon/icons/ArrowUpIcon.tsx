interface ArrowUpIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ArrowUpIcon({
    size = 11,
    color = 'currentColor',
    className = ''
}: ArrowUpIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 11 6"
            fill="none"
            className={className}>
            <path
                d="M10 5L5.34483 0.999999L1 5"
                stroke={color}
                strokeWidth="1.5" />
        </svg>
    )
}