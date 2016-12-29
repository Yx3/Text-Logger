import React from 'react';
import ClipList from './clip-list';

export default class AppComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ClipList />
      </div>
    );
  }
}
