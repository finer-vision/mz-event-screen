import React from "react"
import { motion } from "framer-motion"
import { useSlideDirection } from "@/stores"

export default ({children, className}: {children: React.ReactNode, className?: string}) => {
    const { slideDirection } = useSlideDirection()

    return (
        <motion.div 
        initial={{
            x: slideDirection === "left" ? 100 : -100,
        }}
        animate={{
            x: 0,
        }}
        exit={{
            x: slideDirection === "left" ? -100 : 100,
        }}
        className={className}>
            {children}
        </motion.div>
    )
}