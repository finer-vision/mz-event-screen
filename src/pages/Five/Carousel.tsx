import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

type CarouselItem = {
  title: string
  description: string
  image_url: string
  video_placeholder_url: string
  video_url: string
}

type CarouselProps = {
  items: CarouselItem[]
}

export default ({items}: CarouselProps) => {
  const [hoveredItem, setHoveredItem] = useState(0)
  const debounceRef = useRef<boolean>(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const location = useLocation()
  const { title } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const meanItemIndex = Math.floor(items.length / 2)
    const meanItem = itemRefs.current[meanItemIndex]
    meanItem?.scrollIntoView({ block: "nearest", inline: 'center'})
    setHoveredItem(meanItemIndex)
  }, [location])

  useEffect(() => {
    itemRefs.current[hoveredItem]?.scrollIntoView({behavior: "smooth", block: 'nearest'})
  }, [hoveredItem])

  return (
    <div className={`${items.length === 1 && 'invisible'} w-[calc(100%-10vw)] flex justify-center text-white relative z-[100] mb-[10vw]`}>
      <button 
      className="w-[5vw] aspect-square mx-[3vw] -translate-y-5"
      onClick={() => {
        if(hoveredItem === 0) return
        setHoveredItem(hoveredItem => hoveredItem - 1)
      }}
      >
        <img className="w-full h-full" src="./carousel-left.svg"/>
      </button>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-[80vw] flex items-center gap-[1vw] overflow-hidden text-white">
          {items.map((item, i) => {
            return (
              <div 
                id={`carousel-${i}`}
                key={i}
                ref={el => itemRefs.current[i] = el}
                onClick={(e) => {
                  navigate(`/5/${title}/${item.title}`)
                }}
                onMouseEnter={() => {
                  if (debounceRef.current) return
                  debounceRef.current = true
                  setHoveredItem(i)
                }}
                onMouseLeave={() => debounceRef.current = false}
                className={`aspect-[2.5] relative cursor-pointer min-w-[calc(50%-1vw)] max-w-[50vw] text-white flex items-end
                bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]
                before:content-[''] before:bg-cover p-[1vw] 
                ${hoveredItem === i ? `before:w-[calc(100%-.4vw)] after:w-[calc(100%-.4vw)] after:h-[calc(100%-.4vw)]` : `before:w-full after:w-full after:h-full`} before:h-[calc(100%-1.6vw)] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                before:h-[calc(100%-1.6vw)] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                after:bg-gradient-to-t after:from-black after:to-transparent
                `}
              > 
                <style>{`
                  #carousel-${i}::before {
                    background-image: url(data/${title}/${item.image_url});
                    background-position: center;
                  }
                `}</style>
                <span className="relative z-10 text-[3vw] p-[.1vw] px-[1vw]">{item.title}</span>
              </div>
            )
          })
          }
        </div>
        <div className="flex gap-5 mt-7">
          {items.map((item, i) => {
            return (
              <div key={i} onClick={() => setHoveredItem(i)}
              className={`${hoveredItem === i ? 'bg-[#05CCA3]' : "bg-[#FFFFFF]"} cursor-pointer w-[1vw] translate-y-[2vw] aspect-square rounded-full transition-colors`}></div>
            )})
          }
        </div>
      </div>
      <button  
      className="w-[5vw] aspect-square mx-[3vw] -translate-y-5"
      onClick={() => {
        if(hoveredItem === items.length - 1) return
        setHoveredItem(hoveredItem => hoveredItem + 1)
      }}
      >
        <img className="w-full h-full" src="carousel-right.svg" />
      </button>
    </div>
  )
}