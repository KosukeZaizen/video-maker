import { ipcRenderer } from "electron";

export function hideMenuBar() {
    ipcRenderer.send("mainWindow:setMenuBarVisibility", false);
}
