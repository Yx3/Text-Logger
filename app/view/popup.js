import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './app-component';
import Setting from './setting';

window.onload = () => {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={App}/>
      <Route path='/setting' component={Setting}/>
    </Router>, document.getElementById('app'));
};
