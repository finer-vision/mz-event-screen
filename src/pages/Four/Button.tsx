import { Link } from "react-router-dom"

export default function Button({children, to}: {children: React.ReactNode, to: string}) {
    return (
        <Link to={to}
        className="text-center cursor-pointer uppercase rounded-full px-[3vw] text-white  overflow-hidden relative bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0] text-[1cqh] grid place-items-center">
            {children}
        </Link>
    )
}