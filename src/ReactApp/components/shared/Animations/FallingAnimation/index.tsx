import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { appsPublicImg, Z_APPS_TOP_URL } from "../../../../common/consts";
import { cFetch } from "../../../../common/util/cFetch";
import { css } from "../../../../common/util/getAphroditeClassName";
import { fallingImage } from "./type";

const fallingAnimationClass = css({
    willChange: "animation",
    backfaceVisibility: "hidden",
    animationName: {
        "0%": {
            transform: "translateX(0) translateY(0) rotate(0deg)",
        },
        "100%": {
            transform: "translateX(-550px) translateY(1100px) rotate(550deg)",
        },
    },
    animationDuration: "10s",
    animationDelay: "1s",
    animationTimingFunction: "linear",
});

let count = 0;
let ls: FallingItem[] = [];
let intervalId = 0;

interface FallingItem {
    id: number;
    ageCount: number;
    initialX: number;
}

export const FallingAnimation = ({
    frequencySec,
    screenWidth,
    screenHeight,
    season: pSeason,
}: {
    frequencySec: number;
    screenWidth: number;
    screenHeight: number;
    season?: string;
}) => {
    const fallingItems = useFallingItemsAnimation(
        frequencySec,
        screenWidth,
        screenHeight
    );
    const getImg = useFallingImage(screenWidth, screenHeight, pSeason);

    return <>{fallingItems.map(getImg)}</>;
};

function useFallingImage(
    screenWidth: number,
    screenHeight: number,
    pSeason?: string
) {
    const { seasonItems, fallingItemKeyword } = useSeasonItems(pSeason);
    const scale = (screenWidth + screenHeight) / 1000;

    const seasonItem = seasonItems?.find(
        item => item.name === fallingItemKeyword
    );

    const getImg = useCallback(
        (l: FallingItem) =>
            seasonItem && (
                <img
                    key={`falling item ${l.id}`}
                    src={appsPublicImg + seasonItem.fileName}
                    alt={`${seasonItem.alt} ${l.id}`}
                    title={`${seasonItem.alt} ${l.id}`}
                    style={{
                        maxWidth: 50 * scale,
                        maxHeight: 50 * scale,
                        position: "fixed",
                        top: -1.5 * 90 * scale,
                        left: l.initialX,
                        zIndex: -100,
                    }}
                    className={fallingAnimationClass}
                />
            ),
        [seasonItem, scale]
    );

    return getImg;
}

function useSeasonItems(pSeason?: string) {
    const [seasonItems, setSeasonItems] = useState<fallingImage[]>([]);
    const [fallingItemKeyword, setFallingItemKeyword] =
        useState<string>("none");

    useEffect(() => {
        // load
        (async () => {
            if (!pSeason || pSeason === "none") {
                return;
            }

            const fallingImages = await getFallingImages();
            setSeasonItems(fallingImages);

            if (fallingImages.some(im => im.name === pSeason)) {
                setFallingItemKeyword(pSeason);
            } else {
                setFallingItemKeyword("none");
            }
        })();
    }, [pSeason]);

    return { seasonItems, fallingItemKeyword };
}

function useFallingItemsAnimation(
    frequencySec: number,
    screenWidth: number,
    screenHeight: number
) {
    const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);

    useEffect(() => {
        if (intervalId) {
            // clear old interval
            clearInterval(intervalId);
        }

        intervalId = window.setInterval(() => {
            //各FallingItemは10秒で消える
            const newFallingItems = ls
                .filter(l => l.ageCount <= 10)
                .map(l => ({ ...l, ageCount: l.ageCount + 1 }));

            count++;

            if (count % frequencySec === 0) {
                newFallingItems.push({
                    id: count,
                    ageCount: 0,
                    initialX: (screenWidth / 6) * (Math.random() * 11),
                });
            }

            setFallingItems(newFallingItems);
            ls = newFallingItems;
        }, 1000);

        return () => {
            clearInterval(intervalId);
            ls = [];
        };
    }, [screenWidth, screenHeight, frequencySec]);

    return fallingItems;
}

export async function getFallingImages() {
    const response = await cFetch(
        `${Z_APPS_TOP_URL}/api/FallingImage/GetFallingImages`
    );
    const fallingImages: fallingImage[] = await response.json();
    return fallingImages;
}
