import * as React from "react";
import { useEffect } from "react";
import { ChangePage, Page } from ".";
import { sleepAsync } from "../../../common/functions";
import CharacterComment from "../../shared/CharacterComment";
import { sound } from "../types/vocab";

export function LastPage({
    screenWidth,
    changePage,
    music,
    stopRecording,
}: {
    screenWidth: number;
    changePage: ChangePage;
    music: sound;
    stopRecording: () => void;
}) {
    useEffect(() => {
        setTimeout(() => {
            const soundFadeOut = async () => {
                const { audio } = music;
                while (audio.volume > 0) {
                    audio.volume -= 0.001;
                    await sleepAsync(1000);
                }
            };
            soundFadeOut();
        }, 13000);

        setTimeout(() => {
            stopRecording();
            setTimeout(() => changePage(Page.menu), 600);
        }, 20000);
    }, []);

    return (
        <div>
            <h1
                id="h1title"
                style={{
                    marginBottom: 100,
                    fontWeight: "bold",
                    fontSize: 90,
                }}
            >
                {"Thank you for watching!"}
            </h1>
            <CharacterComment
                imgNumber={1}
                imgStyle={{ minWidth: 160, position: "relative", left: -40 }}
                screenWidth={screenWidth}
                comment={[
                    <p key={1} style={{ margin: 0 }}>
                        {"Don't forget to subscribe"}
                    </p>,
                    <p key={2} style={{ margin: 0 }}>
                        {"to this YouTube channel!"}
                    </p>,
                ]}
                style={{ maxWidth: 1000, marginBottom: 40 }}
                commentStyle={{
                    fontSize: 50,
                    fontWeight: "bold",
                    maxWidth: 900,
                    marginLeft: 40,
                    textAlign: "center",
                }}
            />
        </div>
    );
}
