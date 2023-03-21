import { useNavigate } from "react-router-dom"

export default function Overlay() {
    const navigate = useNavigate()
    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between z-[60] pointer-events-none">
            <div className="fixed z-50 bottom-0 w-full h-[1%] bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"></div>
        </div>
    )
}