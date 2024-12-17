import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon} from '@heroicons/react/24/solid';
import { GiftIcon} from '@heroicons/react/24/solid';
import { Bars4Icon} from '@heroicons/react/24/solid';
import { CheckIcon} from '@heroicons/react/24/solid';
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [photocardCollection, setPhotocardCollection] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('My Collection');

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
          username: user.username || 'New User',
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
        const response = await fetch('/api/users/get-my-collection', {
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

    const fetchUserCollections = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/get-collection-names', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          let collections = data.collections || [];
          if (!collections.includes('My Collection')) {
            collections.unshift('My Collection');
          }
          setUserCollections(data.collections || []); 
        } else {
          console.error('Failed to fetch collection names');
          setUserCollections([]); 
        }
      } catch (err) {
        console.error('Error fetching collections:', err);
        setUserCollections([]); 
      }
    };
    fetchUserCollections();
    fetchUserProfile();
    fetchPhotocardCollection();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/Login');
  };

  const handleEditCollection = async () => {
    setIsEditingCollection(!isEditingCollection);
  }

  const handleSelectCard = async () => {
    setIsSelectCard(!isSelectCard);
  }

  const handleRemoveCard = async (cardId, collectionName = 'My Collection') => {
    if (!selectedCard) {
      alert('Please select a photocard first');
      return;
    }
  
    if (collectionName === 'My Collection') {
      alert('Photocards cannot be removed from your default collection');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged to do thus');
        return;
      }
  
      const response = await fetch('/api/users/delete-photocard-from-collection', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          photocard_id: selectedCard,
          collection_name: collectionName,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message || 'Photocard removed');
        setPhotocardCollection((prev) =>
          prev.filter((card) => card.photocard_id._id !== selectedCard)
        );
        setSelectedCard(null); 
      } else {
        alert('Failed to remove photocard from collection.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('System Error, please try again later.');
    }
  };
  
  const handleAddCard = async (cardId) => {
    if (!selectedCard) {
      alert('Please select a photocard first.');
      return;
    }
  
    const collectionName = prompt('Enter the collection name to add this photocard to:');
    if (!collectionName) {
      alert('Collection name is required.');
      return;
    } 

    if (!userCollections.includes(collectionName)) {
      setUserCollections((prevCollections) => 
        [...prevCollections, collectionName]);
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in first');
        return;
      }
      let response = await fetch('/api/users/add-photocard-collection-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          photocard_id: cardId,
          collection_name: collectionName,
        }),
      });
  
      if (!response.ok) {
        const result = await response.json();
        alert(result.error || 'Failed to add photocard to collection');
        return;
      }
  
      alert('Photocard added to your entered collection');
  
      response = await fetch('/api/users/delete-photocard-from-collection', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          photocard_id: cardId,
          collection_name: selectedCollection,
        }),
      });
  
      if (!response.ok) {
        const result = await response.json();
        alert(result.error || 'Failed to remove photocard from original collection');
        return;
      }
      setPhotocardCollection((prev) =>
        prev.filter((card) => card.photocard_id._id !== cardId)
      );
      setSelectedCard(null);
    } catch (error) {
      alert('System error, please try again later.');
    }
  };
  
  const handleRemoveCollection = async () => {
    const collectionName = prompt('Enter the name of the collection you would like to delete');
    if (!collectionName) {
      alert('Collection name is required');
      return;
    } 

    if (collectionName == 'My Collection') {
      alert('Default collection cannot be removed');
      return;
    } 
    if (userCollections.includes(collectionName)) {
      setUserCollections((prevCollections) => 
        prevCollections.filter((name) => name !== collectionName));
    }    

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in first');
        return;
      }
      const response = await fetch('/api/users/delete-collection', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ collection_name: collectionName }),
      });
  
      if (!response.ok) {
        const result = await response.json();
        alert(result.error || 'Failed to delete collection');
        return;
      }
      setUserCollections((prevCollections) =>
        prevCollections.filter((name) => name !== collectionName)
    );
  
      alert('Collection deleted');
    } catch (error) {
      alert('System error, please try again later.');
    }
  };

  const handleEdit = async () => {
    if (isEditable) {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/Login');
        return;
      }

      const updatedFields = {};
      if (username !== currentProfile.username) updatedFields.username = username;
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

  const handleCollectionPick = async (collectionName) => {
    if (!collectionName) {
      setSelectedCollection('My Collection');
      await fetchPhotocardCollection(); 
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in');

      }
      const response = await fetch('/api/users/get-collection-by-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ collection_name: collectionName }),
      });
  
      if (!response.ok) {
        console.log('Failed to fetch users collection');
      }
      const { collection } = await response.json();
      setPhotocardCollection(collection || []); 
      setSelectedCollection(collectionName);
    } catch (error) {
      alert('System error, please try again later.');
    }
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
            <h1 className="text-4xl font-bold text-gray-700"> Welcome Back,{' '}
              {isEditable ? (
                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 text-4xl"/>
              ) : (
                username
              )}!
            </h1>
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
          <textarea className="w-[1000px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" id="bio" placeholder="Enter your bio here..." value={myBio} onChange={(e) => setMyBio(e.target.value)} maxLength="250"/>
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
        <div className="flex items-center justify-between w-full px-6 py-4 border border-gray-300 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-gray-600">My Photocard Collection</h2>
            <GiftIcon className="h-6 w-6 text-gray-300" />
          </div>
          <div className="flex items-center space-x-2">
            {isEditingCollection && (
              <button 
              className="edit-collections text-sm border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 hover:border-gray-400 hover:scale-105 ease-in-out duration-300" onClick={handleRemoveCollection}>
              Delete Collection
              </button>
            )}
             {isEditingCollection && (
              <button 
              className="edit-collections text-sm border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 hover:border-gray-400 hover:scale-105 ease-in-out duration-300"
              onClick={() => handleRemoveCard(selectedCard, selectedCollection)}>
              Delete Card from Collection
            </button>
            )}
            {isEditingCollection && (
              <button 
              className="edit-collections text-sm border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 hover:border-gray-400 hover:scale-105 ease-in-out duration-300"
              onClick={() => handleAddCard(selectedCard)}>
              Add Card to Collection
              </button>
            )}
            <button className="edit-collections text-sm border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 hover:border-gray-400 hover:scale-105 ease-in-out duration-300" onClick={handleEditCollection}>
              {isEditingCollection ? 'Finish' : 'Edit Collections'}
            </button>
            <select
            className="text-sm border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 hover:border-gray-400"   onChange={(e) => handleCollectionPick(e.target.value)}>
              {userCollections.map((collectionName, index) => (
                <option key={index} value={collectionName}>
                  {collectionName}
                </option>
              ))}
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
                  <button className={`absolute top-2 right-2 ${selectedCard === card.photocard_id._id ? 'bg-gray-700' : 'bg-gray-300'} text-white font-bold text-sm rounded-full px-2 py-1 hover:scale-105 ease-in-out duration-300`}  
                  onClick={() => {setSelectedCard(selectedCard === card.photocard_id._id ? null : card.photocard_id._id);}}>
                    <CheckIcon className="h-6 w-4" />
                  </button>
                )}
                <img src={card.photocard_id.image || ''} className="w-full h-60 object-cover rounded-md" alt="Photocard"/>
                <h3 className="text-lg font-semibold mt-2 text-center text-gray-800"> {card.photocard_id.artist_name || 'N/A'}</h3>
                <p className="text-sm text-gray-600 text-center font-medium"> {card.photocard_id.details || 'N/A'}</p>
                <p className="text-sm text-gray-600 text-center font-medium">Cost: ${cost}</p>
                <p className="text-sm text-gray-500 text-center font-medium"> Posted on: {postingDate}</p>
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




