import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Button from '../../components/Button/Button'
import { useModalContext } from '../../Context'
import ArrowLeft from '../../assets/icons/ArrowLeft'
import BracketPreview from '../../components/BracketPreview/BracketPreview'
import MobileBracketPreview from '../../components/BracketPreview/MobileBracketPreview'

type Props = {
    previousStep: () => void
}

export default function Matchups({ previousStep }: Props) {

    const { teams, setTeams } = useModalContext()

    const randomiseTeamOrder = () => {
        let newOrder = [...teams]

        newOrder.forEach((team, index) => {
            let swappingIndex = Math.floor(Math.random() * (index + 1))
            let originalPosition = newOrder[index]
            newOrder[index] = newOrder[swappingIndex]
            newOrder[swappingIndex] = originalPosition
        })

        setTeams(newOrder)
    }

    return (
        <>

            <div className='content__header'  id='matchups'>
                <div className='content__subheading'>
                    <button className='button-back' onClick={previousStep}>
                        <ArrowLeft className='button-back__icon' />
                        <p>Back</p>
                    </button>
                    <h4>Create your bracket</h4>
                    <ProgressBar length={3} current={2} />
                </div>
                <div className='content__titleblock'>
                    <div className='content__titles'>
                        <h1>Matchups</h1>
                        <p>Drag and drop your bracket matchups or randomise the order.</p>
                    </div>
                    <Button
                        type='tertiary'
                        size='small'
                        onClick={() => randomiseTeamOrder()}> 
                        Randomise
                    </Button>
                </div>

                <BracketPreview />
                <MobileBracketPreview />
            </div>
        </>
    )
}
