import { useEffect, useState } from 'react'
import { useModalContext } from '../../Context'
import Nav from '../../components/Nav/Nav'
import './MyBracket.css'
import Bracket from '../../components/Bracket/Bracket'
import Trophy from '../../assets/icons/Trophy'
import ScoreModal from '../../components/Modals/ScoreModal/ScoreModal'
import { checkForFutureResults, createResult, createRoundList, deleteResult, roundsByBracketSize } from '../../utilities'
import { bracket } from '../../types'
import { useNavigate } from 'react-router'
import MobileBracket from '../../components/Bracket/MobileBracket'

export default function MyBracket() {

    const { liveBracket, setLiveBracket, isScoreModalOpen, setIsScoreModalOpen, bracket, setBracket, currentMatchup, user } = useModalContext()
    const [currentRound, setCurrentRound] = useState<number>(roundsByBracketSize(bracket.size))

    const [team1Score, setTeam1Score] = useState<string>('')
    const [team2Score, setTeam2Score] = useState<string>('')

    const navigate = useNavigate()

    const renderRounds = (rounds: Array<number | 'Final'> | undefined) => {
        if (rounds === undefined) return
        return rounds.map((round, index) => (
            <div
                className={`round ${rounds.length - index === currentRound ? 'round-active' : ''}`}
                onClick={() => setCurrentRound(rounds.length - index)}
                key={index}
            >
                {(index + 1) === rounds.length ? <Trophy weight={rounds.length - index === currentRound ? 'regular' : 'light'} className='icon__trophy' /> : round}
            </div>
        ))
    }

    const onScoreUpdate = () => {
        setIsScoreModalOpen(false)
        createResult(bracket, currentMatchup, parseInt(team1Score), parseInt(team2Score), user, (update: bracket) => setBracket(update))
    }

    const onScoreClear = () => {
        setIsScoreModalOpen(false)
        deleteResult(bracket, currentMatchup, user, (deleted: bracket) => setBracket(deleted))
    }

    const renderScoreModal = () => {
        if (!isScoreModalOpen) return
        return <ScoreModal
            closeModal={() => setIsScoreModalOpen(false)}
            onClick={() => onScoreUpdate()}
            onClear={() => onScoreClear()}
            team1Score={team1Score}
            team2Score={team2Score}
            onTeam1ScoreChange={(input: string) => setTeam1Score(input)}
            onTeam2ScoreChange={(input: string) => setTeam2Score(input)}
            newScore={!currentMatchup.result}
            disabled={checkForFutureResults(bracket, currentMatchup)}
        />
    }

    useEffect(() => {
        setLiveBracket(true)
        if (sessionStorage.getItem('bracket') === null && bracket.size === 0) navigate('/')
        if (bracket.size === 0) return setBracket(JSON.parse(sessionStorage.getItem('bracket') as string))
        sessionStorage.setItem('bracket', JSON.stringify(bracket))
    }, [])

    useEffect(() => {
        if (bracket.size === 0) return
        setCurrentRound(roundsByBracketSize(bracket.size))
    }, [bracket.size])

    useEffect(() => {
        if (isScoreModalOpen) {
            if (!currentMatchup.result) return
            if (currentMatchup.result.team1score) setTeam1Score(String(currentMatchup.result.team1score))
            if (currentMatchup.result.team2score) setTeam2Score(String(currentMatchup.result.team2score))
        } else {
            setTeam1Score('')
            setTeam2Score('')
        }
    }, [isScoreModalOpen])

    return (
        <div className='mybracket__main page__main'>
            <Nav />
            {renderScoreModal()}

            <div className='mybracket__container content__container'>
                <div className='mybracket__header'>
                    <div className='mybracket__titleblock'>
                        <h2>{bracket.name}</h2>
                        <p>Click on the matchup to enter a result</p>
                    </div>

                    <div className='mybracket__rounds'>
                        <p className='bold'>Round</p>
                        <div className='roundcontainer'>
                            {renderRounds(createRoundList(bracket.size))}
                        </div>
                    </div>
                </div>

                {bracket.size !== 0 && <>
                    <Bracket currentRound={currentRound} />
                    <MobileBracket currentRound={currentRound} />
                </>
                }

            </div>
        </div>
    )
}
