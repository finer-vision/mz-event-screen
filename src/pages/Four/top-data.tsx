import topDataContent1 from "./top-data-content1.svg"
import topDataContent2 from "./top-data-content2.svg"
import topDataContent3 from "./top-data-content3.svg"
import topDataContent4 from "./top-data-content4.svg"

export default {
  page1: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img className="aspect-[501/620] w-[65%]" src={topDataContent1}/>
        </div>
      </>
    ),
  },
  page2: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img className="aspect-[775/620] w-full" src={topDataContent2}/>
        </div>
      </>
    ),
  },
  page3: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img className="aspect-[625/694] w-[77%]" src={topDataContent3}/>
        </div>
      </>
    ),
  },
  page4: {
    content: (
      <>
        <div className="text-[#05CFA6] font-bold flex flex-col text-[2vw] w-full">
          <img className="aspect-[625/694] w-[73%]" src={topDataContent4}/>
        </div>
      </>
    ),
  },
} as any;
