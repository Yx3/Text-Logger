import {Component} from 'react';
import fs from 'fs';
import Clip from './clip';

// TODO: refactoring
const dir = process.cwd();
const logPath = `${dir}/log.txt`;

export default class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      clipLog: '123'
    };
    this.readLogFile = this.readLogFile.bind(this);
    //this.readLogFile();
  }

  readLogFile() {
    this.setState({clipLog: fs.readFileSync(logPath)})
  }

  render() {
    return (
      <div>
        <div>{fs.readFileSync(logPath)}</div>
        <Clip word={this.state.clipLog}/>
      </div>
    );
  }
}
