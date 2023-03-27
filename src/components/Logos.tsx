import { motion } from "framer-motion";
import fade from "@/motion/fade";

export default function Logos({src, className, when = 1}: {src: string, className?: string, when?: number}) {
    return <motion.img {... fade(when)} className={`w-[84%] relative z-50 ${className}`} src={src}/>
}