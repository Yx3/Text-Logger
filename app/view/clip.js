import React from 'react';

export default class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style = {{position: 'relative', height: 30}}>
          <div style = {{position: 'absolute', left: 10}}>{this.props.contents}</div>
          { (this.props.changeClicked) ?
            <button style = {{position: 'absolute', right: 0}}
                    onClick={()=>this.props.deleteLog(this.props.index)}> delete </button>
            : null
          }
      </div>
    );
  }
}
