import * as React from "react";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { ChangePage, Page } from ".";
import { audioPlayAsync } from "../../../common/util/audio/audioPlayAsync";
import CharacterComment from "../../shared/CharacterComment";
import { ScrollBox } from "../../shared/ScrollBox";
import { sound, vocab } from "../types/vocab";

const styles = {
    h1Style: {
        marginTop: 10,
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 90,
    },
    characterCommentStyle: {
        maxWidth: 1000,
        position: "relative",
        left: -75,
    },
    commentStyle: {
        fontSize: 100,
        fontWeight: "bold",
        maxWidth: 1000,
        marginLeft: 40,
        textAlign: "center",
        marginBottom: -20,
        lineHeight: 1.3,
        padding: "30px 0",
    },
    characterImgStyle: { maxWidth: 150 },
    scroll: { marginTop: 60 },
    scrollInsideDiv: {
        fontSize: 50,
        textOverflow: "hidden",
        width: 1100,
        fontWeight: "bold",
    },
} as const;

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

    const [isOmitted, setIsOmitted] = useState(false);
    const [hiraganaList, setHiraganaList] = useState<string[]>(() =>
        vocabList.reduce((acc, val) => {
            const nextArr = [...acc, val.hiragana];
            if (nextArr.join("").length > 18) {
                setIsOmitted(true);
                return acc;
            }
            return nextArr;
        }, [] as string[])
    );
    const [isCommentTwoLines, setIsCommentTwoLines] = useState(false);

    useEffect(() => {
        (async () => {
            const { audio } = music;
            audio.volume = 0.003;

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
        const l = [...hiraganaList];
        const rect = scrollTextRef.current?.getBoundingClientRect();
        if (rect && rect.height > 100) {
            l.length = l.length - 1;
        }

        if (l.length !== hiraganaList.length) {
            setIsOmitted(true);
            setHiraganaList(l);
        }
    }, [hiraganaList, vocabList, scrollTextRef.current]);

    useEffect(() => {
        const rect = characterCommentRef.current?.getBoundingClientRect();
        const isTwoLines = !!rect && rect.height > 230;
        setIsCommentTwoLines(isTwoLines);
    }, [titleToShowUpper]);

    const comment = useMemo(() => {
        if (isInitial) {
            return (
                <div style={{ padding: "0 20px" }}>
                    {titleToShowUpper.split(" ").map((t, i) => {
                        const content = t.includes("-") ? (
                            <span style={{ display: "inline-block" }}>{t}</span>
                        ) : (
                            t
                        );
                        return (
                            <span key={i}>{i ? <> {content}</> : content}</span>
                        );
                    })}
                </div>
            );
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

    const outsideDivStyle = useMemo<CSSProperties>(
        () =>
            isInitial
                ? {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      height: isCommentTwoLines ? "98%" : "95%",
                  }
                : {},
        [isInitial, isCommentTwoLines]
    );

    return (
        <div style={outsideDivStyle}>
            {isInitial && (
                <h1 id="h1title" style={styles.h1Style}>
                    {"Japanese Vocabulary Quiz"}
                </h1>
            )}
            <CharacterComment
                containerRef={characterCommentRef}
                imgNumber={1}
                screenWidth={screenWidth}
                comment={comment}
                style={styles.characterCommentStyle}
                commentStyle={styles.commentStyle}
                imgStyle={styles.characterImgStyle}
            />
            {isInitial && (
                <ScrollBox style={styles.scroll}>
                    <div style={styles.scrollInsideDiv}>
                        <span ref={scrollTextRef}>
                            {hiraganaList.join(", ")}
                            {isOmitted && "..., etc"}
                        </span>
                    </div>
                </ScrollBox>
            )}
        </div>
    );
}
