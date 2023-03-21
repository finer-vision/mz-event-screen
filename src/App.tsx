import React, { useEffect, useState } from "react";
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

  return (
    <AnimatePresence>
      <NextPageButton/>
      <PrevPageButton/>
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
          <Route path="/4/:title" element={<Four/>} />
          <Route path="/5/:title/:id" element={<Five/>} />
        </Routes>
        <Overlay key={0}/>
      </div>
    </AnimatePresence>
  );
}

const NextPageButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showButton, setShowButton] = useState(true)
  
  useEffect(() => {
    if(location.pathname === "/") {
      setShowButton(true)
      return
    }
    setShowButton([1,2].includes(Number(location.pathname.split('/')[1])))
  }, [location])

  return (
    <>
      {showButton && <button onClick={() => {
        if(location.pathname === "/") {
          navigate("/2")
          return
        }
        const pageNumber = location.pathname.split('/')[1]
        navigate(`/${Number(pageNumber) + 1}`)
      }}
      className="fixed right-0 h-full text-[4vw] px-5 mb-[1vw] text-white italic font-bold flex items-end transition-all z-[100]">
        <span className="mb-[1vw]">Next</span>
      </button>}
    </>
  )
}

const PrevPageButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showButton, setShowButton] = useState(true)
  
  useEffect(() => {
    if(location.pathname === "/") {
      setShowButton(false)
      return
    }
    setShowButton(![0,1].includes(Number(location.pathname.split('/')[1])))
  }, [location])

  return (
    <>
      {showButton && <button onClick={() => {
        if([5].includes(Number(location.pathname.split('/')[1]))) navigate(-1)
        const pageNumber = location.pathname.split('/')[1]
        navigate(`/${Number(pageNumber) - 1}`)
      }}
      className="fixed left-0 h-full px-5 text-[4vw] text-white font-bold flex items-end transition-all z-[100]">
        <span className="skew-x-[15deg] text-white mb-[1vw]">Prev</span>
      </button>}
    </>
  )
}