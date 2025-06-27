interface BinIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string
    className?: string
}

export default function BinIcon({
    size = 18,
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
}: BinIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color
  
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            className={className}>
            <path
                d="M5.66602 4.702L5.66602 3.30908C5.66602 2.33842 5.66602 1.85309 5.9572 1.55155C6.24838 1.25 6.71702 1.25 7.65432 1.25L10.3444 1.25C11.2817 1.25 11.7503 1.25 12.0415 1.55155C12.3327 1.85309 12.3327 2.33842 12.3327 3.30909V4.702" 
                stroke={finalStrokeColor}
                strokeWidth="1.25" />
            <path
                d="M14.9237 12.6164C14.6794 14.8288 14.5572 15.935 13.9327 16.6987C13.7143 16.9657 13.4558 17.1972 13.1664 17.385C12.3388 17.9219 11.2259 17.9219 9.00005 17.9219C6.77421 17.9219 5.66128 17.9219 4.83367 17.385C4.54428 17.1972 4.28579 16.9657 4.06743 16.6987C3.44292 15.935 3.32074 14.8288 3.07639 12.6164L2.1373 4.11389L15.8628 4.11389L14.9237 12.6164Z" 
                fill={finalFillColor} />
            <path
                d="M1.5 4.68359H16.5"
                stroke={finalStrokeColor}
                strokeWidth="1.25"
                strokeLinecap="round" />
        </svg>
    )
}