import styles from '../Input.module.css';

interface TextInputProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    isRequired?: boolean;
    disabled?: boolean;
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
                className={styles.formInput}
                placeholder={props.placeholder}
                value={props.value || ''}
                onChange={handleChange}
                required={props.isRequired}
                disabled={props.disabled} />
        </div>
    );
}

export default TextInput;