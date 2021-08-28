import { useEffect, useState } from "react";
import { debounce } from "../common/functions";

const setScreen = debounce<React.Dispatch<React.SetStateAction<number>>>(
    setUL => {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        if (screenWidth < screenHeight) {
            // 縦長なら幅と高さを入れ替えて計算
            screenWidth = window.innerHeight;
            screenHeight = window.innerWidth;
        }

        const UL = Math.min(screenWidth / 168, screenHeight / 94.5);
        setUL(UL);
    },
    100
);

export function useUnitLength() {
    const [UL, setUL] = useState(0);

    useEffect(() => {
        const el = () => {
            setScreen(setUL);
        };
        window.addEventListener("resize", el);
        el();

        return () => window.removeEventListener("resize", el);
    }, []);

    return UL;
}
