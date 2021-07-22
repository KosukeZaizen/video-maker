import { desktopCapturer, DesktopCapturerSource } from "electron";
import { writeFile } from "fs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

let mediaRecorder: MediaRecorder | undefined = undefined;
const recordedChunks: BlobPart[] = [];

export function VideoTest() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const num = useNum();
    const videoSources = useVideoSources();

    return (
        <div>
            <select
                onChange={ev => {
                    const source = videoSources.find(
                        s => s.name === ev.target.value
                    );
                    if (source && videoRef.current) {
                        setSource(source, videoRef.current);
                    }
                }}
            >
                {videoSources.map(s => (
                    <option key={s.id}>{s.name}</option>
                ))}
            </select>
            <br />
            <button
                onClick={() => {
                    mediaRecorder?.start();
                }}
            >
                start
            </button>
            <button
                onClick={() => {
                    mediaRecorder?.stop();
                }}
            >
                stop
            </button>
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
        setTimeout(getSources, 5000);
    }, []);

    return inputSources;
}

async function setSource(
    source: DesktopCapturerSource,
    videoElement: HTMLVideoElement
) {
    try {
        if (videoElement) {
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
            videoElement.srcObject = stream;
            videoElement.play();

            const options = { mimeType: "video/webm;codecs=vp9" };

            mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.onstop = handleStop;
        }
    } catch (e) {
        console.log("e", e);
    }
}

function handleDataAvailable(e: BlobEvent) {
    console.log("The video data is available");
    recordedChunks.push(e.data);
}

async function handleStop(e: Event) {
    const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=vp9",
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    const downloadFolder = `${
        process.env.USERPROFILE
    }/Downloads/vid-${Date.now()}.webm`;

    writeFile(downloadFolder, buffer, () => {
        console.log("File saved successfully");
    });
}

export default VideoTest;
