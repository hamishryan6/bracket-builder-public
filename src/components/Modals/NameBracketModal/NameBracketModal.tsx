import XMark from '../../../assets/icons/XMark'
import Button from '../../Button/Button'
import Input from '../../Input/Input'
import './NameBracketModal.css'

type Props = {
    closeModal: () => void
    bracketName: string
    onChange: (input: string) => void
    onClick: () => void
    isLoading?: boolean
}

export default function NameBracketModal({ closeModal, bracketName, onChange, onClick, isLoading }: Props) {

    return (
        <div className='modal__container' onClick={closeModal}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>

                <a
                className='icon__container'
                onClick={closeModal}
                children={<XMark className='icon__xmark' />}
                />

                <div className='modal__titleblock'>
                    <h2>Name your bracket</h2>
                    <p>Give your new bracket a name to remember it by.</p>
                </div>

                <Input
                    value={bracketName}
                    onChange={onChange}
                    placeholder='My new bracket'
                    autoFocus
                />

                <Button
                    type='primary'
                    size='regular'
                    onClick={onClick}
                    children='Done'
                    isLoading={isLoading}
                />
            </div>
        </div>
    )

}