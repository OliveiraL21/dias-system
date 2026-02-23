// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const { appUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require("path");
app.commandLine.appendSwitch('high-dpi-support', 'true');
app.commandLine.appendSwitch('force-device-scale-factor', '1');
app.disableHardwareAcceleration();

appUpdater.logger = log;
appUpdater.logger.transports.file.level = 'info';
log.info('Aplicando log... ')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: './src/assets/images/Logo dias system.png',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },

  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'dist/gereciador-tarefas-front-end-new/index.html'));

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdates();
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};


app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

autoUpdater.on('checking-for-update', () => {
  log.info('Verificando atualizações...');
});

autoUpdater.on('update-available', (info) => {
  log.info('Atualização disponível.');
  // Opcional: Avisar o usuário que está baixando
});

autoUpdater.on('update-not-available', (info) => {
  log.info('Nenhuma atualização disponível.');
});

autoUpdater.on('error', (err) => {
  log.error('Erro na atualização: ', err);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info("Atualização Baixada");

  dialog.showMessageBox({
    type: 'info',
    title: 'Atualização Pronta',
    message: 'Uma nova versão foi baixada. Deseja reiniciar e instalar agora?',
    buttons: ['Sim', 'Depois']
  }).then((returnValue) => {
    if (returnValue.response === 0)
      autoUpdater.quitAndInstall();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
