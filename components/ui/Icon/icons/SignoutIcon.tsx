interface SignoutIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string
    className?: string
}

export default function SignoutIcon({ 
    size = 21, 
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = '' 
}: SignoutIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color
  
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 21 21" 
            fill="none"
            className={className}>
            <path 
                d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z" 
                fill={finalFillColor} />
            <path 
                d="M7.65 14.3H13.35H7.65ZM8.6 9.55L7.175 8.125L8.6 9.55ZM7.175 8.125L5.75 6.7L7.175 8.125ZM7.175 8.125L5.75 9.55L7.175 8.125ZM7.175 8.125L8.6 6.7L7.175 8.125ZM15.25 9.55L13.825 8.125L15.25 9.55ZM13.825 8.125L12.4 6.7L13.825 8.125ZM13.825 8.125L12.4 9.55L13.825 8.125ZM13.825 8.125L15.25 6.7L13.825 8.125Z" 
                fill={finalFillColor} />
            <path
                d="M7.65 14.3H13.35M8.6 9.55L7.175 8.125M7.175 8.125L5.75 6.7M7.175 8.125L5.75 9.55M7.175 8.125L8.6 6.7M15.25 9.55L13.825 8.125M13.825 8.125L12.4 6.7M13.825 8.125L12.4 9.55M13.825 8.125L15.25 6.7M20 10.5C20 15.7467 15.7467 20 10.5 20C5.25329 20 1 15.7467 1 10.5C1 5.25329 5.25329 1 10.5 1C15.7467 1 20 5.25329 20 10.5Z" 
                stroke={finalStrokeColor} 
                strokeWidth="1.425" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
        </svg>
    )
}