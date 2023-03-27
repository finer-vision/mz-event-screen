import { useBackground } from "@/stores";
import Carousel from "./Carousel";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PageData } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../components/Overlay";

type Content = {
  title: string;
  description: string;
  video_url: string;
  image_url: string;
};

const URL = import.meta.env.VITE_GH_PAGES === "TRUE" ? "/mz-event-screen/" : "";

export default function Five() {
  const { title, id } = useParams();
  const { setBackground } = useBackground();
  const [items, setItems] = useState<PageData[]>([]);
  const [content, setContent] = useState<Content>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoExists = content?.video_url;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setBackground("black");
  }, []);

  useEffect(() => {
    setPlaying(false);
    axios.get(`${URL}database/${title}/${title}.json`).then((res) => {
      setItems(res.data);
      setContent(res.data.find((item: Content) => item.title === id));
    });
  }, [title, id]);

  useEffect(() => {
    if(playing) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playing])

  return (
    <>
      <div className="relative flex flex-col items-center w-full h-full z-[500]">
        <div className="flex flex-col gap-[3%] w-full h-full items-center mt-[10%] relative">
          <div className="w-full absolute top-0 left-0 px-[11vw]">
            <button
                onClick={() => {
                  navigate(`/4/${title}`);
                }}
            >
              <img src="./back.png" alt="" />
            </button>
          </div>
          <img src="./page5-btn.svg" className="w-[47vw]" />
         {!videoExists && <img src={`${URL}/database/${title}/${content?.image_url}`} className="min-w-[86.2vw] min-h-[22vh] max-h-[22vh]" />}
          {videoExists && <div className="relative min-w-[86.2vw] min-h-[22vh] max-h-[22vh]">
            <video poster={`${URL}/database/${title}/${content?.image_url}`}
                   onClick={() => setPlaying(playing => !playing)} ref={videoRef} src={`${URL}/database/${title}/${content?.video_url}`} className="min-w-[86.2vw] min-h-[22vh] max-h-[22vh]" />
            {!playing&&(<svg
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[15vw]"
                style={{pointerEvents:"none"}}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="482"
                height="483"
                fill="none"
                viewBox="0 0 482 483"
            >
              <linearGradient id="a">
                <stop offset="0" stopColor="#05cca3"></stop>
                <stop offset="0.5" stopColor="#46afe1"></stop>
                <stop offset="1" stopColor="#8085f0"></stop>
              </linearGradient>
              <linearGradient
                  id="b"
                  x1="0.37"
                  x2="481.89"
                  y1="241.26"
                  y2="241.26"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#a"
              ></linearGradient>
              <linearGradient
                  id="c"
                  x1="161.86"
                  x2="359.05"
                  y1="12839.7"
                  y2="12839.7"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#a"
              ></linearGradient>
              <g strokeWidth="7">
                <path
                    stroke="url(#b)"
                    strokeMiterlimit="10"
                    d="M241.13 478.52c131.035 0 237.26-106.225 237.26-237.26S372.165 4 241.13 4 3.87 110.225 3.87 241.26s106.225 237.26 237.26 237.26z"
                ></path>
                <path
                    stroke="url(#c)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M165.36 126.07v230.38l190.19-115.19z"
                ></path>
              </g>
            </svg>)}
          </div>}
          <h1 className="text-[5vw] text-center">{content?.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: content?.description || "" }}
            className="custom-scroll text-justify w-[82vw] overflow-y-auto overflow-x-hidden h-[20vw] px-[2vw] text-[2vw] flex grow-[0.6] whitespace-pre-wrap"
          ></div>
          <Carousel items={items} />
        </div>
      </div>
      <Overlay />
    </>
  );
}
