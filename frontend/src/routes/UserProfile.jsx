import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './UserProfile.css'; 

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('Loading...');
  const [fullname, setFullName] = useState('New User - Enter your Full Name');
  const [myBio, setMyBio] = useState('Hi, I am a new user!');
  const [email, setEmail] = useState('Loading...');
  const [addressOne, setAddressOne] = useState('New User - Enter your address line 1');
  const [addressTwo, setAddressTwo] = useState('New User - Enter your address line 2');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/Login');
        return;
      }
      try {
        const response = await fetch('/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const { user } = await response.json();
        setUserName(user.username || 'Loading...');
        setFullName(user.fullname || 'New User - Enter your Full Name');
        setMyBio(user.bio || 'Hi, I am a new user!');
        setEmail(user.email || 'Loading...');
        setAddressOne(user.addressOne || 'New User - Enter your address line 1');
        setAddressTwo(user.addressTwo || 'New User - Enter your address line 2');
      } catch (error) {
        console.error('Cannot fetch data', error);
        navigate('/Login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/Login');
  };
  
    return (
      <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
        <Navbar />
        <div className="logout-container"> 
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
        <main className="container">
          <section className="top-container">
            <div className="welcome-message">
              <h1>Welcome Back {username} </h1>
              <div className="info-container">
                <input type="text" className="address-input" id="fullname" placeholder="Enter your full name..." value={fullname} onChange={(e) => setFullName(e.target.value)} maxLength= '75'/>
              </div>
              <div className="info-container">
                <textarea className="bio-input" id="bio" placeholder="Enter your bio here..." value={myBio} onChange={(e) => setMyBio(e.target.value)} maxLength="250" /></div>
              <div className="info-container">
                  <div className="label"> Personal Information:</div>
              </div>
              <div className="info-container">
                  <div className="email"> {email}</div>
              </div>
              <div className="info-container">
                <textarea className="address-input" id="address1" placeholder="Enter your address line one..." value={addressOne} onChange={(e) => setAddressOne(e.target.value)} maxLength = "100"/></div>
                <div className="info-container">
                <textarea className="address-input" id="address2" placeholder="Enter your address line two..." value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} maxLength = "100"/></div>
            </div>
          </section>
        </main>
        <div className="add-container"> 
          <button className="add-button"  onClick={() => navigate('/Add_Card')}>+</button>
        </div>
        <Footer />
      </div>
    );
};

export default UserProfile;
