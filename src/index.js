import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './translations/i18n';
import HomePage from './page/HomePage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ShopPage from "./page/ShopPage";
import PageNotFound from "./page/PageNotFound";
import {ThemeProvider} from "@mui/material";
import {theme} from "./style/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/shop" component={ShopPage}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);