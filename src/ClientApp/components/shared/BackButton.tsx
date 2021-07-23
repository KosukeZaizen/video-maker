import * as React from "react";
import { useHistory } from "react-router-dom";

export const BackButton = () => {
    let history = useHistory();
    return (
        <>
            <button onClick={() => history.goBack()}>{"<< Back"}</button>
        </>
    );
};
