import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kpop_card from '../assets/photocard.png';
import './Add_Card.css';

const Add_Card = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
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
              <input className="field-input" type="text" id="artist_name" value={formData.artist_name} onChange={handleChange} placeholder="Enter the title of your idol" required />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="card_image">Photocard Photo:</label>
              <input className="field-input" type="file" id="card_image" accept="image/jpeg, image/jpg" onChange={handleFileChange} required />
            </div>
            <div className="label-container">
              <label className="field-label" htmlFor="artistGroup">Group (If available):</label>
              <input className="field-input" type="text" id="artistGroup" value={formData.artistGroup} onChange={handleChange} placeholder="Enter the name of the group your artist belongs to" />
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

