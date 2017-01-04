import React from 'react';

export default class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style = {{display: 'flex', flexGrow: 1, flexDirection: 'row'}}>
          <div style = {{flex: 3}}>{this.props.contents}</div>
          { (this.props.changeClicked) ?
            <button style = {{flex: 1}}
                    onClick={()=>this.props.deleteLog(this.props.index)}> delete </button>
            : null
          }
      </div>
    );
  }
}
