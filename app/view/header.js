import React from 'react';
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
          <div style={{flexGrow: 285}}>
            <span style={{
              fontSize: 14,
              color: '#ffffff',
              fontFamily: 'SanFranciscoText-Regular'
            }}>Text Logger </span>
            <span style={{
              fontSize: 12,
              color: '#ffffff',
              fontFamily: 'SanFranciscoText-Regular'
            }}>&nbsp; | &nbsp;Beta version</span>
          </div>
          <div style={{flexBasis: 18}}/>
          <div style={{flexBasis: 18}}>
            {this.props.currentScene === 'clipList' ?
            <img src={'../resources/trash-closed/trash-closed@3x.png'}
                 style={{height: 14, width: 14}}
                 onClick={this.props.setDeleteEnabled}/> : <div/>
            }
          </div>
          <div style={{flexBasis: 14}}/>
          <div style={{flexBasis: 17}}>
            {this.props.currentScene === 'clipList' ?
              <img src={'../resources/setting/setting@3x.png'}
                   style={{height: 14, width: 14}}
                   onClick={()=>this.props.setCurrentScene('setting')}/> :
              <img src={'../resources/close/close@3x.png'}
                   style={{height: 14, width: 14}}
                   onClick={()=>this.props.setCurrentScene('clipList')}/>
            }
         </div>
         <div style={{flexBasis: 17}}/>
        </div>
        <div style={{flexBasis: 12}}/>
      </div>
    );
  }
}
