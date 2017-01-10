import {app, globalShortcut, ipcMain} from 'electron';
import fs from 'fs';
import menubar from 'menubar';
import notifier from '../lib/text-logger-notifier';
import setting from '../setting.json';
import {store, read, remove} from './database';

const dir = process.cwd();
const indexPath = `file://${dir}/app/view/popup.html`;
const settingPath = `${dir}/app/setting.json`;
const mb = menubar({index: indexPath, height: 450});

function notifyDone(contents) {
  notifier.notify({
    title: 'You just have scrapped text',
    message: contents.source,
    // icon: `${dir}/app/resources/app-icon-retina-white/app-icon-retina-white@3x.png`,
    sound: true
  });
}

function notifyErr(err) {
  notifier.notify({
    title: 'Fail to scrap text',
    message: err.message,
    icon: `${dir}/app/resources/app-icon-retina-white/app-icon-retina-white@3x.png`,
    sound: true
  });
}

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
}

function hotKeysPressed() {
  try {
    store(notifyDone);
  } catch (err) {
    notifyErr(err);
  }
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
