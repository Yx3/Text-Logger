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
      checkedClips: [],
      launchOnStartup: false,
      showNotification: false
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

  toggleEnableTranslation() {
    this.setState({enableTranslation: !this.state.enableTranslation});
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

  renderDeleteBar() {
    return (
      <div style={{
        flexBasis: 47,
        display: 'flex',
        flexDirection: 'column',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#eaefef'
      }}>
        <div style={{flexBasis: 20}}/>
        <div style={{display: 'flex', flexBasis: 15}}>
          <div style={{flexBasis: 8}}/>
          <div style={{flexBasis: 14}}>
            <img src={this.state.clips.length === this.state.checkedClips.length ?
              '../resources/delete_checked/delete@3x.png' :
              '../resources/delete_unchecked/delete@3x.png'}
                 style={{height: 14, width: 14}}
                 onClick={()=> {
                   if (this.state.clips.length === this.state.checkedClips.length) {
                     this.setState({checkedClips: []});
                     return;
                   }
                   this.setState({checkedClips: this.state.clips.map(clip=>clip.source)});
                 }}/>
          </div>
          <div style={{flexBasis: 25}}/>
          <div style={{
            flexBasis: 13,
            fontFamiliy: 'AppleSDGothicNeo-Regular',
            color: '#9b9b9b',
            fontSize: 12
          }}>All
          </div>
          <div style={{flexGrow: 263}}/>
          <div style={{
            flexBasis: 51,
            fontFamiliy: 'AppleSDGothicNeo-Regular',
            color: this.state.checkedClips.length === 0 ? '#9b9b9b' : '#ff5555',
            fontSize: 12
          }}
          onClick={()=>this.deleteClips()}>Delete ({this.state.checkedClips.length})
          </div>
        </div>
        <div style={{flex: 12, flexShrink: 0}}/>
      </div>
    );
  }
  // TODO : refactoring component

  renderDeleteOption(isChecked, source) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flexBasis: 37}}>
        <div style={{flex: 1, display: 'flex'}}>
          <div style={{flexBasis: 8}}/>
          <div style={{
            flexBasis: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src={isChecked ?
                       '../resources/delete_checked/delete@3x.png' :
                       '../resources/delete_unchecked/delete@3x.png'
                     }
                 style={{height: 14, width: 14}}
                 onClick={()=>{
                   if (isChecked) {
                     this.deleteCheckedClips(source);
                     return;
                   }
                   this.addCheckedClips(source);
                 }}/>
          </div>
          <div style={{flexBasis: 15}}/>
        </div>
        {this.props.enableTranslation && <div style={{flexBasis: 10}}/>}
      </div>
    );
  }

  render() {
    return (
      <div style={{display: 'flex', flex: 1}}>
        <div style={{flexBasis: 14, flexShrink: 0}}/>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          {this.props.enableDelete && this.renderDeleteBar()}
          <div style={{flexBasis: this.props.enableDelete ? 12 : 24}}/>
          {this.props.enableTranslation && !this.props.enableDelete &&
            <Clip source='Enter text'
                  google='Translation'
                  enableTranslation={this.props.enableTranslation}
                  textStyle={{
                    color: '#c6cbcc',
                    fontSize: 12,
                    fontFamiliy: 'SanFranciscoText-Regular'
                  }}/>
          }
          {this.state.clips.map((content, i) =>
            <div style={{display: 'flex'}}>
              {
                this.props.enableDelete &&
                this.renderDeleteOption(
                  this.state.checkedClips.indexOf(content.source) >= 0, content.source
                )
              }
              <div style={{flex: 1}}>
                <Clip
                  source={content.source}
                  google={content.google}
                  deleteLog={this.deleteClip}
                  enableDelete={this.props.enableDelete}
                  index={i}
                  enableTranslation={this.props.enableTranslation}
                />
              </div>
            </div>
          )}
        </div>
        <div style={{flexBasis: 14}}/>
      </div>
    );
  }
}
