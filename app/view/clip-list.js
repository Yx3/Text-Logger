import React from 'react';
import fs from 'fs';
import update from 'react-addons-update';
import readline from 'readline';
import Clip from './clip';
import {ipcRenderer} from 'electron';
import autobind from 'autobind-decorator';

@autobind
export default class ClipList extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: []
    };
    this.readFile();
  }

  deleteLog(index) {
    this.setState({
      logs: update(
        this.state.logs,
        {
          $splice: [[index, 1]]
        }
      )
    });
    let data = '';
    this.state.logs.map((log, i)=>{
      if (index !== i) data = `${data}${log}\n`;
    });
    ipcRenderer.send('delete-log', data);
  }

  readFile() {
    const rl = readline.createInterface({
      input: fs.createReadStream('log.txt')
    });

    rl.on('line', (line) => {
      this.setState({logs: this.state.logs.concat(line)});
    });
  }

  render() {
    return (
      <div>
        {this.state.logs.map((content, i)=><Clip contents = {content}
                                                deleteLog = {this.deleteLog}
                                                index = {i}/>)}
      </div>
    );
  }
}
