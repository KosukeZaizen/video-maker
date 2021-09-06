import { Popover } from "@material-ui/core";
import * as React from "react";
import { useMemo, useRef } from "react";
import { gameState } from "../GameState";
import { GameElement, GameElementProps, getElementStyle } from "./BaseClass";
import { Img } from "./Img";

interface Props
    extends GameElementProps,
        Pick<SpeakingCharacter, "withoutIcon" | "message"> {}

const origins = {
    anchor: { vertical: "top", horizontal: "left" },
    transform: { vertical: "bottom", horizontal: "left" },
} as const;

export class SpeakingCharacter extends GameElement {
    message: string;
    withoutIcon?: boolean;
    isSpeaking = false;
    charImg: Img;

    constructor({ withoutIcon, message, ...rest }: Props) {
        super(rest);
        this.withoutIcon = withoutIcon;
        this.message = message;
        this.charImg = new Img(rest);
    }

    onEachTime = () => {
        this.isSpeaking = this.checkTouched(gameState.ninja);
    };

    renderElement = (props: { playTime: number }) => {
        const ref = useRef(null);

        const { imgInfo, isSpeaking } = this;
        const { UL } = gameState;

        if (!imgInfo) {
            return null;
        }

        const style = useMemo(
            () =>
                getElementStyle({
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    UL,
                    zIndex: imgInfo.zIndex,
                }),
            [UL]
        );

        const dependingOnUl = useMemo(
            () =>
                ({
                    popoverPaperProps: {
                        style: {
                            padding: 1 * UL,
                            fontSize: 5 * UL,
                            margin: 1 * UL,
                        },
                    },
                    iconStyle: {
                        width: 10 * UL,
                        margin: 3 * UL,
                    },
                } as const),
            [UL]
        );

        return (
            <>
                <img src={imgInfo.imgSrc} style={style} ref={ref} />
                <Popover
                    anchorOrigin={origins.anchor}
                    transformOrigin={origins.transform}
                    PaperProps={dependingOnUl.popoverPaperProps}
                    anchorEl={ref.current}
                    open={isSpeaking}
                >
                    <div style={{ display: "flex", margin: 2 * UL }}>
                        {!this.withoutIcon && (
                            <div>
                                <img
                                    alt={this.name}
                                    src={imgInfo.imgSrc}
                                    style={dependingOnUl.iconStyle}
                                />
                            </div>
                        )}
                        <div style={{ whiteSpace: "pre-wrap", margin: 3 * UL }}>
                            {this.message}
                        </div>
                    </div>
                </Popover>
            </>
        );
    };
}
