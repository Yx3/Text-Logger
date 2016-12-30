import React from 'react';
import fs from 'fs';
import readline from 'readline';
import Clip from './clip';

export default class ClipList extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: []
    }
    this.readFile = this.readFile.bind(this);
  }

  componentWillMount(){
    this.readFile();
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
        {this.state.logs.map(content=><Clip contents = {content}/>)}
      </div>
    );
  }
}
