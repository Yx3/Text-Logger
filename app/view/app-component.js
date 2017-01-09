import React from 'react';
import ClipList from './clip-list';
import Header from './header';
import autobind from 'autobind-decorator';

@autobind
export default class AppComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header/>
        <ClipList/>
      </div>
    );
  }
}
