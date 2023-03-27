import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Intro from "./pages/intro/intro";
import One from "@/pages/One/One";
import Two from "@/pages/Two/Two";
import Three from "@/pages/Three/Three";
import Four from "@/pages/Four/Four";
import Five from "@/pages/Five/Five";
import { AnimatePresence, motion } from "framer-motion";
import { useBackground } from "./stores";
import { useIdleTimer } from "react-idle-timer";
import fade from "./motion/fade";

export const DEV = import.meta.env.DEV;

console.log({DEV});

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { background } = useBackground();

  const path = location.pathname;

  useIdleTimer({
    timeout: 60000,
    onIdle: () => {
      if (DEV) return;
      navigate("/1");
    },
  });

  return (
    <AnimatePresence>
      <div
        style={{ background }}
        className="absolute top-0 left-0 w-screen h-screen flex flex-col overflow-hidden"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
          className="w-full grid place-items-center mt-[4%] relative z-[600]"
        >
        <motion.img {... fade(1)} className="w-[46%]" src="./logo.svg" />
        </div>
        <Routes key={1}>
          <Route path="/" element={<Intro />} />
          <Route path="/1" element={<One />} />
          <Route path="/2" element={<Two />} />
          <Route path="/3" element={<Three />} />
          <Route path="/4/:title" element={<Four />} />
          <Route path="/5/:title/:id" element={<Five />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}
