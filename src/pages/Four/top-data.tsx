import topDataContent1 from "./top-data-content1.png";
import topDataContent2 from "./top-data-content2.png";
import topDataContent3 from "./top-data-content3.png";
import topDataContent4 from "./top-data-content4.png";

export default {
  page1: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img
            className="aspect-[501/620] w-[65%]"
            src={topDataContent1}
            style={{ objectFit: "contain", objectPosition: "0 0" }}
          />
        </div>
      </>
    ),
  },
  page2: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img
            className="aspect-[775/620] w-full"
            src={topDataContent2}
            style={{ objectFit: "contain", objectPosition: "0 0" }}
          />
        </div>
      </>
    ),
  },
  page3: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img
            className="aspect-[625/694] w-[77%]"
            src={topDataContent3}
            style={{ objectFit: "contain", objectPosition: "0 0" }}
          />
        </div>
      </>
    ),
  },
  page4: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img
            className="aspect-[625/694] w-[73%]"
            src={topDataContent4}
            style={{ objectFit: "contain", objectPosition: "0 0" }}
          />
        </div>
      </>
    ),
  },
} as any;
