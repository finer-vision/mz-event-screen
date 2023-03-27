import React from "react";
import video from "./video.mp4";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/1");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        src="./page1-video.mp4"
        muted
        playsInline
        autoPlay
        onEnded={handleNextPage}
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
