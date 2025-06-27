interface VerticalEllipsisIconProps {
    size?: number
    color?: string
    className?: string
}

export default function VerticalEllipsisIcon({
    size = 26,
    color = 'currentColor',
    className = ''
}: VerticalEllipsisIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 6 26"
            fill="none"
            className={className}>
            <rect
                y="0.800781"
                width="6"
                height="6"
                rx="3" 
                fill={color} />
            <rect
                y="10"
                width="6"
                height="6"
                rx="3"
                fill={color} />
            <rect
                y="19.1992"
                width="6"
                height="6"
                rx="3"
                fill={color} />
        </svg>
    )
}