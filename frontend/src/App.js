import React from 'react'; //Core library for building the application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //Routing library for React
import LandingPage from './components/landing-page';
import Login from './components/Login'; // Create these components
import Signup from './components/Signup'; // Create these components
import LoggedInHomePage from './components/Dashboard'; // Create these components
import UserProfilePage from "./components/user-profile-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<LoggedInHomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
