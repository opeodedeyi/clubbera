interface ArrowRightIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ArrowRightIcon({ 
    size = 10,
    color = 'currentColor',
    className = ''
}: ArrowRightIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 5 10"
            fill="none"
            className={className}>
            <path
                d="M0.749984 1.70078L3.46665 4.41745C3.78748 4.73828 3.78748 5.26328 3.46665 5.58411L0.749983 8.30078" 
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}