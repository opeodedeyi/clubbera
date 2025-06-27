interface MegaphoneIconProps {
    size?: number
    color?: string
    fillColor?: string 
    strokeColor?: string
    className?: string
}

export default function MegaphoneIcon({ 
    size = 67,
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
}: MegaphoneIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color
  
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 67 67"
            fill="none"
            className={className}>
            <path
                d="M41.7493 50.0068C41.7493 36.2568 36.2493 14.2568 39.4486 5.9209C49.9993 8.75684 32.1422 15.8495 32.1422 27.9998C32.1422 40.1501 36.9367 50.0068 41.7493 50.0068Z" 
                fill={finalFillColor} />
            <path
                d="M39.4486 5.9209C33.4993 8.75684 18.6763 12.4604 10.6288 16.5194C6.94274 18.3784 4.5921 22.9104 4.5921 27.9209C4.5921 32.9314 6.94491 37.4634 10.6288 39.3224C18.6763 43.3814 34.4429 41.0303 41.7493 50.0068" 
                fill={finalFillColor} />
            <path 
                d="M50 50C56.0751 50 61 40.1503 61 28C61 15.8497 56.0751 6 50 6M50 50C43.9249 50 39 40.1503 39 28C39 15.8497 43.9249 6 50 6M50 50C41.4668 50 23.7787 43.4605 13.6202 39.4015C8.97 37.5425 6 33.0105 6 28C6 22.9895 8.96725 18.4575 13.6202 16.5985C23.7787 12.5395 41.4668 6 50 6M30.75 61L25.4068 58.0575C22.5541 56.4788 20.2402 54.0812 18.7637 51.1743C17.2873 48.2675 16.716 44.9848 17.1238 41.75" 
                stroke={finalStrokeColor}
                strokeWidth="4.125"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}