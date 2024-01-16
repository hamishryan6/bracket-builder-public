import { useModalContext } from '../../Context'
import XMark from '../../assets/icons/XMark'
import './TeamCard.css'

type Props = {
    number?: number | undefined
    teamName?: string | undefined
    isEmpty?: boolean
    onDelete?: () => void
    condensed?: boolean
    score?: number
    win?: boolean
    undraggable?: boolean
}

export default function TeamCard({ number, teamName, isEmpty, onDelete, condensed, score, win, undraggable }: Props) {

    const { teams, setTeams, liveBracket } = useModalContext()

    const handleOnDrag = (e: React.DragEvent, team: string | undefined) => {
        if (!team) return
        e.dataTransfer.setData('draggedTeam', team)

        document.getElementById(team)?.classList.add('teamcard__main-ghost')

    }

    const handleOnDrop = (e: React.DragEvent, team: string | undefined) => {
        if (!team) return
        const draggedTeam = e.dataTransfer.getData('draggedTeam')
        swapTwoTeams(draggedTeam, team)

        document.querySelector('.teamcard__main-dropzone')?.classList.remove('teamcard__main-dropzone')
        document.getElementById(draggedTeam)?.classList.remove('teamcard__main-ghost')
    }

    const renderNumber = () => {
        if (!number) return
        return <p className='teamcard__number'>{number}{condensed ? '' : '.'}</p>
    }

    const renderDeleteButton = () => {
        if (isEmpty || !onDelete) return
        return <a onClick={onDelete}> <XMark className='icon__xmark' /> </a>
    }

    const renderContent = () => {
        if (condensed) return renderNumber()
        return <>
            {renderNumber()}
            <p className='teamcard__name'>{teamName ?? 'TBD'}</p>
            {renderDeleteButton()}
            <p className='teamcard__score'>{score}</p>
        </>
    }

    const swapTwoTeams = (team1: string, team2: string) => {
        let newOrder = [...teams]

        const team1Index = newOrder.indexOf(team1)
        const team2Index = newOrder.indexOf(team2)

        if (team1Index === -1 || team2Index === -1) return

        newOrder[team1Index] = newOrder[team2Index]
        newOrder[team2Index] = team1

        setTeams(newOrder)
    }

    const onDragEnter = (e: React.DragEvent, team: string | undefined) => {
        e.preventDefault()
        if (!team) return
        document.getElementById(team)?.classList.add('teamcard__main-dropzone')
    }

    const onDragLeave = (e: React.DragEvent, team: string | undefined) => {
        if (!team) return
        document.getElementById(team)?.classList.remove('teamcard__main-dropzone')
    }

    const renderMainClassNames = () => {
        let className = 'teamcard__main'
        
        if (isEmpty) className = className + ' teamcard__main-empty'
        if (condensed && !teamName) className = className + ' teamcard__main-condensed'
        if (condensed && teamName) className = className + ' teamcard__main-condensed-filled'
        if (!teamName) className = className + ' teamcard__main-tbd'
        if (!liveBracket && !undraggable) className = className + ' teamcard__main-draggable'
        if (score && win)className = className + ' teamcard__main-win'
        if (score && !win)className = className + ' teamcard__main-loss'

        return className
    }

    return (
        <div
            id={teamName}
            className={renderMainClassNames()}
            draggable={!liveBracket && !undraggable}
            onDragStart={(e) => handleOnDrag(e, teamName)}
            onDrop={(e) => handleOnDrop(e, teamName)}
            onDragOver={(e) => onDragEnter(e, teamName)}
            onDragLeave={(e) => onDragLeave(e, teamName)}

            children={renderContent()}
        />
    )
} 
