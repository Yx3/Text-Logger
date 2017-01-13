import React from 'react';
import autobind from 'autobind-decorator';

@autobind
export default class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSingleWord() {
    return (
      <div style={{
        display: 'flex',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#efeff2',
        flex: 1
      }}>
        <div style={{flexBasis: 10}}/>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <div style={{flexBasis: 12}}/>
          <div style={{
            fontFamily: 'SanFranciscoText-Regular',
            fontSize: 12}}>
            {this.props.source}
          </div>
          <div style={{flexBasis: 12}}/>
        </div>
        <div style={{flexBasis: 10}}/>
      </div>
    );
  }

  renderDoubleWord() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{
          display: 'flex',
          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          flex: 1
        }}>
          <div style={{flexBasis: 2}}/>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div style={{flexBasis: 10}}/>
            <div style={{flex: 1, display: 'flex'}}>
              <div style={{flex: 1, display: 'flex'}}>
                <div style={{flexBasis: 12}}/>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{flexBasis: 4}}/>
                  <div style={
                    this.props.textStyle ? this.props.textStyle :
                    {
                      flex: 1,
                      fontSize: 12,
                      color: '#2e3031',
                      fontFamily: 'SanFranciscoText-Regular'
                    }}>{this.props.source} </div>
                  <div style={{flexBasis: 4}}/>
                </div>
                <div style={{flexBasis: 12}}/>
              </div>
              <div style={{
                flexBasis: 3,
                borderLeftStyle: 'solid',
                borderLeftWidth: 1,
                borderLeftColor: '#efeff2'
              }}/>
              <div style={{flex: 1, display: 'flex'}}>
                <div style={{flexBasis: 12}}/>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{flexBasis: 4}}/>
                  <div style={this.props.textStyle ? this.props.textStyle : {
                    flex: 1,
                    fontSize: 12,
                    color: '#2e3031',
                    fontFamily: 'Times New Roman, Georgia, Serif'
                  }}>{this.props.google} </div>
                  <div style={{flexBasis: 4}}/>
                </div>
                <div style={{flexBasis: 12}}/>
              </div>
            </div>
            <div style={{flexBasis: 10}}/>
          </div>
          <div style={{flexBasis: 2}}/>
        </div>
        <div style={{flexBasis: 10}}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.props.enableTranslation ? this.renderDoubleWord() : this.renderSingleWord() }
      </div>
    );
  }
}
