import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProfileContext } from '../contexts/ProfileContext'; // Assurez-vous d'avoir un contexte qui gère les informations de profil de l'utilisateur

const AdminRoute = ({ component: Component, ...rest }) => {
  const { getRole } = useContext(ProfileContext);

  return (
    <Route {...rest} render={(props) => (getRole() === 'ADMIN' ? <Component {...props} /> : <Redirect to="/" />)} />
  );
};

export default AdminRoute;
