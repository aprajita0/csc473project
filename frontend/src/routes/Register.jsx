import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import register_image from '../assets/register.png';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); 

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        });

        if (response.ok) {
          navigate('/login');
          alert("Account created!");
        } else {
          const result = await response.json();
          console.log(result);
          alert(result.message);
        }
    } catch (err) {
        setError('Server error. Please try again later.');
    }
  };

  return (
    <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <form className="reg-container" onSubmit={handleRegister}>
        <section className="reg-form-container">
          <div className="reg-form-title">
            <h1>Register</h1>
            <div className="reg-field-group">
                <label className="reg_field-label" htmlFor="username">Username:</label>
                <input className="reg-input" type="text" id="username" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="reg-field-group">
                <label className="reg_field-label" htmlFor="password">Password:</label>
                <input className="reg-input" type="password" id="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="reg-field-group">
                <label className="reg_field-label" htmlFor="email">Email:</label>
                <input className="reg-input" type="email" id="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="reg-form-buttons">
                <button className="register" type="submit"> Register</button> 
                <button className="login" onClick={() => navigate('/Login')}>Login</button>
            </div>
        </div>
        <div className="register-image">
            <img src={register_image} alt="register-image" className="register-image" />
          </div>
        </section>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
