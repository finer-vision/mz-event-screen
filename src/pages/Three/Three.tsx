import Slide from "@/components/Slide"
import { useBackground } from "@/stores"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import image1 from "./Image1.png"
import image2 from "./Image2.png"
import image3 from "./Image3.png"
import image4 from "./Image4.png"

const sections = Object.entries({
    "collaborate_effectively": image1,
    "public_trust": image2,
    "right_people": image3,
    "working_cultures": image4,
  })

export default function Three() {
    const {setBackground} = useBackground()
    const navigate = useNavigate()
    const controls = useAnimationControls()
  
    useEffect(() => {
      controls.start(i => ({
        opacity: 1,
        transition: { 
          delay: i * 0.5,
          duration: 1,
        },
      }))
    }, [])

    useEffect(() => {
        setBackground("black")
    }, [])
    
    return (
        <Slide className="w-full h-full flex flex-col items-center justify-center gap-[3%] relative z-[70]">
            <button onClick={() => {
              navigate('/2')
            }}
            className="w-10/12">
              <img src="./back.png" alt="" />
            </button>
            {sections.map(([title, image], i) => {
                return (
                <motion.img onClick={() => {
                    navigate(`/4/${title}`)
                }}
                initial={{opacity: 0}} custom={i} animate={controls} className="lg:my-5 xl:my-10"
                key={i} src={image} />
                )
            })}
        </Slide>
    )
}