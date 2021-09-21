import * as React from "react";
import { Link } from "react-router-dom";
import { useVideoRecorder } from "../hooks/useVideoRecorder";

export function TestPage() {
    const { startRecording, stopRecording } = useVideoRecorder({});
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <button
                        onClick={() => {
                            startRecording();
                            setTimeout(stopRecording, 3000);
                        }}
                    >
                        record test
                    </button>
                </li>
            </ul>
        </>
    );
}
