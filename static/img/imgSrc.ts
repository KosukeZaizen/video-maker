import { staticFolderPath } from "../../src/ReactApp/common/consts";

const imgNames = ["running_ninja", "rock"] as const;
type ImgNames = typeof imgNames[number];

const elementSrc = imgNames.reduce((acc, val) => {
    return { ...acc, [val]: getPngPath(val) };
}, {} as { [key in ImgNames]: string });

type ElementSrc = typeof elementSrc[keyof typeof elementSrc];

const backgroundSrc = {} as const;
type BackgroundSrc = typeof backgroundSrc[keyof typeof backgroundSrc];

export const imgSrc = { element: elementSrc, background: backgroundSrc };
export type ImgSrc = ElementSrc | BackgroundSrc;

function getPngPath(fileName: string) {
    return `${staticFolderPath}/img/${fileName}.png`;
}
