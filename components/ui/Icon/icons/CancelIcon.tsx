interface CancelIconProps {
    size?: number
    color?: string
    className?: string
}

export default function CancelIcon({
    size = 16,
    color = 'currentColor',
    className = ''
}: CancelIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_2414_4837)">
                <path
                    d="M12 4L4 12"
                    stroke={color}
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                <path
                    d="M4 4L12 12"
                    stroke={color}
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_2414_4837">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
