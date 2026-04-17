

import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import About from './components/About';
import Product from './components/Products';

import Signup from './components/Signup';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import OrderDone from './components/OrderDone';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <Router>
      
      {/* <Navbar /> */}
      <Routes>
        <Route element={<Layout />}>
        <Route exact path="/" element={
          <>
            <Home />
            <Category />
            <About />
            <Product />
            {/* <Footer /> */}
          </>
        } />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderDone" element={<OrderDone />} />
        
</Route>
       

      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App;

