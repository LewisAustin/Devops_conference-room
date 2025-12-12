import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formBody = new URLSearchParams();
      formBody.append('username', formData.email);
      formBody.append('password', formData.password);

      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.access_token);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(`Network error: ${err.message}. Please ensure services are running.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name
        })
      });

      if (response.ok) {
        await handleLogin(e);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(`Network error: ${err.message}. Please ensure services are running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? 'Create Account' : 'Login'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required={isRegister}
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="*******"
              minLength="6"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        
        <div className="toggle-form">
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister 
              ? 'Already have an account? Login' 
              : "Don't have an account? Register"}
          </button>
        </div>
        
        <div className="demo-credentials">
          <p><strong>Testing application</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Login;