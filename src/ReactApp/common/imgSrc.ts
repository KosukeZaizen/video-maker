import { staticFolderPath } from "./consts";

const imgNames = ["running_ninja", "rock"] as const;
type ImgNames = typeof imgNames[number];

const elementSrc = imgNames.reduce((acc, val) => {
    return { ...acc, [val]: getGameElementPngPath(val) };
}, {} as { [key in ImgNames]: string });

const backgroundSrc = {} as const;

export const imgSrc = { gameElement: elementSrc, background: backgroundSrc };

export type ElementImgName = keyof typeof imgSrc["gameElement"];
export type BackgroundImgName = keyof typeof imgSrc["background"];

function getGameElementPngPath(fileName: string) {
    return `${staticFolderPath}/img/gameElement/${fileName}.png`;
}
