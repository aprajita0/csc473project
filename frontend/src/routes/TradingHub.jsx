import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserTradePostCard from '../components/UserTradePostCard';
import Sidebar from '../components/Sidebar';

const TradingHub = () => {
  const [photocards, setPhotocards] = useState([]);

  useEffect(() => {
    const fetchPhotocards = async () => {
      try {
        const response = await fetch('/api/users/photocards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPhotocards(data.photocards);
      } catch (error) {
        console.error('Error fetching photocards:', error);
      }
    };

    fetchPhotocards();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='TradingHub mt-28 flex flex-col flex-grow justify-between min-h-screen'>
        <div className='flex px-16 pb-6'>
          <Sidebar />
          <div className='TradingHub-Content flex-grow pl-8'>
            <div className='gap-4 grid grid-flow-row auto-rows-max' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {photocards.map((photocard, index) => (
                <UserTradePostCard 
                  key={index} 
                  artist_name={photocard.artist_name} 
                  group={photocard.group} 
                  image={photocard.image} 
                  cost={photocard.cost} 
                  title={photocard.title}
                  details={photocard.details}
                  type={photocard.type}
                  posting_date={photocard.posting_date}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TradingHub;
