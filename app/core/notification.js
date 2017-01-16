import notifier from '../../lib/text-logger-notifier';

export default function (err, contents) {
  notifier.notify({
    title: err ? 'Fail to scrap text' : 'You just have scrapped text',
    message: err ? err.message : contents.source,
    // icon: `${dir}/app/resources/icon-app/icon-app@3x.png`,
    sound: true
  });
}
