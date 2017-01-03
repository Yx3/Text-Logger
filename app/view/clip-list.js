import React from 'react';
import fs from 'fs';
import update from 'react-addons-update';
import readline from 'readline';
import Clip from './clip';
import {ipcRenderer} from 'electron';
import autobind from 'autobind-decorator';
import setting from '../setting.json';
@autobind
export default class ClipList extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: [],
      changeClicked: false,
      enableServiceHook: setting.enableServiceHook
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
    const updatedData = this.state.logs.reduce((data, log, i) =>
      i === index ? data : `${data}${log}\n`);

    ipcRenderer.send('delete-log', updatedData);
  }

  readFile() {
    const rl = readline.createInterface({
      input: fs.createReadStream('log.txt')
    });

    rl.on('line', (line) => {
      this.setState({logs: this.state.logs.concat(line)});
    });
  }

  handleOptionChange(event) {
    this.setState({enableServiceHook: event.target.value === 'true'});
    ipcRenderer.send('set-service-hook', event.target.value === 'true');
  }

  renderOption() {
    return (
      <div>
        <h3>Service Hook</h3>
        <form>
          <div>
            <label>
              <input type="radio" value='true'
                            checked={this.state.enableServiceHook === true}
                            onChange={this.handleOptionChange}/>
              Yes
            </label>
          </div>
          <div>
            <label>
              <input type="radio" value='false'
                            checked={this.state.enableServiceHook === false}
                            onChange={this.handleOptionChange}/>
              No
            </label>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div style = {{position: 'relative'}}>
        {this.renderOption()}
        {this.state.logs.map((content, i)=><Clip contents = {content}
                                                 deleteLog = {this.deleteLog}
                                                 index = {i}
                                                 changeClicked = {this.state.changeClicked}/>)}
       <button
         onClick={()=>this.setState({changeClicked: !this.state.changeClicked})}>
         Edit
       </button>
      </div>
    );
  }
}
