import React from 'react';
import ClipList from './clip-list';
import Header from './header';
import SettingView from './settingView';
import autobind from 'autobind-decorator';
import Setting from '../setting.json';
import {ipcRenderer} from 'electron';

@autobind
export default class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      enableDelete: false,
      currentScene: 'clipList',
      appSetting: {
        launchOnStartup: false,
        showNotification: false,
        enableTranslation: Setting.enableServiceHook
      }
    };
  }

  setDeleteEnabled() {
    this.setState({enableDelete: !this.state.enableDelete});
  }

  setCurrentScene(scene) {
    this.setState({currentScene: scene});
  }

  toggleEnableTranslation() {
    ipcRenderer.send('enable-translate', !this.state.appSetting.enableTranslation);
    let newSetting = this.state.appSetting;
    newSetting.enableTranslation = !this.state.appSetting.enableTranslation;
    this.setState({appSetting: newSetting});
  }

  render() {
    return (
      <div style={{height: window.innerHeight, background: '#fbfbfb'}}>
        <Header setDeleteEnabled={this.setDeleteEnabled}
                setCurrentScene={this.setCurrentScene}
                currentScene={this.state.currentScene}/>
        {this.state.currentScene === 'clipList' ?
          <ClipList enableDelete={this.state.enableDelete}
                    enableTranslation={this.state.appSetting.enableTranslation}/> :
          <SettingView appSetting={this.state.appSetting}
                       toggleEnableTranslation={this.toggleEnableTranslation}/>
        }
      </div>
    );
  }
}
