interface ClubberaTriangleIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ClubberaTriangleIcon({ 
    size = 20,
    color = "#FB4A81",
    className = '' 
}: ClubberaTriangleIconProps) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 14 14" 
            fill="none"
            className={className}>
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M0.58872 13.0255C2.79556 13.1626 4.9153 12.7939 7.32411 12.78C12.3752 12.7504 14.9211 12.4595 11.659 7.72417C10.9447 6.68669 10.3675 5.92803 9.76349 4.77569C9.05845 3.43437 8.53778 3.1713 7.90778 1.81979C6.72376 -0.721105 5.72318 -0.478409 4.81432 1.78552C4.22138 3.26022 4.50951 2.4358 3.78965 3.40844C2.95491 4.53855 3.15966 5.4658 2.29897 6.71262C0.199606 9.75559 -0.680535 11.2405 0.58872 13.0255Z" 
                fill={color} />
        </svg>
    )
}