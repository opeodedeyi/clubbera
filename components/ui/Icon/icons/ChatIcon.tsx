interface ChatIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ChatIcon({ 
    size = 26,
    color = 'currentColor',
    className = ''
}: ChatIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 26 26"
            fill="none"
            className={className}>
            <path
                d="M12.9698 12.9773H12.979M17.5566 12.9773H17.5669M8.38191 12.9773H8.39224M24.4557 12.4802C24.4557 18.5457 19.3144 23.4632 12.9744 23.4632C12.2266 23.4639 11.4861 23.3958 10.7528 23.2588C10.2258 23.1589 9.96288 23.1095 9.77918 23.1382C9.59548 23.1658 9.33371 23.3047 8.81246 23.5814C7.32718 24.3724 5.61815 24.6383 3.96278 24.3357C4.59511 23.554 5.02389 22.6278 5.21079 21.6399C5.3256 21.0314 5.04087 20.4401 4.61377 20.0073C2.68032 18.0417 1.49316 15.3941 1.49316 12.4802C1.49316 6.41466 6.63447 1.49609 12.9744 1.49609C19.3144 1.49609 24.4557 6.41466 24.4557 12.4802Z" 
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}