import { ipcRenderer } from "electron";

export function showMenuBar() {
    ipcRenderer.send("mainWindow:setMenuBarVisibility", true);
}
