import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import kpop_card from '../assets/photocard.png';
import './Add_Card.css';

const Add_Card = () => {
  const navigate = useNavigate();
  const [idolNames, setIdolNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [idolLookUp, setIdolLookUp] = useState([]);
  const [groupLookUp, setGroupLookUp] = useState([]);
  const [idolQuery, setIdolQuery] = useState('');
  const [groupQuery, setGroupQuery] = useState('');
  const SHEET_ID = "1mtv8zZ6zQDMW-tgOdoeAb9zVpDl2W4ck_utueOpTH1E";
  const API_KEY = "AIzaSyDHZr7ul0XqU07rv_12n4c9celWBy8SNO0";
  const user = localStorage.getItem('user_id');
  const [userCollections, setUserCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('My Collection');

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    artist_name: '',
    group: '',
    cost: '',
    details: '',
    image: null,
    collectionName: 'My Collection',
  });

  useEffect(() => {
    const fetchIdolInfo = async () => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.values) {
          const headers = data.values[0];
          const formerGroupIndex = headers.indexOf("Former Group");
          const otherGroupIndex = headers.indexOf("Other Group");
          const names = data.values.slice(1).map((row) => row[namesIndex]);
          const groups = data.values.slice(1).flatMap((row) => [
            row[formerGroupIndex],
            row[otherGroupIndex],
          ]).filter(Boolean);
          setIdolNames(names);
          setGroupNames([...new Set(groups)]);
        }
      } catch (error) {
        console.error('Error fetching data');
      }
    };

    const fetchUserCollections = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/api/users/get-collection-names', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.collections) {
          setUserCollections(data.collections.filter((name) => name !== 'My Collection'));
        }
      } catch (err) {
        console.error('Error getting users collections:', err);
      }
    };

    fetchUserCollections();
    fetchIdolInfo();
  }, [SHEET_ID, API_KEY]);


  const handleCollectionPick = (e) => {
    const value = e.target.value || 'My Collection';
    setSelectedCollection(value);
    setFormData((prevData) => ({ ...prevData, collectionName: value }));
  };

  const handleSearchIdols = (e) => {
    const value = e.target.value;
    setIdolQuery(value);

    setFormData((prevData) => ({
      ...prevData,
      artist_name: value.trim(),
    }));
    if (value.trim()) {
      const filtered = idolNames.filter((name) => name?.toLowerCase().includes(value.toLowerCase()));
      setIdolLookUp(filtered.slice(0, 15));
    } else {
      setIdolLookUp([]);
    }
  };

  const handleGroupSearch = (e) => {
    const value = e.target.value;
    setGroupQuery(value);

    if (value.trim()) {
      const filtered = groupNames.filter((group) =>
        group?.toLowerCase().includes(value.toLowerCase())
      );
      setGroupLookUp(filtered.slice(0, 15));
    } else {
      setGroupLookUp([]);
    }
  };

  const handleLookupClick = (name) => {
    setFormData((prevData) => ({ ...prevData, artist_name: name }));
    setIdolQuery(name);
    setIdolLookUp([]);
  };

  const handleGroupClick = (group) => {
    setFormData((prevData) => ({ ...prevData, artistGroup: group }));
    setGroupQuery(group);
    setGroupLookUp([]);
  };

  const handleEnterIdols = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIdolLookUp([]);
    }
  };

  const handleEnterGroups = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setGroupLookUp([]);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'cost') {
      // check if value is valid num, does not have > 2 decimal places, and is >= 1
      const regex = /^\d*(\.\d{0,2})?$/;

      // check if value is a valid number and >= 1
      if (regex.test(value) && (parseFloat(value) >= 1 || value === '')) {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [id]: '', // clear input if value is invalid or less than 1
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleImage = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData((prevData) => ({
      ...prevData,
      artist_name: idolQuery.trim(),
    }));

    if (!idolQuery.trim() || !formData.title || !formData.details || !formData.cost || !formData.image) {
      alert('All fields are required.');
      return;
    }


    const form = new FormData();
    form.append('title', formData.title);
    form.append('type', formData.type);
    form.append('artist_name', idolQuery.trim());
    form.append('group', formData.groups);
    form.append('image', formData.image);
    form.append('cost', formData.cost);
    form.append('details', formData.details);
    form.append('collectionName', selectedCollection);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/add-photocard', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });

      const result = await response.json();
      if (result.success) {
        const photocardId = result.photocard._id;
        const addCollectionResponse = await fetch('/api/users/add-photocard-collection-name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            photocard_id: photocardId,
            collection_name: formData.collectionName?.trim() || 'My Collection',
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server Response:', errorText);
          alert('Server error, please try again later');
        }

        const collectionResult = await addCollectionResponse.json();
        if (!addCollectionResponse.ok || !collectionResult.message) {
          alert('Failed to add photocard to the collection');
        }
        alert('Photocard added successfully!');
        navigate('/Profile');

      } else {
        alert('Failed to add your photocard');
      }
    } catch (error) {
      alert('System Error');
    }
  };

  return (
    <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <main className="new-container">
        <div className="add-image">
          <img src={kpop_card} alt="add-image" />
        </div>
        <form onSubmit={handleSubmit} className="top-container">
          <div className="page-message">
            <h1>Add a PhotoCard</h1>
            <div className="label-container">
              <label className="field-label" htmlFor="collectionName">Photocard Title:</label>
              <input className="field-input" type="text" id="title" value={formData.title} onChange={handleChange} placeholder="Enter the photocard title" required />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="type">Listing Type:</label>
              <select className="field-input" id="type" value={formData.type} onChange={handleChange} required>
                <option value="" disabled selected>Select a type</option>
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
              </select>
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="artist_name">Idol Name:</label>
              <input className="field-input" type="text" id="artist_name" value={idolQuery} onChange={handleSearchIdols} placeholder="Enter an idol name" onKeyDown={handleEnterIdols} required />
              {idolLookUp.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-[410px] mt-1 max-h-40 overflow-y-auto z-10">
                  {idolLookUp.map((name, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLookupClick(name)}>
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="artistGroup">Group Name:</label>
              <input className="field-input" type="text" id="artistGroup" value={groupQuery} placeholder="Enter a group name" onChange={handleGroupSearch} onKeyDown={handleEnterGroups} />
              {groupLookUp.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-[410px] mt-1 max-h-40 overflow-y-auto z-10">
                  {groupLookUp.map((group, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleGroupClick(group)}>
                      {group}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="card_image">Photocard Photo:</label>
              <input className="field-input" type="file" id="card_image" accept="image/jpeg, image/jpg" onChange={handleImage} required />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="cost">Cost:</label>
              <input className="field-input" type="number" id="cost" value={formData.cost} onChange={handleChange} min="0" step="0.01" placeholder="Enter an amount" required />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="details">Details:</label>
              <textarea className="field-input" id="details" value={formData.details} onChange={handleChange} placeholder="Enter the details of your photocard" required rows="3"></textarea>
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="collectionName">Collection Name:</label>
              <select id="collectionName" className="field-input" value={selectedCollection} onChange={handleCollectionPick}>
                <option value="My Collection">Select a Collection (Optional)</option>
                {userCollections.map((collection, index) => (
                  <option key={index} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>
            </div>
            <button className="return-card" type="button" onClick={() => navigate('/Profile')}>Return</button>
            <button type="submit" className="submit-card">Add Photocard</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Add_Card;
