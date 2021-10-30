import * as React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
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
                <Link to="/painter">Painter</Link>
            </li>
            <li>
                <Link to="/test">Test Page</Link>
            </li>
        </ul>
    );
}
