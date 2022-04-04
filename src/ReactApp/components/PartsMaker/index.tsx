import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PartsMaker() {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        // Set line width
        ctx.lineWidth = 10;

        // Wall
        ctx.strokeRect(75, 140, 150, 110);

        // Door
        ctx.fillRect(130, 190, 40, 60);

        // Roof
        ctx.beginPath();
        ctx.moveTo(50, 140);
        ctx.lineTo(150, 60);
        ctx.lineTo(250, 140);
        ctx.closePath();
        ctx.stroke();

        var src = canvas.toDataURL("image/png");
        setImgSrc(src);
    });

    return (
        <div>
            <Link to="/">home</Link>
            <br />
            <canvas id="myCanvas"></canvas>
            <img src={imgSrc} />
            <button
                onClick={() => {
                    var a = document.createElement("a");
                    a.href = imgSrc;
                    a.download = "output.png";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }}
            >
                download
            </button>
        </div>
    );
}
