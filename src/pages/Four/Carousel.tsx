import { PageData } from "@/types";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Carousel({items}: {items: PageData[]}) {
    const navigate = useNavigate()
    const { title: pageTitle } = useParams();
    const [showing, setShowing] = useState([0, 1, 2])
    const max = showing.length - 1
  
    const handleNext = (e: any) => {
        e.stopPropagation()
        const notShowingIndices = items.map((item, index) => index).filter(index => !showing.includes(index));
        const nextItemIndex = notShowingIndices[(notShowingIndices.indexOf(showing[showing.length - 1]) + 1) % notShowingIndices.length];

        setShowing([...showing.slice(1), nextItemIndex]);
    }
  
    const handlePrev = (e: any) => {
        e.stopPropagation();
        const notShowingIndices = items.map((item, index) => index).filter(index => !showing.includes(index));
        const prevItemIndex = notShowingIndices[(notShowingIndices.indexOf(showing[0]) - 1 + notShowingIndices.length) % notShowingIndices.length];
    
        setShowing([prevItemIndex, ...showing.slice(0, max)]);
    };
    
    return (
        <div className="w-full flex items-center justify-center relative z-[60]">
            <button onClick={handlePrev}
            className="flex justify-center">
                <img src="./carousel-left.svg" className="w-[100%] -translate-x-[50%]"/>
            </button>
            <div className="flex items-center gap-[3%] grow w-full min-h-[22.2vh] overflow-hidden">
                {showing.map((i) => {
                    const {image_url, title} = items[i]
                    return (
                        <button onClick={() => {
                            navigate(`/5/${pageTitle}/${title}`)
                        }}
                        key={i} className={`relative bg-white w-[27vw] ${showing[1] === i ? 'h-[22.2vh]' : 'h-[18.7vh]'}`}>
                            <img src={`./data/${pageTitle}/${image_url}`} />
                            <div className="absolute bottom-0 z-10 w-full h-[1%] bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"></div>
                            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1">
                                <div className="text-[3cqw] text-start p-3">{title}</div>
                            </div>
                        </button>
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