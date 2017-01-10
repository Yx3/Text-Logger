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
      {
        this.props.enableDelete &&
        <div style={{flexBasis: 37, display: 'flex'}}>
          <div style={{flexBasis: 8}}/>
          <div style={{
            flexBasis: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src={this.props.isChecked ?
                       '../resources/delete_checked/delete@3x.png' :
                       '../resources/delete_unchecked/delete@3x.png'
                     }
                 style={{height: 14, width: 14}}
                 onClick={()=>{
                   if (this.props.isChecked) {
                     this.props.deleteCheckedClips(this.props.source);
                     return;
                   }
                   this.props.addCheckedClips(this.props.source);
                 }}/>
          </div>
          <div style={{flexBasis: 15}}/>
        </div>
      }
        <div style={{flexBasis: 10}}/>
        <div style={{flexBasis: 352, display: 'flex', flexDirection: 'column'}}>
          <div style={{flexBasis: 12}}/>
          <div style={{
            fontFamily: 'SanFranciscoText-Regular',
            fontSize: 12}}>
            {this.props.source}
          </div>
          <div style={{flexBasis: 12}}/>
        </div>
        <div style={{flexBasis: 10}}/>
      </div>
    );
  }
}
