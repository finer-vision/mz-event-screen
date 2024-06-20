import React from "react";
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import offlineSync from "@/services/offline-sync";
import { SurveyData } from "@/types";

type Question = {
  question: string;
  options: string[];
  multiple?: boolean;
};

const questions: Question[] = [
  {
    question: "What's your biggest transformation challenge?",
    options: [
      "Culture Transformation",
      "Digital Transformation",
      "Brand & Proposition",
      "Leadership Capabilities",
    ],
  },
  {
    question: "What topics do you want to talk about? (Select all that apply)",
    options: [
      "Diversity, Equity & Inclusion",
      "Storytelling for Leaders",
      "ESG",
      "Compliance",
      "Onboarding",
      "Wellbeing",
    ],
  },
  {
    question: "What services do you need? (Select all that apply)",
    options: [
      "📰    Newsroom",
      "📣    Comms support",
      "🎬    Storytelling",
      "🎥    Films",
      "🎨    Animations",
      "🖌️    Graphic design",
      "🚫    None, we do it all in-house",
    ],
    multiple: true,
  },
];

export default function Two() {
  const navigate = useNavigate();

  const [rotation, setRotation] = React.useState(0);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  const answersRef = React.useRef<string[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const submit = React.useCallback(() => {
    const input = inputRef.current;
    if (input === null) return;
    if (input.value === "") return;
    answersRef.current.push(input.value);
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex > questions.length - 1) {
      localStorage.setItem(
        "mz-event-screen",
        JSON.stringify(answersRef.current),
      );
      offlineSync
        .save<SurveyData>("surveys", {
          answers: answersRef.current,
          createdAt: new Date().toISOString(),
        })
        .then(() => console.log("survey saved"))
        .catch(console.error);
      setCompleted(true);
    }
    setQuestionIndex(nextQuestionIndex);
  }, [questionIndex]);

  return (
    <>
      <div
        className="full-screen-gradient"
        style={{ "--rotation": rotation } as React.CSSProperties}
      />
      <div className="relative flex flex-col justify-start items-center w-full h-full bg-cover bg-no-repeat z-50">
        {!completed && (
          <>
            <div className="text-[1.5vw] mt-[11%] w-[10vw] h-[3vw] text-center">
              {questionIndex + 1}/{questions.length}
            </div>
            <div className="divider-gradient w-[11vw] h-[0.2vw]" />
            <div className="w-[86vw] aspect-[1853/483] whitespace-pre-wrap mt-[6%] text-[3.7vw] text-center">
              {questions[questionIndex].question}
            </div>
            <div className="w-[64vw] pt-[5vw] mt-[5vw] relative">
              <input key={questionIndex} ref={inputRef} type="hidden" />
              {questions[questionIndex].options.map((option, index) => {
                return (
                  <div
                    key={`${questionIndex}-${index}`}
                    className="text-[3vw] mb-[1ch] flex items-center gap-[1ch] whitespace-pre-wrap"
                  >
                    <input
                      type={
                        questions[questionIndex].multiple ? "checkbox" : "radio"
                      }
                      id={`question-${index}-${questionIndex}`}
                      name="question"
                      value={option}
                      className="h-[3vw] aspect-square"
                      onInput={(event) => {
                        const input = inputRef.current;
                        if (input === null) return;
                        let value = event.currentTarget.value;
                        if (questions[questionIndex].multiple) {
                          const checked = event.currentTarget.checked;
                          const values = input.value
                            .split(";")
                            .filter((item) => item !== value);
                          if (checked) {
                            values.push(value);
                          }
                          value = values.join(";");
                        }
                        input.value = value.replace(/^;/, "");
                      }}
                    />
                    <label htmlFor={`question-${index}-${questionIndex}`}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {completed && (
          <div className="text-[3.7vw] mt-[11%] h-[3vw] text-center">
            Enjoy your cupcake! 🧁
          </div>
        )}
        {questionIndex <= questions.length - 1 && (
          <button
            className="button-gradient text-[1.87vw] h-[7.7vw] aspect-[782/168] mt-[20%] relative"
            onClick={submit}
          >
            {questionIndex === questions.length - 1
              ? "FINISH"
              : "NEXT QUESTION"}
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
        )}
        {completed && (
          <ConfettiExplosion
            width={window.innerWidth * 1.2}
            height={window.innerHeight * 1.2}
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
              width: "100%",
              height: "100%",
            }}
            particleCount={500}
            particleSize={24}
            duration={5000}
            force={0.4}
            onComplete={() => {
              navigate("/3");
            }}
          />
        )}
      </div>
    </>
  );
}
