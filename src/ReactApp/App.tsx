import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { PartsMaker } from "./components/PartsMaker";
import ChapterTitle from "./components/PartsMaker/ChapterTitle";
import ExplanationScroll from "./components/PartsMaker/ExplanationScroll";
import NamePlate from "./components/PartsMaker/NamePlate";
import NamePlateLow from "./components/PartsMaker/NamePlate/NamePlateLow";
import RotatingShuriken from "./components/PartsMaker/RotatingShuriken";
import { TestPage } from "./components/TestPage";
import { VideoEditor } from "./components/VideoEditor";
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
                <Route
                    sensitive
                    exact
                    path="/videoEditor"
                    component={VideoEditor}
                />
                <Route
                    sensitive
                    exact
                    path="/partsMaker"
                    component={PartsMaker}
                />
                <Route
                    sensitive
                    exact
                    path="/chapterTitle"
                    component={ChapterTitle}
                />
                <Route
                    sensitive
                    exact
                    path="/namePlate"
                    component={NamePlate}
                />
                <Route
                    sensitive
                    exact
                    path="/namePlateLow"
                    component={NamePlateLow}
                />
                <Route
                    sensitive
                    exact
                    path="/explanationScroll"
                    component={ExplanationScroll}
                />
                <Route
                    sensitive
                    exact
                    path="/rotatingShuriken"
                    component={RotatingShuriken}
                />
                <Route sensitive exact path="/test" component={TestPage} />
                <Route component={Home} />
            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
