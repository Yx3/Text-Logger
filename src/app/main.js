//const {app, globalShortcut} = require('electron')
var menubar = require('menubar');

var mb = menubar();

mb.on('ready', function ready () {
  console.log('app is ready');

  // // Register a 'CommandOrControl+X' shortcut listener.
  // const ret = globalShortcut.register('CommandOrControl+X', function () {
  //   console.log('CommandOrControl+X is pressed')
  // });
  //
  // if (!ret) {
  //   console.log('registration failed')
  // }
  //
  // // Check whether a shortcut is registered.
  // console.log(globalShortcut.isRegistered('CommandOrControl+X'))
});

