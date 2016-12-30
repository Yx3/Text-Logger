import {app, globalShortcut, clipboard} from 'electron';
import fs from 'fs';
import menubar from 'menubar';

const dir = process.cwd();
const logPath = `${dir}/log.txt`;
const indexPath = `file://${dir}/app/view/popup.html`;
const mb = menubar({index: indexPath});

function saveContents() {
  const clip = `${clipboard.readText()}\n`;
  console.log(clip);
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
