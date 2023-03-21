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
    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        setBackground("black")
    }, [])

    return (
        <Slide className="relative z-[60] flex flex-col justify-end items-center w-full h-full bg-cover bg-no-repeat">
            <video ref={videoRef}
            autoPlay
            src={video}
             className="fixed z-10 top-0 left-0 w-screen h-screen"></video>
            <button onClick={() => {
                navigate("/2")
            }}
            className="w-[16.2vw] aspect-square relative z-50 mb-[40vw]">
                <img src={go} />
            </button>
        </Slide>
    )
}