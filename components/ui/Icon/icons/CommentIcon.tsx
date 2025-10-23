interface CommentIconProps {
    size?: number
    color?: string
    className?: string
}

export default function CommentIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: CommentIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_2411_4262)">
                <path
                    d="M2.5 16.6674L3.58333 13.4174C1.64667 10.5532 2.395 6.85741 5.33333 4.77241C8.27167 2.68825 12.4917 2.85908 15.2042 5.17241C17.9167 7.48658 18.2833 11.2274 16.0617 13.9232C13.84 16.6191 9.71583 17.4357 6.41667 15.8341L2.5 16.6674Z"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_2411_4262">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}