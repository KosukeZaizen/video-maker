import * as React from "react";
import { useEffect, useRef, useState } from "react";
import CharacterComment from "../../shared/CharacterComment";
import { ScrollBox } from "../../shared/ScrollBox";
import { vocab } from "../types/vocab";

export function Thumbnail({
    titleToShowUpper,
    screenWidth,
    vocabList,
}: {
    titleToShowUpper: string;
    screenWidth: number;
    vocabList: vocab[];
}) {
    const scrollTextRef = useRef<HTMLSpanElement>(null);
    const characterCommentRef = useRef<HTMLDivElement>(null);

    const [vList, setVList] = useState<vocab[]>(
        vocabList.filter((v, i) => i <= 10).map(v => ({ ...v }))
    );
    const [isOmitted, setIsOmitted] = useState(false);
    const [isCommentTwoLines, setIsCommentTwoLines] = useState(false);

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

    const comment = (
        <div style={{ padding: "0 30px" }}>
            {titleToShowUpper.split(" ").map((t, i) => {
                const content = t.includes("-") ? (
                    <span style={{ display: "inline-block" }}>{t}</span>
                ) : (
                    t
                );
                return <span key={i}>{i ? <> {content}</> : content}</span>;
            })}
        </div>
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: isCommentTwoLines ? "98%" : "95%",
            }}
        >
            <h1
                id="h1title"
                style={{
                    marginTop: 10,
                    marginBottom: 20,
                    fontWeight: "bold",
                    fontSize: 90,
                }}
            >
                {"Japanese Vocabulary Quiz"}
            </h1>

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
        </div>
    );
}
