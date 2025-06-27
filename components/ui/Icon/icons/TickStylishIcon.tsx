interface TickStylishIconProps {
    size?: number
    color?: string
    className?: string
}

export default function TickStylishIcon({ 
    size = 16, 
    color = 'currentColor',
    className = '' 
}: TickStylishIconProps) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 16 14" 
            fill="none"
            className={className}>
            <path 
                d="M1 9.03704L4.46296 12.5C6.09259 7.2037 9.55556 2.11111 14.4444 1.5" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round" />
        </svg>
    )
}