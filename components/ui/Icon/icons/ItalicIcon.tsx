interface ItalicIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ItalicIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: ItalicIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            className={className}>
            <path 
                d="M5.61157 1.75H11.0074" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            <path 
                d="M2.98657 12.25H8.38241" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            <path 
                d="M8.3125 1.75L5.6875 12.25" 
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
