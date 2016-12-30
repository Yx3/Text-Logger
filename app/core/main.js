import {app, globalShortcut, clipboard} from 'electron';
import fs from 'fs';
import menubar from 'menubar';
import https from 'https';

const dir = process.cwd();
const logPath = `${dir}/log.txt`;
const indexPath = `file://${dir}/app/view/popup.html`;
const addrTranslate = 'https://translate.googleapis.com/translate_a/single?client=gtx';
const mb = menubar({index: indexPath});

let enableTranslate = true;
let sourceLanguage = 'auto';
let targetLanguage = 'ko';

function refineJsonString(src) {
  const regex = new RegExp(',,*', 'g');
  const replace = ',';
  return src.replace(regex, replace);
}

function translateClip(source) {
  const encoded = encodeURIComponent(source);
  const addr = `${addrTranslate}&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encoded}`;

  return new Promise((resolve, reject) => {
    const buffer = [];
    https.get(addr, res => {
      if (res.statusCode !== 200) reject(new Error('Fail to translate'));

      res.on('data', data => {
        buffer.push(data);
      });
      res.on('end', () => {
        resolve(buffer.toString());
      })
    });
  }).then(buffer => {
    const str = refineJsonString(buffer);
    const json = JSON.parse(str);
    return json[0][0][0];
  }).catch(console.log);
}

function saveContents() {
  const clip = clipboard.readText();
  console.log(clip);

  if (enableTranslate) {
    translateClip(clip)
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

mb.app.on('window-all-closed', function(){
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
