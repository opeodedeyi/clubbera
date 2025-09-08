import styles from '../Input.module.css';

interface TimeInputProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    min?: string; // Minimum time (HH:MM format)
    max?: string; // Maximum time (HH:MM format)
    step?: number; // Time step in seconds (default: 900 = 15 minutes)
    className?: string;
    isRequired?: boolean;
    disabled?: boolean;
    error?: string;
}

const TimeInput = (props: TimeInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor={props.name}>
                {props.label}
            </label>

            <input
                id={props.name}
                name={props.name}
                type="time"
                className={props.className || styles.formInput}
                value={props.value || ''}
                onChange={handleChange}
                min={props.min}
                max={props.max}
                step={props.step || 900} // Default to 15-minute intervals
                required={props.isRequired}
                disabled={props.disabled} />

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
};

export default TimeInput;