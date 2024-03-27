import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './page/HomePage';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import ShopPage from "./page/ShopPage";
import PageNotFound from "./page/PageNotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/shop" component={ShopPage}/>
        <Route component={PageNotFound}/>
      </Switch>
    </Router>
  </React.StrictMode>
);