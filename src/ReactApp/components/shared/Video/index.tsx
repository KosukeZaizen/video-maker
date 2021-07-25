import * as React from "react";
import { CSSProperties, useEffect, useRef } from "react";

export function Video({
    style,
    afterVideo,
    src,
    started,
}: {
    style?: CSSProperties;
    afterVideo: () => void;
    src: string;
    started: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {}, [videoRef]);

    useEffect(() => {
        const videoElement = videoRef?.current;
        if (videoElement) {
            if (!started) {
                // When video ref was set
                videoElement.load();
                videoElement.onended = afterVideo;
            } else if (started) {
                videoElement.play();
            }
        } else if (started) {
            alert("cannot start the video before the Ref is set");
        }
    }, [videoRef, started]);

    return (
        <video
            ref={videoRef}
            src={src}
            style={{ ...style, display: started ? "block" : "none" }}
        />
    );
}
