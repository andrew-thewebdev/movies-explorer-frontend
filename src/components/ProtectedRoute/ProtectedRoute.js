import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  if (localStorage.getItem('jwt')) {
    props.isLoggedIn = true;
  }
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to='/' replace />
  );
};

export default ProtectedRoute;
