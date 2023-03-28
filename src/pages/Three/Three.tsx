import { useBackground } from "@/stores";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "./Image1.png";
import image2 from "./Image2.png";
import image3 from "./Image3.png";
import image4 from "./Image4.png";
import Overlay from "../../components/Overlay";
import fade from "@/motion/fade";

const sections = Object.entries({
  collaborate_effectively: image3,
  public_trust: image1,
  right_people: image4,
  working_cultures: image2,
});

export default function Three() {
  const { setBackground } = useBackground();
  const navigate = useNavigate();
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.5 + 1,
        duration: 1,
      },
    }));
  }, []);

  useEffect(() => {
    setBackground("black");
  }, []);

  return (
    <>
      <div className="w-full h-5/6 flex flex-col items-center justify-center gap-[1%] relative z-[100]">
        <div className="w-10/12 flex">
          <motion.button
            {...fade(2)}
            onClick={() => {
              navigate("/2");
            }}
            className="text-[3vw] px-[2vw] rounded-full bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"
          >
            BACK
          </motion.button>
        </div>
        {sections.map(([title, image], i) => {
          return (
            <motion.img
              onClick={() => {
                navigate(`/4/${title}`);
              }}
              initial={{ opacity: 0 }}
              custom={i}
              animate={controls}
              className="lg:my-5 xl:my-10"
              key={i}
              src={image}
            />
          );
        })}
      </div>
      <Overlay />
    </>
  );
}
