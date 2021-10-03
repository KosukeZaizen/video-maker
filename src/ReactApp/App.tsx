import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { TestPage } from "./components/TestPage";
import VocabEdit from "./components/Vocab/Edit";
import VocabEditTop from "./components/Vocab/Edit/Top";
import VocabMerge from "./components/Vocab/Merge";
import VocabMergeTop from "./components/Vocab/Merge/Top";
import VocabVideo from "./components/Vocab/VocabVideo";
import VocabAdventure from "./components/VocabAdventure";

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
                <Route
                    sensitive
                    exact
                    path="/vocabularyMerge"
                    component={VocabMergeTop}
                />
                <Route
                    sensitive
                    exact
                    path="/vocabularyMerge/:genreName"
                    component={VocabMerge}
                />
                <Route
                    sensitive
                    exact
                    path="/vocabularyAdventure/:genreName"
                    component={VocabAdventure}
                />
                <Route sensitive exact path="/test" component={TestPage} />
                <Route component={Home} />
            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
