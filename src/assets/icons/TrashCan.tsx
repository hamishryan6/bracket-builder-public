type Props = {
    className: string
}

export default function TrashCan({ className }: Props) {
    return (
        <svg viewBox="0 0 512 512" className={className}>
            <path d="m164.2,39.5l-15.3,24.5h150.2l-15.3-24.5c-2.9-4.7-8.1-7.5-13.6-7.5h-92.5c-5.5,0-10.6,2.8-13.6,7.5h.1Zm146.8-16.9l25.9,41.4h95.1c8.8,0,16,7.2,16,16s-7.2,16-16,16h-16v336c0,44.2-35.8,80-80,80H112c-44.2,0-80-35.8-80-80V96h-16c-8.8,0-16-7.2-16-16s7.2-16,16-16h95.1l25.9-41.4C145.8,8.5,161.2,0,177.7,0h92.5c16.6,0,31.9,8.5,40.7,22.6h.1ZM64,96v336c0,26.5,21.5,48,48,48h224c26.5,0,48-21.5,48-48V96H64Zm80,80v224c0,8.8-7.2,16-16,16s-16-7.2-16-16v-224c0-8.8,7.2-16,16-16s16,7.2,16,16Zm96,0v224c0,8.8-7.2,16-16,16s-16-7.2-16-16v-224c0-8.8,7.2-16,16-16s16,7.2,16,16Zm96,0v224c0,8.8-7.2,16-16,16s-16-7.2-16-16v-224c0-8.8,7.2-16,16-16s16,7.2,16,16Z" />
        </svg>
    )
}
