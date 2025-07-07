import styles from './ToggleButtonGroup.module.css'


interface ToggleOption {
    value: string
    label: string
}

interface ToggleButtonGroupProps {
    options: ToggleOption[]
    activeValue: string
    onChange: (value: string) => void
    activeColor?: string
    className?: string
}

export default function ToggleButtonGroup({
    options,
    activeValue,
    onChange,
    activeColor = '--color-primary',
    className = ''
}: ToggleButtonGroupProps) {
    return (
        <div 
            className={`${styles.toggleGroup} ${className}`}
            style={{ '--active-color': `var(${activeColor})` } as React.CSSProperties}>
            {options.map((option) => (
                <button
                    key={option.value}
                    className={`${styles.toggleButton} ${
                        activeValue === option.value ? styles.active : styles.inactive
                    }`}
                    onClick={() => onChange(option.value)}
                    type="button">
                    {option.label}
                </button>
            ))}
        </div>
    )
}