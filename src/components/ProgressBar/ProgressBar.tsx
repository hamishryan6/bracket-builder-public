import './ProgressBar.css'

type Props = {
    length: number
    current: number
}

export default function ProgressBar({ length, current }: Props) {

    const renderSteps = () => {
        return new Array(length).fill(0).map((step, index) => {
            if ((index + 1) === current) {
                return <div className='step-current' key={index} />
            } else if ((index + 1) < current ) {
                return <div className='step-complete' key={index} />
            } else {
                return <div className='step-future' key={index} />
            }
        })

    }

  return (
    <div className='progressBar__main'>
        {renderSteps()}
    </div>
  )
}
