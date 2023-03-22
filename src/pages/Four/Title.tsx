import titleBg from "./TitleBg.svg"

export default function Title({children}: {children: React.ReactNode}) {
    return (
        <div style={{
            backgroundImage: `url(${titleBg})`,
        }}
        className="text-center uppercase bg-[100%,100%] bg-no-repeat bg-center text-white min-h-[4vh] max-h-[4vh] -mb-[2vw] grid place-items-center text-[1.4vw]">
            {children}
        </div>
    )
}