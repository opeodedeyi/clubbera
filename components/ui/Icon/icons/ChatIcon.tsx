interface ChatIconProps {
    size?: number
    color?: string
    className?: string
}

export default function ChatIcon({
    size = 20,
    color = 'currentColor',
    className = ''
}: ChatIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            fill="none"
            className={className}>
            <path
                d="M14.9688 14.9734H14.978M19.5556 14.9734H19.5659M10.3809 14.9734H10.3913M26.4547 14.4763C26.4547 20.5418 21.3134 25.4592 14.9734 25.4592C14.2256 25.46 13.4851 25.3919 12.7518 25.2549C12.2248 25.155 11.9619 25.1056 11.7782 25.1343C11.5945 25.1619 11.3327 25.3008 10.8115 25.5775C9.3262 26.3685 7.61717 26.6344 5.9618 26.3318C6.59413 25.5501 7.02291 24.6239 7.20981 23.636C7.32463 23.0275 7.03989 22.4362 6.61279 22.0034C4.67935 20.0378 3.49219 17.3902 3.49219 14.4763C3.49219 8.41075 8.63349 3.49219 14.9734 3.49219C21.3134 3.49219 26.4547 8.41075 26.4547 14.4763Z"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}
