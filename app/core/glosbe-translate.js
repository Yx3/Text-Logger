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
  }).then(buffer => {
    const json = JSON.parse(buffer);
    if (json.result !== 'ok') throw new Error('Request fail');
    if (json.tuc.length === 0) return 'N/A';

    return json.tuc[0].phrase.text;
  });
}

/**
 * response format
 * {
 *   "result" : "ok",
 *   "tuc" : [ {
 *     "phrase" : {
 *       "text" : "돌아오다",
 *       "language" : "ko"
 *     },
 *     "meanings" : [ {
 *       "language" : "en",
 *       "text" : "To go there where one was before."
 *     }, {
 *       "language" : "en",
 *       "text" : "to come or go back"
 *     } ],
 *     "meaningId" : 8308189710182875766,
 *     "authors" : [ 13 ]
 *   }, {
 *       .....
 */
