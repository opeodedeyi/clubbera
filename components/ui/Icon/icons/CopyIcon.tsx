interface CopyIconProps {
    size?: number
    color?: string
    className?: string
}

export default function CopyIcon({
    size = 16, 
    color = 'currentColor',
    className = '' 
}: CopyIconProps) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 16 16" 
            fill="none"
            className={className}>
            <path 
                d="M11.5 5.9C11.4979 3.8301 11.4671 2.7577 10.8644 2.0234C10.7481 1.88175 10.6182 1.75187 10.4766 1.6356C9.701 1 8.5516 1 6.25 1C3.9491 1 2.7983 1 2.0234 1.6356C1.88175 1.75187 1.75187 1.88175 1.6356 2.0234C1 2.799 1 3.9484 1 6.25C1 8.5509 1 9.7017 1.6356 10.4766C1.75187 10.6182 1.88175 10.7481 2.0234 10.8644C2.7584 11.4664 3.8294 11.4986 5.9 11.5M5.9 10.1C5.9 8.1204 5.9 7.1299 6.5153 6.5153C7.1299 5.9 8.1204 5.9 10.1 5.9H10.8C12.7796 5.9 13.7701 5.9 14.3847 6.5153C15 7.1299 15 8.1204 15 10.1V10.8C15 12.7796 15 13.7701 14.3847 14.3847C13.7701 15 12.7796 15 10.8 15H10.1C8.1204 15 7.1299 15 6.5153 14.3847C5.9 13.7701 5.9 12.7796 5.9 10.8V10.1Z" 
                stroke={color} 
                strokeWidth="1.27273" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
        </svg>
    )
}