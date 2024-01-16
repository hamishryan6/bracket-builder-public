import { useModalContext } from '../../Context'
import BracketLines from '../BracketLines/BracketLines'
import Matchup from '../Matchup/Matchup'
import './Bracket.css'

type Props = {
    currentRound?: number | 'Final'
}

export default function MobileBracket({ currentRound }: Props) {

    const { liveBracket, bracket } = useModalContext()

    switch (bracket.size) {
        case 8: return (
            <div className={`mobilebracket__main-8 currentround-${currentRound}`}>
                <div className='mobilebracket__round3'>
                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final8.matchups[0]}
                    />

                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final8.matchups[1]}
                    />

                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final8.matchups[2]}
                    />

                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final8.matchups[3]}
                    />
                </div>

                <div className='mobilebracket__round3-gap'>
                    <BracketLines
                        strokeColour='rgba(234, 219, 255, 0.12)'
                        strokeWidth={1}
                        height='100%'
                        side='left'
                    />
                    <BracketLines
                        strokeColour='rgba(234, 219, 255, 0.12)'
                        strokeWidth={1}
                        height='100%'
                        side='left'
                    />
                </div>

                <div className='mobilebracket__round2'>
                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final4.matchups[0]}
                    />
                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final4.matchups[1]}
                    />
                </div>

                <div className='mobilebracket__round2-gap'>
                    <BracketLines
                        strokeColour='rgba(234, 219, 255, 0.12)'
                        strokeWidth={1}
                        height='100%'
                        side='left'
                    />
                </div>

                <div className='mobilebracket__round1'>
                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final2.matchups[0]}
                    />
                </div>

            </div>
        )
        default: return (
            <div className={`mobilebracket__main-4 currentround-${currentRound}`}>
                <div className='mobilebracket__round2'>
                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final4.matchups[0]}
                    />

                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final4.matchups[1]}
                    />

                </div>

                <div className='mobilebracket__round2-gap'>
                    <BracketLines
                        strokeColour='rgba(234, 219, 255, 0.12)'
                        strokeWidth={1}
                        height='100%'
                        side='left'
                    />
                </div>

                <div className='mobilebracket__round1'>
                    <Matchup
                        currentRound={currentRound}
                        matchup={bracket.rounds.final2.matchups[0]}
                    />
                </div>

            </div>
        )
    }
}
