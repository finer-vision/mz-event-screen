import { MouseEventHandler, useEffect, useState } from "react"

export type CarouselItem = {
    image: string,
    title: string
}

export default function Carousel({items}: {items: CarouselItem[]}) {
    const [showing, setShowing] = useState([0, 1, 2])
    const max = showing.length - 1
  
    const handleNext = (e: any) => {
        e.stopPropagation()
        const notShowingIndices = items.map((item, index) => index).filter(index => !showing.includes(index));
        const nextItemIndex = notShowingIndices[(notShowingIndices.indexOf(showing[showing.length - 1]) + 1) % notShowingIndices.length];

        setShowing([...showing.slice(1), nextItemIndex]);
    }
  
    const handlePrev = (e: any) => {
        e.stopPropagation()
        if (showing[0] === 0) {
            setShowing([items.length - 3, items.length - 2, items.length - 1])
        } else {
            setShowing(showing.map(i => i - 1))
        }
    }

    return (
        <div className="w-full flex items-center justify-center relative z-[60]">
            <button onClick={handlePrev}
            className="flex justify-center">
                <img src="./carousel-left.svg" className="w-[100%] -translate-x-[50%]"/>
            </button>
            <div className="flex items-center gap-[3%] grow w-full min-h-[22.2vh] overflow-x-hidden">
                {showing.map((i) => {
                    const {image, title} = items[i]
                    return (
                        <div
                        key={i} className={`relative bg-white w-[27vw] ${showing[1] === i ? 'h-[22.2vh]' : 'h-[18.7vh]'}`}>
                            <img src={image} />
                            <div className="absolute w-full h-[1%] bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"></div>
                            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1">
                                <div className="text-[3cqw]">{title}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button onClick={handleNext}
            className="flex justify-center">
                <img src="./carousel-right.svg" className="w-[100%] translate-x-[50%]"/>
            </button>
        </div>
    )
}