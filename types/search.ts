export type SearchSize = 'small' | 'large'

export interface SearchBarProps {
    size?: SearchSize
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    onSubmit?: (value: string) => void
    onFocus?: () => void
    onBlur?: () => void
    className?: string
}