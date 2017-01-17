import React from 'react';
import ClipList from './clip-list';
import Header from './header';
import SettingView from './settingView';
import autobind from 'autobind-decorator';
import setting from '../setting.json';
import {ipcRenderer} from 'electron';
import update from 'react-addons-update';

@autobind
export default class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      enableDelete: false,
      currentScene: 'clipList',
      // TODO : change it using router later
      appSetting: {
        launchOnStartup: false,
        showNotification: false,
        enableTranslation: setting.enableServiceHook,
        sourceLanguage: setting.googleSourceLanguage,
        targetLanguage: setting.googleTargetLanguage
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
    this.setState({
      appSetting: update(this.state.appSetting,
        {enableTranslation: {$set: !this.state.appSetting.enableTranslation}}
      )
    });
  }

  setSourceLanguage(lang) {
    ipcRenderer.send('change-source-lang', lang);
    this.setState({
      appSetting: update(this.state.appSetting,
        {sourceLanguage: {$set: lang}}
      )
    });
  }

  setTargetLanguage(lang) {
    ipcRenderer.send('change-target-lang', lang);
    this.setState({
      appSetting: update(this.state.appSetting,
        {targetLanguage: {$set: lang}}
      )
    });
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
                       toggleEnableTranslation={this.toggleEnableTranslation}
                       setSourceLanguage={this.setSourceLanguage}
                       setTargetLanguage={this.setTargetLanguage}/>
        }
      </div>
    );
  }
}
