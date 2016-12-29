import {app, globalShortcut, clipboard} from 'electron';
import menubar from 'menubar';

const dir = process.cwd();
const mb = menubar({
  index: `file://${dir}/dist/app/index.html`
});

function saveContents() {
  console.log(clipboard.readText());
}

mb.on('ready', () => {
  globalShortcut.register('Control+Command+S', saveContents);

  if (!globalShortcut.isRegistered('Control+Command+S')) {
    // TODO: alert and eld process
  }
});

