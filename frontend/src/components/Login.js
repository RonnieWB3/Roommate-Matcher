import React, { useState } from 'react'; //React: Core library for building the UI useState: Hook for managing state in functional components
import axios from 'axios'; //Library for making HTTP requests
import { useNavigate } from 'react-router-dom'; //React Router: Library for routing in React applications

function LoginPage() {
  const [email, setEmail] = useState(''); //Stores the email entered by the user
  const [password, setPassword] = useState(''); //Stores the password entered by the user
  const [error, setError] = useState(''); //Stores the error message to be displayed to the user
  const navigate = useNavigate(); //Provides a function to navigate to different routes after a successful login

  const handleLogin = async () => { //Handles login attempts by sending the email and password to the backend API
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Login to your account</h2>
        <p className="text-center text-gray-600 mb-4">Enter your email and password to login</p>
        <div className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
