/**
 * Audio and video manipulation:
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation
 *
 * Capture a MediaStream From a Canvas, Video or Audio Element:
 * https://developers.google.com/web/updates/2016/10/capture-stream
 *
 * MediaStream Capture Canvas and Audio Simultaneously:
 * https://stackoverflow.com/questions/39302814/mediastream-capture-canvas-and-audio-simultaneously
 */

import { writeFile } from "fs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

interface FileSource {
    src: string;
    type: string;
}

let recorder: MediaRecorder | null = null;

export function VideoEditor() {
    const [fileSource, setFileSource] = useState({
        src: "",
        type: "",
    });

    if (!fileSource.src) {
        return (
            <input
                type="file"
                name="file"
                onChange={e => {
                    const target = e.target;
                    const file = target.files?.item(0);
                    if (file) {
                        setFileSource({
                            src: URL.createObjectURL(file),
                            type: file.type,
                        });
                    }
                }}
            />
        );
    }
    return <Recorder fileSource={fileSource} />;
}

function Recorder({ fileSource }: { fileSource: FileSource }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<CanvasElement>(null);

    useEffect(() => {
        if (videoRef.current && canvasRef.current) {
            load(videoRef.current, canvasRef.current);
        }
    }, []);

    const [recording, setRecording] = useState(false);

    return (
        <>
            <video
                width="960"
                height="540"
                crossOrigin="anonymous"
                // style={{ display: "none" }}
                ref={videoRef}
                controls
            >
                <source src={fileSource.src} type={fileSource.type} />
            </video>
            <canvas ref={canvasRef} width="960" height="540" />

            {!recording && (
                <button
                    onClick={() => {
                        const video = videoRef.current;
                        const canvas = canvasRef.current;
                        if (!video || !canvas) {
                            alert("No elements");
                            return;
                        }

                        if (
                            !confirm("Do you really want to start recording?")
                        ) {
                            return;
                        }

                        const stream = getStream(video, canvas);
                        recorder = new MediaRecorder(stream, {
                            mimeType: "video/webm;codecs=vp9",
                        });

                        recorder.ondataavailable = (ev: BlobEvent) => {
                            if (!recorder) {
                                return;
                            }
                            recorder.onstop = async () => {
                                await outputFile(ev.data, () => {
                                    video.pause();
                                    alert("The file was successfully saved.");
                                });
                            };
                        };

                        video.play();
                        recorder.start();
                        setRecording(true);
                    }}
                >
                    record start
                </button>
            )}
            {recording && (
                <button
                    onClick={() => {
                        if (!recorder) {
                            return;
                        }
                        recorder.stop();
                        setRecording(false);
                    }}
                >
                    record stop
                </button>
            )}
        </>
    );
}

const timerCallback = (
    ctx: CanvasRenderingContext2D,
    video: HTMLVideoElement
) => {
    computeFrame(ctx, video);
    setTimeout(() => {
        timerCallback(ctx, video);
    }, 16); // roughly 60 frames per second
};

const load = (video: HTMLVideoElement, canvas: CanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }

    video.addEventListener(
        "play",
        () => {
            timerCallback(ctx, video);
        },
        false
    );
};

const computeFrame = (
    ctx: CanvasRenderingContext2D,
    video: HTMLVideoElement
) => {
    ctx.drawImage(video, 0, 0, video.width, video.height);

    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
};

function getStream(video: HTMLVideoElement, canvas: CanvasElement) {
    const stream = canvas.captureStream();

    // get the audio track:
    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();
    const sourceNode = ctx.createMediaElementSource(video);
    sourceNode.connect(dest);
    sourceNode.connect(ctx.destination);
    const audioTrack = dest.stream.getAudioTracks()[0];

    // add it to the canvas stream:
    stream.addTrack(audioTrack);
    return stream;
}

async function outputFile(data: Blob, callback: () => void) {
    const blob = new Blob([data], {
        type: "video/webm;codecs=vp9",
    });
    const buffer = Buffer.from(await blob.arrayBuffer());

    const downloadFolder = `${process.env.USERPROFILE}/Downloads`;
    writeFile(`${downloadFolder}/test-${Date.now()}.webm`, buffer, callback);
}
