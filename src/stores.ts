import { create } from "zustand";

type BackgroundState = {
    background: string;
    setBackground: (background: string) => void;
}

export const useBackground = create<BackgroundState>((set) => ({
    background: "",
    setBackground: (background: string) => set({ background }),
}));

type SlideDirection = "left" | "right"
type SlideDirectionState = {
    slideDirection: SlideDirection;
    setSlideDirection: (slideDirection: SlideDirection) => void;
}

export const useSlideDirection = create<SlideDirectionState>((set) => ({
    slideDirection: "left",
    setSlideDirection: (slideDirection: SlideDirection) => set({ slideDirection }),
}));