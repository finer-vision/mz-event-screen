import Logos from "@/components/Logos";
import { useBackground } from "@/stores";
import { useEffect } from "react";
import start from "./start.png";
import { useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";
import { motion } from "framer-motion";
import fade from "@/motion/fade";

export default function Two() {
  const navigate = useNavigate();
  const { setBackground } = useBackground();

  useEffect(() => {
    setBackground("url(./page2bg.jpeg)");
  }, []);

  const handleNextPage = () => {
    navigate("/3");
  };

  return (
    <>
      <div className="relative flex flex-col justify-end items-center w-full h-full bg-cover bg-no-repeat z-50">
        <motion.div
          {...fade(2)}
          className="w-full flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-[10%]"
        >
          <img src="./page2-circle.svg" className="w-[69%] aspect-square" />
          <img src={start} className="w-[17.7%]" />
        </motiong.div>
        <motion.div
          {...fade(3)}
          className="font-bold my-[5%] text-[5cqw] w-[23%] relative -left-[6%] whitespace-nowrap"
        >
          OUR CLIENTS<span className="text-[rgb(14,207,166)]">.</span>
        </motion.div>
        <Logos when={3} className="mb-[7%]" src="./page2logos.svg" />
        <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <Overlay handleClick={handleNextPage} />
    </>
  );
}
