import styles from '../Input.module.css';

interface TextInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    maxLength?: number;
    className?: string;
    isRequired?: boolean;
    disabled?: boolean;
    error?: string;
}

const TextInput = ( props: TextInputProps ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.formLabel}  htmlFor={props.name}>{props.label}</label>

            <input
                id={props.name}
                name={props.name}
                type={props.type || 'text'}
                className={props.className || styles.formInput}
                placeholder={props.placeholder}
                value={props.value || ''}
                onChange={handleChange}
                maxLength={props.maxLength}
                required={props.isRequired}
                disabled={props.disabled} />

            {props.error && <span className={styles.errorText}>{props.error}</span>}
        </div>
    );
}

export default TextInput;