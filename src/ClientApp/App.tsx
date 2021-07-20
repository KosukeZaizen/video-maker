import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import VocabEditTop from "./components/Vocab/Edit/Top";

function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route
                    sensitive
                    exact
                    path="/vocabularyEdit"
                    component={VocabEditTop}
                />
                {/* <Route
                    sensitive
                    exact
                    path="/vocabularyEdit/:genreName"
                    component={VocabEdit}
                />
                <Route
                    sensitive
                    exact
                    path="/vocabularyVideo/:genreName"
                    component={VocabVideo}
                /> */}
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/vocabularyEdit">Vocab</Link>
                </li>
            </ul>
        </nav>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
