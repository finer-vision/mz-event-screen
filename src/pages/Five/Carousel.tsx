import { PageData } from "@/types"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Carousel({items}: {items: PageData[]}) {
    const [showing, setShowing] = useState([0, 1])
    const max = items.length - 1
    const navigate = useNavigate()
    const { title: sectionTitle } = useParams();
  
    const handleNext = (e: any) => {
        e.stopPropagation()
        const nextIndex = showing[1] === max ? 0 : showing[1] + 1;
        setShowing([showing[1], nextIndex]);
    }
  
    const handlePrev = (e: any) => {
        e.stopPropagation()
        const prevIndex = showing[0] === 0 ? max : showing[0] - 1;
        setShowing([prevIndex, showing[0]]);
    }

    return (
        <div className="w-[85%] flex items-center justify-center relative z-[60]">
            <button onClick={handlePrev} className="flex justify-center">
                <img src="./carousel-left.svg" className="w-[100%]"/>
            </button>
            <div className="flex items-center justify-center gap-[3%] grow min-h-[22.2vh] overflow-hidden">
                {showing.map((i) => {
                    if(items[i] === undefined) return (<div></div>)
                    const {image_url, title} = items[i]
                    return (
                        <button
                            onClick={() => {
                                navigate(`/5/${sectionTitle}/${title}`)
                            }}
                            key={i}
                            className={`relative bg-white w-[35.5vw] aspect-[3.27]`}
                        >
                            <img className="h-full object-cover w-full" src={`./data/${sectionTitle}/${image_url}`} />
                            <div className="absolute bottom-0 z-50 w-full h-[1%] bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"></div>
                            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1">
                                <div className="text-[3vw]">{title}</div>
                            </div>
                        </button>
                    )
                })}
            </div>
            <button onClick={handleNext} className="flex justify-center">
                <img src="./carousel-right.svg" className="w-[100%]"/>
            </button>
        </div>
    )
}
