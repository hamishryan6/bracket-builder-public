import { useState } from 'react'
import CaretDown from '../../assets/icons/CaretDown'
import './Dropdown.css'

type Props = {
    options: string[]
    selection: number | string | undefined
    suffix?: string
    prefix?: string
    onSelection: (selection: string) => void
    mixed?: boolean
}

export default function Dropdown({ options, selection, prefix, suffix, onSelection, mixed }: Props) {

    const [dropdownActive, setDropdownActive] = useState<boolean>(false)

    const renderText = (type: 'prefix' | 'suffix', isMixed?: boolean) => {
        if (type === 'prefix') {
            if (!prefix || isMixed) return
            return prefix + ' '
        } else {
            if (!suffix || isMixed) return
            return ' ' + suffix
        }
    }

    const renderOptions = () => {
        return options.map((option, index) => {
            if (option === selection) return
            return (
                <li onClick={() => onSelection(option)}
                    className='dropdown__option'
                    key={index}
                    value={option}
                >
                    {renderText('prefix')}{option}{renderText('suffix')}
                </li>
            )
        })
    }

    return (
        <div className='dropdown__container'>
            <ul className='dropdown' role='menu' onClick={() => setDropdownActive(!dropdownActive)}>
                <li className={`dropdown__selection ` + (mixed ? 'dropdown__selection-mixed' : '')}>
                    {renderText('prefix', mixed)}{mixed ? 'Mixed' : selection}{renderText('suffix')}
                    <CaretDown className='icon__caret-down' />
                </li>
                {dropdownActive && renderOptions()}
            </ul>
        </div>
    )
}
