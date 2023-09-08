import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type CarouselItem = {
  title: string;
  description: string;
  image_url: string;
  video_url: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

export default ({ items }: CarouselProps) => {
  const [hoveredItem, setHoveredItem] = useState(-1);
  const debounceRef = useRef<boolean>(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const location = useLocation();
  const { title } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflow, setIsOverflow] = useState(true);

  function isOverflown(element: HTMLElement) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  const initMeanItem = () => {
    const meanItemIndex = Math.floor(items.length / 2);
    const meanItem = itemRefs.current[meanItemIndex];
    meanItem?.scrollIntoView({ block: "nearest", inline: "center" });
    setHoveredItem(meanItemIndex);
  }

  useEffect(() => {
    if (containerRef.current) {
      setIsOverflow(isOverflown(containerRef.current));
    }
    setTimeout(() => {
      initMeanItem()
    }, 200);
  }, [items, containerRef, location])

  useEffect(() => {
    if (hoveredItem === -1) return;
    itemRefs.current[hoveredItem]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [hoveredItem]);

  return (
    <div className="w-full flex justify-center text-white">
      <button
        className={`${items.length === 1 && 'invisible'} max-w-[6vw] aspect-square mx-5 -translate-y-5`}
        onClick={() => {
          if (hoveredItem === 0) return;
          setHoveredItem((hoveredItem) => hoveredItem - 1);
        }}
      >
        <img className="w-full h-full" src="./carousel-left.svg" />
      </button>
      <div
      className="flex flex-col items-center max-w-[66vw]">
        <div ref={containerRef}
          className={`${
            !isOverflow && "justify-center"
          } w-full max-w-[85vw] h-[35vw] flex items-center gap-5 overflow-hidden text-white`}
        >
          {items.map((item, i) => {
            return (
              <div
                id={`carousel-${i}`}
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => {
                  navigate(`/5/${title}/${item.title}`);
                }}
                onMouseEnter={() => {
                  if (debounceRef.current) return;
                  debounceRef.current = true;
                  setHoveredItem(i);
                }}
                onMouseLeave={() => (debounceRef.current = false)}
                style={{
                  aspectRatio: hoveredItem === i ? 0.62 : 0.73,
                }}
                className={`relative cursor-pointer text-white flex items-end
                bg-gradient-to-r from-[#05CCA3] via-[#46AFE1] to-[#8085F0]
                before:content-[''] before:bg-cover min-w-[20.9vw] p-[1vw]
                ${
                  hoveredItem === i
                    ? `h-full before:w-[calc(100%-.4vw)] after:w-[calc(100%-.4vw)] after:h-[calc(100%-.3vw)]`
                    : `h-[80%] before:w-full after:w-full after:h-full`
                } before:h-[calc(100%-1.5vw)] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                after:bg-gradient-to-t after:from-black after:to-transparent
                `}
              >
                <style>{`
                  #carousel-${i}::before {
                    background-image: url(data/${title}/${item.image_url});
                    background-position: center;
                  }
                `}</style>
                <span className="relative z-10 text-[2vw] p-2">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-5 mt-[5vw]">
          {items.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => setHoveredItem(i)}
                className={`${
                  hoveredItem === i ? "bg-[#05CCA3]" : "bg-[#FFFFFF]"
                } 
                ${items.length === 1 && 'invisible'}
                cursor-pointer w-[2vw] aspect-square rounded-full transition-colors`}
              ></div>
            );
          })}
        </div>
      </div>
      <button
        className={`${items.length === 1 && 'invisible'} max-w-[6vw] aspect-square mx-[2vw] -translate-y-5`}
        onClick={() => {
          if (hoveredItem === items.length - 1) return;
          setHoveredItem((hoveredItem) => hoveredItem + 1);
        }}
      >
        <img className="w-full h-full" src="./carousel-right.svg" />
      </button>
    </div>
  );
};
