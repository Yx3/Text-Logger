import https from 'https';
import setting from '../setting.json';

const api = 'https://glosbe.com/gapi/translate?format=json&pretty=true';

export default function (source) {
  const encoded = encodeURIComponent(source);
  const addr = `${api}&from=${setting.glosbeSourceLanguage}&dest=${setting.glosbeTargetLanguage}&phrase=${encoded}`;
  return new Promise((resolve, reject) => {
    const buffer = [];
    https.get(addr, res => {
      if (res.statusCode !== 200) reject(new Error('Fail to translate'));

      res.on('data', data => {
        buffer.push(data);
      });
      res.on('end', () => resolve(buffer.toString()));
    });
  }).then(buffer => {
    const json = JSON.parse(buffer);
  }).catch(console.log);
}
