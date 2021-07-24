import { app, BrowserWindow, ipcMain } from "electron";

const ffmpeg = require("fluent-ffmpeg");

var ffprobe = require("ffprobe-static");
ffmpeg.setFfprobePath(ffprobe.path);

require("electron-reload")("../");

let mainWindow: BrowserWindow;

const unitLength = 85;

function createWindow() {
    mainWindow = new BrowserWindow({
        frame: false,
        width: unitLength * 16,
        height: unitLength * 9,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: "white",
    });
    mainWindow.loadFile(`index.html`);
}

ipcMain.on("mainWindow:setMenuBarVisibility", (event, visible) => {
    mainWindow.menuBarVisible = visible;
});

ipcMain.on("mainWindow:setScreenSizeForVideo", () => {
    mainWindow.setSize(unitLength * 16, unitLength * 9);
});

ipcMain.on("mainWindow:mergeVideos", async () => {
    const downloadFolder = `${process.env.USERPROFILE}/Downloads`;
    const workingFolder = `${downloadFolder}/WorkingFolderForVideoMaker`;

    ffmpeg(`${downloadFolder}/a.mp4`)
        .input(`${downloadFolder}/b.mp4`)
        .input(`${downloadFolder}/b.mp4`)
        .on("error", function (err: Error) {
            console.log("An error occurred: " + err.message);
        })
        .on("end", function () {
            console.log("Merging finished !");
        })
        .mergeToFile(`${downloadFolder}/merged.mp4`, workingFolder);
});

app.whenReady().then(createWindow);
