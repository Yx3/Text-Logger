import React from 'react';
import update from 'react-addons-update';
import Clip from './clip';
import {ipcRenderer} from 'electron';
import autobind from 'autobind-decorator';
@autobind
export default class ClipContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      clips: []
    };
  }

  componentWillMount() {
    this.loadClips();
  }

  deleteClip(index) {
    this.setState({
      clips: update(this.state.clips, {$splice: [[index, 1]]})
    });
  }

  loadClips() {
    this.setState({clips: ipcRenderer.sendSync('load-clips')});
  }

  render() {
    return (
      <div style={{display: 'flex', height: 400}}>
        <div style={{flexBasis: 14}}/>
        <div style={{flexBasis: 372}}>
          {this.state.clips.map((content, i) =>
            <Clip
              source={content.source}
              deleteLog={this.deleteClip}
              index={i}
            />
          )}
        </div>
        <div style={{flexBasis: 14}}/>
      </div>
    );
  }
}
