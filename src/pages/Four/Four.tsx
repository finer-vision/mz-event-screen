import Logos from "@/components/Logos";
import Carousel, { CarouselItem } from "./Carousel";
import { useBackground } from "@/stores";
import { useEffect } from "react";
import Slide from "@/components/Slide";

const carouselItems: CarouselItem[] = [
    { 
        image: "",
        title: "1"
    },
    { 
        image: "",
        title: "2"
    },
    { 
        image: "",
        title: "3"
    },
    { 
        image: "",
        title: "4"
    }
]

export default function Four() {
    const {setBackground} = useBackground()

    useEffect(() => {
        setBackground("black")
    }, [])
    
    return (
        <Slide
        className="relative flex flex-col justify-end items-center w-full h-full">
            <div className="flex flex-col grow gap-[5%] mt-[10%]">
                <div className="w-full grid grid-cols-2 place-content-center place-items-center">
                    <div className="w-full flex flex-col px-[10%] gap-[5vw]">
                        <img className="w-full" src="./page4-btn3.svg"/>
                        <img className="w-full" src="./page4-text.svg"/>
                    </div>
                    <img className="w-[80%]" src="./page4-profile.svg"/>
                </div>
                <Carousel items={carouselItems}/>
                <div className="flex justify-between w-full h-[3vh]">
                    <img className="h-full mx-[6%]" src="./page4-btn1.svg"/>
                    <img className="h-full mx-[6%]" src="./page4-btn2.svg"/>
                </div>
            </div>
            <div className="font-bold my-[5%] text-[5cqw] w-[23%] relative -left-[6%] whitespace-nowrap">OUR CLIENTS<span className="text-[rgb(14,207,166)]">.</span></div>
            <Logos className="mb-[7%]" src="./page2logos.svg"/>
            <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
        </Slide>
    )
}