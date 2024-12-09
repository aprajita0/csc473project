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

  const [formData, setFormData] = useState({
    artist_name: '',
    title: '',
    details: '',
    cost: '',
    artistGroup: '',
    collectionName: '',
    year_released: '',
    image: null,
  });

  useEffect(() => {
    const fetchIdolInfo = async () => {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.values) {
          const headers = data.values[0]; 
          const nameIndex = headers.indexOf("Full Name"); 
          const formerGroupIndex = headers.indexOf("Former Group"); 
          const otherGroupIndex = headers.indexOf("Other Group");
          const names = data.values.slice(1).map((row) => row[nameIndex]);
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

    fetchIdolInfo();
  }, [SHEET_ID, API_KEY]);

  const handleSearchIdols = (e) => {
    const value = e.target.value;
    setIdolQuery(value);

    if (value.trim()) {
      const filtered = idolNames.filter((name) =>
        name?.toLowerCase().includes(value.toLowerCase())
      );
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
    setFormData((prevData) => ({ ...prevData, artistGroup: group}));
    setGroupQuery(group);
    setGroupLookUp([]);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImage = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
      form.append('artist_name', formData.artist_name);
      form.append('title', formData.title);
      form.append('details', formData.details);
      form.append('cost', formData.cost);
      form.append('artistGroup', formData.artistGroup);
      form.append('collectionName', formData.collectionName);
      form.append('year_released', formData.year_released);
      form.append('image', formData.image);

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
        navigate('/Profile');
        alert('Photocard added!');
      } else {
        alert('Failed to add your photocard');
      }
    } catch (error) {
      console.error('Error:', error);
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
              <label className="field-label" htmlFor="artist_name">Idol Name:</label>
              <input className="field-input" type="text" id="artist_name"value={idolQuery} onChange={handleSearchIdols} placeholder="Search idol name"required/>
              {idolLookUp.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-[410px] mt-1 max-h-40 overflow-y-auto z-10">
                  {idolLookUp.map((name, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"onClick={() => handleLookupClick(name)}>
                      {name}
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
              <label className="field-label" htmlFor="artistGroup">Group Lookup:</label>
              <input className="field-input" type="text" id="artistGroup" value={groupQuery}  placeholder="Search for a group name" onChange={handleGroupSearch}/>
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
              <label className="field-label" htmlFor="cost">Cost:</label>
              <input className="field-input" type="number" id="cost" value={formData.cost} onChange={handleChange} min="0" step="0.01" placeholder="Enter an amount" required />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="details">Details:</label>
              <textarea className="field-input" id="details" value={formData.details} onChange={handleChange} placeholder="Enter the details of your photocard" required rows="3"></textarea>
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="collectionName">Collection Name:</label>
              <input className="field-input" type="text" id="collectionName" value={formData.collectionName} onChange={handleChange} placeholder="Enter the collection name" />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="year_released">Year Released:</label>
              <input className="field-input" type="number" id="year_released" value={formData.year_released} onChange={handleChange} placeholder="Enter the year released" min="1900" step="1" />
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

