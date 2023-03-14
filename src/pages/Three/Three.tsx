import Slide from "@/components/Slide"
import { useBackground } from "@/stores"
import { useEffect } from "react"

export default function Three() {
    const {setBackground} = useBackground()

    useEffect(() => {
        setBackground("black")
    }, [])
    
    return (
        <Slide className="w-full h-full flex flex-col items-center justify-center gap-[3%]">
            <img src="./page3-image1.svg" className="w-[86.8%]"/>
            <img src="./page3-image2.svg" className="w-[86.8%]"/>
            <img src="./page3-image3.svg" className="w-[86.8%]"/>
            <img src="./page3-image4.svg" className="w-[86.8%]"/>
        </Slide>
    )
}