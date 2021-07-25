import * as React from "react";
import { Link } from "react-router-dom";
import { useVideoRecorder } from "../hooks/useVideoRecorder";

export function Home() {
    const { startRecording, stopRecording } = useVideoRecorder();
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/vocabularyEdit">Vocab</Link>
            </li>
            <li>
                <Link to="/test">Test Page</Link>
            </li>
        </ul>
    );
}
