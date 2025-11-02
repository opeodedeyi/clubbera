interface ImageIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ImageIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: ImageIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}>
            <g clipPath="url(#clip0_2405_3517)">
                <path
                    d="M10 5.33594H10.0067"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H12C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4Z"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M2 10.6705L5.33333 7.33712C5.952 6.74179 6.71467 6.74179 7.33333 7.33712L10.6667 10.6705"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M9.33203 9.33192L9.9987 8.66525C10.6174 8.06992 11.38 8.06992 11.9987 8.66525L13.9987 10.6653"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_2405_3517">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
