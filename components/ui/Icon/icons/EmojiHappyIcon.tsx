interface EmojiHappyIconProps {
    size?: number
    color?: string
    className?: string
}

export default function EmojiHappyIcon({ 
    size = 21,
    color = 'currentColor',
    className = ''
}: EmojiHappyIconProps) {
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
                d="M12.917 8.625C13.6073 8.625 14.167 8.06536 14.167 7.375C14.167 6.68464 13.6073 6.125 12.917 6.125C12.2266 6.125 11.667 6.68464 11.667 7.375C11.667 8.06536 12.2266 8.625 12.917 8.625Z" 
                stroke={color}
                strokeWidth="1.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path 
                d="M7.08301 8.625C7.77336 8.625 8.33301 8.06536 8.33301 7.375C8.33301 6.68464 7.77336 6.125 7.08301 6.125C6.39265 6.125 5.83301 6.68464 5.83301 7.375C5.83301 8.06536 6.39265 8.625 7.08301 8.625Z" 
                stroke={color}
                strokeWidth="1.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path 
                d="M7 11.5859H13C13.4167 11.5859 13.75 11.9193 13.75 12.3359C13.75 14.4109 12.075 16.0859 10 16.0859C7.925 16.0859 6.25 14.4109 6.25 12.3359C6.25 11.9193 6.58333 11.5859 7 11.5859Z" 
                stroke={color}
                strokeWidth="1.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}