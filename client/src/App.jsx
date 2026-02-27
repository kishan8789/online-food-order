import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/UserHome';
import AdminDashboard from './pages/AdminDashboard';
import RestaurantMenu from './pages/RestaurantMenu';

// --- Badlav Yahan Hai ---
import Cart from './context/Cart'; // Kyunki aapne Cart.jsx ko src/context mein rakha hai
import { CartProvider } from './context/CartContext'; // CartContext bhi src/context mein hai
// ------------------------

import './App.css';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (token && role === 'admin') ? children : <Navigate to="/" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <UserHome />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/restaurant/:id" 
            element={
              <PrivateRoute>
                <RestaurantMenu />
              </PrivateRoute>
            } 
          />
          
          {/* Cart Route */}
          <Route 
            path="/cart" 
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;