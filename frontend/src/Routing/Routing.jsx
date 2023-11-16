import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart, Home, OTPCode, SignIn, SignUp } from '../Pages'
import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => {
  return (
    <>
      <Routes>

        {/* Auth Routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/otp" element={<OTPCode />} />
        </Route>

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

      </Routes>
    </>
  )
}

export default Routing
