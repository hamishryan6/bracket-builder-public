import './Nav.css'
import logoLong from '../../assets/images/logo-long.png'
import Button from '../Button/Button'
import { useModalContext } from '../../Context'
import { signOutUser } from '../../services/AuthService'
import { useEffect } from 'react'
import { user } from '../../types'
import { useNavigate } from 'react-router'
import Bracket from '../../assets/icons/Bracket'

export default function Nav() {

  const { setIsAuthModalOpen, setAuthMode, user, setUser } = useModalContext()

  const navigate = useNavigate()

  const onLogInClick = () => {
    setIsAuthModalOpen(true)
    setAuthMode('Log In')
  }

  const onSignUpClick = () => {
    setIsAuthModalOpen(true)
    setAuthMode('Sign Up')
  }

  const onSignOut = () => {
    signOutUser((result: user | undefined) => setUser(result))
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  const renderNavContent = () => {
    switch (user) {
      case undefined: return (
        <div className='buttonlist-auth'>
          <Button size='small' type='secondary' onClick={() => onLogInClick()}>Log in</Button>
          <Button size='small' type='primary' onClick={() => onSignUpClick()}>Sign up</Button>
        </div>
      )
      default: return (
        <div className='nav__account__container'>
          <ul className='nav__account__content'>

            <li className='nav__account'>
              <div className='nav__account-avatar' />
              <p className='nav__account-fullname'>{user.firstName + ' ' + user.lastName}</p>
              <p className='nav__account-initials'>{user.firstName.charAt(0) + user.lastName.charAt(0)}</p>
            </li>

            <div className='nav__account__divider' />

            <div className='nav__account__item__container'>
              <li className='nav__account__item' onClick={() => navigate('/brackets')}>
                <Bracket className='icon__bracket' />
                <p>My brackets</p>
              </li>
            </div>

            <li className='nav__account__signout'>
              <Button
                size='small'
                type='tertiary'
                children='Sign out'
                onClick={() => onSignOut()}
              />
            </li>

          </ul>
        </div>
      )
    }
  }

  return (
    <nav className='nav__main'>
      <img src={logoLong} className='logo-small' onClick={() => navigate('/')} />
      {renderNavContent()}
    </nav>
  )
}
