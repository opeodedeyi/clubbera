interface CalendarIconProps {
    size?: number
    color?: string
    className?: string
}

export default function CalendarIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: CalendarIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_2455_2348)">
                <path
                    d="M5.00195 8.75391C5.00195 8.09087 5.26535 7.45498 5.73419 6.98614C6.20303 6.5173 6.83891 6.25391 7.50195 6.25391H22.502C23.165 6.25391 23.8009 6.5173 24.2697 6.98614C24.7386 7.45498 25.002 8.09087 25.002 8.75391V23.7539C25.002 24.4169 24.7386 25.0528 24.2697 25.5217C23.8009 25.9905 23.165 26.2539 22.502 26.2539H7.50195C6.83891 26.2539 6.20303 25.9905 5.73419 25.5217C5.26535 25.0528 5.00195 24.4169 5.00195 23.7539V8.75391Z"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M20.002 3.75V8.75"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M9.99805 3.75V8.75"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M5.00195 13.7539H25.002"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M9.99805 18.75H12.498V21.25H9.99805V18.75Z"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_2455_2348">
                    <rect width="30" height="30" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
