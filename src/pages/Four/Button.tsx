import React from "react";
import { Link } from "react-router-dom"

export default function Button({children, to, iconDirection, width = 45, py = 3}: {children: React.ReactNode, to: string, iconDirection: "left" | "right", width?: number, py?: number}) {
    return (
        <Link to={to}
              className={`min-w-[${width}vw] max-w-[${width}vw] text-center cursor-pointer uppercase rounded-full py-[${py}vw] px-[7vw] text-white  overflow-hidden relative bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0] text-[2vw] flex items-center justify-center`}>
            {iconDirection === "left" && <svg className="absolute h-1/3 aspect-square left-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>}
            {iconDirection === "right" && <svg className="absolute h-1/3 aspect-square rotate-180 right-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>}
            <span>{children}</span>
        </Link>
    )
}
