import Logos from "@/components/Logos";
import Carousel from "./Carousel";
import { useBackground } from "@/stores";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import Title from "./Title";
import Overlay from "../../components/Overlay";
import { motion } from "framer-motion";
import fade from "@/motion/fade";

const fullTitles = {
  public_trust: "Let's build \npublic trust",
  collaborate_effectively: "Let's collaborate \neffectively",
  right_people: "Let's get the \nright people",
  working_cultures: "Let's create better \nworking cultures",
};

const URL = import.meta.env.VITE_GH_PAGES === "TRUE" ? "/mz-event-screen/" : "";

export default function Four() {
  const { title } = useParams();
  const { setBackground } = useBackground();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}database/${title}/${title}.json`).then((res) => {
      setItems(res.data);
    });
  }, [title]);

  const currentPage = Object.keys(fullTitles).findIndex((key) => key === title);
  const nextPageTitle = (() => {
    try {
      return Object.entries(fullTitles)[currentPage + 1][1];
    } catch {
      return fullTitles["public_trust"];
    }
  })();
  const nextPageId = (() => {
    try {
      return Object.entries(fullTitles)[currentPage + 1][0];
    } catch {
      return "public_trust";
    }
  })();
  const prevPageTitle = (() => {
    try {
      return Object.entries(fullTitles)[currentPage - 1][1];
    } catch {
      return fullTitles["working_cultures"];
    }
  })();
  const prevPageId = (() => {
    try {
      return Object.entries(fullTitles)[currentPage - 1][0];
    } catch {
      return "working_cultures";
    }
  })();

  useEffect(() => {
    setBackground("black");
  }, []);

  if (!items.length) return <>Loading...</>;

  return (
    <>
      <div className="relative flex flex-col justify-end items-center w-full h-full z-[90]">
        <motion.div {... fade(2)} className="w-full flex flex-col grow gap-[5%] mt-[10%]">
          <div className="w-full grid grid-cols-2 place-content-center place-items-center">
            <div className="w-full flex flex-col px-[10%] gap-[5vw]">
              <button
                onClick={() => {
                  navigate("/3");
                }}
                className="w-10/12"
              >
                <img src="./back.png" alt="" />
              </button>
              <Title>{(fullTitles as any)[title as any]}</Title>
              <img className="w-full" src="./page4-text.svg" />
            </div>
            <img className="w-[40vw]" src="./page4-profile.svg" />
          </div>
          <Carousel items={items} />
          <div className="grid grid-cols-2 w-full px-[3vw] gap-[1vw] h-[3vh] place-items-center place-content-center w-[72%] mx-auto">
            <Button width={30} py={3} iconDirection="left" to={`/4/${prevPageId}`}>
              <span className="whitespace-pre" style={{lineHeight: "1", display:"block"}}>
                {prevPageTitle}
              </span>
            </Button>
            <Button width={30} py={3} iconDirection="right" to={`/4/${nextPageId}`}>
              <span className="whitespace-pre" style={{lineHeight: "1", display:"block"}}>
                {nextPageTitle}
              </span>
            </Button>
          </div>
        </motion.div>
        <motion.div {... fade(3)} className="font-bold my-[5%] text-[5vw] w-[23%] relative -left-[6%] whitespace-nowrap">
          OUR CLIENTS<span className="text-[rgb(14,207,166)]">.</span>
        </motion.div>
        <Logos when={3} className="mb-[7%]" src="./page2logos.svg" />
        <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <Overlay />
    </>
  );
}
