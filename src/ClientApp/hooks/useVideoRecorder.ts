import { desktopCapturer, DesktopCapturerSource } from "electron";
import { writeFile } from "fs";
import { useEffect, useState } from "react";

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
            alert("start recording");
            recordingState.isRecording = true;
            mediaRecorder?.start();

            const checkStop = () => {
                if (recordingState.isRecording) {
                    setTimeout(checkStop, 100);
                } else {
                    mediaRecorder?.stop();
                }
            };
            checkStop();
        },
        stopRecording: () => {
            recordingState.isRecording = false;
        },
    };
}

async function setVideoSource(source: DesktopCapturerSource) {
    const mediaSource = {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
    };

    const constraints = {
        audio: {
            mandatory: mediaSource,
        },
        video: {
            mandatory: {
                ...mediaSource,
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
    return async () => {
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
