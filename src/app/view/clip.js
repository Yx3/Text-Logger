import {Component} from 'react';

class Clip extends Component {
  constructor(props, clip) {
    super(props);

    this.state.clip = clip;
  }

  render() {
    return (
      <div>
        <div>{this.state.clip}</div>
      </div>
    );
  }
}

// Export for re-use
export default Clip;
