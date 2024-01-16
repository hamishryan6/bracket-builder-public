import './Home.css'
import Button from '../../components/Button/Button'
import logoLong from '../../assets/images/logo-long.png'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import { useEffect } from 'react'
import { useModalContext } from '../../Context'
import { defaultBracket } from '../../defaultValues'

export default function Home() {

  const navigate = useNavigate()
  const { setBracket } = useModalContext()

  useEffect(() => {
    setBracket(defaultBracket)
  }, [])

  return (
    <div className='home__main page__main'>
      <Nav />
      <img src={logoLong} className='logo-large' />
      <Button
        size='regular'
        type='primary'
        onClick={() => navigate('/builder')}
      >Create a bracket</Button>
    </div>
  )
}
