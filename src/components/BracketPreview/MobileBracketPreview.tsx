import React from 'react'
import BracketLines from '../BracketLines/BracketLines'
import Matchup from '../Matchup/Matchup'
import { useModalContext } from '../../Context'
import TeamCard from '../TeamCard/TeamCard'

export default function MobileBracketPreview() {
    const { bracketSize, teams } = useModalContext()

    switch (bracketSize) {
        case 8: return (
            <div className={`mobilebracket__main-8`}>
                <div className='mobilebracket__round3'>
                    <div className='matchup__main'>
                        <TeamCard
                            teamName={teams[0]}
                            number={1}
                        />
                        <div className='matchup__divider' />
                        <TeamCard
                            teamName={teams[7]}
                            number={8}
                        />
                    </div>

                    <div className='matchup__main'>
                        <TeamCard
                            teamName={teams[3]}
                            number={4}
                        />
                        <div className='matchup__divider' />
                        <TeamCard
                            teamName={teams[4]}
                            number={5}
                        />
                    </div>

                    <div className='matchup__main'>
                        <TeamCard
                            teamName={teams[1]}
                            number={2}
                        />
                        <div className='matchup__divider' />
                        <TeamCard
                            teamName={teams[6]}
                            number={7}
                        />
                    </div>

                    <div className='matchup__main'>
                        <TeamCard
                            teamName={teams[2]}
                            number={3}
                        />
                        <div className='matchup__divider' />
                        <TeamCard
                            teamName={teams[5]}
                            number={6}
                        />
                    </div>

                </div>

                <div className='mobilebracket__round3-gap'>
                    <BracketLines strokeColour='rgba(234, 219, 255, 0.12)' strokeWidth={1} height='100%' side='left' />
                    <BracketLines strokeColour='rgba(234, 219, 255, 0.12)' strokeWidth={1} height='100%' side='left' />
                </div>

                <div className='mobilebracket__round2'>
                    <div className='matchup__main'>
                        <TeamCard
                            condensed
                            undraggable
                        />
                        <TeamCard
                            condensed
                            undraggable
                        />
                    </div>

                    <div className='matchup__main'>
                        <TeamCard
                            condensed
                            undraggable
                        />
                        <TeamCard
                            condensed
                            undraggable
                        />
                    </div>
                </div>

                <div className='mobilebracket__round2-gap'>
                    <BracketLines strokeColour='rgba(234, 219, 255, 0.12)' strokeWidth={1} height='100%' side='left' connectingToFinals />
                </div>

                <div className='mobilebracket__round1'>
                    <div className='matchup__main'>
                        <TeamCard
                            condensed
                            undraggable
                        />
                        <TeamCard
                            condensed
                            undraggable
                        />
                    </div>
                </div>

            </div>
        )
        default: return (
            <div className={`mobilebracket__main-4`}>

                <div className='mobilebracket__round2'>
                    <div className='matchup__main'>
                        <TeamCard
                            teamName={teams[0]}
                            number={1}
                        />
                        <div className='matchup__divider' />
                        <TeamCard
                            teamName={teams[3]}
                            number={4}
                        />
                    </div>

                    <div className='matchup__main'>
                        <TeamCard
                            teamName={teams[1]}
                            number={2}
                        />
                        <div className='matchup__divider' />
                        <TeamCard
                            teamName={teams[2]}
                            number={3}
                        />
                    </div>
                </div>

                <div className='mobilebracket__round2-gap'>
                    <BracketLines strokeColour='rgba(234, 219, 255, 0.12)' strokeWidth={1} height='100%' side='left' />
                </div>

                <div className='mobilebracket__round1'>
                    <div className='matchup__main'>
                        <TeamCard
                            condensed
                            undraggable
                        />
                        <TeamCard
                            condensed
                            undraggable
                        />
                    </div>
                </div>

            </div>
        )
    }
}
