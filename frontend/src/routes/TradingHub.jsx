import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserTradePostCard from '../components/UserTradePostCard';
import Sidebar from '../components/Sidebar';

const TradingHub = () => {
  const [photocards, setPhotocards] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    group: '',
    priceRange: { min: '', max: '' },
    searchQuery: '',
  });

  const fetchPhotocards = async () => {
    try {
      const query = new URLSearchParams();

      if (filters.type) query.append('type', filters.type);
      if (filters.group) query.append('group', filters.group);
      if (filters.priceRange.min) query.append('price_from', filters.priceRange.min);
      if (filters.priceRange.max) query.append('price_to', filters.priceRange.max);
      if (filters.searchQuery) query.append('searchQuery', filters.searchQuery);

      const response = await fetch(`/api/users/search-photocards?${query.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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

  useEffect(() => {
    fetchPhotocards();
  }, [filters]);

  return (
    <div>
      <Navbar />
      <div className="TradingHub mt-28 flex flex-col flex-grow justify-between min-h-screen">
        <div className="flex px-16 pb-6">

          <Sidebar onFilterChange={setFilters} />
          
          <div className="TradingHub-Content flex-grow pl-8">
            <div
              className="gap-4 grid grid-flow-row auto-rows-max"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
            >
              {photocards.map((photocard) => (
                <UserTradePostCard
                  key={photocard._id}
                  id={photocard._id}
                  owner={photocard.owner_id}
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
