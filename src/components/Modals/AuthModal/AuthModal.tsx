import './AuthModal.css'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import XMark from '../../../assets/icons/XMark'
import { useState } from 'react'
import { logIn, signUp } from '../../../services/AuthService'
import { useModalContext } from '../../../Context'
import { user } from '../../../types'
import { saveBracketAfterSignIn } from '../../../utilities'

type Props = {
    closeModal: () => void
}

export default function AuthModal({ closeModal }: Props) {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false)

    const { authMode, setAuthMode, setIsAuthModalOpen, setUser, bracket, setBracket, user } = useModalContext()

    const authHandler = () => {
        switch (authMode) {
            case 'Log In': return logInUser()
            case 'Sign Up': return signUpUser()
        }
    }

    const signUpUser = async () => {
        if (password !== confirmPassword) return console.log('Passwords do not match')
        setIsAuthLoading(true)
        try {
            const result = await signUp(firstName, lastName, email, password, (result: user | undefined) => setUser(result))
            if (!result) throw Error('Error signing up user')
            await saveBracketAfterSignIn(bracket, result, setBracket)
            setIsAuthModalOpen(false)
        } catch (error) {
            console.log('Error signing up', error)
        } finally {
            setIsAuthLoading(false)
        }
    }

    const logInUser = async () => {
        setIsAuthLoading(true)
        try {
            const result = await logIn(email, password, (result: user | undefined) => setUser(result))
            if (!result) throw Error('Error logging in user')
            await saveBracketAfterSignIn(bracket, result, setBracket)
            setIsAuthModalOpen(false)
        } catch (error) {
            console.log('Error logging in', error)
        } finally {
            setIsAuthLoading(false)
        }
    }

    switch (authMode) {
        case 'Sign Up': return (
            <div className='modal__container' onClick={closeModal}>
                <div className='modal' onClick={(e) => e.stopPropagation()}>

                    <a
                        className='icon__container'
                        onClick={closeModal}
                        children={<XMark className='icon__xmark' />}
                    />

                    <div className='modal__titleblock'>
                        <h2>Create an account</h2>
                        <p>Enter the below details to start saving and sharing brackets!</p>
                    </div>

                    <div className='modal__inputgrid'>
                        <div className='modal__input__pair'>
                            <Input
                                value={firstName}
                                onChange={(input: string) => setFirstName(input)}
                                placeholder='First name'
                                autoFocus
                            />
                            <Input
                                value={lastName}
                                onChange={(input: string) => setLastName(input)}
                                placeholder='Last name'
                            />
                        </div>

                        <Input
                            value={email}
                            onChange={(input: string) => setEmail(input)}
                            placeholder='Email'
                        />

                        <Input
                            value={password}
                            onChange={(input: string) => setPassword(input)}
                            placeholder='Password'
                            htmlType='password'
                        />

                        <Input
                            value={confirmPassword}
                            onChange={(input: string) => setConfirmPassword(input)}
                            placeholder='Confirm password'
                            htmlType='password'
                        />

                    </div>

                    <div className='modal__button-stack'>
                        <Button
                            type='primary'
                            size='regular'
                            onClick={() => authHandler()}
                            children={'Sign Up'}
                            isLoading={isAuthLoading}
                        />

                        <Button
                            type='secondary'
                            size='regular'
                            onClick={() => setAuthMode('Log In')}
                            children={`Already have an account?`}
                            disabled={isAuthLoading}
                        />
                    </div>
                </div>
            </div>
        )
        case 'Log In': return (
            <div className='modal__container' onClick={closeModal}>
                <div className='modal' onClick={(e) => e.stopPropagation()}>

                    <a
                        className='icon__container'
                        onClick={closeModal}
                        children={<XMark className='icon__xmark' />}
                    />

                    <div className='modal__titleblock'>
                        <h2>Sign in</h2>
                        <p>Enter the below details to view your brackets</p>
                    </div>

                    <div className='modal__inputgrid'>
                        <Input
                            value={email}
                            onChange={(input: string) => setEmail(input)}
                            placeholder='Email'
                        />

                        <Input
                            value={password}
                            onChange={(input: string) => setPassword(input)}
                            placeholder='Password'
                            htmlType='password'
                        />

                    </div>

                    <div className='modal__button-stack'>
                        <Button
                            type='primary'
                            size='regular'
                            onClick={() => authHandler()}
                            children='Log In'
                            isLoading={isAuthLoading}
                        />

                        <Button
                            type='secondary'
                            size='regular'
                            onClick={() => setAuthMode('Sign Up')}
                            children={`Don't have an account?`}
                            disabled={isAuthLoading}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
