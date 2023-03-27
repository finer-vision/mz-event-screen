import { useBackground } from "@/stores";
import Carousel from "./Carousel";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PageData } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../components/Overlay";
import Title from "./Title";

type Content = {
  title: string;
  description: string;
  video_url: string;
  image_url: string;
  title2: string;
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
    axios.get(`${URL}database/${title}/${title}.json`).then((res) => {
      setItems(res.data);
      setContent(res.data.find((item: Content) => item.title === id));
    });
  }, [title, id]);

  useEffect(() => {
    if (playing) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playing]);

  return (
    <>
      <div className="relative flex flex-col items-center w-full h-full z-[500]">
        <div className="flex flex-col gap-[3%] w-full h-full items-center mt-[10%]">
          <div className="w-10/12 flex">
            <button
              onClick={() => {
                navigate(`/4/${title}`);
              }}
              className="text-[3vw] px-[2vw] rounded-full bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]"
            >
              BACK
            </button>
          </div>
          <Title>{content?.title2}</Title>
          {!videoExists && (
            <img
              src={`${URL}/database/${title}/${content?.image_url}`}
              className="min-w-[86.2vw] min-h-[22vh] max-h-[22vh]"
            />
          )}
          {videoExists && (
            <video
              poster={`${URL}/database/${title}/${content?.image_url}`}
              onClick={() => setPlaying((playing) => !playing)}
              ref={videoRef}
              src={`${URL}/database/${title}/${content?.video_url}`}
              className="min-w-[86.2vw] min-h-[22vh] max-h-[22vh]"
            />
          )}
          <h1 className="text-[5vw] text-center">{content?.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: content?.description || "" }}
            className="text-justify w-full overflow-y-scroll overflow-x-hidden h-[20vw] px-[5vw] text-[3vw] flex grow whitespace-pre-wrap"
          ></div>
          <Carousel items={items} />
        </div>
      </div>
      <Overlay />
    </>
  );
}
