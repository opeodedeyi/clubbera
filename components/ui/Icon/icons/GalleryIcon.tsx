interface GalleryIconProps {
    size?: number
    color?: string
    className?: string
}

export default function GalleryIcon({
    size = 21, 
    color = 'currentColor',
    className = '' 
}: GalleryIconProps) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 20 21" 
            fill="none"
            className={className}>
            <path 
                d="M7.50033 18.8346H12.5003C16.667 18.8346 18.3337 17.168 18.3337 13.0013V8.0013C18.3337 3.83464 16.667 2.16797 12.5003 2.16797H7.50033C3.33366 2.16797 1.66699 3.83464 1.66699 8.0013V13.0013C1.66699 17.168 3.33366 18.8346 7.50033 18.8346Z" 
                stroke={color} 
                strokeWidth="1.66667" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
            <path 
                d="M7.49967 8.83333C8.42015 8.83333 9.16634 8.08714 9.16634 7.16667C9.16634 6.24619 8.42015 5.5 7.49967 5.5C6.5792 5.5 5.83301 6.24619 5.83301 7.16667C5.83301 8.08714 6.5792 8.83333 7.49967 8.83333Z" 
                stroke={color} 
                strokeWidth="1.66667" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
            <path 
                d="M2.22559 16.2938L6.33392 13.5354C6.99225 13.0938 7.94225 13.1437 8.53392 13.6521L8.80892 13.8937C9.45892 14.4521 10.5089 14.4521 11.1589 13.8937L14.6256 10.9187C15.2756 10.3604 16.3256 10.3604 16.9756 10.9187L18.3339 12.0854" 
                stroke={color} 
                strokeWidth="1.66667" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
        </svg>
    )
}