import { app, BrowserWindow, ipcMain } from "electron";

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

app.whenReady().then(createWindow);
