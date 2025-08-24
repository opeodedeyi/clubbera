interface BoldIconProps {
    size?: number
    color?: string
    className?: string
}

export default function BoldIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: BoldIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            className={className}>
            <path 
                d="M2.84668 2.62501C2.84668 1.98334 3.37168 1.45834 4.01335 1.45834H7.00001C8.52835 1.45834 9.77085 2.70084 9.77085 4.22918C9.77085 5.75751 8.52835 7.00001 7.00001 7.00001H2.84668V2.62501Z" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            <path 
                d="M2.84668 7H8.38835C9.91668 7 11.1592 8.2425 11.1592 9.77083C11.1592 11.2992 9.91668 12.5417 8.38835 12.5417H4.01335C3.37168 12.5417 2.84668 12.0167 2.84668 11.375V7V7Z" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
