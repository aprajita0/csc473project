import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import landing_image from '../assets/landing_page.png'

import './LandingPage.css'; 

const LandingPage = () => {
  return (
    <div className='LandingPage mt-28 flex flex-col flex-grow justify-between min-h-screen'>
      <Navbar />
      <main className="container">
        <section className="top-container">
          <div className="landing-slogan">
            <h1>Trade, Organize, and Meet Enthusiastic Collectors!</h1>
            <p>MyIdolList provides a platform for enthusiasts of photocard trading to trade and organize their photocards.</p>
            <div className="landing-buttons">
              <button className="get-started">Get Started</button>
              <button className="learn-more">Learn More</button>
            </div>
          </div>
          <div className="landing-image">
            <img src={landing_image} alt="landing-image" className="landing-image" />
          </div>
        </section>

        <section className="our-features">
          <div className="feature">
            <h3>Trade</h3>
            <p>Connect with a passionate community of collectors by trading and managing your photocards.</p>
          </div>
          <div className="feature">
            <h3>Organize Photocards</h3>
            <p>Create a catalog of photocards owned, organize, and label your cards with ease.</p>
          </div>
          <div className="feature">
            <h3>Meet other Collectors</h3>
            <p>Join a vibrant collector community. Share stories, trade experiences, and build lasting connections.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
