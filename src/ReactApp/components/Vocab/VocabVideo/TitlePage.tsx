import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChangePage, Page } from ".";
import { audioPlayAsync } from "../../../common/util/audio/audioPlayAsync";
import CharacterComment from "../../shared/CharacterComment";
import { ScrollBox } from "../../shared/ScrollBox";
import { sound, vocab } from "../types/vocab";

export function TitlePage({
    titleToShowUpper,
    screenWidth,
    changePage,
    vocabList,
    music,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    changePage: ChangePage;
    vocabList: vocab[];
    music: sound;
}) {
    const scrollTextRef = useRef<HTMLSpanElement>(null);
    const characterCommentRef = useRef<HTMLDivElement>(null);

    const [isInitial, setIsInitial] = useState(true);
    const [vList, setVList] = useState<vocab[]>(
        vocabList.filter((v, i) => i <= 10).map(v => ({ ...v }))
    );
    const [isOmitted, setIsOmitted] = useState(false);
    const [isCommentTwoLines, setIsCommentTwoLines] = useState(false);

    useEffect(() => {
        (async () => {
            const { audio } = music;
            audio.volume = 0.005;

            while (audio.volume > 0) {
                await audioPlayAsync(audio);
            }
        })();

        setTimeout(() => {
            setIsInitial(false);
        }, 5000);

        setTimeout(() => {
            changePage(Page.list);
        }, 10000);
    }, []);

    useEffect(() => {
        const rect = scrollTextRef.current?.getBoundingClientRect();
        if (rect && rect.height > 100) {
            setIsOmitted(true);
            setVList(vList.filter((v, i) => i !== vList.length - 1));
        }
    }, [vList, vocabList, scrollTextRef.current]);

    useEffect(() => {
        const rect = characterCommentRef.current?.getBoundingClientRect();
        const isTwoLines = !!rect && rect.height > 230;
        setIsCommentTwoLines(isTwoLines);
    }, [titleToShowUpper]);

    const comment = useMemo(() => {
        if (isInitial) {
            return titleToShowUpper.split(" ").map((t, i) => {
                const str = i ? " " + t : t;
                return t.includes("-") ? (
                    <span style={{ display: "inline-block" }}>{str}</span>
                ) : (
                    str
                );
            });
        } else {
            return (
                <>
                    <p style={{ fontSize: 60, margin: "10px 0 20px" }}>
                        {"Let's check all the words"}
                    </p>
                    <p style={{ fontSize: 60, margin: "0 0 10px" }}>
                        {"before starting the quiz!"}
                    </p>
                </>
            );
        }
    }, [isInitial]);

    return (
        <div
            style={
                isInitial
                    ? {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                          height: isCommentTwoLines ? "98%" : "95%",
                      }
                    : {}
            }
        >
            {isInitial && (
                <h1
                    id="h1title"
                    style={{
                        marginTop: 10,
                        marginBottom: isInitial ? 20 : 100,
                        fontWeight: "bold",
                        fontSize: 90,
                    }}
                >
                    {"Japanese Vocabulary Quiz"}
                </h1>
            )}
            <CharacterComment
                containerRef={characterCommentRef}
                imgNumber={1}
                screenWidth={screenWidth}
                comment={comment}
                style={{
                    maxWidth: 1000,
                    position: "relative",
                    left: -75,
                }}
                commentStyle={{
                    fontSize: 100,
                    fontWeight: "bold",
                    maxWidth: 1000,
                    marginLeft: 40,
                    textAlign: "center",
                    marginBottom: -20,
                    lineHeight: 1.3,
                    padding: "30px 0",
                }}
                imgStyle={{ maxWidth: 150 }}
            />
            {isInitial && (
                <ScrollBox style={{ marginTop: 60 }}>
                    <div
                        style={{
                            fontSize: 50,
                            textOverflow: "hidden",
                            width: 1100,
                            fontWeight: "bold",
                        }}
                    >
                        <span ref={scrollTextRef}>
                            {vList.map(v => v.hiragana).join(", ")}
                            {isOmitted && "..., etc"}
                        </span>
                    </div>
                </ScrollBox>
            )}
        </div>
    );
}
