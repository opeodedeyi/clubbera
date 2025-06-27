interface HeartIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string
    className?: string
}

export default function HeartIcon({
    size = 54,
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
  }: HeartIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color
  
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 54 50"
            fill="none"
            className={className}>
            <path
                d="M26.0169 49.7534L25.9975 49.7451L25.9366 49.7118C25.5802 49.5157 25.2266 49.3145 24.876 49.1081C20.6607 46.6033 16.7214 43.6609 13.1234 40.3297C6.75138 34.3841 0 25.5614 0 14.6949C0 6.5866 6.82339 0.156446 15.0591 0.156446C17.3485 0.145233 19.6111 0.650313 21.6784 1.63412C23.7458 2.61793 25.5647 4.05516 27 5.83891C28.4356 4.05479 30.255 2.61735 32.3228 1.63352C34.3907 0.649695 36.6538 0.144816 38.9437 0.156446C47.1766 0.156446 54 6.5866 54 14.6949C54 25.5641 47.2486 34.3869 40.8766 40.3269C37.2787 43.6582 33.3393 46.6007 29.124 49.1054C28.7734 49.3126 28.4198 49.5148 28.0634 49.7118L28.0025 49.7451L27.9831 49.7561L27.9748 49.7589C27.6745 49.918 27.3398 50.0011 27 50.0011C26.6602 50.0011 26.3255 49.918 26.0252 49.7589L26.0169 49.7534Z" 
                fill={finalFillColor} />
            <path
                d="M46.2789 14.6266C46.2789 12.7603 45.5376 10.9705 44.2179 9.65086C42.8983 8.33121 41.1085 7.58984 39.2422 7.58984" 
                stroke={finalStrokeColor}
                strokeWidth="5.27757"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}