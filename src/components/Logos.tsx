export default function Logos({src, className}: {src: string, className?: string}) {
    return <img className={`w-[84%] relative z-50 ${className}`} src={src}/>
}