import { app, BrowserWindow } from "electron";

console.log("__dirname", __dirname);
require("electron-reload")("../");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // this line is very important as it allows us to use `require` syntax in our html file.
            contextIsolation: false,
        },
    });
    mainWindow.loadFile(`index.html`);
}

app.whenReady().then(createWindow);
