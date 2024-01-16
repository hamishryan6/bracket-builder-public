type Props = {
    strokeColour: string
    strokeWidth: number
    height: string
    side: 'right' | 'left'
    connectingToFinals?: boolean
}

export default function BracketLines({ strokeColour, strokeWidth, height, side, connectingToFinals }: Props) {

    if (connectingToFinals) {
        return (
            <div className="bracketlines__container">
                <svg
                    viewBox="0 0 200 200"
                    preserveAspectRatio="none"
                    height={height}
                    width={'100%'}
                    style={{ float: side }}
                >
                    <line
                        x1="0" y1='100' x2='200' y2='100'
                        style={{
                            fill: 'none',
                            stroke: strokeColour,
                            strokeMiterlimit: 10,
                            strokeWidth: strokeWidth,
                            vectorEffect: "non-scaling-stroke"
                        }} />
                </svg>
            </div>
        )
    } else switch (side) {
        case 'left': return (
            <div className="bracketlines__container">
                <svg
                    viewBox="0 0 200 200"
                    preserveAspectRatio="none"
                    height={height}
                    width={'calc(100% + var(--bracketline-overlap))'}
                    style={{ float: side }}
                >
                    <polyline
                        points="2 198, 198 198, 198 2, 2 2"
                        style={{
                            fill: 'none',
                            stroke: strokeColour,
                            strokeMiterlimit: 10,
                            strokeWidth: strokeWidth,
                            vectorEffect: "non-scaling-stroke"
                        }} />
                </svg>
            </div>
        )
        case 'right': return (
            <div className="bracketlines__container">
                <svg
                    viewBox="0 0 200 200"
                    preserveAspectRatio="none"
                    height={height}
                    width={'calc(100% + var(--bracketline-overlap))'}
                    style={{ float: side }}
                >
                    <polyline
                        points="198 198, 2 198, 2 2, 198 2"
                        style={{
                            fill: 'none',
                            stroke: strokeColour,
                            strokeMiterlimit: 10,
                            strokeWidth: strokeWidth,
                            vectorEffect: "non-scaling-stroke"
                        }} />
                </svg>
            </div>
        )
    }
}
