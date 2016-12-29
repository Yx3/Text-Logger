import React from 'react';
import ReactDOM from 'react-dom';
import App from './app-component';

window.onload = function(){
  ReactDOM.render(<App />, document.getElementById('app'));
}
