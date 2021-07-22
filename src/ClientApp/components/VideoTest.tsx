import { desktopCapturer, DesktopCapturerSource } from "electron";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

export function VideoTest() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const num = useNum();
    const videoSources = useVideoSources();

    const setSource = async (source: DesktopCapturerSource) => {
        try {
            if (videoRef.current) {
                const constraints = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: source.id,
                            minWidth: 1280,
                            maxWidth: 1280,
                            minHeight: 720,
                            maxHeight: 720,
                        },
                    },
                } as MediaStreamConstraints;

                const stream = await navigator.mediaDevices.getUserMedia(
                    constraints
                );
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (e) {
            console.log("e", e);
        }
    };

    return (
        <div>
            <select
                onChange={ev => {
                    const source = videoSources.find(
                        s => s.name === ev.target.value
                    );
                    if (source) {
                        setSource(source);
                    }
                }}
            >
                {videoSources.map(s => (
                    <option key={s.id}>{s.name}</option>
                ))}
            </select>
            <br />
            <video ref={videoRef} />
            <br />
            {num}
        </div>
    );
}

function useNum() {
    const [num, setNum] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setNum(num + 1);
        }, 2000);
    }, [num]);

    return num;
}

function useVideoSources() {
    const [inputSources, setInputSources] = useState<DesktopCapturerSource[]>(
        []
    );

    useEffect(() => {
        const getSources = async () => {
            const inputSources = await desktopCapturer.getSources({
                types: ["window", "screen"],
            });
            console.log("sources", inputSources);
            setInputSources(inputSources);
        };
        getSources();
    }, []);

    return inputSources;
}

export default VideoTest;
