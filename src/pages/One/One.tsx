import Logos from "@/components/Logos"
import Slide from "@/components/Slide"
import { useBackground } from "@/stores"
import { useEffect } from "react"

export default function One() {
    const {setBackground} = useBackground()

    useEffect(() => {
        setBackground("url(./page1bg.jpeg)")
    }, [])

    return (
        <Slide className="relative flex flex-col justify-end items-center w-full h-full bg-cover bg-no-repeat">
            <button className="w-[20%] aspect-sqaure absolute left-1/2 top-[35%] -translate-x-1/2">
                <img className="w-full h-full"
                src="./page1playbtn.svg"/>
            </button>
            <Logos className="mb-[5%]" src="./page1logos.svg"/>
            <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
        </Slide>
    )
}