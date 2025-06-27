interface GoogleIconProps {
    size?: number
    color?: string
    className?: string
}

export default function GoogleIcon({ 
    size = 20,
    color,
    className = '' 
}: GoogleIconProps) {
    const blueColor = color || "#4285F4"
    const greenColor = color || "#34A853"
    const yellowColor = color || "#FBBC05"
    const redColor = color || "#EA4335"

    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 23 22" 
            fill="none"
            className={className} >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M21.7 11.2417C21.7 10.4882 21.6324 9.76381 21.5068 9.06836H11.5V13.1783H17.2182C16.9719 14.5064 16.2233 15.6317 15.098 16.3851V19.051H18.5318C20.5409 17.2013 21.7 14.4775 21.7 11.2417Z" 
                fill={blueColor} />
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M11.4998 21.6258C14.3685 21.6258 16.7737 20.6744 18.5316 19.0516L15.0978 16.3857C14.1464 17.0232 12.9293 17.3999 11.4998 17.3999C8.73245 17.3999 6.39012 15.5309 5.5546 13.0195H2.00488V15.7724C3.75318 19.2448 7.34637 21.6258 11.4998 21.6258Z" 
                fill={greenColor} />
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M5.55484 13.0189C5.34234 12.3814 5.2216 11.7004 5.2216 11.0001C5.2216 10.2998 5.34234 9.61886 5.55484 8.98136V6.22852H2.00512C1.28551 7.66289 0.875 9.28562 0.875 11.0001C0.875 12.7146 1.28551 14.3373 2.00512 15.7717L5.55484 13.0189Z" 
                fill={yellowColor} />
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M11.4998 4.60086C13.0597 4.60086 14.4603 5.13694 15.5614 6.18978L18.6089 3.14233C16.7688 1.42784 14.3637 0.375 11.4998 0.375C7.34637 0.375 3.75318 2.75597 2.00488 6.22842L5.5546 8.98126C6.39012 6.4699 8.73245 4.60086 11.4998 4.60086Z" 
                fill={redColor} />
        </svg>
    )
}