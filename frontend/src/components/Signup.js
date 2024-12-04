import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSignup = async () => { // Submits the form data to the backend for user registration
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);

      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <p className="text-center text-gray-600 mb-4">Create a new account</p>
        <div className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            onClick={handleSignup}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
