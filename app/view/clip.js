import React from 'react';
import {ipcRenderer} from 'electron';
import autobind from 'autobind-decorator';

@autobind
export default class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteContents() {
    this.props.deleteLog(this.props.index);
    ipcRenderer.send('delete-contents', this.props.source);
    ipcRenderer.on('delete-result', () => {
      // TODO : alert message
    });
  }

  render() {
    return (
      <div>
        <div>{this.props.source}</div>
        <div>{this.props.google}</div>
        <div>{this.props.glosbe}</div>
        <button onClick={this.deleteContents}>delete</button>
      </div>
    );
  }
}
