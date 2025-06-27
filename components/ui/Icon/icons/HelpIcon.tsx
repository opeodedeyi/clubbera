interface HelpIconProps {
    size?: number
    color?: string
    fillColor?: string 
    strokeColor?: string
    className?: string
}

export default function HelpIcon({ 
    size = 20, 
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = '' 
}: HelpIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color
  
    return (
        <svg
            width={size} 
            height={size} 
            viewBox="0 0 20 20" 
            fill="none"
            className={className}>
            <path
                d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" 
                fill={finalFillColor} />
            <path
                d="M12.2743 12.7738C15.8752 10.0126 15.3055 6.9517 13.6378 5.9671C12.331 5.194 11.1898 5.5054 10.504 6.0013C10.2232 6.2047 10.0828 6.3064 10 6.3064C9.9172 6.3064 9.7768 6.2047 9.496 6.0013C8.8102 5.5063 7.669 5.194 6.3622 5.9671C4.7008 6.9481 4.2841 10.1026 7.8517 12.8629C8.53435 13.3883 9.25213 13.8664 10 14.2939C11.6011 15.2173 13.9753 16.3 16.3 16.3" 
                fill={finalFillColor} />
            <path
                d="M12.2743 12.7738C15.8752 10.0126 15.3055 6.9517 13.6378 5.9671C12.331 5.194 11.1898 5.5054 10.504 6.0013C10.2232 6.2047 10.0828 6.3064 10 6.3064C9.9172 6.3064 9.7768 6.2047 9.496 6.0013C8.8102 5.5063 7.669 5.194 6.3622 5.9671C4.7008 6.9481 4.2841 10.1026 7.8517 12.8629C8.53435 13.3883 9.25213 13.8664 10 14.2939C11.6011 15.2173 13.9753 16.3 16.3 16.3M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" 
                stroke={finalStrokeColor} 
                strokeLinecap="round" 
                strokeLinejoin="round" />
        </svg>
    )
}