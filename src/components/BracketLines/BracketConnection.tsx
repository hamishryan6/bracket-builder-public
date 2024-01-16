type Props = {
    strokeColour: string
    strokeWidth: number
    height: string
}

export default function BracketConnection({ strokeColour, strokeWidth, height }: Props) {
    return (
        <div className="bracketconnection__container">
            <svg
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
                height={height}
                width={'100%'}
            >
                <polyline
                    points="1 1 199 1 199 199 1 199"
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
