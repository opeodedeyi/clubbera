interface ToggleIconProps {
    size?: number
    color?: string
    fillColor?: string
    strokeColor?: string
    className?: string
}

export default function ToggleIcon({ 
    size = 22,
    color = 'currentColor',
    fillColor,
    strokeColor,
    className = ''
}: ToggleIconProps) {
    const finalFillColor = fillColor || color
    const finalStrokeColor = strokeColor || color

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 22 15"
            fill="none"
            className={className}>
            <path
                d="M18 7.5C18 8.29565 17.6839 9.05871 17.1213 9.62132C16.5587 10.1839 15.7957 10.5 15 10.5C14.2044 10.5 13.4413 10.1839 12.8787 9.62132C12.3161 9.05871 12 8.29565 12 7.5C12 6.70435 12.3161 5.94129 12.8787 5.37868C13.4413 4.81607 14.2044 4.5 15 4.5C15.7957 4.5 16.5587 4.81607 17.1213 5.37868C17.6839 5.94129 18 6.70435 18 7.5Z" 
                fill={finalFillColor} />
            <path
                d="M15 1.5H7C5.4087 1.5 3.88258 2.13214 2.75736 3.25736C1.63214 4.38258 1 5.9087 1 7.5C1 9.0913 1.63214 10.6174 2.75736 11.7426C3.88258 12.8679 5.4087 13.5 7 13.5H15C16.5913 13.5 18.1174 12.8679 19.2426 11.7426C20.3679 10.6174 21 9.0913 21 7.5C21 5.9087 20.3679 4.38258 19.2426 3.25736C18.1174 2.13214 16.5913 1.5 15 1.5Z" 
                fill={finalFillColor} />
            <path
                d="M18 7.5C18 8.29565 17.6839 9.05871 17.1213 9.62132C16.5587 10.1839 15.7957 10.5 15 10.5C14.2044 10.5 13.4413 10.1839 12.8787 9.62132C12.3161 9.05871 12 8.29565 12 7.5C12 6.70435 12.3161 5.94129 12.8787 5.37868C13.4413 4.81607 14.2044 4.5 15 4.5C15.7957 4.5 16.5587 4.81607 17.1213 5.37868C17.6839 5.94129 18 6.70435 18 7.5Z" 
                stroke={finalStrokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path
                d="M15 1.5H7C5.4087 1.5 3.88258 2.13214 2.75736 3.25736C1.63214 4.38258 1 5.9087 1 7.5C1 9.0913 1.63214 10.6174 2.75736 11.7426C3.88258 12.8679 5.4087 13.5 7 13.5H15C16.5913 13.5 18.1174 12.8679 19.2426 11.7426C20.3679 10.6174 21 9.0913 21 7.5C21 5.9087 20.3679 4.38258 19.2426 3.25736C18.1174 2.13214 16.5913 1.5 15 1.5Z" 
                stroke={finalStrokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}