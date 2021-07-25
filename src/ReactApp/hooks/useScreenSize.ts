import { useEffect, useState } from "react";
import { useUnmounted } from "./useUnmounted";

export function useScreenSize() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const { getUnmounted } = useUnmounted();

    useEffect(() => {
        let timer: number;
        window.onresize = () => {
            if (!getUnmounted()) {
                return;
            }

            if (timer > 0) {
                clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                setScreenWidth(window.innerWidth);
                setScreenHeight(window.innerHeight);
            }, 100);
        };
    }, []);

    return { screenWidth, screenHeight };
}
