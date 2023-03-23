import React from "react"
import { motion } from "framer-motion"
import { useSlideDirection } from "@/stores"
import { useNavigate } from "react-router-dom"

export default ({onClick, children, className}: {children: React.ReactNode, className?: string, onClick?: Function}) => {
    const { slideDirection } = useSlideDirection()
    const navigate = useNavigate()

    return (
        <motion.div 
        onClick={() => {
            navigate("/2")
        }}
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