import { staticFolderPath } from "./consts";

const imgNames = [
    "running_ninja",
    "standing_ninja",
    "pochi",
    "ninja_girl",
    "rock",
    "torii",
    "tree",
    "signboard",
    "butsudan",
    "fire",
    "fireHorizontal",
] as const;

const backgroundNames = ["first_street", "pochi_room"] as const;

type ImgNames = typeof imgNames[number];
type BackgroundNames = typeof backgroundNames[number];

function getGameElementPngPath(fileName: string) {
    return `${staticFolderPath}/img/element/${fileName}.png`;
}

function getBackgroundJpgPath(fileName: string) {
    return `${staticFolderPath}/img/background/${fileName}.jpg`;
}

const elementSrc = imgNames.reduce(
    (acc, val) => ({ ...acc, [val]: getGameElementPngPath(val) }),
    {} as { [key in ImgNames]: string }
);

const backgroundSrc = backgroundNames.reduce(
    (acc, val) => ({ ...acc, [val]: getBackgroundJpgPath(val) }),
    {} as { [key in BackgroundNames]: string }
);

export const imgSrc = { element: elementSrc, background: backgroundSrc };

export type ElementImgName = keyof typeof imgSrc["element"];
export type BackgroundImgName = keyof typeof imgSrc["background"];
