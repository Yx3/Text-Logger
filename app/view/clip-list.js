import React from 'react';
import update from 'react-addons-update';
import Clip from './clip';
import {ipcRenderer} from 'electron';
import autobind from 'autobind-decorator';
import setting from '../setting.json';

@autobind
export default class ClipContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      clips: [],
      changeClicked: false,
      // TODO: it will be moved to app component
      enableServiceHook: setting.enableServiceHook
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

  handleOptionChange(event) {
    this.setState({enableServiceHook: event.target.value === 'true'});
    ipcRenderer.send('enable-translate', event.target.value === 'true');
  }

  renderOption() {
    return (
      <div>
        <h3>Service Hook</h3>
        <form>
          <div>
            <label>
              <input
                type="radio"
                value='true'
                checked={this.state.enableServiceHook === true}
                onChange={this.handleOptionChange}/>
              Yes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value='false'
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 280}}>
        <div style={{flex: 2}}>
          {this.renderOption()}
        </div>
        <div style={{
          flex: 3,
          borderStyle: 'solid',
          overflowY: 'scroll'}}>
          {this.state.clips.map((content, i) =>
            <Clip
              source={content.source}
              google={content.google}
              glosbe={content.glosbe}
              deleteLog={this.deleteClip}
              index={i}
            />
          )}
        </div>
        <button
          style={{flex: 1}}
          onClick={()=>this.setState({changeClicked: !this.state.changeClicked})}>
          Edit
        </button>
      </div>
    );
  }
}
