import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart, Home, OTPCode, SignIn, SignUp } from '../Pages'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/otp" element={<OTPCode />} />

      </Routes>
    </>
  )
}

export default Routing
