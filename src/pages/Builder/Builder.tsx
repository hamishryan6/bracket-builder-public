import './Builder.css'
import Nav from '../../components/Nav/Nav'
import { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import AddTeams from '../../sections/builder/AddTeams'
import Matchups from '../../sections/builder/Matchups'
import { useModalContext } from '../../Context'
import ScoringSystem from '../../sections/builder/ScoringSystem'
import NameBracketModal from '../../components/Modals/NameBracketModal/NameBracketModal'
import { useNavigate } from 'react-router'
import { createBracket } from '../../utilities'
import { bracket } from '../../types'
import { defaultScoringSystem } from '../../defaultValues'

export default function Builder() {

    const [step, setStep] = useState<'Add teams' | 'Matchups' | 'Scoring system'>('Add teams')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isBracketCreationLoading, setIsBracketCreationLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const { teams, bracketSize, setBracketSize, bracketName, setBracketName, scoringSystem, setBracket, user, setTeams, setScoringSystem, setLiveBracket } = useModalContext()

    const finishBuilding = async () => {
        setIsBracketCreationLoading(true)
        try {
            await createBracket(bracketName, bracketSize, teams, scoringSystem, user, (bracket: bracket) => setBracket(bracket))
            navigate('/newBracket')
        } catch (error) {
            console.log(error)
        } finally {
            setIsBracketCreationLoading(false)
        }
    }

    const renderModal = () => {
        if (!isModalOpen) return
        return <NameBracketModal
            closeModal={() => setIsModalOpen(false)}
            bracketName={bracketName}
            onChange={(input: string) => setBracketName(input)}
            onClick={() => finishBuilding()}
            isLoading={isBracketCreationLoading}
        />
    }

    const nextStep = () => {
        switch (step) {
            case 'Add teams': return setStep('Matchups')
            case 'Matchups': return setIsModalOpen(true)
            case 'Scoring system': return setIsModalOpen(true)
        }
    }

    const previousStep = () => {
        switch (step) {
            case 'Add teams': return
            case 'Matchups': return setStep('Add teams')
            case 'Scoring system': return setStep('Matchups')
        }
    }

    const renderSection = () => {
        switch (step) {
            case 'Add teams': return (
                <AddTeams
                    bracketSize={bracketSize}
                    setBracketSize={(size: 4 | 8) => setBracketSize(size)}
                />
            )
            case 'Matchups': return (
                <Matchups
                    previousStep={() => previousStep()}
                />
            )
            case 'Scoring system': return (
                <ScoringSystem
                    previousStep={() => previousStep()}
                />
            )
        }
    }

    useEffect(() => {
        setLiveBracket(false)
        sessionStorage.removeItem('bracket')

        setBracketName('')
        setBracketSize(4)
        setScoringSystem(defaultScoringSystem)
        setTeams([])
    }, [])


    return (
        <div className='builder__main page__main'>
            <Nav />
            {renderModal()}

            <div className='content__container'>
                {renderSection()}
            </div>

            <Button
                size='large'
                type='primary'
                onClick={() => nextStep()}
                children={step === 'Matchups' ? 'Create bracket' : 'Next'}
                disabled={teams.length !== bracketSize}
            />
        </div>
    )
}
