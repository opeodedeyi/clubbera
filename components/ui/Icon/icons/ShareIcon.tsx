interface ShareIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ShareIcon({
    size = 16,
    color = 'currentColor',
    className = ''
}: ShareIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}>
            <path
                d="M9.6071 2.50099C9.2838 2.21811 8.77784 2.4477 8.77784 2.87727V4.45857C8.77784 4.70489 8.59739 4.91313 8.356 4.96215C3.55846 5.93643 1.74103 10.2794 1.00015 14.2197C0.972701 14.3725 4.80637 10.0162 8.27568 9.58688C8.55133 9.55277 8.77784 9.77947 8.77784 10.0572V11.5623C8.77784 11.9919 9.2838 12.2214 9.6071 11.9386L14.57 7.59607C14.7976 7.39686 14.7976 7.0427 14.57 6.84349L9.6071 2.50099Z"
                fill={color}
                stroke={color}
                strokeWidth="1.16665"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}