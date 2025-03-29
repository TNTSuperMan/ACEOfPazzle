import { app, BrowserWindow } from "electron";
import { resolve } from "path";
var mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, height: 600
  });
  mainWindow.loadFile(resolve(import.meta.dirname, "dist", "html", "index.html"));
  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => { mainWindow = null; });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
})
