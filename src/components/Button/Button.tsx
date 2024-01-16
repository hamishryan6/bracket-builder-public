import { DotLottiePlayer } from '@dotlottie/react-player'
import './Button.css'
import loadingSpinner from './../../assets/animations/white-spinner.json'

type Props = {
    children: string
    onClick: () => void
    size: 'small' | 'regular' | 'large'
    type: 'primary' | 'secondary' | 'tertiary'
    htmlType?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
    isLoading?: boolean
}

export default function Button({ children, onClick, size, type, htmlType, disabled, isLoading }: Props) {

    const renderChildren = () => {
        if (!isLoading) return children
        return (
            <DotLottiePlayer
                src={loadingSpinner}
                autoplay
                loop
                style={{
                    width: '24px'
                }}
            >
            </DotLottiePlayer>
        )
    }

    return (
        <button
            type={htmlType}
            onClick={onClick}
            className={`button-${size} button-${type} ${isLoading ? 'button-loading' : ''}`}
            disabled={disabled || isLoading}
        >
            {renderChildren()}
        </button>
    )
}
