import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import fade from "@/motion/fade";

type OverlayProps = {
  handleClick?: () => void;
};

export default function Overlay({ handleClick }: OverlayProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between z-[60]"
      onClick={handleClick}
    >
      {path !== "intro" && path !== "/1" && path !== "/2" ? (
          <motion.img {... fade(1)} src="./QR-code.svg" alt="QR Code" className="self-end"/>
      ) : <></>}
      <div className="fixed z-50 bottom-0 w-full h-[1%] bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"></div>
    </div>
  );
}
