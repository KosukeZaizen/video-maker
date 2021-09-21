import { GameInfo } from "..";
import { BackgroundImg } from "../GameElement/BackgroundImg";
import { Block } from "../GameElement/Block";
import { Floor } from "../GameElement/Floor";
import { FlyingBlock } from "../GameElement/FlyingBlock";
import { Img } from "../GameElement/Img";
import { SpeakingCharacter } from "../GameElement/SpeakingCharacter";
import { StageChanger } from "../GameElement/StageChanger";

export const introductionStages: GameInfo["stages"] = [
    {
        currentStageTime: 0,
        initialPosition: { x: 140, y: 0 },
        commandTimeline: {
            20: [{ type: "goLeft", start: true }],
            40: [{ type: "jump" }],
        },
        elements: [
            new Floor({
                name: "floor1",
                x: -120,
                y: 90,
                width: 400,
            }),
            new Block({
                name: "rock1",
                x: 20,
                y: 70,
                width: 25,
                imgInfo: { imgName: "rock" },
            }),
            new BackgroundImg({ imgName: "first_street" }),
            new Img({
                name: "torii",
                imgInfo: { imgName: "torii", zIndex: 99 },
                x: 35,
                y: 18,
                width: 120,
            }),
            new StageChanger({
                name: "stageChanger1",
                x: -30,
                y: 70,
                width: 20,
            }),
        ],
    },
    {
        currentStageTime: 0,
        initialPosition: { x: 160, y: 77 },
        commandTimeline: {
            1: [{ type: "goLeft", start: true }],
            5: [{ type: "goLeft", start: false }],
            10: [{ type: "goLeft", start: true }],
            20: [{ type: "goLeft", start: false }],
            40: [{ type: "goLeft", start: true }],
            53: [{ type: "jump" }],
            64: [{ type: "goLeft", start: false }],
        },
        elements: [
            new Floor({
                name: "floor1",
                x: -120,
                y: 90,
                width: 400,
            }),
            new BackgroundImg({ imgName: "pochi_room" }),
            new SpeakingCharacter({
                message:
                    "Hello!\nYour mission is learning Japanese vocabulary!\nGood luck!",
                messageWidth: 100,
                name: "pochi",
                x: 100,
                y: 74.5,
                width: 12,
                imgInfo: {
                    imgName: "pochi",
                },
            }),
            new FlyingBlock({
                name: "butsudan",
                x: 20,
                y: 65,
                width: 25,
                imgInfo: { imgName: "butsudan" },
                directionToFly: "top",
                distanceBetweenFireAndBlock: 0.4,
            }),
        ],
    },
];
