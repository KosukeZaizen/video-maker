import * as React from "react";
import { CSSProperties, useEffect, useMemo, useRef } from "react";

export function Video({
    style,
    afterVideo,
    src,
    shown,
    freezingTimeAfterShowing,
}: {
    style?: CSSProperties;
    afterVideo: () => void;
    src: string;
    shown: boolean;
    freezingTimeAfterShowing?: number;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef?.current;
        if (videoElement) {
            videoElement.load();
            videoElement.onended = afterVideo;
        }
    }, [videoRef]);

    useEffect(() => {
        const videoElement = videoRef?.current;
        if (videoElement && shown) {
            setTimeout(() => videoElement.play(), freezingTimeAfterShowing);
        }
    }, [videoRef, shown, freezingTimeAfterShowing]);

    const styleMemo = useMemo(
        () => ({ ...style, display: shown ? "block" : "none" }),
        [style, shown]
    );

    return <video ref={videoRef} src={src} style={styleMemo} />;
}
