import https from 'https';
import setting from '../setting.json';

const api = 'https://translate.googleapis.com/translate_a/single?client=gtx';

function refineJsonString(src) {
  const regex = new RegExp(',,*', 'g');
  const replace = ',';
  return src.replace(regex, replace);
}

export default function (source) {
  const encoded = encodeURIComponent(source);
  const sourceLang = setting.googleSourceLanguage;
  const targetLang = setting.googleTargetLanguage;
  const addr = `${api}&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encoded}`;

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
    const str = refineJsonString(buffer);
    const json = JSON.parse(str);
    return json[0][0][0];
  }).catch(console.log); // eslint-disable-line no-console
}
