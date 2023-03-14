import { useBackground } from "@/stores";
import Carousel, { CarouselItem } from "./Carousel";
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


export default function Five() {
    const {setBackground} = useBackground()

    useEffect(() => {
        setBackground("black")
    }, [])
    
    return (
        <Slide className="relative flex flex-col items-center w-full h-full">
            <div className="flex flex-col gap-[3%] w-full h-full items-center mt-[10%]">
                <img src="./page5-btn.svg" className="w-[47vw]"/>
                <img src="./page5-img.png" className="w-[86.2vw]"/>
                <h1 className="text-[#05CFA6] font-bold text-[4cqw]">
                    Ineos Sports Team Launch
                </h1>
                <p className="text-center w-full px-5 text-[3cqw]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint in, minima facilis assumenda perspiciatis veniam sit, quis ex aut modi, error voluptatem amet est libero vel animi accusamus! Reiciendis, molestiae.

                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere dignissimos sapiente eius perferendis excepturi earum nam neque ea. Quis, explicabo voluptates ea aspernatur iste rem recusandae. Animi pariatur dolores veritatis.
                </p>
                <Carousel items={carouselItems} />
            </div>
        </Slide>
    )
}