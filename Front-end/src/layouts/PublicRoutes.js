import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoutes = () => {
    const token = localStorage.getItem('access_token') || false

  return (
    !token? <Outlet/> : <Navigate to="/"/>
  )
}
