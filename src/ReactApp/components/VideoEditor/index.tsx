import { Card } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FileSource {
    src: string;
    type: string;
}

export function VideoEditor() {
    const [fileSource, setFileSource] = useState({
        src: "",
        type: "",
    });

    if (!fileSource.src) {
        return (
            <>
                <Link to="/">home</Link>
                <br />
                <input
                    type="file"
                    name="file"
                    onChange={e => {
                        const target = e.target;
                        const file = target.files?.item(0);
                        if (file) {
                            setFileSource({
                                src: URL.createObjectURL(file),
                                type: file.type,
                            });
                        }
                    }}
                />
            </>
        );
    }
    return <Recorder fileSource={fileSource} />;
}

function Recorder({ fileSource }: { fileSource: FileSource }) {
    const [mode, setMode] = useState<"edit" | "record">("edit");

    if (mode === "edit") {
        return (
            <>
                <Link to="/">home</Link>
                <br />
                <div style={{ display: "flex" }}>
                    <video width="960" height="540">
                        <source src={fileSource.src} type={fileSource.type} />
                    </video>
                    <Card style={{ width: "100%", marginLeft: 5 }}></Card>
                </div>
                <Card style={{ height: 180, marginTop: 5 }}>
                    <button
                        onClick={() => {
                            setMode("record");
                        }}
                    >
                        Record
                    </button>
                </Card>
            </>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            <video
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <source src={fileSource.src} type={fileSource.type} />
            </video>
        </div>
    );
}
