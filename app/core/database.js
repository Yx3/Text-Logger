import {clipboard} from 'electron';
import levelup from 'level';
import googleTranslate from './google-translate';
import glosbeTranslate from './glosbe-translate';
import Contents from './content';

// TODO: remove, for backward compatibility
import fs from 'fs';
import setting from '../setting.json';
import {SERVICE} from './constants';
import {logPath} from './main';
export function saveContents() {
  const clip = clipboard.readText();
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

const db = levelup('log.db', {valueEncoding: 'json'});
export async function store(cb) {
  const clip = clipboard.readText();

  const tranGoogle = await googleTranslate(clip);
  const tranGlosbe = await glosbeTranslate(clip);

  const contents = new Contents(clip, tranGoogle, tranGlosbe);
  db.put(contents.source, contents, err => {
    if (err) throw err;
    cb(contents);
  });
}

export function remove(key) {
  // TODO : Handle I/O Error
  db.del(key);
}

export async function read() {
  const container = [];
  return new Promise((resolve, reject) => {
    db.createReadStream({
      keys: false,
      values: true,
      start: '',
      end: `\xFF`
    }).on('data', data => {
      container.push(data.value);
    })
    .on('error', err => {
      // TODO: Handle error
      reject(err);
    })
    .on('end', () => {
      resolve(container);
    });
  });
}
