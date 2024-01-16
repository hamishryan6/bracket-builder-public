import Duplicate from '../../assets/icons/Duplicate'
import TrashCan from '../../assets/icons/TrashCan'
import { bracket } from '../../types'
import { dateToString } from '../../utilities'
import './BracketCard.css'

type Props = {
    zIndex: number
    bracket: bracket
    onClick: () => void
    onDelete: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, bracket: bracket) => void
}

export default function BracketCard({ zIndex, bracket, onClick, onDelete }: Props) {
    return (
        <div className='bracketcard__main' style={{ zIndex: zIndex }} onClick={onClick}>
            <div className='bracketcard__titleblock'>
                <p className='bracketcard__title'>{bracket.name}</p>
                <p className='bracketcard__detail'>{bracket.size} teams</p>
            </div>
            {bracket.dateCreated && <p>{dateToString(bracket.dateCreated)}</p>}

            <div className='bracketcard__actions'>
                <a className='bracketcard__action' onClick={(e) => onDelete(e, bracket)}>
                    <TrashCan className='icon__bracketcard-action' />
                    <div className='bracketcard__action-tooltip'>Delete</div>
                </a>

                <a className='bracketcard__action'>
                    <Duplicate className='icon__bracketcard-action' />
                    <div className='bracketcard__action-tooltip'>Duplicate</div>
                </a>
            </div>
        </div>
    )
}
