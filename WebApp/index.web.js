/**
 * Created by Wayuki on 11-Feb-17.
 */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import AppContainer from './src/index.jsx';

import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/toastr/build/toastr.min.css';
import './src/css/index.css';

window.$ = window.jQuery = require('jquery'); // eslint-disable-line no-multi-assign
window.Tether = require('tether');
require('bootstrap');

render(React.createElement(AppContainer), document.querySelector('#app'));
