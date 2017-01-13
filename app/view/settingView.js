import React from 'react';
import autobind from 'autobind-decorator';
import Select from 'react-select';

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

@autobind
export default class SettingView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', flex: 1, background: '#fbfbfb'}}>
        <div style={{flexBasis: 30}}/>
        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
          <div style={{flexBasis: 35}}/>
          <div style={{
            flexBasis: 16,
            fontFamily: 'SanFranciscoText-Semibold',
            color: '#a6a6a6', fontSize: 14
          }}>Setting</div>
          <div style={{flexBasis: 21}}/>
          <div style={{flexBasis: 14, display: 'flex'}}>
            <div style={{flexBasis: 12, display: 'flex', alignItems: 'center'}}>
              <img src={this.props.appSetting.launchOnStartup ?
                '../resources/checked/checked@3x.png' :
                '../resources/not-checked/not-checked@3x.png'}
                style={{width: 12, height: 12}}/>
            </div>
            <div style={{flexBasis: 14}}/>
            <div style={{
              flexGrow: 1,
              fontFamily: 'SanFranciscoText-Light',
              color: '#2e3031',
              fontSize: 12}}>Launch on startup</div>
          </div>
          <div style={{flexBasis: 16}}/>
          <div style={{flexBasis: 14, display: 'flex'}}>
            <div style={{flexBasis: 12, display: 'flex', alignItems: 'center'}}>
              <img src={this.props.appSetting.showNotification ?
                '../resources/checked/checked@3x.png' :
                '../resources/not-checked/not-checked@3x.png'}
                style={{width: 12, height: 12}}/>
            </div>
            <div style={{flexBasis: 14}}/>
            <div style={{
              flexGrow: 1,
              fontFamily: 'SanFranciscoText-Light',
              color: '#2e3031',
              fontSize: 12}}>Show notifications</div>
          </div>
          <div style={{flexBasis: 16}}/>
          <div style={{flexBasis: 14, display: 'flex'}}>
            <div style={{flexBasis: 12, display: 'flex', alignItems: 'center'}}>
              <img src={this.props.appSetting.enableTranslation ?
                '../resources/checked/checked@3x.png' :
                '../resources/not-checked/not-checked@3x.png'}
                onClick={()=>this.props.toggleEnableTranslation()}
                style={{width: 12, height: 12}}/>
            </div>
            <div style={{flexBasis: 14}}/>
            <div style={{
              flexGrow: 1,
              fontFamily: 'SanFranciscoText-Light',
              color: '#2e3031',
              fontSize: 12}}>Turn on translation</div>
          </div>
          <div style={{flexBasis: 14}}/>
          <div style={{flexBasis: 26, display: 'flex'}}>
            <div style={{flexBasis: 33}}/>
            <div style={{flexBasis: 128}}>
              <Select
                options={options}
                onChange={()=>{}}
                placeholder="Detect language"
                searchable={false}
              />
            </div>
            <div style={{flex: 1}}/>
          </div>
          <div style={{flexBasis: 12}}/>
          <div style={{flexBasis: 26, display: 'flex'}}>
            <div style={{flexBasis: 33}}/>
            <div style={{flexBasis: 128}}>
              <Select
                options={options}
                onChange={()=>{}}
                placeholder="Translation"
                searchable={false}
              />
            </div>
            <div style={{flex: 1}}/>
          </div>
          <div style={{
            flexBasis: 30,
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderColor: '#efeff2'}}/>
          <div style={{flexBasis: 30}}/>
          <div style={{flexBasis: 16, display: 'flex'}}>
            <div style={{flexBasis: 66, fontSize: 14, color: '#a6a6a6'}}> Shortcuts </div>
            <div style={{flexGrow: 243}}/>
            <div style={{flexBasis: 31, fontSize: 12, color: '#4a90e2'}}> Reset </div>
          </div>
          <div style={{flexBasis: 17}}/>
          <div style={{flexBasis: 22, display: 'flex', alignItems: 'center'}}>
            <div style={{flexBasis: 29, fontSize: 12, color: '#2e3031'}}>Copy</div>
            <div style={{flexBasis: 24}}/>
            <div style={{
              flexGrow: 274,
              background: '#ffffff',
              paddingLeft: 12,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#dce0e2',
              fontSize: 12}}>Ctrl + C</div>
          </div>
          <div style={{flexBasis: 17}}/>
          <div style={{flexBasis: 22, display: 'flex', alignItems: 'center'}}>
            <div style={{flexBasis: 29, fontSize: 12, color: '#2e3031'}}>Save</div>
            <div style={{flexBasis: 24}}/>
            <div style={{
              flexGrow: 274,
              background: '#ffffff',
              paddingLeft: 12,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#dce0e2',
              fontSize: 12
            }}>Command + Ctrl + S</div>
          </div>
          <div style={{flexBasis: 36}}/>
        </div>
        <div style={{flexBasis: 30}}/>
      </div>
    );
  }
}
