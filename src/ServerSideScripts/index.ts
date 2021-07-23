import { app, BrowserWindow, ipcMain } from "electron";

require("electron-reload")("../");

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true, // this line is very important as it allows us to use `require` syntax in our html file.
            contextIsolation: false,
        },
    });
    mainWindow.loadFile(`index.html`);
}

ipcMain.on("mainWindow:setMenuBarVisibility", (event, visible) => {
    mainWindow.menuBarVisible = visible;
});

app.whenReady().then(createWindow);
