import {app, globalShortcut, ipcMain} from 'electron';
import fs from 'fs';
import menubar from 'menubar';
import {store, saveContents} from './database';
import setting from '../setting.json';

const dir = process.cwd();
const indexPath = `file://${dir}/app/view/popup.html`;
const settingPath = `${dir}/app/setting.json`;

const mb = menubar({index: indexPath});

// TODO: remove, for backward compatibility
export const logPath = `${dir}/log.txt`;

function notifyDone(contents) {
  // TODO: impl
  console.log(contents);
}

function notifyErr(err) {
  // TODO: impl
  console.log(err);
}

mb.on('ready', () => {
  globalShortcut.register('Control+Command+S', () => {
    // TODO: remove, for backward compatibility
    saveContents();

    try {
      store(notifyDone);
    } catch (err) {
      notifyErr(err);
    }
  });

  if (!globalShortcut.isRegistered('Control+Command+S')) {
    // TODO: alert and end process
  }

  ipcMain.on('delete-log', (event, arg) => {
    fs.writeFile(logPath, arg);
  });
  ipcMain.on('set-service-hook', (event, arg) => {
    setting.enableServiceHook = arg;
    fs.writeFile(settingPath, JSON.stringify(setting, null, '  '));
  });
});

mb.on('show', () => {
  mb.window.reload();
});

mb.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
