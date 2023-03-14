import React from "react";
import useSession from "@/hooks/useSession";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import One from "@/pages/One/One"
import Two from "@/pages/Two/Two"
import Three from "@/pages/Three/Three"
import Four from "@/pages/Four/Four"
import Five from "@/pages/Five/Five"
import { AnimatePresence } from "framer-motion";
import Overlay from "./components/Overlay";
import { useBackground } from "./stores";

export const DEV = import.meta.env.MODE === "development";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation()
  const session = useSession(
    "https://analytics-server.finervision.com/api/save-sessions",
    "mz-screen"
  );
  const { background } = useBackground()

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (DEV) return;
    if (pathname === "/") {
      session.end();
    }
    if (pathname === "/start") {
      session.start();
    }
    window.onbeforeunload = () => {
      session.end();
    };
  }, [session, pathname]);

  React.useEffect(() => {
    // on page click, go to next page
    const currentPage = location.pathname.replace("/", "") || "1";
    const nextPage = parseInt(currentPage) + 1;

    //on page click listener
    const handlePageClick = () => {
      if(nextPage > 5) return;
      navigate(`/${nextPage}`);
    }
    document.body.addEventListener("click", handlePageClick)

    return () => {
      document.body.removeEventListener("click", handlePageClick)
    }
  }, [location]);

  return (
    <AnimatePresence>
      <div style={{ background }}
      className="absolute top-0 left-0 w-screen h-screen flex flex-col overflow-hidden">
        <div onClick={(e) => {
            e.stopPropagation();
            navigate("/")
          }}
        className="w-full grid place-items-center mt-[12%] relative z-[60]">
          <img
          className="w-[46%]" src="./logo.svg"/>
        </div>
        <Routes key={1}>
          <Route path="/" element={<One/>} />
          <Route path="/1" element={<One/>} />
          <Route path="/2" element={<Two/>} />
          <Route path="/3" element={<Three/>} />
          <Route path="/4" element={<Four/>} />
          <Route path="/5" element={<Five/>} />
        </Routes>
        <Overlay key={0}/>
      </div>
    </AnimatePresence>
  );
}