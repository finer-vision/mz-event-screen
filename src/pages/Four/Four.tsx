import Logos from "@/components/Logos";
import Carousel from "./Carousel";
import { useBackground } from "@/stores";
import { useEffect, useState } from "react";
import Slide from "@/components/Slide";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import Title from "./Title";

const fullTitles = {
    "public_trust": "Let's build public trust",
    "collaborate_effectively": "Let's collaborate effectively",
    "right_people": "Let's get the right people",
    "working_cultures": "Let's create better working cultures",
}

const URL = import.meta.env.VITE_GH_PAGES === "TRUE" ? "/mz-event-screen/" : ""

export default function Four() {
    const { title } = useParams()
    const {setBackground} = useBackground()
    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL}data/${title}/${title}.json`).then(res => {
            setItems(res.data)
        })
    }, [title])

    const currentPage = Object.keys(fullTitles).findIndex(key => key === title)
    const nextPageTitle = (() => {
        try {
            return Object.entries(fullTitles)[currentPage + 1][1]
        } catch {
            return fullTitles["public_trust"]
        }
    })()
    const nextPageId = (() => {
        try {
            return Object.entries(fullTitles)[currentPage + 1][0]
        } catch {
            return "public_trust"
        }
    })()
    const prevPageTitle = (() => {
        try {
            return Object.entries(fullTitles)[currentPage - 1][1]
        } catch {
            return fullTitles["working_cultures"]
        }
    })()
    const prevPageId = (() => {
        try {
            return Object.entries(fullTitles)[currentPage - 1][0]
        } catch {
            return "working_cultures"
        }
    })()

    useEffect(() => {
        setBackground("black")
    }, [])

    if(!items.length) return <>Loading...</>

    return (
        <Slide
        className="relative flex flex-col justify-end items-center w-full h-full z-[90]">
            <div className="flex flex-col grow gap-[5%] mt-[10%]">
                <div className="w-full grid grid-cols-2 place-content-center place-items-center">
                    <div className="w-full flex flex-col px-[10%] gap-[5vw]">
                        <button onClick={() => {
                            navigate('/3')
                            }}
                            className="w-10/12">
                            <img src="./back.png" alt="" />
                        </button>
                        <Title>
                            {(fullTitles as any)[title as any]}
                        </Title>
                        <img className="w-full" src="./page4-text.svg"/>
                    </div>
                    <img className="w-[40vw]" src="./page4-profile.svg"/>
                </div>
                <Carousel items={items}/>
                <div className="flex justify-between w-full gap-[1vw] h-[3vh]">
                    <Button to={`/4/${prevPageId}`}>{prevPageTitle}</Button>
                    <Button to={`/4/${nextPageId}`}>{nextPageTitle}</Button>
                </div>
            </div>
            <div className="font-bold my-[5%] text-[5vw] w-[23%] relative -left-[6%] whitespace-nowrap">OUR CLIENTS<span className="text-[rgb(14,207,166)]">.</span></div>
            <Logos className="mb-[7%]" src="./page2logos.svg"/>
            <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
        </Slide>
    )
}