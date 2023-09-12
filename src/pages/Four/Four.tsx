import Logos from "@/components/Logos";
import Carousel from "./Carousel";
import { useBackground } from "@/stores";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import Title from "./Title";
import Overlay from "../../components/Overlay";
import { motion } from "framer-motion";
import fade from "@/motion/fade";
import topData from "./top-data";

const fullTitles = {
  page1: `Induction &\nOnboarding`,
  page2: `Transformation &\nInnovation`,
  page3: `Mandatory &\nESG`,
  page4: `DEIB &\nLeadership`,
};

const URL = import.meta.env.VITE_GH_PAGES === "TRUE" ? "/mz-event-screen/" : "";

export default function Four() {
  const { title } = useParams();
  const { setBackground } = useBackground();
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}data/${title}/${title}.json`).then((res) => {
      setItems(res.data);
      console.log(res.data);
    });
  }, [title]);

  const currentPage = Object.keys(fullTitles).findIndex((key) => key === title);
  const nextPageTitle = (() => {
    try {
      return Object.entries(fullTitles)[currentPage + 1][1];
    } catch {
      return fullTitles["page1"];
    }
  })();
  const nextPageId = (() => {
    try {
      return Object.entries(fullTitles)[currentPage + 1][0];
    } catch {
      return "page1";
    }
  })();
  const prevPageTitle = (() => {
    try {
      return Object.entries(fullTitles)[currentPage - 1][1];
    } catch {
      return fullTitles["page4"];
    }
  })();
  const prevPageId = (() => {
    try {
      return Object.entries(fullTitles)[currentPage - 1][0];
    } catch {
      return "page4";
    }
  })();

  useEffect(() => {
    setBackground("black");
  }, []);

  const header = useMemo(() => {
    if (pathname.endsWith("page1")) {
      return (
        <>
          <div className="w-full flex flex-col px-[10%] gap-[5vw]">
            <div className="w-10/12 flex">
              <button
                onClick={() => {
                  navigate(`/3`);
                }}
                className="text-[3vw] px-[2vw] rounded-full bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"
              >
                BACK
              </button>
            </div>
            <Title>{(fullTitles as any)[title as any]}</Title>
            <div className="w-[68vw] h-[16vh] ml-[10.5vw]">
              <img src="./hero.png" alt="" />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="w-full flex flex-col px-[10%] gap-[5vw]">
          <div className="w-10/12 flex">
            <button
              onClick={() => {
                navigate(`/3`);
              }}
              className="text-[3vw] px-[2vw] rounded-full bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"
            >
              BACK
            </button>
          </div>
          <Title>{(fullTitles as any)[title as any]}</Title>
          <div className="w-full h-[16vh]">{topData[title as any].content}</div>
        </div>
        <img className="w-[40vw]" src={`./${title}.png`} />
      </>
    );
  }, [pathname]);

  if (!items.length) return <>Loading...</>;

  return (
    <>
      <div className="relative flex flex-col justify-end items-center w-full h-full z-[90]">
        <motion.div
          {...fade(2)}
          className="w-full flex flex-col grow gap-[5%] mt-[10%]"
        >
          <div className="w-full grid grid-cols-2 place-content-center place-items-center">
            {header}
          </div>
          <Carousel items={items} />
          <div className="grid grid-cols-2 w-full px-[3vw] gap-[3vw] h-[3vh] place-items-center place-content-center w-[72%] mx-auto">
            <div className="ml-auto">
              <Button
                width={20}
                py={3}
                iconDirection="left"
                to={`/4/${prevPageId}`}
              >
                <span
                  className="whitespace-pre py-[1vw]"
                  style={{ lineHeight: "1", display: "block" }}
                >
                  {prevPageTitle}
                </span>
              </Button>
            </div>
            <div className="mr-auto">
              <Button
                width={20}
                py={3}
                iconDirection="right"
                to={`/4/${nextPageId}`}
              >
                <span
                  className="whitespace-pre py-[1vw]"
                  style={{ lineHeight: "1", display: "block" }}
                >
                  {nextPageTitle}
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div
          {...fade(3)}
          className="font-bold my-[5%] text-[5vw] w-[23%] relative -left-[6%] whitespace-nowrap"
        >
          OUR CLIENTS<span className="text-[rgb(14,207,166)]">.</span>
        </motion.div>
        <Logos when={3} className="mb-[7%]" src="./page2logos.png" />
        <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <Overlay />
    </>
  );
}
