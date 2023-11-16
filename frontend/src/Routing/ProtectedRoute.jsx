import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../Components'

const ProtectedRoute = () => {
  return localStorage.getItem('token') ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default ProtectedRoute
