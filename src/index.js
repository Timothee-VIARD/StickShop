import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './translations/i18n';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import PageNotFound from './pages/PageNotFound';
import { ThemeProvider } from '@mui/material';
import { theme } from './style/theme';
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
