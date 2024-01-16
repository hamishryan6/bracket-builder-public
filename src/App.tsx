import './App.css';
import Builder from './pages/Builder/Builder';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom'
import Context from './Context';
import { useEffect, useState } from 'react';
import { bracket, matchup, scoringSystem, team, user } from './types';
import { defaultBracket, defaultMatchup, defaultScoringSystem } from './defaultValues';
import MyBracket from './pages/MyBracket/MyBracket';
import AuthModal from './components/Modals/AuthModal/AuthModal';
import { getUserDetails } from './services/AuthService';
import Brackets from './pages/Brackets/Brackets';

function App() {

  const [teams, setTeams] = useState<string[]>([])

  const [bracketSize, setBracketSize] = useState<4 | 8>(4)
  const [scoringSystem, setScoringSystem] = useState<scoringSystem>(defaultScoringSystem)
  const [bracketName, setBracketName] = useState<string>('')
  const [bracket, setBracket] = useState<bracket>(defaultBracket)
  const [liveBracket, setLiveBracket] = useState<boolean>(false)
  const [currentMatchup, setCurrentMatchup] = useState<matchup>(defaultMatchup)

  const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)

  const [authMode, setAuthMode] = useState<'Log In' |'Sign Up'>('Sign Up')
  const [user, setUser] = useState<user | undefined>()

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return
    return <AuthModal
      closeModal={() => setIsAuthModalOpen(false)}
    />
  }

  useEffect(() => {
    setUser(getUserDetails())
  }, [])
  

  return (
    <Context.Provider value={{ teams, setTeams, bracketSize, setBracketSize, scoringSystem, setScoringSystem, bracketName, setBracketName, bracket, setBracket, liveBracket, setLiveBracket, isScoreModalOpen, setIsScoreModalOpen, currentMatchup, setCurrentMatchup, isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, user, setUser }}>
      {renderAuthModal()}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/builder' element={<Builder />} />
        <Route path='/newbracket' element={<MyBracket />} />
        <Route path='/brackets' element={<Brackets />} />
        <Route path='/bracket/:bracketId' element={<MyBracket />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
