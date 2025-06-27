interface BalloonIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string
    className?: string
}

export default function BalloonIcon({ 
    size = 75,
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
}: BalloonIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color
  
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 75"
            fill="none"
            className={className}>
            <path
                d="M8.10547 23.8686C8.10547 18.4505 10.2578 13.2542 14.089 9.42303C17.9203 5.59182 23.1165 3.43945 28.5347 3.43945C33.9528 3.43945 39.1491 5.59182 42.9803 9.42303C46.8115 13.2542 48.9639 18.4505 48.9639 23.8686C48.9639 40.7908 39.8184 54.5124 28.5347 54.5124C17.2509 54.5124 8.10547 40.7908 8.10547 23.8686Z" 
                fill={finalFillColor} />
            <path
                d="M26.8341 54.5124C38.1178 54.5124 47.2633 40.7908 47.2633 23.8686C47.2633 18.4505 45.1109 13.2542 41.2797 9.42303C37.4485 5.59181 32.2522 3.43945 26.8341 3.43945C21.4159 3.43945 16.2197 5.59181 12.3884 9.42303C8.55722 13.2542 6.40487 18.4505 6.40487 23.8686C6.40487 40.7908 15.5503 54.5124 26.8341 54.5124ZM26.8341 54.5124V57.9173C26.8341 59.7234 26.1166 61.4554 24.8395 62.7325C23.5625 64.0096 21.8304 64.727 20.0243 64.727H9.80973C8.00368 64.727 6.2716 65.4445 4.99452 66.7216C3.71745 67.9986 3 69.7307 3 71.5368" 
                stroke={finalStrokeColor}
                strokeWidth="5.1073"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path
                d="M33.6398 23.8761C33.6398 22.0701 32.9224 20.338 31.6453 19.0609C30.3682 17.7839 28.6361 17.0664 26.8301 17.0664" 
                stroke="#FDF2F6"
                strokeWidth="5.1073"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}