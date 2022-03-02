import * as React from "react";
import { useEffect } from "react";

export function VideoEditor() {
    useEffect(() => {
        processor.doLoad();
    }, []);

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
        // var frame = ctx.getImageData(0, 0, width, height);
        // var l = frame.data.length / 4;

        // for (var i = 0; i < l; i++) {
        //     var grey =
        //         (frame.data[i * 4 + 0] +
        //             frame.data[i * 4 + 1] +
        //             frame.data[i * 4 + 2]) /
        //         3;

        //     frame.data[i * 4 + 0] = grey;
        //     frame.data[i * 4 + 1] = grey;
        //     frame.data[i * 4 + 2] = grey;
        // }

        // ctx.font = "30px Arial";
        // ctx.fillText("Hello World", 10, 50);

        // ctx.putImageData(frame, 0, 0);

        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();

        return;
    },
};
