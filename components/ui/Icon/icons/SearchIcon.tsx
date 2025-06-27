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
            viewBox="0 0 18 18"
            fill="none"
            className={className}>
            <path 
                d="M13.4 13.4L17 17M15.4 8.2C15.4 6.29044 14.6414 4.45909 13.2912 3.10883C11.9409 1.75857 10.1096 1 8.2 1C6.29044 1 4.45909 1.75857 3.10883 3.10883C1.75857 4.45909 1 6.29044 1 8.2C1 10.1096 1.75857 11.9409 3.10883 13.2912C4.45909 14.6414 6.29044 15.4 8.2 15.4C10.1096 15.4 11.9409 14.6414 13.2912 13.2912C14.6414 11.9409 15.4 10.1096 15.4 8.2Z" 
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}