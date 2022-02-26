import * as React from "react";

export function VideoEditor() {
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
            <canvas id="my-canvas" width="480" height="270"></canvas>
        </>
    );
}
