import { useEffect, useState } from 'react'
import BracketCard from '../../components/BracketCard/BracketCard'
import Button from '../../components/Button/Button'
import Nav from '../../components/Nav/Nav'
import './Brackets.css'
import { deleteBracketFromDatabase, getallBracketsByUser } from '../../services/FireStoreService'
import { useModalContext } from '../../Context'
import { bracket } from '../../types'
import { useNavigate } from 'react-router'
import { changeBracket } from '../../utilities'
import { DotLottiePlayer } from '@dotlottie/react-player'
import loadingSpinner from './../../assets/animations/white-spinner.json'

export default function Brackets() {

  const [brackets, setBrackets] = useState<bracket[]>([])
  const [areBracketsLoading, setAreBracketsLoading] = useState<boolean>(true)

  const { user, setBracket } = useModalContext()
  const navigate = useNavigate()

  const renderBracketCards = () => {
    if (areBracketsLoading) return (
      <div className='brackets__list-loading'>
        <DotLottiePlayer
          src={loadingSpinner}
          autoplay
          loop
          style={{
            width: '28px'
          }}
        >
        </DotLottiePlayer>
      </div>
    )
    if (brackets.length === 0) return (
      <div className='brackets__list-empty'>
        <p>You haven't made any brackets yet.</p>
      </div>
    )
    return brackets.map((bracket, index) => (
      <BracketCard
        key={index}
        zIndex={brackets.length - index}
        bracket={bracket}
        onClick={() => onBracketCardClick(bracket)}
        onDelete={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, bracket: bracket) => deleteBracket(e, bracket)}
      />
    ))
  }

  const deleteBracket = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, bracket: bracket) => {
    e.stopPropagation()
    if (!bracket.id) return
    try {
      const response = deleteBracketFromDatabase(bracket.id)
      if (!response) throw Error
      getBrackets()
    } catch (error) {
      console.log('Error deleting bracket')
    }
  }

  const onBracketCardClick = (bracket: bracket) => {
    changeBracket(bracket, (bracket: bracket) => setBracket(bracket))
    navigate(`/bracket/${bracket.id}`)
  }

  const getBrackets = async () => {
    setAreBracketsLoading(true)
    if (!user) return
    try {
      await getallBracketsByUser(user, (brackets: bracket[]) => setBrackets(brackets))
    } catch (error) {
      console.log('Error getting brackets', error)
    } finally {
      setAreBracketsLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return navigate('/')
    getBrackets()
  }, [user])


  return (
    <div className='brackets__main page__main'>
      <Nav />
      <div className='title__block'>
        <h1>My Brackets</h1>
        <p>Click on a bracket to view details</p>

        <Button
          type='primary'
          size='small'
          children='Create new'
          onClick={() => navigate('/builder')}
        />

      </div>

      <div className='brackets__container'>
        <div className={`brackets__list ${brackets.length === 1 ? 'brackets__list-single' : ''}`}>
          {renderBracketCards()}
        </div>

      </div>
    </div>
  )
}
