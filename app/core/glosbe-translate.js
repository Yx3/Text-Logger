import https from 'https';
import setting from '../setting.json';

const api = 'https://glosbe.com/gapi/translate?format=json&pretty=true';

export default function (source) {
  const encoded = encodeURIComponent(source);
  const sourceLang = setting.glosbeSourceLanguage;
  const targetLang = setting.glosbeTargetLanguage;
  const addr = `${api}&from=${sourceLang}&dest=${targetLang}&phrase=${encoded}`;

  return new Promise((resolve, reject) => {
    const buffer = [];
    https.get(addr, res => {
      if (res.statusCode !== 200) reject(new Error('Fail to translate'));

      res.on('data', data => {
        buffer.push(data);
      });
      res.on('end', () => resolve(buffer.toString()));
    });
  // }).then(buffer => {
  //   const json = JSON.parse(buffer);
  }).catch(console.log); // eslint-disable-line no-console
}
