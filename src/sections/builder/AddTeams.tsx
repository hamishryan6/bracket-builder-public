import React, { useEffect, useState } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Dropdown from '../../components/Dropdown/Dropdown'
import Input from '../../components/Input/Input'
import TeamCard from '../../components/TeamCard/TeamCard'
import { useModalContext } from '../../Context'

type Props = {
    bracketSize: 4 | 8
    setBracketSize: (size: 4 | 8) => void
}

export default function AddTeams({ bracketSize, setBracketSize }: Props) {

    const [currentTeamInput, setCurrentTeamInput] = useState<string>('')
    const { teams, setTeams } = useModalContext()

    const renderTeamCards = () => {
        let teamList: Array<string | 0> = [...teams]

        if (bracketSize > teams.length) {
            const emptyTeams: 0[] = new Array(bracketSize - teams.length).fill(0)
            teamList.push(...emptyTeams)
        }

        return teamList.map((team, index) => {
            if ((index + 1) > bracketSize) return
            if (team !== 0) return <TeamCard teamName={team} number={index + 1} onDelete={() => deleteTeam(index)} key={index} undraggable />
            return <TeamCard
                isEmpty
                teamName={'Team #' + (index + 1)}
                key={index}
                undraggable
            />
        })
    }

    const deleteTeam = (index: number) => {
        let teamList = [...teams]
        teamList.splice(index, 1)

        setTeams(teamList)
    }

    const addNewTeam = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()
        if (currentTeamInput === '') return
        let teamList = [...teams]
        teamList.push(currentTeamInput)
        setTeams(teamList)
        setCurrentTeamInput('')
    }

    const removeExtraTeams = () => {
        if (teams.length <= bracketSize) return
        let teamList = [...teams]
        teamList.length = bracketSize
        setTeams(teamList)
    }

    const selectBracketSize = (selection: string) => {
        if (parseFloat(selection) !== 4 && parseFloat(selection) !== 8) return
        setBracketSize(parseFloat(selection) as 4 | 8)
    }

    useEffect(() => {
        removeExtraTeams()
    }, [bracketSize])

    return (
        <>

            <div className='content__header' id='add-teams'>
                <div className='content__subheading'>
                    <h4>Create your bracket</h4>
                    <ProgressBar length={3} current={1} />
                </div>
                <div className='content__titleblock'>
                    <div className='content__titles'>
                        <h1>Add teams</h1>
                        <p>Enter the teams that you want to include in your bracket.</p>
                    </div>
                    <Dropdown
                        options={[String(4), String(8)]}
                        suffix='teams'
                        selection={String(bracketSize)}
                        onSelection={(selection: string) => selectBracketSize((selection))}
                    />
                </div>
                <form onSubmit={(e) => addNewTeam(e)}>
                    <Input
                        value={currentTeamInput}
                        onChange={(input: string) => setCurrentTeamInput(input)}
                        placeholder='Enter team name'
                        buttonLabel='Add team'
                        onEnter={() => addNewTeam()}
                        prefix={(teams.length + 1) + '.'}
                        disabled={teams.length >= bracketSize}
                        autoFocus
                    />
                </form>
            </div>

            <div className='teamlist__container'>
                <h4>Entered teams</h4>
                <div className='teamlist__grid'>
                    {renderTeamCards()}
                </div>
            </div>
        </>
    )
}
