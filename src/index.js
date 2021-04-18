import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'milligram';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={customHistory}>
    <App />
  </Router>,
  document.getElementById('root')
);


