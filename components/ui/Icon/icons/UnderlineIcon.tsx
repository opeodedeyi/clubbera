interface UnderlineIconProps {
    size?: number
    color?: string
    className?: string
}

export default function UnderlineIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: UnderlineIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            className={className}>
            <path 
                d="M2.91675 12.25H11.0834" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            <path 
                d="M2.91675 1.75V5.83333C2.91675 8.09083 4.74258 9.91667 7.00008 9.91667C9.25758 9.91667 11.0834 8.09083 11.0834 5.83333V1.75" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
