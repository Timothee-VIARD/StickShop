import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './translations/i18n';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ShopPage } from './pages/ShopPage';
import { PageNotFound } from './pages/PageNotFound';
import { ThemeProvider } from '@mui/material';
import { theme } from './style/theme';
import { CartProvider } from './contexts/CartContext';
import { ContactPage } from './pages/ContactPage';
import { ProductsManagementPage } from './pages/ProductsManagementPage';
import { ProductEditPage } from './pages/ProductEditPage';
import { AuthPage } from './pages/AuthPage';
import { SnackbarProvider } from 'notistack';
import ProfilePage from './pages/ProfilePage';
import { ProfileProvider } from './contexts/ProfileContext';
import { CreateProductPage } from './pages/CreateProductPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <ProfileProvider>
          <CartProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/auth" component={AuthPage} />
                <Route exact path="/shop" component={ShopPage} />
                <Route exact path="/contact" component={ContactPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/admin" component={ProductsManagementPage} />
                <Route exact path="/admin/product/:id" component={ProductEditPage} />
                <Route exact path="/admin/create" component={CreateProductPage} />
                <Route component={PageNotFound} />
              </Switch>
            </Router>
          </CartProvider>
        </ProfileProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
