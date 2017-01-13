import React from 'react';
import { Link } from 'react-router';

export default class Setting extends React.Component {
  render() {
    return (
      <div>
        <div>Setting</div>
        <button><Link to='/'>index</Link></button>
      </div>
    );
  }
}
