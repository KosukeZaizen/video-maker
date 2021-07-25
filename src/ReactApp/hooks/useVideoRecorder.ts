import { desktopCapturer, DesktopCapturerSource } from "electron";
import { writeFile } from "fs";
import { useEffect, useState } from "react";
import {
    hideMouseCursor,
    showMouseCursor,
} from "../common/util/hideMouseCursor";
import { hideMenuBar } from "../common/util/ipc/hideMenuBar";
import { setScreenSizeForVideo } from "../common/util/ipc/setScreenSizeForVideo";
import { showMenuBar } from "../common/util/ipc/showMenuBar";

const recordingState = { isRecording: false };

export function useVideoRecorder() {
    const [inputSource, setInputSource] = useState<DesktopCapturerSource>();
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

    useEffect(() => {
        (async () => {
            try {
                const inputSources = await desktopCapturer.getSources({
                    types: ["window"],
                });
                const source = inputSources.find(
                    s => s.name === document.title
                );
                setInputSource(source);
            } catch (ex) {
                console.log("source ex:", ex);
            }
        })();
    }, []);

    useEffect(() => {
        if (inputSource) {
            (async () => {
                try {
                    const recorder = await setVideoSource(inputSource);
                    setMediaRecorder(recorder);
                } catch (ex) {
                    console.log("media recorder ex:", ex);
                }
            })();
        }
    }, [inputSource]);

    return {
        startRecording: () => {
            beforeRecording();

            alert("start recording");

            recordingState.isRecording = true;
            mediaRecorder?.start();

            const checkStop = () => {
                if (recordingState.isRecording) {
                    setTimeout(checkStop, 500);
                } else {
                    mediaRecorder?.stop();
                    setTimeout(afterRecording, 1000);
                }
            };
            checkStop();
        },
        stopRecording: () => {
            recordingState.isRecording = false;
        },
    };
}

function beforeRecording() {
    hideMenuBar();
    hideMouseCursor();
    setScreenSizeForVideo();
}

function afterRecording() {
    showMenuBar();
    showMouseCursor();
}

async function setVideoSource(source: DesktopCapturerSource) {
    const mediaSource = {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
    };
    const width = 1920;
    const height = 1080;

    const constraints = {
        audio: {
            mandatory: mediaSource,
        },
        video: {
            mandatory: {
                ...mediaSource,
                minWidth: width,
                maxWidth: width,
                minHeight: height,
                maxHeight: height,
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
    return async () => {
        const blob = new Blob([blobData], {
            type: "video/webm;codecs=vp9",
        });

        const buffer = Buffer.from(await blob.arrayBuffer());

        const downloadFolder = `${process.env.USERPROFILE}/Downloads`;

        writeFile(`${downloadFolder}/vid-${Date.now()}.webm`, buffer, () => {
            alert("File saved successfully");
        });
    };
}
