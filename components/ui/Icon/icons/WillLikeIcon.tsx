interface LikeIconProps {
    size?: number
    color?: string
    className?: string
}

export default function LikeIcon({
    size = 16,
    color = 'currentColor',
    className = ''
}: LikeIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}>
            <path
                d="M4.98669 12.2336L7.05336 13.8336C7.32003 14.1003 7.92003 14.2336 8.32003 14.2336H10.8534C11.6534 14.2336 12.52 13.6336 12.72 12.8336L14.32 7.96697C14.6534 7.03364 14.0534 6.23364 13.0534 6.23364H10.3867C9.98669 6.23364 9.65336 5.9003 9.72003 5.43364L10.0534 3.3003C10.1867 2.7003 9.78669 2.03364 9.18669 1.83364C8.65336 1.63364 7.98669 1.9003 7.72003 2.3003L4.98669 6.36697"
                stroke={color}
                strokeWidth="1.2"
                strokeMiterlimit="10" />
            <path
                d="M1.58667 12.2336V5.70026C1.58667 4.76693 1.98667 4.43359 2.92 4.43359H3.58667C4.52 4.43359 4.92 4.76693 4.92 5.70026V12.2336C4.92 13.1669 4.52 13.5003 3.58667 13.5003H2.92C1.98667 13.5003 1.58667 13.1669 1.58667 12.2336Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}