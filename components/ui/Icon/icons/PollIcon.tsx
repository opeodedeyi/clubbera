interface PollIconProps {
    size?: number
    color?: string
    className?: string
}

export default function PollIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: PollIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_2405_3534)">
                <path
                    d="M2.33203 3.66667L3.33203 4.66667L4.9987 3"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M2.33203 7.66667L3.33203 8.66667L4.9987 7"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M2.33203 11.6667L3.33203 12.6667L4.9987 11"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M7.33203 4H13.332"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M7.33203 8H13.332"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M7.33203 12H13.332"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_2405_3534">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
