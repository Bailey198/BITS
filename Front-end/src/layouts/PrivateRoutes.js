import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    let token = localStorage.getItem('access_token') || false;

  return (
    token ? <Outlet/> : <Navigate to="/login"/>
  )
}
