interface LockIconProps {
    size?: number
    color?: string
    className?: string
}

export default function LockIcon({
    size = 16,
    color = 'currentColor',
    className = ''
}: LockIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 16"
            fill="none"
            className={className}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0.125C5.95571 0.125 4.95419 0.539843 4.21577 1.27827C3.47734 2.01669 3.0625 3.01821 3.0625 4.0625V6.3125C2.46576 6.3125 1.89347 6.54955 1.47151 6.97151C1.04955 7.39347 0.8125 7.96576 0.8125 8.5625V13.625C0.8125 14.2217 1.04955 14.794 1.47151 15.216C1.89347 15.6379 2.46576 15.875 3.0625 15.875H10.9375C11.5342 15.875 12.1065 15.6379 12.5285 15.216C12.9504 14.794 13.1875 14.2217 13.1875 13.625V8.5625C13.1875 7.96576 12.9504 7.39347 12.5285 6.97151C12.1065 6.54955 11.5342 6.3125 10.9375 6.3125V4.0625C10.9375 1.8875 9.175 0.125 7 0.125ZM9.8125 6.3125V4.0625C9.8125 3.31658 9.51618 2.60121 8.98874 2.07376C8.46129 1.54632 7.74592 1.25 7 1.25C6.25408 1.25 5.53871 1.54632 5.01126 2.07376C4.48382 2.60121 4.1875 3.31658 4.1875 4.0625V6.3125H9.8125Z" 
                fill={color} />
        </svg>
    )
}