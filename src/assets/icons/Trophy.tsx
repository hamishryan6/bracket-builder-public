type Props = {
    className: string
    weight: 'light' | 'regular'
}

export default function Trophy({ className, weight }: Props) {
    if (weight === 'light') return (
        <svg viewBox="0 0 576 512" className={className}>
            <path d="m398.48,32h-224c-9,0-15.4,7.3-15.1,15,6.2,163.9,44.9,239.2,76.1,273.5,15.5,17.1,29.9,24.8,39.3,28.3,4.8,1.8,8.5,2.6,10.6,3,.5.1.9.1,1.2.2.3,0,.7-.1,1.2-.2,2.1-.3,5.8-1.1,10.6-3,9.4-3.5,23.8-11.3,39.3-28.3,31.2-34.2,69.8-109.6,76.1-273.5.3-7.8-6.2-15-15.1-15h-.2ZM174.48,0h224c26.5,0,48.1,21.8,47.1,48.2-.2,5.3-.4,10.6-.7,15.8h81.6c26,0,49.3,21.6,46.2,49.7-10.1,94-61.9,158.2-118.1,199.9-55.9,41.4-117.1,61.3-149.3,66.9l-.1-.3c-.9.3-1.8.6-2.7.8v99h96c8.8,0,16,7.2,16,16s-7.2,16-16,16h-224c-8.8,0-16-7.2-16-16s7.2-16,16-16h96v-98.9c-.9-.3-1.8-.5-2.7-.8l-.1.3c-32.2-5.7-93.4-25.5-149.3-66.9C62.18,272,10.38,207.7.28,113.7c-3.1-28.1,20.2-49.7,46.2-49.7h81.6c-.3-5.2-.5-10.4-.7-15.8C126.38,21.8,147.98,0,174.48,0Zm201.8,323.2c19.2-9.1,39.6-20.7,59.2-35.3,51.1-37.9,96.4-94.8,105.4-177.6.8-7-5.1-14.3-14.4-14.3h-83.8c-9.8,116.5-37.2,185.9-66.4,227.2h0ZM130.28,96H46.48c-9.3,0-15.2,7.3-14.4,14.3,8.9,82.9,54.3,139.8,105.4,177.6,19.6,14.6,40,26.2,59.2,35.3-29.2-41.3-56.7-110.7-66.4-227.2Zm177.8-.5l12.5,25.5,28.2,4.1c19.7,2.9,27.5,27.1,13.3,40.9l-20.4,19.9,4.8,28.1c3.4,19.6-17.2,34.6-34.8,25.3l-25.2-13.2-25.2,13.3c-17.6,9.3-38.2-5.7-34.8-25.3l4.8-28.1-20.4-19.9c-14.2-13.9-6.4-38.1,13.3-40.9l28.2-4.1,12.6-25.6c8.8-17.8,34.2-17.8,43,0h.1Zm-28.8,43.5c-3.5,7.1-10.3,12-18.1,13.1l-16.3,2.4,11.7,11.5c5.7,5.5,8.2,13.5,6.9,21.2l-2.8,16.3,14.6-7.7c7-3.7,15.3-3.7,22.3,0l14.6,7.7-2.7-16.3c-1.3-7.8,1.2-15.7,6.9-21.2l11.8-11.5-16.3-2.4c-7.8-1.1-14.6-6-18.1-13.1l-7.3-14.8-7.3,14.8h.1Z"/>
        </svg>
    )
    return (
        <svg viewBox="0 0 576 512" className={className}>
            <path d="m176.9,48c6.4,160.7,44.3,231.4,71.8,261.7,13.7,15.1,25.9,21.4,33.1,24.1,2.6,1,4.7,1.5,6.1,1.9,1.4-.3,3.5-.9,6.1-1.9,7.2-2.7,19.4-9,33.1-24.1,27.5-30.3,65.5-101,71.8-261.7h-222Zm-.9-48h224c26.5,0,48.1,21.8,47.1,48.2-.2,5.3-.4,10.6-.7,15.8h105.6c13.3,0,24,10.7,24,24,0,108.5-45.9,177.7-101.4,220.6-53.9,41.7-115.7,57.6-149.5,63.7-4.7,2.5-9.1,4.5-13.1,6.1v85.6h80c13.3,0,24,10.7,24,24s-10.7,24-24,24h-208c-13.3,0-24-10.7-24-24s10.7-24,24-24h80v-85.6c-4-1.6-8.4-3.6-13.1-6.1-33.8-6-95.5-22-149.5-63.7C45.9,265.7,0,196.5,0,88c0-13.3,10.7-24,24-24h105.6c-.3-5.2-.5-10.4-.7-15.8C127.9,21.8,149.5,0,176,0Zm214.8,302.6c18.1-8,36.8-18.4,54.4-32,40.6-31.3,75.9-80.2,81.9-158.6h-84.4c-9.1,90.1-29.2,150.3-51.9,190.6h0Zm-260-32c17.5,13.6,36.3,24,54.4,32-22.7-40.3-42.8-100.5-51.9-190.6H48.9c6,78.4,41.3,127.3,81.9,158.6h0Zm164.4-168.1l14.5,29.3c1.2,2.4,3.4,4,6,4.4l32.4,4.7c6.6,1,9.2,9,4.4,13.6l-23.4,22.8c-1.9,1.8-2.7,4.5-2.3,7.1l5.5,32.2c1.1,6.5-5.7,11.5-11.6,8.4l-29-15.2c-2.3-1.2-5.1-1.2-7.4,0l-29,15.2c-5.9,3.1-12.7-1.9-11.6-8.4l5.5-32.2c.4-2.6-.4-5.2-2.3-7.1l-23.4-22.8c-4.7-4.6-2.1-12.7,4.4-13.6l32.4-4.7c2.6-.4,4.9-2,6-4.4l14.5-29.3c2.9-5.9,11.4-5.9,14.3,0h.1Z" />
        </svg>
    )
}