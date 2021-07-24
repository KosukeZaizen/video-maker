import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import VocabEdit from "./components/Vocab/Edit";
import VocabEditTop from "./components/Vocab/Edit/Top";
import VocabVideo from "./components/Vocab/VocabVideo";

function App() {
    return (
        <Router>
            <Switch>
                <Route
                    sensitive
                    exact
                    path="/vocabularyEdit"
                    component={VocabEditTop}
                />
                <Route
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
                />
                <Route component={Home} />
            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));