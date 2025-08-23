import styles from '../Input.module.css';

interface NumberInputProps {
    name?: string;
    label?: string;
    placeholder?: string;
    value: number | '';
    onChange: (value: number | '') => void;
    min?: number;
    max?: number;
    step?: number;
    maxLength?: number;
    isRequired?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}

const NumberInput = ( props: NumberInputProps ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        // Allow empty string for clearing the input
        if (value === '') {
            props.onChange('');
            return;
        }
        
        // Convert to number and validate
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            props.onChange(numValue);
        }
    };

    return (
        <div className={styles.inputContainer}>
            {props.label && <label className={styles.formLabel} htmlFor={props.name}>{props.label}</label>}

            <input
                id={props.name}
                name={props.name}
                type="number"
                className={props.className || styles.formInput}
                placeholder={props.placeholder}
                value={props.value === '' ? '' : props.value}
                onChange={handleChange}
                min={props.min}
                max={props.max}
                step={props.step}
                maxLength={props.maxLength}
                required={props.isRequired}
                disabled={props.disabled} />

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
}

export default NumberInput;