/**
 * Audio and video manipulation:
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation
 */

import { writeFile } from "fs";
import * as React from "react";
import { useEffect, useState } from "react";

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

let recorder: MediaRecorder | null = null;

export function VideoEditor() {
    useEffect(() => {
        processor.doLoad();
    }, []);

    const [recording, setRecording] = useState(false);

    return (
        <>
            <video
                id="my-video"
                controls
                width="480"
                height="270"
                crossOrigin="anonymous"
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
            <canvas id="my-canvas" width="480" height="270" />
            {!recording && (
                <button
                    onClick={() => {
                        const cElement = document.getElementById(
                            "my-canvas"
                        ) as CanvasElement | null;

                        if (!(cElement instanceof HTMLCanvasElement)) {
                            console.log("It's not HTMLCanvasElement");
                            return;
                        }

                        const stream = cElement.captureStream();
                        recorder = new MediaRecorder(stream, {
                            mimeType: "video/webm;codecs=vp9",
                        });

                        alert("Do you want to start recording?");
                        recorder.ondataavailable = (e: BlobEvent) => {
                            if (!recorder) {
                                return;
                            }
                            console.log("The video data is available");
                            // recorder.onstop = getHandleStop(e.data);

                            recorder.onstop = async () => {
                                const blob = new Blob([e.data], {
                                    type: "video/webm;codecs=vp9",
                                });

                                const buffer = Buffer.from(
                                    await blob.arrayBuffer()
                                );

                                const downloadFolder = `${process.env.USERPROFILE}/Downloads`;
                                console.log("downloadFolder", downloadFolder);

                                writeFile(
                                    `${downloadFolder}/test-${Date.now()}.webm`,
                                    buffer,
                                    () => {
                                        console.log(
                                            "File was saved successfully"
                                        );
                                        alert("File was saved successfully");
                                    }
                                );
                            };
                        };
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

let video: HTMLVideoElement | null = null;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;

var processor = {
    timerCallback: function () {
        if (!video || video.paused || video.ended) {
            return;
        }
        this.computeFrame();
        var self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 16); // roughly 60 frames per second
    },

    doLoad: function () {
        const vElement = document.getElementById("my-video");
        const cElement = document.getElementById("my-canvas");
        if (
            !(vElement instanceof HTMLVideoElement) ||
            !(cElement instanceof HTMLCanvasElement)
        ) {
            return;
        }
        video = vElement;
        canvas = cElement;
        ctx = canvas.getContext("2d");
        var self = this;

        video.addEventListener(
            "play",
            function () {
                if (!video) {
                    return;
                }
                width = video.width;
                height = video.height;
                self.timerCallback();
            },
            false
        );
    },

    computeFrame: function () {
        if (!ctx || !video) {
            return;
        }
        ctx.drawImage(video, 0, 0, width, height);

        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();

        return;
    },
};
