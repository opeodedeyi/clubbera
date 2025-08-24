interface LeaveIconProps {
    size?: number
    color?: string
    className?: string
}

export default function LeaveIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: LeaveIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            className={className}>
            <path 
                d="M8.3335 6.66732V5.00065C8.3335 4.55862 8.50909 4.1347 8.82165 3.82214C9.13421 3.50958 9.55814 3.33398 10.0002 3.33398H15.8335C16.2755 3.33398 16.6994 3.50958 17.012 3.82214C17.3246 4.1347 17.5002 4.55862 17.5002 5.00065V15.0007C17.5002 15.4427 17.3246 15.8666 17.012 16.1792C16.6994 16.4917 16.2755 16.6673 15.8335 16.6673H10.0002C9.55814 16.6673 9.13421 16.4917 8.82165 16.1792C8.50909 15.8666 8.3335 15.4427 8.3335 15.0007V13.334" 
                stroke={color}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            <path 
                d="M12.5 10H2.5L5 7.5" 
                stroke={color}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            <path 
                d="M5 12.5L2.5 10" 
                stroke={color}
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
