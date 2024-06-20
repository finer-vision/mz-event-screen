import { useBackground } from "@/stores";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "./Image1.png";
import image2 from "./Image2.png";
import image3 from "./Image3.png";
import image4 from "./Image4.png";
import Overlay from "../../components/Overlay";
import fade from "@/motion/fade";

const answerIndexToSectionTitle = {
  0: "page1",
  1: "page2",
  2: "page3",
  3: "page4",
};

export default function Three() {
  const setBackground = useBackground((state) => state.setBackground);
  const navigate = useNavigate();
  const controls = useAnimationControls();

  const sections = useMemo(() => {
    const sectionTitleImage = {
      page1: image1, // Induction & Onboarding
      page2: image2, // Transformation & Innovation
      page3: image3, // Mandatory & ESG
      page4: image4, // DEIB & Leadership
    };
    const answers = JSON.parse(
      localStorage.getItem("mz-event-screen") ?? "[]",
    ) as number[];
    // Remove last answer
    answers.pop();
    return Object.entries(sectionTitleImage).map(([title, image], index) => {
      return {
        title,
        image,
      };
    });
  }, []);

  useEffect(() => {
    // localStorage.removeItem("mz-event-screen");
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
        {sections.map((section, index) => {
          return (
            <motion.img
              key={index}
              onClick={() => {
                navigate(`/4/${section.title}`);
              }}
              initial={{ opacity: 0 }}
              custom={index}
              animate={controls}
              className="lg:my-5 xl:my-10"
              src={section.image}
            />
          );
        })}
      </div>
      <Overlay />
    </>
  );
}
