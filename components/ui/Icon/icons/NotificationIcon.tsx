interface NotificationIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string  // Outer border color
    className?: string
}

export default function NotificationIcon({ 
    size = 32, 
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
}: NotificationIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color

    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 32 33" 
            fill="none"
            className={className}>
            <path 
                d="M2.04422 20.7719C1.73032 22.8211 3.1318 24.2426 4.84716 24.9511C11.4242 27.6706 20.5758 27.6706 27.1528 24.9511C28.8682 24.2426 30.2697 22.8196 29.9558 20.7719C29.7642 19.5121 28.8107 18.464 28.1048 17.4394C27.1808 16.0811 27.0895 14.6008 27.088 13.025C27.0895 6.93626 22.1261 2 16 2C9.8739 2 4.91053 6.93626 4.91053 13.025C4.91053 14.6008 4.81916 16.0826 3.89369 17.4394C3.18927 18.464 2.23727 19.5121 2.04422 20.7719Z" 
                fill={finalFillColor}/>
            <path 
                d="M10.1053 26.99C10.7802 29.5258 13.1646 31.4 16 31.4C18.8368 31.4 21.2183 29.5258 21.8947 26.99" 
                fill={finalFillColor}/>
            <path 
                d="M10.1053 26.99C10.7802 29.5258 13.1646 31.4 16 31.4C18.8368 31.4 21.2183 29.5258 21.8947 26.99M2.04422 20.7719C1.73032 22.8211 3.1318 24.2426 4.84716 24.9511C11.4242 27.6706 20.5758 27.6706 27.1528 24.9511C28.8682 24.2426 30.2697 22.8196 29.9558 20.7719C29.7642 19.5121 28.8107 18.464 28.1048 17.4394C27.1808 16.0811 27.0895 14.6008 27.088 13.025C27.0895 6.93626 22.1261 2 16 2C9.8739 2 4.91053 6.93626 4.91053 13.025C4.91053 14.6008 4.81916 16.0826 3.89369 17.4394C3.18927 18.464 2.23727 19.5121 2.04422 20.7719Z" 
                stroke={finalStrokeColor}
                strokeWidth="2.29582"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}