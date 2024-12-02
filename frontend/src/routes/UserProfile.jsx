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
  const [currentProfile, setCurrentProfile] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [photocardCollection, setPhotocardCollection] = useState([]);

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
        setFullName(user.full_name || 'New User - Enter your Full Name'); 
        setMyBio(user.bio || 'Hi, I am a new user!');
        setEmail(user.email || 'Loading...');
        setAddressOne(user.address_line1 || 'New User - Enter your address line 1'); 
        setAddressTwo(user.address_line2 || 'New User - Enter your address line 2');

        setCurrentProfile({
          full_name: user.full_name || 'New User - Enter your Full Name',
          bio: user.bio || 'Hi, I am a new user!',
          address_line1: user.address_line1 || 'New User - Enter your address line 1',
          address_line2: user.address_line2 || 'New User - Enter your address line 2',
        });
      } catch (error) {
        console.error('Cannot fetch data', error);
        navigate('/Login');
      }
    };

    const fetchPhotocardCollection = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/Login');
        return;
      }
      try {
        const response = await fetch('/api/users/collection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch collection');
        }

        const { collection } = await response.json();
        setPhotocardCollection(collection); 
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchUserProfile();
    fetchPhotocardCollection();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    navigate('/Login');
  };

  const handleEdit = async () => {
    if (isEditable) {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/Login');
        return;
      }

      const updatedFields = {};
      if (fullname !== currentProfile.full_name) updatedFields.full_name = fullname;
      if (myBio !== currentProfile.bio) updatedFields.bio = myBio;
      if (addressOne !== currentProfile.address_line1) updatedFields.address_line1 = addressOne;
      if (addressTwo !== currentProfile.address_line2) updatedFields.address_line2 = addressTwo;

      if (Object.keys(updatedFields).length > 0) {
        try {
          const response = await fetch('/api/users/editProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedFields),
          });

          if (!response.ok) {
            throw new Error('Failed to save profile');
          }

          setCurrentProfile(prevProfile => ({
            ...prevProfile,
            ...updatedFields,
          }));

          console.log('Profile updated successfully');
        } catch (error) {
          console.error('Error saving profile:', error);
          alert('Error saving your profile, please try again');
        }
      } else {
        console.log('No changes to save');
      }
    }

    setIsEditable(!isEditable);
  };

  return (
    <div className="LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen">
      <Navbar />
      <div className="logout-container">
        <button className="logout-button" onClick={handleEdit}>
          {isEditable ? 'Save' : 'Edit Profile'}
        </button>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
      <main className="container">
        <section className="top-container">
          <div className="welcome-message">
            <h1>Welcome Back {username}</h1>
            <div className="info-container">
              {isEditable ? (
                <input type="text"className="enter-name" id="fullname" placeholder="Enter your full name..." value={fullname} onChange={(e) => setFullName(e.target.value)} maxLength="75"/>
              ) : (
                <div className="fullName"> {fullname}</div>
              )}
            </div>
            <div className="info-container">
              {isEditable ? (
                <textarea className="bio-input" id="bio" placeholder="Enter your bio here..." value={myBio} onChange={(e) => setMyBio(e.target.value)} maxLength="250"/>
              ) : (
                <div className="display-size"> {myBio}</div>
              )}
            </div>
            <div className="info-container">
              <div className="label"> Personal Information:</div>
            </div>
            <div className="info-container">
              <div className="email">{email}</div>
            </div>
            <div className="info-container">
              {isEditable ? (
                <textarea className="address-input" id="address1" placeholder="Enter your address line one..." value={addressOne} onChange={(e) => setAddressOne(e.target.value)} maxLength="100"/>
              ) : (
                <div className="email"> {addressOne}</div>
              )}
            </div>
            <div className="info-container">
              {isEditable ? (
                <textarea className="address-input" id="address2" placeholder="Enter your address line two..." value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} maxLength="100"/>
              ) : (
                <div className="email"> {addressTwo}</div>
              )}
            </div>
          </div>
        </section>
        <section className="photo-card-section mt-10">
          <h2 className="text-xl font-bold text-center mb-4">My Photocard Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-16 mx-2 sm:mx-2 lg:mx-2">
            {photocardCollection.length > 0 ? (
              photocardCollection.map((card) => {
                const cost = card.photocard_id.cost?.$numberDecimal || card.photocard_id.cost || 'N/A';
                const postingDate = card.photocard_id.posting_date? new Date(card.photocard_id.posting_date).toLocaleDateString(): 'N/A';
                
                return (
                <div key={card._id} className="border p-4 rounded shadow-lg bg-white">
                  <img
                  src={card.photocard_id.image || ''}
                  className="w-full h-60 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2 text-center">{card.photocard_id.artist_name || 'N/A'}</h3>
                  <p className="text-sm text-gray-600 text-center font-semibold">{card.photocard_id.details || 'N/A'}</p>
                  <p className="text-sm text-gray-600 text-center font-semibold">Cost: ${cost}</p>
                  <p className="text-sm text-gray-500 text-center font-semibold"> Posted on: {postingDate}</p>
                </div>
               );
            })
          ) : (
          <div className="text-center text-gray-500">No photo cards found.</div>
          )}
        </div>
        </section>
      </main>
      <div className="add-container">
        <button className="add-button" onClick={() => navigate('/Add_Card')}>+</button>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;

