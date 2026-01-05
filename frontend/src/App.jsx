import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Leave from './pages/Leave'; 
import Payroll from './pages/Payroll';
import Performance from './pages/Performance'; // <--- 1. NEW IMPORT
import Layout from './components/Layout';

// A special wrapper that checks if you are logged in
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access'); // Check for the key
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login (No Layout, No Checks) */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes: Wrapped in Layout & Security Check */}
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/employees" element={
          <PrivateRoute>
            <Layout>
              <Employees />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/leave" element={
          <PrivateRoute>
            <Layout>
              <Leave />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/payroll" element={
          <PrivateRoute>
            <Layout>
              <Payroll />
            </Layout>
          </PrivateRoute>
        } />

        {/* --- 2. NEW PERFORMANCE ROUTE ADDED HERE --- */}
        <Route path="/performance" element={
          <PrivateRoute>
            <Layout>
              <Performance />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;