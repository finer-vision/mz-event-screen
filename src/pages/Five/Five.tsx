import { useBackground } from "@/stores";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import Slide from "@/components/Slide";
import axios from "axios";
import { PageData } from "@/types";
import { useParams } from "react-router-dom";

type Content = {
    title: string
    description: string
    video_url: string
}



export default function Five() {
    const { title, id } = useParams()
    const {setBackground} = useBackground()
    const [items, setItems] = useState<PageData[]>([])
    const [content, setContent] = useState<Content>()

    useEffect(() => {
        setBackground("black")
    }, [])

    useEffect(() => {
        axios.get(`/data/${title}/${title}.json`).then(res => {
            setItems(res.data)
            setContent(res.data.find((item: Content) => item.title === id))
        })
    }, [title, id])
    
    return (
        <Slide className="relative flex flex-col items-center w-full h-full">
            <div className="flex flex-col gap-[3%] w-full h-full items-center mt-[10%]">
                <img src="./page5-btn.svg" className="w-[47vw]"/>
                <img src="./page5-img.png" className="w-[86.2vw]"/>
                <p dangerouslySetInnerHTML={{__html: content?.description || ""}}
                className="text-center w-full px-5 text-[3cqw] flex grow flex-col gap-[2.5vw]">

                </p>
                <Carousel items={items} />
            </div>
        </Slide>
    )
}