import * as React from "react";
import * as ReactDOM from "react-dom";

function App() {
    const [count, setCount] = React.useState(0);
    return (
        <>
            <h1>Hello, react!</h1>
            Count:{count}
            <br />
            <button onClick={() => setCount(count + 1)}>Count up</button>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
