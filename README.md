# Text Logger

[![Build Status](https://travis-ci.org/Yx3/Text-Logger.svg?branch=master)](https://travis-ci.org/Yx3/Text-Logger)

Required electron 0.36.x or higher

Support x64 processor only

## Quick start

    npm install
    npm start

## Development

    npm run lint
    npm run test

If you face error message like below
`Error: Module version mismatch. Expected 50, got 48`
try this

    npm rebuild --runtime=electron --target=1.4.3 --disturl=https://atom.io/download/atom-shell --build-from-source

To see custom notification icon and name in OS X, need to re-build terminal-notifier.app with your own icon file.
And replace it `lib/text-logger-notifier/vendor/terminal-notifier.app`
For more detail, check issues below.
[node-notifier issue](https://github.com/mikaelbr/node-notifier/issues/71)
[terminal-notifier issue](https://github.com/julienXX/terminal-notifier/issues/131)
