import './Matchup.css'
import TeamCard from '../TeamCard/TeamCard'
import { useModalContext } from '../../Context'
import { matchup, team } from '../../types'
import { roundsByBracketSize } from '../../utilities'

type Props = {
    matchup: matchup
    currentRound?: number | 'Final'
}

export default function Matchup({ matchup, currentRound }: Props) {

    const { setIsScoreModalOpen, setCurrentMatchup } = useModalContext()

    const isCurrentRound = currentRound === roundsByBracketSize(matchup.teamsRemaining)

    const onClick = () => {
        setCurrentMatchup(matchup)
        if (!isCurrentRound) return
        setIsScoreModalOpen(true)
    }

    const renderMainClassNames = () => {
        let className = 'matchup__main'

        if (matchup.team1 && matchup.team2 && isCurrentRound) {
            className = className + ' matchup__main-clickable'
        }

        // switch (matchup.teamsRemaining) {
        //     case 2: return className + ' matchup__main-2'
        //     case 4: return className + ' matchup__main-4'
        //     default: return className
        // }

        return className
    }

    const renderClickableArea = () => {
        if (!isCurrentRound) return
        if (!matchup.team1 || !matchup.team2) return
        return <div className='matchup__clickarea' />
    }

    const renderScore = (team: 'team1' | 'team2') => {
        let index: 'team1score' | 'team2score' = team + 'score' as 'team1score' | 'team2score'
        if (!matchup.result) return
        if (!matchup.result[index]) return
        return <p className='teamcard__score'>{matchup.result[index]}</p>
    }

    const renderTeamDetails = (team: 'team1' | 'team2') => {
        if (!isCurrentRound) {
            return (
                <div className='matchup__team matchup__team__condensed'>
                    <p className='teamcard__number'>{matchup[team]?.number}</p>
                </div>

            )
        } else if (!matchup[team]?.name) {
            return (
                <div className={!matchup.team1?.name && !matchup.team2?.name ? 'matchup__team matchup__team__tbd matchup__empty' : 'matchup__team matchup__team__tbd'} >
                    <p>TBD</p>
                    {renderScore(team)}
                </div>
            )
        } else if (matchup.result && matchup.result.winner.name === matchup[team]?.name) {
            return (
                <div className={'matchup__team matchup__team__winner ' + `matchup__${team}`}>
                    <p className='teamcard__number'>{matchup[team]?.number}.</p>
                    <p className='teamcard__name'>{matchup[team]?.name}</p>
                    {renderScore(team)}
                </div>
            )
        } else if (matchup.result && matchup.result.winner.name !== matchup[team]?.name) {
            return (
                <div className={'matchup__team matchup__team__loser ' + `matchup__${team}`}>
                    <p className='teamcard__number'>{matchup[team]?.number}.</p>
                    <p className='teamcard__name'>{matchup[team]?.name}</p>
                    {renderScore(team)}
                </div>
            )
        } else {
            return (
                <div className='matchup__team'>
                <p className='teamcard__number'>{matchup[team]?.number}.</p>
                <p className='teamcard__name'>{matchup[team]?.name}</p>
                {renderScore(team)}
            </div>
            )
        }
    }

    return (
        <div
            className={renderMainClassNames()}
            onClick={() => onClick()}
        >
            {renderClickableArea()}

            {renderTeamDetails('team1')}
            <div className='matchup__divider' />
            {renderTeamDetails('team2')}
        </div>
    )
}
