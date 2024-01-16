type Props = {
    className: string
}

export default function Bracket({ className }: Props) {
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 18" className={className}>
            <path d="m14,0H2C.9,0,0,.9,0,2v4c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2V2c0-1.1-.9-2-2-2Zm0,6H2V2h12v4Z" />
            <path d="m14,10H2c-1.1,0-2,.9-2,2v4c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2v-4c0-1.1-.9-2-2-2Zm0,6H2v-4h12v4Z" />
            <polygon points="28 8.5 28 9.5 22.5 9.5 22.5 15 16 15 16 14 21.5 14 21.5 4 16 4 16 3 22.5 3 22.5 8.5 28 8.5" />
        </svg>
    )
}
