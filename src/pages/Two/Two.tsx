import Logos from "@/components/Logos"
import Slide from "@/components/Slide"
import { useBackground } from "@/stores"
import { useEffect } from "react"

export default function Two() {
    const {setBackground} = useBackground()

    useEffect(() => {
        setBackground("url(./page2bg.jpeg)")
    }, [])
    
    return (
        <Slide className="relative flex flex-col justify-end items-center w-full h-full bg-cover bg-no-repeat">
            <div className="w-full flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-[10%]">
                <img src="./page2-circle.svg" className="w-[69%] aspect-square"/>
                <img src="./page2btn.svg" className="w-[17.7%]"/>
            </div>
            <div className="font-bold my-[5%] text-[5cqw] w-[23%] relative -left-[6%] whitespace-nowrap">OUR CLIENTS<span className="text-[rgb(14,207,166)]">.</span></div>
            <Logos className="mb-[7%]" src="./page2logos.svg"/>
            <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
        </Slide>
    )
}