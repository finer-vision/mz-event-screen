
import { useBackground } from "@/stores";
import { useEffect } from "react";
import go from "./go.png";
import { useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";
import Logos from "@/components/Logos";
import { motion } from "framer-motion";
import fade from "@/motion/fade";

export default function One() {
  const navigate = useNavigate();
  const { setBackground } = useBackground();
  useEffect(() => {
    setBackground("black");
  }, []);

  const handleNextPage = () => {
    navigate("/2");
  };

  return (
    <>
      <div
        onClick={() => {
          navigate("/2");
        }}
        className="relative z-[60] flex flex-col justify-center items-center w-full h-full bg-cover bg-no-repeat"
      >
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          src="./showreel.mp4"
          className="fixed z-10 top-0 left-0 w-screen h-screen"
          playsInline={true}
        ></video>
        <Logos when={3} className="!absolute left-1/2 -translate-x-1/2 bottom-[5vw]" src="./page2logos.png" />
      </div>
      <Overlay handleClick={handleNextPage} />
    </>
  );
}
