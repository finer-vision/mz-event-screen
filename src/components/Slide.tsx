import React from "react"
import { motion } from "framer-motion"
import { useSlideDirection } from "@/stores"

export default ({children, className}: {children: React.ReactNode, className?: string}) => {
    const { slideDirection } = useSlideDirection()

    return (
        <motion.div 
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        exit={{
            opacity: 0,
        }}
        transition={{
            duration: 0.5,
        }}
        className={className}>
            {children}
        </motion.div>
    )
}