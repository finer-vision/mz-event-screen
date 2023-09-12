import React from "react";
import { useNavigate } from "react-router-dom";
import offlineSync from "@/services/offline-sync";
import { SurveyData } from "@/types";

const questions: string[] = [
  "Our induction and onboarding are personalised and give new joiners ownership of their journey.",
  "My team creates content at pace, and they are ready to embrace technology like AI.",
  "Our compliance programmes are effective and are respected by all because they are central to our purpose and values.",
  "Our leaders are truly inclusive and create a culture of psychological safety that enables everyone the time they need to learn.",
  "Our skills content is bite-sized, blended, personalised and communicated effectively.",
];

export default function Two() {
  const navigate = useNavigate();

  const [rotation, setRotation] = React.useState(0);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState(0);

  const answersRef = React.useRef<number[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const submit = React.useCallback(() => {
    const input = inputRef.current;
    if (input === null) return;
    answersRef.current.push(answer);
    input.value = "0";
    setAnswer(0);
    setRotation(0);
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex > questions.length - 1) {
      localStorage.setItem("mz-event-screen", JSON.stringify(answersRef.current));
      offlineSync
        .save<SurveyData>("surveys", {
          answers: answersRef.current,
          createdAt: new Date().toISOString(),
        })
        .then(() => console.log("survey saved"))
        .catch(console.error);
      return navigate("/3");
    }
    setQuestionIndex(nextQuestionIndex);
  }, [questionIndex, answer]);

  return (
    <>
      <div
        className="full-screen-gradient"
        style={{ "--rotation": rotation } as React.CSSProperties}
      />
      <div className="relative flex flex-col justify-start items-center w-full h-full bg-cover bg-no-repeat z-50">
        <div className="text-[1.5vw] mt-[11%] w-[10vw] h-[3vw] text-center">
          {questionIndex + 1}/{questions.length}
        </div>
        <div className="divider-gradient w-[11vw] h-[0.2vw]" />
        <div className="w-[86vw] aspect-[1853/483] whitespace-pre-wrap mt-[6%] text-[3.7vw] text-center">
          {questions[questionIndex]}
        </div>
        <div className="w-[64vw] pt-[5vw] mt-[5vw] relative">
          <svg
            className="w-[100%] h-auto absolute top-0 left-0"
            width="1421"
            height="98"
            viewBox="0 0 1421 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10.9604"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <path
              d="M14.4256 97.5508C11.4592 97.5508 8.93258 96.7436 6.84563 95.1292C4.75868 93.5016 3.16394 91.1456 2.0614 88.0611C0.958861 84.9635 0.407592 81.2228 0.407592 76.8388C0.407592 72.4812 0.958861 68.7601 2.0614 65.6756C3.17706 62.578 4.77837 60.2155 6.86532 58.5879C8.96539 56.9472 11.4855 56.1269 14.4256 56.1269C17.3657 56.1269 19.8792 56.9472 21.9662 58.5879C24.0662 60.2155 25.6675 62.578 26.7701 65.6756C27.8857 68.7601 28.4436 72.4812 28.4436 76.8388C28.4436 81.2228 27.8923 84.9635 26.7898 88.0611C25.6872 91.1456 24.0925 93.5016 22.0055 95.1292C19.9186 96.7436 17.3919 97.5508 14.4256 97.5508ZM14.4256 93.2194C17.3657 93.2194 19.6495 91.8019 21.2771 88.9668C22.9046 86.1317 23.7184 82.089 23.7184 76.8388C23.7184 73.3475 23.3443 70.3746 22.5962 67.9201C21.8612 65.4656 20.798 63.5953 19.4067 62.309C18.0285 61.0227 16.3682 60.3795 14.4256 60.3795C11.5117 60.3795 9.23446 61.8168 7.59378 64.6912C5.9531 67.5526 5.13276 71.6018 5.13276 76.8388C5.13276 80.3302 5.50027 83.2966 6.2353 85.7379C6.97032 88.1792 8.02692 90.0365 9.4051 91.3097C10.7964 92.5828 12.4699 93.2194 14.4256 93.2194Z"
              fill="white"
            />
            <rect
              x="148.867"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <rect
              x="286.774"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <path
              d="M284.234 96.9996V93.4557L297.543 78.8864C299.105 77.1801 300.391 75.6969 301.402 74.4369C302.413 73.1637 303.161 71.9693 303.646 70.8536C304.145 69.7248 304.395 68.5436 304.395 67.3098C304.395 65.8922 304.053 64.665 303.371 63.6281C302.701 62.5912 301.783 61.7905 300.614 61.2261C299.446 60.6617 298.134 60.3795 296.677 60.3795C295.128 60.3795 293.776 60.7011 292.621 61.3442C291.479 61.9743 290.593 62.8602 289.963 64.0021C289.346 65.1441 289.038 66.4829 289.038 68.0185H284.391C284.391 65.656 284.936 63.5821 286.025 61.7971C287.115 60.012 288.598 58.6207 290.475 57.6232C292.365 56.6256 294.485 56.1269 296.834 56.1269C299.197 56.1269 301.29 56.6256 303.115 57.6232C304.939 58.6207 306.37 59.9661 307.407 61.6593C308.444 63.3524 308.962 65.2359 308.962 67.3098C308.962 68.7929 308.693 70.2433 308.155 71.6609C307.63 73.0653 306.711 74.6338 305.399 76.3663C304.099 78.0858 302.294 80.1858 299.984 82.6666L290.928 92.3531V92.6682H309.671V96.9996H284.234Z"
              fill="white"
            />
            <rect
              x="424.681"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <rect
              x="562.588"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <path
              d="M554.171 88.7305V84.7141L571.89 56.6781H574.804V62.8996H572.835L559.447 84.0841V84.3991H583.309V88.7305H554.171ZM573.15 96.9996V87.5098V85.6395V56.6781H577.797V96.9996H573.15Z"
              fill="white"
            />
            <rect
              x="700.495"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <rect
              x="838.402"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <path
              d="M849.235 97.5508C847.582 97.5246 845.928 97.2096 844.274 96.6058C842.62 96.002 841.111 94.9848 839.746 93.5541C838.381 92.1103 837.285 90.1612 836.458 87.7067C835.631 85.2391 835.217 82.1415 835.217 78.4139C835.217 74.8438 835.552 71.6805 836.221 68.9242C836.891 66.1547 837.862 63.825 839.135 61.9349C840.408 60.0317 841.944 58.5879 843.742 57.6035C845.554 56.6191 847.595 56.1269 849.865 56.1269C852.123 56.1269 854.131 56.5797 855.89 57.4854C857.662 58.3779 859.106 59.6248 860.221 61.2261C861.337 62.8274 862.059 64.6715 862.387 66.7585H857.583C857.137 64.9472 856.271 63.4443 854.984 62.2499C853.698 61.0555 851.992 60.4583 849.865 60.4583C846.742 60.4583 844.28 61.8168 842.482 64.5337C840.697 67.2507 839.798 71.0636 839.785 75.9726H840.1C840.835 74.8569 841.708 73.9053 842.719 73.1178C843.742 72.3171 844.871 71.7002 846.105 71.2671C847.339 70.834 848.645 70.6174 850.023 70.6174C852.333 70.6174 854.446 71.1949 856.362 72.3499C858.279 73.4919 859.814 75.0735 860.97 77.0948C862.125 79.103 862.702 81.4065 862.702 84.0054C862.702 86.4992 862.144 88.783 861.029 90.8568C859.913 92.9175 858.344 94.5582 856.323 95.7789C854.315 96.9864 851.952 97.5771 849.235 97.5508ZM849.235 93.2194C850.889 93.2194 852.372 92.806 853.685 91.9791C855.011 91.1522 856.054 90.0431 856.815 88.6518C857.59 87.2605 857.977 85.7117 857.977 84.0054C857.977 82.3384 857.603 80.8224 856.855 79.4574C856.12 78.0792 855.102 76.9832 853.803 76.1694C852.517 75.3557 851.047 74.9488 849.393 74.9488C848.146 74.9488 846.984 75.1982 845.908 75.6969C844.832 76.1826 843.887 76.852 843.073 77.7051C842.272 78.5583 841.642 79.5361 841.183 80.6387C840.723 81.7281 840.494 82.8766 840.494 84.0841C840.494 85.6854 840.868 87.1817 841.616 88.573C842.377 89.9643 843.414 91.0865 844.727 91.9397C846.052 92.7928 847.555 93.2194 849.235 93.2194Z"
              fill="white"
            />
            <rect
              x="976.309"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <rect
              x="1114.22"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <path
              d="M1124.79 97.5508C1122.09 97.5508 1119.7 97.0717 1117.63 96.1136C1115.57 95.1423 1113.96 93.8101 1112.8 92.1169C1111.65 90.4106 1111.08 88.468 1111.09 86.2892C1111.08 84.5829 1111.41 83.0078 1112.09 81.564C1112.78 80.1071 1113.71 78.893 1114.89 77.9217C1116.08 76.9373 1117.42 76.3138 1118.89 76.0513V75.8151C1116.96 75.3163 1115.42 74.2334 1114.28 72.5665C1113.14 70.8865 1112.57 68.9767 1112.59 66.8372C1112.57 64.7897 1113.09 62.9587 1114.14 61.3442C1115.19 59.7298 1116.64 58.4566 1118.47 57.5247C1120.32 56.5928 1122.43 56.1269 1124.79 56.1269C1127.13 56.1269 1129.22 56.5928 1131.05 57.5247C1132.89 58.4566 1134.34 59.7298 1135.39 61.3442C1136.45 62.9587 1136.99 64.7897 1137 66.8372C1136.99 68.9767 1136.4 70.8865 1135.25 72.5665C1134.11 74.2334 1132.59 75.3163 1130.7 75.8151V76.0513C1132.16 76.3138 1133.47 76.9373 1134.64 77.9217C1135.81 78.893 1136.74 80.1071 1137.43 81.564C1138.13 83.0078 1138.48 84.5829 1138.5 86.2892C1138.48 88.468 1137.89 90.4106 1136.72 92.1169C1135.57 93.8101 1133.96 95.1423 1131.9 96.1136C1129.85 97.0717 1127.48 97.5508 1124.79 97.5508ZM1124.79 93.2194C1126.62 93.2194 1128.19 92.9241 1129.52 92.3335C1130.84 91.7428 1131.87 90.9093 1132.59 89.8331C1133.31 88.7568 1133.68 87.4967 1133.69 86.0529C1133.68 84.5304 1133.29 83.185 1132.51 82.0168C1131.74 80.8487 1130.68 79.9299 1129.34 79.2605C1128.02 78.5911 1126.5 78.2564 1124.79 78.2564C1123.07 78.2564 1121.54 78.5911 1120.19 79.2605C1118.85 79.9299 1117.79 80.8487 1117.02 82.0168C1116.26 83.185 1115.88 84.5304 1115.89 86.0529C1115.88 87.4967 1116.23 88.7568 1116.94 89.8331C1117.66 90.9093 1118.69 91.7428 1120.03 92.3335C1121.37 92.9241 1122.96 93.2194 1124.79 93.2194ZM1124.79 74.0825C1126.24 74.0825 1127.52 73.7937 1128.63 73.2162C1129.76 72.6387 1130.65 71.8315 1131.29 70.7946C1131.93 69.7577 1132.26 68.5436 1132.27 67.1523C1132.26 65.7872 1131.94 64.5994 1131.31 63.5887C1130.68 62.5649 1129.81 61.7774 1128.69 61.2261C1127.58 60.6617 1126.28 60.3795 1124.79 60.3795C1123.28 60.3795 1121.96 60.6617 1120.84 61.2261C1119.71 61.7774 1118.83 62.5649 1118.22 63.5887C1117.6 64.5994 1117.3 65.7872 1117.31 67.1523C1117.3 68.5436 1117.61 69.7577 1118.24 70.7946C1118.88 71.8315 1119.77 72.6387 1120.9 73.2162C1122.02 73.7937 1123.32 74.0825 1124.79 74.0825Z"
              fill="white"
            />
            <rect
              x="1252.12"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <rect
              x="1390.03"
              y="0.418098"
              width="6.93024"
              height="27.721"
              rx="3.46512"
              fill="white"
            />
            <path
              d="M1381.95 56.6781V96.9996H1377.06V61.7971H1376.83L1366.98 68.3335V63.3721L1377.06 56.6781H1381.95ZM1406.7 97.5508C1403.73 97.5508 1401.2 96.7436 1399.12 95.1292C1397.03 93.5016 1395.43 91.1456 1394.33 88.0611C1393.23 84.9635 1392.68 81.2228 1392.68 76.8388C1392.68 72.4812 1393.23 68.7601 1394.33 65.6756C1395.45 62.578 1397.05 60.2155 1399.13 58.5879C1401.23 56.9472 1403.76 56.1269 1406.7 56.1269C1409.64 56.1269 1412.15 56.9472 1414.24 58.5879C1416.34 60.2155 1417.94 62.578 1419.04 65.6756C1420.16 68.7601 1420.71 72.4812 1420.71 76.8388C1420.71 81.2228 1420.16 84.9635 1419.06 88.0611C1417.96 91.1456 1416.36 93.5016 1414.28 95.1292C1412.19 96.7436 1409.66 97.5508 1406.7 97.5508ZM1406.7 93.2194C1409.64 93.2194 1411.92 91.8019 1413.55 88.9668C1415.17 86.1317 1415.99 82.089 1415.99 76.8388C1415.99 73.3475 1415.61 70.3746 1414.87 67.9201C1414.13 65.4656 1413.07 63.5953 1411.68 62.309C1410.3 61.0227 1408.64 60.3795 1406.7 60.3795C1403.78 60.3795 1401.5 61.8168 1399.86 64.6912C1398.22 67.5526 1397.4 71.6018 1397.4 76.8388C1397.4 80.3302 1397.77 83.2966 1398.5 85.7379C1399.24 88.1792 1400.3 90.0365 1401.67 91.3097C1403.07 92.5828 1404.74 93.2194 1406.7 93.2194Z"
              fill="white"
            />
          </svg>
          <div
            className="question-progress-indicator-tail"
            style={{ "--progress": answer / 10 } as React.CSSProperties}
          />
          <div
            style={{ "--progress": answer / 10 } as React.CSSProperties}
            className="question-progress-indicator w-[2.1vw] aspect-[1/1] bg-[#fff] rounded-[50%] absolute top-0 left-0 translate-y-[-140%]"
          >
            <div className="absolute text-[2.165703125vw] text-center align-middle top-0 left-0">
              <svg
                className="w-[216%] relative h-auto left-[50%] top-0 translate-x-[-50%] translate-y-[-110%]"
                enableBackground="new 0 0 182 167"
                viewBox="0 0 182 167"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="m30.9.1c-16.6 0-30 13.8-30 30.8v77c0 17 13.4 30.8 30 30.8h32.1l23.1 22.9c2.7 2.7 7 2.7 9.8 0l23.1-22.9h32c16.6 0 30-13.8 30-30.8v-77c0-17-13.4-30.8-30-30.8h-120.1z"
                  fill="#32a6f9"
                  fillRule="evenodd"
                />
                <text
                  fill="#fff"
                  fontFamily="'Montserrat'"
                  fontSize="93"
                  transform="translate(92 105.6564)"
                  textAnchor="middle"
                >
                  {answer}
                </text>
              </svg>
            </div>
          </div>
          <input
            ref={inputRef}
            type="range"
            defaultValue={0}
            min={0}
            max={100}
            step={1}
            className="absolute bottom-0 left-0 w-[100%] h-[200%] opacity-0"
            onInput={(event) => {
              const input = event.target as HTMLInputElement;
              const progress = parseFloat(input.value) / 100;
              setRotation(360 * progress);
              setAnswer(Math.round(progress * 10));
            }}
          />
        </div>
        <button
          className="button-gradient text-[1.87vw] h-[7.7vw] aspect-[782/168] mt-[20%] relative"
          onClick={submit}
        >
          {questionIndex === questions.length - 1 ? "FINISH" : "NEXT QUESTION"}
          <svg
            width="784"
            height="169"
            viewBox="0 0 784 169"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 w-[100%] h-[100%]"
          >
            <rect
              x="4.77441"
              y="4.28467"
              width="774.933"
              height="160"
              rx="80"
              stroke="url(#paint0_linear_2_222)"
              strokeWidth="8"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2_222"
                x1="39.929"
                y1="76.7536"
                x2="690.641"
                y2="76.7536"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7C97F8" />
                <stop offset="1" stopColor="#069479" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    </>
  );
}
