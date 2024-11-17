// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing-page';
import Login from './components/Login'; // Create these components
import Signup from './components/Signup'; // Create these components
import LoggedInHomePage from './components/Dashboard'; // Create these components
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<LoggedInHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
