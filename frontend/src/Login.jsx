import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import login_image from '../assets/login.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/users/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);

            localStorage.setItem('token', data.token); 
            navigate('/'); 
        } else {
            const result = await response.json();
            setError(result.message || 'Login failed. Please try again.');
        }
    } catch (err) {
        console.error('Error during login:', err);
        setError('Server error. Please try again later.');
    }
  };

  return (
    <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <main className="login-container">
        <form className="form-container" onSubmit={handleLogin}>
          <div className="form-title">
            <h1>Login</h1>
            <div className="field-group">
                <label className="log_field-label" htmlFor="email">Email:</label>
                <input 
                  className="login-input" 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="field-group">
                <label className="log_field-label" htmlFor="password">Password:</label>
                <input 
                  className="login-input" 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className="form-buttons">
                <button className="register" onClick={() => navigate('/Register')}>Register</button> 
                <button type="submit" className="login">Login</button>
            </div>
        </div>
        <div className="login-image">
            <img src={login_image} alt="login-image" className="login-image" />
        </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
