import Icon from '@/components/ui/Icon/Icon';
import styles from './CopyInput.module.css';

interface CopyInputProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onClick?: () => void;
    className?: string;
    isRequired?: boolean;
    disabled?: boolean;
    copied?: boolean;
}

const CopyInput = ( props: CopyInputProps ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type='text'
                id={props.name}
                name={props.name}
                onChange={handleChange}
                disabled={props.disabled}
                value={props.value || ''}
                required={props.isRequired}
                placeholder={props.placeholder}
                className={props.className || styles.formInput} />

            <button className={styles.copyButton} type='button' onClick={props.onClick}>
                {props.copied ? 
                    <Icon name="tickStylish" size="sm" color='var(--color-text)' /> :
                    <Icon name="copy" size="sm" color='var(--color-text)' />
                }
            </button>
        </div>
    );
}

export default CopyInput;