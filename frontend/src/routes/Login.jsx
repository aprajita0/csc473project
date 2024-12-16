import React, { useEffect, useState } from 'react';
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
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleScriptLoaded(true);
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  useEffect(() => {
    if (googleScriptLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: '314834991156-us92uqkpp6csa7gk6hut86527p0prkuk.apps.googleusercontent.com', 
        callback: handleGoogleResponse,
        login_uri: 'https://csc473project.vercel.app/auth/google/callback',
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large', shape: 'pill' }
      );
    }
  }, [googleScriptLoaded]);

  const handleGoogleResponse = (response) => {
    fetch('/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate('/profile');
      })
      .catch(() => {
        setError('Google authentication failed');
      });
  };

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
        localStorage.setItem('user_id', data.userid);
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/profile'); 
      } else {
        const result = await response.json();
        setError(result.message || 'Login failed');
        alert("Wrong username or password, please try again");
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
              <input className="login-input" type="email" id="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="log_field-label" htmlFor="password">Password:</label>
              <input className="login-input" type="password" id="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-buttons">
            <div id='googleSignInButton' style={{marginTop:'5px', width:'200px', marginBottom: '2px'}}></div>
              <button type="submit" className="login">Login</button>
              <button className="register" onClick={() => navigate('/register')}>Register</button> 
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
