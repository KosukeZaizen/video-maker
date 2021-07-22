import { desktopCapturer, DesktopCapturerSource } from "electron";
import { writeFile } from "fs";
import * as React from "react";
import { useEffect, useState } from "react";

export function VideoTest() {
    const mediaRecorder = useMediaRecorder();

    const startRecording = () => {
        mediaRecorder?.start();
    };
    const stopRecording = () => {
        mediaRecorder?.stop();
    };

    return (
        <>
            <InternalComponent
                startRecording={startRecording}
                stopRecording={stopRecording}
            />
        </>
    );
}

function InternalComponent({
    startRecording,
    stopRecording,
}: {
    startRecording: () => void;
    stopRecording: () => void;
}) {
    return (
        <>
            <button onClick={startRecording}>start</button>
            <button onClick={stopRecording}>stop</button>
        </>
    );
}

function useMediaRecorder() {
    const [inputSource, setInputSource] = useState<DesktopCapturerSource>();
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

    useEffect(() => {
        (async () => {
            const inputSources = await desktopCapturer.getSources({
                types: ["window"],
            });
            const source = inputSources.find(s => s.name === document.title);
            setInputSource(source);
        })();
    }, []);

    useEffect(() => {
        if (inputSource) {
            (async () => {
                const recorder = await setVideoSource(inputSource);
                setMediaRecorder(recorder);
            })();
        }
    }, [inputSource]);

    return mediaRecorder;
}

async function setVideoSource(source: DesktopCapturerSource) {
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

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const options = { mimeType: "video/webm;codecs=vp9" };

    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
        console.log("The video data is available");
        mediaRecorder.onstop = getHandleStop(e.data);
    };

    return mediaRecorder;
}

function getHandleStop(blobData: Blob) {
    return async (e: Event) => {
        const blob = new Blob([blobData], {
            type: "video/webm;codecs=vp9",
        });

        const buffer = Buffer.from(await blob.arrayBuffer());

        const downloadFolder = `${
            process.env.USERPROFILE
        }/Downloads/vid-${Date.now()}.webm`;

        writeFile(downloadFolder, buffer, () => {
            alert("File saved successfully");
        });
    };
}
export default VideoTest;
