import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './page/HomePage';
import {Route, BrowserRouter as Router} from "react-router-dom";
import ShopPage from "./page/ShopPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/shop" component={ShopPage}/>
    </Router>
  </React.StrictMode>
);