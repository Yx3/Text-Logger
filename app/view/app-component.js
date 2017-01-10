import React from 'react';
import ClipList from './clip-list';
import Header from './header';
import autobind from 'autobind-decorator';

@autobind
export default class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      enableDelete: false
    };
  }

  setDeleteEnabled() {
    this.setState({enableDelete: !this.state.enableDelete});
  }

  render() {
    return (
      <div>
        <Header setDeleteEnabled={this.setDeleteEnabled}/>
        <ClipList enableDelete={this.state.enableDelete}/>
      </div>
    );
  }
}
