import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './UserProfile.css'; 

const UserProfile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Empty temporarily');
  const [myBio, setMyBio] = useState('Empty temporarily');
  const [email, setEmail] = useState('Empty temporarily');
  const [addressOne, setAddressOne] = useState('Empty temporarily');
  const [addressTwo, setAddressTwo] = useState('Empty temporarily');

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
              <h1>Welcome Back</h1>
              <div className="info-container">
                  <div className="fullName"> {fullName}</div>
              </div>
              <div className="info-container">
                  <div className="bio"> {myBio}</div>
              </div>
              <div className="info-container">
                  <div className="label"> Personal Information:</div>
              </div>
              <div className="info-container">
                  <div className="email"> {email}</div>
              </div>
              <div className="info-container">
                  <div className="address1"> {addressOne}</div>
              </div>
              <div className="info-container">
                  <div className="address2"> {addressTwo}</div>
              </div>
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
