// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include credentials for session management
      });
      const data = await response.json();
      if (response.ok) {
        if (data.userType === 'ADMIN') {
          navigate(`/adminPage?firstName=${data.firstName}&lastName=${data.lastName}`);

        } else {
          navigate(`/userPage?firstName=${data.firstName}&lastName=${data.lastName}`);
           // Redirect to user page
        }
 // Navigate to the prediction page
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
