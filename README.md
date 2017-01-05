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
Error: Module version mismatch. Expected 50, got 48
try this

    npm rebuild --runtime=electron --target=1.4.3 --disturl=https://atom.io/download/atom-shell --build-from-source
