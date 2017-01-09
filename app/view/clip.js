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
      <div style={{
        display: 'flex',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#efeff2'
      }}>
        <div style={{flexGrow: 10}}/>
        <div style={{flexGrow: 352}}>
          <div style={{height: 12}}/>
          <div style={{
            fontFamily: 'SanFranciscoText-Regular',
            fontSize: 12}}>
            {this.props.source}
          </div>
          <div style={{height: 12}}/>
        </div>
        <div style={{flexGrow: 10}}/>
      </div>
    );
  }
}
