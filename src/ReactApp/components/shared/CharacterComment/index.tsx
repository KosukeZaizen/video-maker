import * as React from "react";
import { imgSrc } from "../../../common/imgSrc";

const { standing_ninja, pochi, ninja_girl } = imgSrc.element;
const imgs = { 1: standing_ninja, 2: pochi, 3: ninja_girl };

type TProps = {
    imgNumber: keyof typeof imgs;
    screenWidth: number;
    comment: string | React.ReactNode;
    style?: React.CSSProperties;
    commentStyle?: React.CSSProperties;
    imgStyle?: React.CSSProperties;
    containerRef?: React.RefObject<HTMLDivElement>;
};
export default function CharacterComment(props: TProps) {
    const {
        imgNumber,
        screenWidth,
        comment,
        style,
        commentStyle,
        imgStyle,
        containerRef,
    } = props;
    return (
        <div
            style={{
                display: "flex",
                maxWidth: 600,
                margin: "auto",
                ...style,
            }}
            ref={containerRef}
        >
            <div style={{ flex: 1 }}>
                <img
                    src={imgs[imgNumber]}
                    alt="Japanese ninja"
                    style={{
                        width: (screenWidth * 2) / 10,
                        maxWidth: 120,
                        height: "auto",
                        verticalAlign: "top",
                        ...imgStyle,
                    }}
                    className="character-jump-animation"
                />
            </div>
            <div
                style={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    flex: 3,
                }}
            >
                <div
                    style={{
                        width:
                            screenWidth > 767
                                ? (screenWidth * 7) / 10 - 15
                                : "100%",
                        maxWidth: 420,
                        display: "inline-block",
                        position: "relative",
                        margin: "5px 0 0 15px",
                        padding: "17px 13px",
                        borderRadius: 12,
                        background: "antiquewhite",
                        ...commentStyle,
                    }}
                >
                    <div
                        style={{
                            content: "",
                            display: "inline-block",
                            position: "absolute",
                            top: 18,
                            left: -24,
                            border: "12px solid transparent",
                            borderRight: "12px solid antiquewhite",
                        }}
                    />
                    {comment}
                </div>
            </div>
        </div>
    );
}
