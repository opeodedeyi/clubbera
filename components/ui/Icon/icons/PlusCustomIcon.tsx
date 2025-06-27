interface PlusCustomIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string
    className?: string
}

export default function PlusCustomIcon({
    size = 50,
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
}: PlusCustomIconProps) {
    const finalfillColor = fillColor || color
    const finalstrokeColor = strokeColor || (color === 'currentColor' ? 'white' : 'white')

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            fill="none"
            className={className}>
            <rect
                width="50"
                height="50"
                rx="25"
                fill={finalfillColor} />
            <rect 
                x="24.1229"
                y="16.667"
                width="1.75439"
                height="16.6667"
                fill={finalstrokeColor} />
            <rect 
                x="33.3333"
                y="24.123"
                width="1.75439"
                height="16.6667"
                transform="rotate(90 33.3333 24.123)"
                fill={finalstrokeColor} />
        </svg>
    )
}