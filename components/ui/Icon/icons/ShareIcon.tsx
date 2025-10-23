interface ShareIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ShareIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: ShareIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_2405_3574)">
                <path
                    d="M10.8335 3.33203V6.66536C5.35432 7.52203 3.31682 12.322 2.50016 16.6654C2.46932 16.837 6.98682 11.697 10.8335 11.6654V14.9987L17.5002 9.16536L10.8335 3.33203Z"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_2405_3574">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}