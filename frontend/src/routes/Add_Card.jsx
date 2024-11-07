import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import kpop_card from '../assets/photocard.png'
import './Add_Card.css'; 

const Add_Card = () => {
  const navigate = useNavigate();
  const [artistGroup, setArtistGroup] = useState(''); 
  
    return (
      <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
        <Navbar />
        <main className="new-container">
        <div className="add-image">
            <img src={kpop_card} alt="add-image" className="add-image" />
          </div>
          <section className="top-container">
            <div className="page-message">
              <h1>Add a PhotoCard</h1>
              <div className="label-container">
                <label className="field-label" htmlFor="title">Title:</label>
                <input className="field-input" type="text" id="card_name" placeholder="Enter the title of your photocard" required/>
              </div>
              <div className="label-container">
                <label className="field-label" htmlFor="artist">Artist/Group:</label>
                <select className="field-input" id="artistGroup" value={artistGroup} onChange={(e) => setItemType(e.target.value)} required>
                    <option value="">Select an Artist/Group</option>
                    <option value="selling">empty for now</option>
                </select>
              </div>
              <div className="label-container">
                <label className="field-label" htmlFor="amount">Cost:</label>
                <input className="field-input" type="number" id="listing_amount"  min="0" step="0.01" placeholder="Enter an amount" required/>
              </div>
              <div className="label-container">
                <label className="field-label" htmlFor="details">Details:</label>
                <textarea className="field-input" id="add-details" placeholder="Enter the details of your photocard" requiredrows="1"></textarea>
              </div>
              <div className="label-container">
                <label className="field-label" htmlFor="date">Date/Time of Posting:</label>
                <input className="field-input" type="datetime-local" id="listing_date" placeholder="Date Listing" required/>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
};

export default Add_Card;
