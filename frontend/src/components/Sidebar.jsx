import { useState, useEffect } from 'react';

const Sidebar = ({ onFilterChange }) => {
  const [buyingOrSelling, setBuyingOrSelling] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [group, setGroup] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/users/get-group-names'); 
        if (!response.ok) {
          throw new Error('Failed to fetch group names');
        }
        const data = await response.json();
        setGroups(data.groupNames);
      } catch (error) {
        console.error('Error fetching group names:', error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    onFilterChange({
      type: buyingOrSelling,
      group,
      priceRange,
      searchQuery,
    });
  }, [buyingOrSelling, group, priceRange, searchQuery, onFilterChange]);

  const handleTypeClick = (type) => {
    setBuyingOrSelling((prev) => (prev === type ? null : type));
  };

  return (
    <aside className="TradingHub-Sidebar bg-neutral-100 h-screen w-96 sticky top-28 border rounded-md p-4 drop-shadow-lg">
      
      {/* search field */}
      <input
        className="border rounded-md p-2 w-full mb-4"
        type="search"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* buy/sell filter */}
      <div className="mb-4 flex items-center">
        <div className="font-bold pr-2">BUY or SELL:</div>
        <div className="flex gap-4">
          <button
            className={`rounded-full p-2 px-4 ${
              buyingOrSelling === 'buying' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleTypeClick('buying')}
          >
            Buying
          </button>
          <button
            className={`rounded-full p-2 px-4 ${
              buyingOrSelling === 'selling' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleTypeClick('selling')}
          >
            Selling
          </button>
        </div>
      </div>

      {/* band name filter */}
      <div className="mb-4">
        <div className="font-bold mb-2">Group</div>
        <select
          className="border rounded-md p-2 w-full"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="">Select Group</option>
          {groups.map((groupName) => (
            <option key={groupName} value={groupName}>
              {groupName}
            </option>
          ))}
        </select>
      </div>

      {/* price filter */}
      <div className="mb-4">
        <div className="font-bold mb-2">Price Range</div>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="border rounded-md p-2 w-full"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
