interface SearchIconProps {
    size?: number
    color?: string
    className?: string
}

export default function SearchIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: SearchIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            fill="none"
            className={className}>
            <path
                d="M20.1777 20.1796L24.1605 24.1625M22.3904 14.4266C22.3904 12.314 21.5511 10.2879 20.0573 8.79403C18.5634 7.30018 16.5373 6.46094 14.4247 6.46094C12.312 6.46094 10.2859 7.30018 8.79208 8.79403C7.29822 10.2879 6.45898 12.314 6.45898 14.4266C6.45898 16.5393 7.29822 18.5654 8.79208 20.0592C10.2859 21.5531 12.312 22.3923 14.4247 22.3923C16.5373 22.3923 18.5634 21.5531 20.0573 20.0592C21.5511 18.5654 22.3904 16.5393 22.3904 14.4266Z"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
