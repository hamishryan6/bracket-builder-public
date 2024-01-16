import { useEffect, useState } from 'react'
import XMark from '../../../assets/icons/XMark'
import Button from '../../Button/Button'
import './ScoreModal.css'
import { useModalContext } from '../../../Context'
import { matchup } from '../../../types'

type Props = {
    closeModal: () => void
    onClick: () => void
    onClear: () => void
    team1Score: string
    team2Score: string
    onTeam1ScoreChange: (input: string) => void
    onTeam2ScoreChange: (input: string) => void
    newScore?: boolean
    disabled?: boolean
}

export default function ScoreModal({ closeModal, onClick, onClear, team1Score, team2Score, onTeam1ScoreChange, onTeam2ScoreChange, newScore, disabled }: Props) {

    const { currentMatchup } = useModalContext()

    const [currentGame, setCurrentGame] = useState<number>(1)

    const games = 5

    const renderGames = () => (
        new Array(games).fill(0).map((game, index) => (
            <div
                className={`game ${(index + 1) === currentGame ? 'game-active' : ''}`}
                children={index + 1}
                onClick={() => setCurrentGame(index + 1)}
            />
        ))
    )

    const numbersOnly = (e: React.ChangeEvent<HTMLInputElement>, setState: (input: string) => void) => {
        if (new RegExp('^[0-9]*$').test(e.target.value) === false) return
        setState(e.target.value)
    }

    return (
        <div className='modal__container' onClick={closeModal}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>

                <a
                    className='icon__container'
                    onClick={closeModal}
                    children={<XMark className='icon__xmark' />}
                />

                <div className='modal__titleblock'>
                    <h2>Enter result</h2>
                    <p>Enter the scores for the matchups below.</p>
                </div>

                {/* <div className='modal__games__container'>
                    <p className='bold'>Game</p>
                    <div className='modal__games'>
                        {renderGames()}
                    </div>
                </div> */}

                <div className='modal__scoreinputs'>
                    <input
                        inputMode='numeric'
                        className='input-score'
                        placeholder='0'
                        onChange={(e) => numbersOnly(e, onTeam1ScoreChange)}
                        value={team1Score}
                    />
                    <input
                        inputMode='numeric'
                        className='input-score'
                        placeholder='0'
                        onChange={(e) => numbersOnly(e, onTeam2ScoreChange)}
                        value={team2Score}
                    />
                    <p>{currentMatchup.team1?.name}</p>
                    <p>{currentMatchup.team2?.name}</p>
                </div>

                {disabled ? <p className='info-text'>Results cannot be changed if future rounds have been completed</p> : <div className='button-group'>


                    {!newScore && <Button
                        type='secondary'
                        size='regular'
                        onClick={onClear}
                        children='Clear score'
                        disabled={disabled}
                    />}

                    <Button
                        disabled={team1Score === '' || team2Score === '' || disabled}
                        type='primary'
                        size='regular'
                        onClick={onClick}
                        children='Save'
                    />
                </div>}
            </div>
        </div>
    )

}