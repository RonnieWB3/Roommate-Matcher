import { HashRouter  as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/landing-page.tsx';
import LoginPage from './pages/login-page.tsx';
import LoggedInHomePage from './pages/logged-in-home-page.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<LoggedInHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;