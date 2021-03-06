import {app, globalShortcut, ipcMain} from 'electron';
import fs from 'fs';
import menubar from 'menubar';
import setting from '../setting.json';
import notify from './notification';
import {store, read, remove} from './database';

const dir = process.cwd();
const indexPath = `file://${dir}/app/view/popup.html`;
const settingPath = `${dir}/app/setting.json`;
const mb = menubar({
  index: indexPath,
  height: 450,
  icon: `${dir}/app/resources/icon-menubar/icon-menubar.png`
});

function registerIPCListener() {
  ipcMain.on('load-clips', async (event) => {
    event.returnValue = await read();
  });
  ipcMain.on('delete-contents', (event, key) => {
    if (!key) return;
    remove(key);
  });
  ipcMain.on('enable-translate', (event, arg) => {
    setting.enableServiceHook = arg;
    fs.writeFile(settingPath, JSON.stringify(setting, null, '  '));
  });
  ipcMain.on('change-source-lang', (event, lang) => {
    setting.googleSourceLanguage = lang.value;
    fs.writeFile(settingPath, JSON.stringify(setting, null, '  '));
  });
  ipcMain.on('change-target-lang', (event, lang) => {
    setting.googleTargetLanguage = lang.value;
    fs.writeFile(settingPath, JSON.stringify(setting, null, '  '));
  });
}

function hotKeysPressed() {
  if (setting.notification) {
    store(notify);
    return;
  }
  store(() => {});
}

mb.on('ready', () => {
  registerIPCListener();
  globalShortcut.register('Control+Command+S', hotKeysPressed);
  if (!globalShortcut.isRegistered('Control+Command+S')) {
    // TODO: alert and end process
  }
});

mb.on('show', () => {
  mb.window.reload();
});

mb.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
