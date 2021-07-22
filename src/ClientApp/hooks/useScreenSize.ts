import { useEffect, useState } from "react";

export function useScreenSize() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    useEffect(() => {
        let timer: number;
        window.onresize = () => {
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
