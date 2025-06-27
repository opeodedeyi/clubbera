interface ArrowLeftIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ArrowLeftIcon({ 
    size = 10,
    color = 'currentColor',
    className = ''
}: ArrowLeftIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 5 10"
            fill="none"
            className={className}>
            <path
                d="M4.25002 8.29922L1.53335 5.58255C1.21252 5.26172 1.21252 4.73672 1.53335 4.41589L4.25002 1.69922" 
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}