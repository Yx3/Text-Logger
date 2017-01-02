import React from 'react';

export default class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <div>{this.props.contents}</div>
          <button onClick={()=>this.props.deleteLog(this.props.index)}> delete </button>
      </div>
    );
  }
}
