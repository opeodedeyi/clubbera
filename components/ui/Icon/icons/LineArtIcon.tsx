interface LineArtIconProps {
    size?: number
    color?: string
    className?: string
}

export default function LineArtIcon({
    size = 748,
    color = '#05C213',
    className = ''
}: LineArtIconProps) {
    return (
        <svg
            width={size}
            height={(size * 691) / 748}
            viewBox="0 0 748 691"
            fill="none"
            className={className}>
            <path
                opacity="0.2"
                d="M11 765.693C141.145 628.769 549.367 329.935 568.889 616.255C593.291 974.155 -358.397 282.758 215.056 380.367C673.819 458.454 749.422 110.659 729.879 -73"
                stroke={color}
                strokeWidth="30"/>
        </svg>
    )
}
