import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './page/Home';
import {Route, BrowserRouter as Router} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Home}/>
    </Router>
  </React.StrictMode>
);