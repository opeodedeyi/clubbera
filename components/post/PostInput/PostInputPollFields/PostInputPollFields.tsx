import SelectInput from '@/components/Form/SelectInput/SelectInput';
import styles from './PostInputPollFields.module.css';

interface SelectOption {
    label: string;
    value: string;
}

interface PostInputPollFieldsProps {
    pollQuestion: string;
    pollOptions: string[];
    pollDuration: number | null;
    durationOptions: SelectOption[];
    onQuestionChange: (value: string) => void;
    onOptionChange: (index: number, value: string) => void;
    onAddOption: () => void;
    onRemoveOption: (index: number) => void;
    onDurationChange: (value: number) => void;
}

export default function PostInputPollFields({
    pollQuestion,
    pollOptions,
    pollDuration,
    durationOptions,
    onQuestionChange,
    onOptionChange,
    onAddOption,
    onRemoveOption,
    onDurationChange
}: PostInputPollFieldsProps) {
    return (
        <div className={styles.pollFields}>
            <input
                type="text"
                className={styles.pollQuestion}
                placeholder="Ask a question..."
                value={pollQuestion}
                onChange={(e) => onQuestionChange(e.target.value)} />

            <div className={styles.pollOptionsContainer}>
                {pollOptions.map((option, index) => (
                    <div key={index} className={styles.pollOptionRow}>
                        <input
                            type="text"
                            className={styles.pollOption}
                            placeholder={`Choice ${index + 1}`}
                            value={option}
                            onChange={(e) => onOptionChange(index, e.target.value)} />
                        {pollOptions.length > 2 && (
                            <button
                                type="button"
                                className={styles.removeOption}
                                onClick={() => onRemoveOption(index)}>
                                ×
                            </button>
                        )}
                    </div>
                ))}
                {pollOptions.length < 6 && (
                    <button
                        type="button"
                        className={styles.addOption}
                        onClick={onAddOption}>
                        Add another Option
                    </button>
                )}
            </div>

            <SelectInput
                label="Duration"
                options={durationOptions}
                backgroundColor="var(--color-background-dark)"
                value={String(pollDuration || 24)}
                onChange={(value) => onDurationChange(value ? parseInt(value) : 24)}
                placeholder="Select duration" />
        </div>
    );
}
