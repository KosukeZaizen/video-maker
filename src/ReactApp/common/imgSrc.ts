import { staticFolderPath } from "./consts";

const imgNames = ["running_ninja", "rock", "torii"] as const;
const backgroundNames = ["first_street"] as const;

type ImgNames = typeof imgNames[number];
type BackgroundNames = typeof backgroundNames[number];

function getGameElementPngPath(fileName: string) {
    return `${staticFolderPath}/img/gameElement/${fileName}.png`;
}

function getBackgroundJpgPath(fileName: string) {
    return `${staticFolderPath}/img/gameBackground/${fileName}.jpg`;
}

const elementSrc = imgNames.reduce(
    (acc, val) => ({ ...acc, [val]: getGameElementPngPath(val) }),
    {} as { [key in ImgNames]: string }
);

const backgroundSrc = backgroundNames.reduce(
    (acc, val) => ({ ...acc, [val]: getBackgroundJpgPath(val) }),
    {} as { [key in BackgroundNames]: string }
);

export const imgSrc = { gameElement: elementSrc, background: backgroundSrc };

export type ElementImgName = keyof typeof imgSrc["gameElement"];
export type BackgroundImgName = keyof typeof imgSrc["background"];
