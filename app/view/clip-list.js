import React from 'react';
import update from 'react-addons-update';
import Clip from './clip';
import {ipcRenderer} from 'electron';
import autobind from 'autobind-decorator';
@autobind
export default class ClipContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clips: [],
      checkedClips: []
    };
  }

  componentWillMount() {
    this.loadClips();
  }

  deleteClips() {
    if (this.state.checkedClips.length === 0) return;
    this.state.checkedClips.map(clip=>{
      ipcRenderer.send('delete-contents', clip);
    });
    this.setState({
      clips: this.state.clips.filter(content=>this.state.checkedClips.indexOf(content.source) < 0),
      checkedClips: []
    });
  }

  loadClips() {
    this.setState({clips: ipcRenderer.sendSync('load-clips')});
  }

  addCheckedClips(clip) {
    this.setState({checkedClips: this.state.checkedClips.concat(clip)});
  }

  deleteCheckedClips(clip) {
    const clipIndex = this.state.checkedClips.findIndex(log => log === clip);
    this.setState({
      checkedClips: update(this.state.checkedClips, {$splice: [[clipIndex, 1]]})
    });
  }
  // TODO : refactoring component
  render() {
    return (
      <div style={{display: 'flex', height: 400}}>
        <div style={{flexBasis: 14}}/>
        <div style={{flexBasis: 372, display: 'flex', flexDirection: 'column'}}>
          {this.props.enableDelete &&
            <div style={{flexBasis: 47, display: 'flex', flexDirection: 'column'}}>
              <div style={{flexBasis: 20}}/>
              <div style={{display: 'flex', flexBasis: 15}}>
                <div style={{flexBasis: 6}}/>
                <div style={{flexBasis: 14}}>
                  <img src={'../resources/delete_unchecked/delete@3x.png'}
                       style={{height: 14, width: 14}}/>
                </div>
                <div style={{flexBasis: 25}}/>
                <div style={{
                  flexBasis: 13,
                  fontFamiliy: 'AppleSDGothicNeo-Regular',
                  color: '#9b9b9b',
                  fontSize: 12
                }}>All
                </div>
                <div style={{flexBasis: 263}}/>
                <div style={{
                  flexBasis: 51,
                  ontFamiliy: 'AppleSDGothicNeo-Regular',
                  color: this.state.checkedClips.length === 0 ? '#9b9b9b' : '#ff5555',
                  fontSize: 12
                }}
                onClick={()=>this.deleteClips()}>Delete ({this.state.checkedClips.length})
                </div>
              </div>
              <div style={{flexBasis: 12}}/>
            </div>
          }
          {this.state.clips.map((content, i) =>
            <Clip
              source={content.source}
              deleteLog={this.deleteClip}
              enableDelete={this.props.enableDelete}
              index={i}
              addCheckedClips={this.addCheckedClips}
              deleteCheckedClips={this.deleteCheckedClips}
              isChecked={this.state.checkedClips.indexOf(content.source) >= 0}
            />
          )}
        </div>
        <div style={{flexBasis: 14}}/>
      </div>
    );
  }
}
