import Logos from "@/components/Logos"
import Slide from "@/components/Slide"
import { useBackground } from "@/stores"
import { useEffect, useRef, useState } from "react"
import video from "./video.webm"
import go from "./go.png"
import { useNavigate } from "react-router-dom"

export default function One() {
    const navigate = useNavigate()
    const {setBackground} = useBackground()
    useEffect(() => {
        setBackground("black")
    }, [])

    return (
        <Slide onClick={() => {
            navigate("/2")
        }}
        className="relative z-[60] flex flex-col justify-center items-center w-full h-full bg-cover bg-no-repeat">
            <video
            autoPlay={true}
            loop={true}
            muted={true}
            src={video}
             className="fixed z-10 top-0 left-0 w-screen h-screen"></video>
            <button
            className="w-[30vw] -mt-[25vw] aspect-square relative z-50">
                <img className="w-full h-full" src={go} />
            </button>
        </Slide>
    )
}