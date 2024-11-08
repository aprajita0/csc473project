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
                <label className="field-label" htmlFor="title">Idol Name:</label>
                <input className="field-input" type="text" id="card_name" placeholder="Enter the title of your idol" required/>
              </div>
              <div className="label-container">
                <label className="field-label" htmlFor="card_image">Photocard Photo:</label>
                <input className="field-input" type="file"id="card_image"accept="image/jpeg, image/jpg" required/>
            </div>
              <div className="label-container">
                <label className="field-label" htmlFor="artist">Group (If available):</label>
                <input className="field-input" type="text" id="artistGroup" placeholder="Enter the name of the group your artist belongs to"/>
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
                <label className="field-label" htmlFor="collection">Collection Name:</label>
                <input className="field-input" type="text" id="collectionName" placeholder="Enter the collection name"/>
              </div>
              <div className="label-container">
                <label className="field-label" htmlFor="date">Year Released:</label>
                <input   className="field-input" type="number"id="year_released"placeholder="Enter the year released" min="1900"step="1"/>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
};

export default Add_Card;


