import React from 'react';
export default class header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: 40, background: '#1c92f0'}}>
        <div style={{flexBasis: 12}}/>
        <div style={{flexBasis: 16, display: 'flex'}}>
          <div style={{flexBasis: 16}}/>
          <div style={{flexBasis: 20}}>
            <img src={'../resources/app-icon-retina-white/app-icon-retina-white@3x.png'}
                 style={{height: 12, width: 12}}/>
          </div>
          <div style={{flexBasis: 13}}/>
          <div style={{flexBasis: 285, color: '#ffffff', fontFamily: 'SanFranciscoText-Regular'}}>
            Text Logger | Beta version
          </div>
          <div style={{flexBasis: 18}}/>
          <div style={{flexBasis: 18}}>
            <img src={'../resources/trash-closed/trash-closed@3x.png'}
                 style={{height: 14, width: 14}}/>
          </div>
          <div style={{flexBasis: 14}}/>
          <div style={{flexBasis: 17}}>
            <img src={'../resources/setting/setting@3x.png'}
                 style={{height: 14, width: 14}}/>
         </div>
         <div style={{flexBasis: 17}}/>
        </div>
        <div style={{flexBasis: 12}}/>
      </div>
    );
  }
}
