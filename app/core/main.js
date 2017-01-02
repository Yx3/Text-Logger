import {app, globalShortcut, clipboard} from 'electron';
import fs from 'fs';
import menubar from 'menubar';
import setting from '../setting.json';
import googleTranslate from './google-translate';
import glosbeTranslate from './glosbe-translate';

const dir = process.cwd();
const logPath = `${dir}/log.txt`;
const indexPath = `file://${dir}/app/view/popup.html`;
const SERVICE = {
  GOOGLE: 'google',
  GLOSBE: 'glosbe'
};

const mb = menubar({index: indexPath});

function saveContents() {
  const clip = clipboard.readText();
  console.log(clip);

  if (setting.enableServiceHook) {
    let service;
    if (setting.service === SERVICE.GOOGLE) service = googleTranslate;
    else if (setting.service === SERVICE.GLOSBE) service = glosbeTranslate;
    else {
      // TODO: ERROR handle
    }
    service(clip)
      .then(translated => `${clip} => ${translated}\n`)
      .then(contents => {
        fs.appendFileSync(logPath, contents);
      });
    return;
  }
  fs.appendFileSync(logPath, clip);
}

mb.on('ready', () => {
  globalShortcut.register('Control+Command+S', saveContents);
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
