import {clipboard} from 'electron';
import levelup from 'level';
import googleTranslate from './google-translate';
import Contents from './content';

const db = levelup('log.db', {valueEncoding: 'json'});
export async function store(cb) {
  const clip = clipboard.readText();

  const tranGoogle = await googleTranslate(clip);
  // TODO : remove it, glosbe API is not stable at all.
  // const tranGlosbe = await glosbeTranslate(clip);
  const tranGlosbe = 'N/A';

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

export function read() {
  return new Promise((resolve, reject) => {
    const container = [];
    db.createReadStream({
      keys: false,
      values: true,
      start: '',
      end: '\xFF'
    })
    .on('data', data => container.push(data))
    .on('error', err => reject(err))
    .on('end', () => resolve(container));
  });
}
