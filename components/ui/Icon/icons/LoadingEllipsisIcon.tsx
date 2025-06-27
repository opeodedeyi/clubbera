interface LoadingEllipsisIconProps {
    size?: number
    color?: string
    className?: string
}

export default function LoadingEllipsisIcon({
    size = 22,
    color = 'currentColor',
    className = ''
}: LoadingEllipsisIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 22 22"
            fill="none"
            className={className}>
            <circle
                cx="11"
                cy="11"
                r="9.8421"
                stroke={color}
                strokeWidth="2.31579"
                strokeMiterlimit="16"
                strokeDasharray="2.89 2.89" />
        </svg>
    )
}