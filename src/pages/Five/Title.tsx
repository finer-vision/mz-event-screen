export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-bold text-center uppercase bg-[100%,100%] bg-no-repeat bg-center text-white grid place-items-center w-[50vw] px-[1vw] py-[4vw] text-[2.4vw]">
      {children}
    </div>
  );
}
