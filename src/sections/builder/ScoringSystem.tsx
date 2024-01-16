import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { useModalContext } from '../../Context'
import ArrowLeft from '../../assets/icons/ArrowLeft'
import Dropdown from '../../components/Dropdown/Dropdown'
import { useEffect, useState } from 'react'
import { scoringSystem } from '../../types'

type Props = {
    previousStep: () => void
}

export default function ScoringSystem({ previousStep }: Props) {

    const { bracketSize, scoringSystem, setScoringSystem } = useModalContext()
    const [allRounds, setAllRounds] = useState<number>(1)

    const options = [1, 3, 5]
    const [isMixed, setIsMixed] = useState<boolean>()

    const renderAllRoundsValue = () => {
        if (bracketSize === 8) {
            if (scoringSystem.final === scoringSystem.round1 && scoringSystem.round1 === scoringSystem.round2) {
                setAllRounds(scoringSystem.final)
                setIsMixed(false)
            } else {
                setIsMixed(true)
            }
        } else {
            if (scoringSystem.final === scoringSystem.round1) {
                setAllRounds(scoringSystem.final)
                setIsMixed(false)
            } else {
                setIsMixed(true)
            }
        }
    }

    const toggleValue = (round: 'All rounds' | 'Round 1' | 'Round 2' | 'Final', value: number) => {
        let newScoringSystem: scoringSystem = { ...scoringSystem }
        if (round === 'All rounds') {
            newScoringSystem.round1 = value
            if (bracketSize === 8) newScoringSystem.round2 = value
            newScoringSystem.final = value
        } else if (round === 'Round 1') newScoringSystem.round1 = value
        else if (round === 'Round 2') newScoringSystem.round2 = value
        else newScoringSystem.final = value

        setScoringSystem(newScoringSystem)
    }

    const convertArrayToStrings = (array: Array<number>) => {
        let stringArray: string[] = []

        array.forEach((number, index) => {
            stringArray = [...stringArray, String(number)]
        })

        return stringArray
    }

    useEffect(() => {
        renderAllRoundsValue()
    }, [scoringSystem])

    return (
        <>
            <div className='content__header' id='scoring-system'>
                <div className='content__subheading'>
                    <h4>Create your bracket</h4>
                    <ProgressBar length={3} current={3} />
                </div>
                <div className='content__titleblock'>
                    <button className='button-back' onClick={previousStep}>
                        <ArrowLeft className='button-back__icon' />
                    </button>
                    <div className='content__titles'>
                        <h1>Scoring system</h1>
                        <p>Select which scoring system you would like to use for each round of your bracket.</p>
                    </div>
                </div>

            </div>
            <div className='scoringsystem__container'>

                <div className='scoringsystem__toggle' style={{ zIndex: 4 }}>
                    <p className='bold'>All rounds</p>
                    <Dropdown
                        options={convertArrayToStrings(options)}
                        selection={allRounds}
                        onSelection={(selection: string) => toggleValue('All rounds', parseFloat(selection))}
                        mixed={isMixed}
                        prefix='Best of'
                    />
                </div>

                <div className='divider' />

                <div className='scoringsystem__toggle' style={{ zIndex: 3 }}>
                    <p className='bold'>Round 1</p>
                    <Dropdown
                        options={convertArrayToStrings(options)}
                        selection={scoringSystem.round1}
                        onSelection={(selection: string) => toggleValue('Round 1', parseFloat(selection))}
                        prefix='Best of'
                    />
                </div>

                {bracketSize === 8 && <div className='scoringsystem__toggle' style={{ zIndex: 2 }}>
                    <p className='bold'>Round 2</p>
                    <Dropdown
                        options={convertArrayToStrings(options)}
                        selection={scoringSystem.round2}
                        onSelection={(selection: string) => toggleValue('Round 2', parseFloat(selection))}
                        prefix='Best of'
                    />
                </div>}

                <div className='scoringsystem__toggle' style={{ zIndex: 1 }} >
                    <p className='bold'>Final</p>
                    <Dropdown
                        options={convertArrayToStrings(options)}
                        selection={scoringSystem.final}
                        onSelection={(selection: string) => toggleValue('Final', parseFloat(selection))}
                        prefix='Best of'
                    />
                </div>

            </div>
        </>
    )
}
