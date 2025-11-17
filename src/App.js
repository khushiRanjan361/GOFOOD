import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import { CartProvider } from './components/ContextReducer';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/myOrder" element={<MyOrder />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
