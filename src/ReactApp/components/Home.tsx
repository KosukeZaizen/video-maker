import * as React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/vocabularyEdit">Vocab</Link>
                </li>
                <li>
                    <Link to="/vocabularyAdventure/test">Vocab Adventure</Link>
                </li>
                <li>
                    <Link to="/videoEditor">Video Editor</Link>
                </li>
            </ul>
            <hr />
            <h2>Video Parts</h2>
            <ul>
                <li>
                    <Link to="/partsMaker">Parts Maker</Link>
                </li>
                <li>
                    <Link to="/chapterTitle">Chapter Title</Link>
                </li>
                <li>
                    <Link to="/namePlate">NamePlate</Link>
                </li>
                <li>
                    <Link to="/namePlateLow">NamePlateLow</Link>
                </li>
            </ul>
            <hr />
            <ul>
                <li>
                    <Link to="/test">Test Page</Link>
                </li>
            </ul>
        </>
    );
}
