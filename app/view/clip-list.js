import React from 'react';
import readlines from 'gen-readlines';
import fs from 'fs';

export default class ClipList extends React.Component {
  constructor() {
    super();
    this.fd = this.openLogFile();
    this.buffer = this.openBuffer();
    this.contents = '2';
  }

  async openLogFile() {
    return await fs.openSync('log.txt', 'r');
  }

  async openBuffer() {
    return await fs.fstatSync(this.fd);
  }

  renderClip(contents) {
    return <div> hii </div>;
  }

  render() {
    return (
      <div>
        {readlines(this.fd, this.buffer.size).forEach(console.log)}
      </div>
    );
  }
}