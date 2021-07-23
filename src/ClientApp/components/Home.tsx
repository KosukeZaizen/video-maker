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
        </ul>
    );
}
