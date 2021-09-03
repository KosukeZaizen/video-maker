import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { BLOB_URL } from "../../../common/consts";
import { getAudio } from "../../../common/util/audio/getAudio";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useVideoRecorder } from "../../../hooks/useVideoRecorder";
import { useVocabList } from "../../../hooks/Vocab/useVocabList";
import { FallingAnimation } from "../../shared/Animations/FallingAnimation";
import { sound } from "../types/vocab";
import { LastPage } from "./LastPage";
import { ListPage } from "./ListPage";
import { MenuPage } from "./MenuPage";
import { QuizPage } from "./QuizPage";
import { Thumbnail } from "./Thumbnail";
import { TitlePage } from "./TitlePage";

export const Page = {
    menu: 0,
    title: 1,
    list: 2,
    quiz: 3,
    last: 4,
    thumbnail: 5,
};
export type Page = typeof Page[keyof typeof Page];

export type ChangePage = (nextPage: Page) => void;

type Props = {
    location: { pathname: string };
    match: { params: { [key: string]: string } };
};

const music: sound = getAudio({
    src: `${BLOB_URL}/vocabulary-quiz/music.mp3`,
});

const styles = {
    pageContentDiv: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
} as const;

function VocabVideo({ match: { params } }: Props) {
    const [currentPage, setCurrentPage] = useState<Page>(Page.menu);
    const [season, setSeason] = useState("none");
    const [isOneSeason, setIsOneSeason] = useState(true);
    const [vocabSeasons, setVocabSeasons] = useState<string[]>([]);
    const pGenreName = useMemo(
        () => params.genreName.toString().split("#")[0],
        [params]
    );
    const {
        vocabGenre: { genreName },
        vocabList,
        vocabSounds,
    } = useVocabList(pGenreName);
    const audioVocabSound = useMemo(
        () => vocabSounds.map(s => s?.audio),
        [vocabSounds]
    );
    const { screenWidth, screenHeight } = useScreenSize();
    const { startRecording, stopRecording } = useVideoRecorder();

    const titleToShowUpper = useMemo(
        () =>
            genreName
                .split("_")
                .map((t: string) => t && t[0].toUpperCase() + t.substr(1))
                .join(" "),
        [genreName]
    );

    const setVocabSeason = useCallback(
        (vocabId: number, season: string) => {
            setVocabSeasons(
                vocabSeasons.map((v, i) => (i === vocabId ? season : v))
            );
        },
        [vocabSeasons]
    );

    let pageContent: React.ReactNode;
    switch (currentPage) {
        case Page.menu: {
            pageContent = (
                <MenuPage
                    changePage={setCurrentPage}
                    vocabSounds={vocabSounds}
                    music={music}
                    setSeason={setSeason}
                    setVocabSeason={setVocabSeason}
                    setVocabSeasons={setVocabSeasons}
                    vocabList={vocabList}
                    isOneSeason={isOneSeason}
                    setIsOneSeason={setIsOneSeason}
                    vocabSeasons={vocabSeasons}
                    startRecording={startRecording}
                />
            );
            break;
        }
        case Page.title: {
            pageContent = (
                <TitlePage
                    titleToShowUpper={titleToShowUpper}
                    screenWidth={screenWidth}
                    changePage={setCurrentPage}
                    vocabList={vocabList}
                    music={music}
                />
            );
            break;
        }
        case Page.list: {
            pageContent = (
                <ListPage
                    screenWidth={screenWidth}
                    changePage={setCurrentPage}
                    vocabList={vocabList}
                    vocabSounds={audioVocabSound}
                    vocabSeasons={vocabSeasons}
                    setSeason={setSeason}
                    isOneSeason={isOneSeason}
                    season={season}
                />
            );
            break;
        }
        case Page.quiz: {
            pageContent = (
                <QuizPage
                    screenWidth={screenWidth}
                    changePage={setCurrentPage}
                    vocabList={vocabList}
                    vocabSounds={audioVocabSound}
                    vocabSeasons={vocabSeasons}
                    setSeason={setSeason}
                    isOneSeason={isOneSeason}
                    season={season}
                />
            );
            break;
        }
        case Page.last: {
            pageContent = (
                <LastPage
                    screenWidth={screenWidth}
                    changePage={setCurrentPage}
                    music={music}
                    stopRecording={stopRecording}
                />
            );
            break;
        }
        case Page.thumbnail: {
            pageContent = (
                <Thumbnail
                    titleToShowUpper={titleToShowUpper}
                    screenWidth={screenWidth}
                    vocabList={vocabList}
                />
            );
            break;
        }
    }

    return (
        <>
            <div style={styles.pageContentDiv}>{pageContent}</div>
            {currentPage !== Page.thumbnail && (
                <FallingAnimation
                    frequencySec={3}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    season={season}
                />
            )}
        </>
    );
}

export default VocabVideo;
