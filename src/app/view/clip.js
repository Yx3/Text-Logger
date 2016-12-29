import {Component} from 'react';

export default class Clip extends Component {
  constructor(props) {
    super(props);
    // this.props = props;
  }

  render() {
    return (
      <div>
        <div>{this.props.word}</div>
      </div>
    );
  }
}
