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

let recorder: MediaRecorder | null = null;

export function VideoEditor() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        console.log("vid", videoRef.current);
        doLoad();
    }, []);

    const [recording, setRecording] = useState(false);

    return (
        <>
            <video
                id="my-video"
                width="1280"
                height="720"
                crossOrigin="anonymous"
                style={{ display: "none" }}
                ref={videoRef}
            >
                <source
                    src="http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm"
                    type="video/webm"
                />
                <source
                    src="http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v"
                    type="video/mp4"
                />
            </video>
            <canvas id="my-canvas" width="1280" height="720" />
            {!recording && (
                <button
                    onClick={() => {
                        if (
                            !confirm("Do you really want to start recording?")
                        ) {
                            return;
                        }

                        const vElement = document.getElementById("my-video");
                        const cElement = document.getElementById(
                            "my-canvas"
                        ) as CanvasElement | null;

                        if (
                            !(vElement instanceof HTMLVideoElement) ||
                            !(cElement instanceof HTMLCanvasElement)
                        ) {
                            return;
                        }

                        const stream = cElement.captureStream();

                        // get the audio track:
                        const ctx = new AudioContext();
                        const dest = ctx.createMediaStreamDestination();
                        const sourceNode =
                            ctx.createMediaElementSource(vElement);
                        sourceNode.connect(dest);
                        sourceNode.connect(ctx.destination);
                        const audioTrack = dest.stream.getAudioTracks()[0];

                        // add it to the canvas stream:
                        stream.addTrack(audioTrack);

                        recorder = new MediaRecorder(stream, {
                            mimeType: "video/webm;codecs=vp9",
                        });

                        recorder.ondataavailable = (ev: BlobEvent) => {
                            if (!recorder) {
                                return;
                            }

                            recorder.onstop = async () => {
                                const blob = new Blob([ev.data], {
                                    type: "video/webm;codecs=vp9",
                                });

                                const buffer = Buffer.from(
                                    await blob.arrayBuffer()
                                );

                                const downloadFolder = `${process.env.USERPROFILE}/Downloads`;

                                writeFile(
                                    `${downloadFolder}/test-${Date.now()}.webm`,
                                    buffer,
                                    () => {
                                        alert("File was saved successfully");
                                        vElement.pause();
                                    }
                                );
                            };
                        };

                        vElement.play();
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
    if (!video || video.paused || video.ended) {
        return;
    }
    computeFrame(ctx, video);
    setTimeout(() => {
        timerCallback(ctx, video);
    }, 16); // roughly 60 frames per second
};

const doLoad = () => {
    const video = document.getElementById("my-video");
    const canvas = document.getElementById("my-canvas");
    if (
        !(video instanceof HTMLVideoElement) ||
        !(canvas instanceof HTMLCanvasElement)
    ) {
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }

    video.addEventListener(
        "play",
        () => {
            if (!video) {
                return;
            }
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

    return;
};
