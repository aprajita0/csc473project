import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon} from '@heroicons/react/24/solid';
import { GiftIcon} from '@heroicons/react/24/solid';
import { Bars4Icon} from '@heroicons/react/24/solid';
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
  const [isEditingCollection, setIsEditingCollection] = useState(false);
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

  const handleEditCollection = async () => {
    setIsEditingCollection(!isEditingCollection);
  }

  const handleRemoveCard = (cardId) => {
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
        <button className="edit-button drop-shadow-md text-gray-700 font-bold text-sm border-2 border-gray-700 rounded-full px-6 py-2 hover:scale-105 ease-in-out duration-300 hover:underline" onClick={handleEdit}>
          {isEditable ? 'Save' : 'Edit Profile'}
        </button>
        <button className="logout-button drop-shadow-md bg-gray-700 text-white font-bold text-sm border-2 border-gray-700 rounded-full px-6 py-2 hover:scale-105 ease-in-out duration-300 hover:underline" onClick={handleLogout}>Log Out</button>
      </div>
      <main className="container">
      <section className="top-container">
      <div className="flex items-center justify-between w-full px-8 py-4 border border-gray-300 shadow-md rounded-lg">
        <div className="welcome-message space-y-3">
          <div className="flex items-center space-x-1">
            <UserCircleIcon className="h-16 w-16 text-gray-300" />
            <h1 className="text-4xl font-bold text-gray-700"> Welcome Back, {username}!</h1>
          </div>
        <div>
        <div className="flex items-center space-x-3">
          <Bars4Icon className="h-10 w-10w ml-2.5 text-gray-300" />
          <div className="flex flex-col items-start ml-20">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          {isEditable ? (
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" id="fullname" placeholder="Enter your full name..." value={fullname}onChange={(e) => setFullName(e.target.value)}maxLength="75"/>
          ) : (
          <p className="text-xl font-medium text-gray-800">{fullname}</p>
          )}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-start ml-16">
      <div>
        {isEditable ? (
          <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" id="bio" placeholder="Enter your bio here..." value={myBio} onChange={(e) => setMyBio(e.target.value)} maxLength="250"/>
        ) : (
        <p className="text-base text-gray-700">{myBio}</p>
        )}
        </div>
        <div>
          <label className="block text-lg mt-10 font-medium text-gray-700">Personal Information:</label>
          <p className="text-base text-gray-700">{email}</p>
        </div>
        <div>
          {isEditable ? (
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" id="address1" placeholder="Enter your address line one..." value={addressOne} onChange={(e) => setAddressOne(e.target.value)}maxLength="100"/>
          ) : (
          <p className="text-base text-gray-700">{addressOne}</p>
          )}
          </div>
          <div>
            {isEditable ? (
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"id="address2" placeholder="Enter your address line two..." value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} maxLength="100"/>
            ) : (
            <p className="text-base text-gray-700">{addressTwo}</p>
            )}
          </div>
        </div>
        <div className="add-container">
          <button className="add-button drop-shadow-md text-gray-700 font-bold text-3xl border-2 border-gray-700 rounded-full px-7 py-5 hover:scale-105 ease-in-out duration-300 hover:bg-gray-700 hover:text-white font-bold" onClick={() => navigate('/Add_Card')}>+</button>
        </div>
      </div>
      </div>
      </section>
      <section className="photo-card-section">
        <div className="flex items-center justify-between w-full px-8 py-4 border border-gray-300 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-extrabold text-gray-600">My Photocard Collection</h2>
            <GiftIcon className="h-8 w-8 text-gray-300" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="edit-collections border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 hover:border-gray-400 hover:scale-105 ease-in-out duration-300" onClick={handleEditCollection}>
              {isEditingCollection ? 'Save' : 'Edit Collections'}
            </button>
            <select
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 hover:border-gray-400">
              <option value="">All Cards</option>
            </select>
          </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 md:grid-cols-3 lg:grid-cols-4 gap-6 px-16 mx-2 sm:mx-2 lg:mx-2 mt-6">
            {photocardCollection.length > 0 ? (
              photocardCollection.map((card) => {
                const cost = card.photocard_id.cost?.$numberDecimal || card.photocard_id.cost || 'N/A';
                const postingDate = card.photocard_id.posting_date? new Date(card.photocard_id.posting_date).toLocaleDateString(): 'N/A';
                return (
                <div key={card._id} className="relative border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                  {isEditingCollection && (
                    <button className="absolute top-2 right-2 bg-gray-300 text-white font-bold text-sm rounded-full px-2 py-1 hover:scale-105 ease-in-out duration-300 hover:bg-gray-700 hover:text-white font-bold" onClick={() => handleRemoveCard(card._id)}>✕</button>
                  )}
                  <img src={card.photocard_id.image || ''} className="w-full h-60 object-cover rounded-md" alt="Photocard"/>
                  <h3 className="text-lg font-semibold mt-2 text-center text-gray-800">{card.photocard_id.artist_name || 'N/A'}</h3>
                  <p className="text-sm text-gray-600 text-center font-medium">{card.photocard_id.details || 'N/A'}</p>
                  <p className="text-sm text-gray-600 text-center font-medium">Cost: ${cost}</p>
                  <p className="text-sm text-gray-500 text-center font-medium">Posted on: {postingDate}</p>
                </div>
                );
              })
            ) : (
            <div className="text-center text-gray-500">No photo cards found.</div>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;

