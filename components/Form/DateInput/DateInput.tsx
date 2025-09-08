import styles from '../Input.module.css';

interface DateInputProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    min?: string; // Minimum date (e.g., today's date)
    max?: string; // Maximum date
    className?: string;
    isRequired?: boolean;
    disabled?: boolean;
    error?: string;
}

const DateInput = (props: DateInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    // Get today's date in YYYY-MM-DD format as default minimum
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor={props.name}>
                {props.label}
            </label>

            <input
                id={props.name}
                name={props.name}
                type="date"
                className={props.className || styles.formInput}
                value={props.value || ''}
                onChange={handleChange}
                min={props.min || getTodayDate()} // Default to today's date
                max={props.max}
                required={props.isRequired}
                disabled={props.disabled} />

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
};

export default DateInput;