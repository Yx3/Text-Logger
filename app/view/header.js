import React from 'react';
import { Link } from 'react-router';

export default class header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: 40, background: '#1c92f0'}}>
        <div style={{flexBasis: 12}}/>
        <div style={{display: 'flex'}}>
          <div style={{flexBasis: 16}}/>
          <div style={{flexBasis: 20}}>
            <img src={'../resources/icon-app/icon-app@3x.png'}
                 style={{height: 12, width: 12}}/>
          </div>
          <div style={{flexBasis: 13, flexShrink: 0}}/>
          <div style={{flexGrow: 285, color: '#ffffff', fontFamily: 'SanFranciscoText-Regular'}}>
            Text Logger | Beta version
          </div>
          <div style={{flexBasis: 18}}/>
          <div style={{flexBasis: 18}}>
            <img src={'../resources/trash-closed/trash-closed@3x.png'}
                 style={{height: 14, width: 14}}
                 onClick={this.props.setDeleteEnabled}/>
          </div>
          <div style={{flexBasis: 14}}/>
          <div style={{flexBasis: 17}}>
            <Link to='/Setting'>
              <img
                src={'../resources/setting/setting@3x.png'}
                style={{height: 14, width: 14}}/>
            </Link>
          </div>
          <div style={{flexBasis: 17}}/>
        </div>
        <div style={{flexBasis: 12}}/>
      </div>
    );
  }
}
