import { ipcRenderer } from "electron";

export function setScreenSizeForVideo() {
    ipcRenderer.send("mainWindow:setScreenSizeForVideo");
}
