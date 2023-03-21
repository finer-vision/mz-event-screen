import Logos from "@/components/Logos"
import Slide from "@/components/Slide"
import { useBackground } from "@/stores"
import { useEffect, useRef, useState } from "react"
import video from "./video.webm"

export default function One() {
    const {setBackground} = useBackground()
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        setBackground("black")
    }, [])

    return (
        <Slide className="relative z-[60] flex flex-col justify-end items-center w-full h-full bg-cover bg-no-repeat">
            <video ref={videoRef}
            onClick={() => {
                console.log("click")
                //if playing, pause, else play
                if(playing) {
                    videoRef.current?.pause()
                } else {
                    videoRef.current?.play()
                }
            }}
            src={video} 
            onPlay={() => {
                setPlaying(true)
            }}
            onPause={() => {
                setPlaying(false)
            }}
            onEnded={() => {
                setPlaying(false)
            }}
             className="fixed z-10 top-0 left-0 w-screen h-screen"></video>
            {!playing && <button 
            className="w-[20%] aspect-sqaure absolute z-20 left-1/2 top-[35%] -translate-x-1/2 pointer-events-none">
                <img className="w-full h-full"
                src="./page1playbtn.svg"/>
            </button>}
        </Slide>
    )
}