import Button from '../Button/Button'
import './Input.css'

type Props = {
    value: string
    onChange: (input: string) => void
    placeholder: string
    buttonLabel?: string
    onEnter?: (event?: React.FormEvent<HTMLFormElement>) => void
    prefix?: string
    disabled?: boolean
    autoFocus?: boolean
    htmlType?: string
}

export default function Input({ value, onChange, placeholder, buttonLabel, onEnter, prefix, disabled, autoFocus, htmlType }: Props) {

    const renderNestedButton = () => {
        if (!buttonLabel || !onEnter) return
        return (
            <div className='input__button__container'>
                <Button type='tertiary' size='small' onClick={onEnter} htmlType='submit'>{buttonLabel}</Button>
            </div>
        )
    }

    const renderPrefix = () => {
        if (!prefix) return
        return <p className='input__prefix'>{prefix}</p>
    }

    return (
        <div className={`input__container ${disabled ? 'input__container-disabled' : ''} ${buttonLabel || onEnter ? 'input__container-withbutton' : ''} `}>
            {renderPrefix()}
            <input
                className='input'
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus={autoFocus}
                type={htmlType}
            />
            {renderNestedButton()}
        </div >
    )
} 