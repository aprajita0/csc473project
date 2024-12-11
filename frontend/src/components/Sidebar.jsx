import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [buyingOrSelling, setBuyingOrSelling] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [group, setGroup] = useState('');
  const [gender, setGender] = useState({ Male: false, Female: false });
  const [country, setCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const groupData = await Promise.resolve(['BTS', 'NewJeans', 'BlackPink', 'Stray Kids']);
      const countryData = await Promise.resolve([
        'South Korea', 'Japan', 'China', 'Thailand', 'Vietnam',
        'Philippines', 'Australia', 'United States', 'United Kingdom',
      ]);

      setGroups(groupData);
      setCountries(countryData);
    };

    fetchFilters();
  }, []);

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

      {/* buy or sell filter */}
      <div className="mb-4 flex items-center">
        <div className="font-bold pr-2">BUY or SELL:</div>
        <div className="flex gap-4">
          <button
            className={`rounded-full p-2 px-4 ${buyingOrSelling === 'Buying' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setBuyingOrSelling('Buying')}
          >
            Buying
          </button>
          <button
            className={`rounded-full p-2 px-4 ${buyingOrSelling === 'Selling' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setBuyingOrSelling('Selling')}
          >
            Selling
          </button>
        </div>
      </div>

      <div className='flex'>
        {/* group filter */}
        <div className="mb-4 w-1/2 pr-4">
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
          {group && <div className="mt-2">Selected Group: {group}</div>}
        </div>

        {/* gender filter */}
        <div className="mb-4 w-1/2">
          <div className="font-bold mb-2">Gender</div>
          <div className="flex flex-col gap-2">
            {['Male', 'Female'].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={gender[g]}
                  onChange={() => setGender({ ...gender, [g]: !gender[g] })}
                />
                {g}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* artist's country filter */}
      <div className="mb-4">
        <div className="font-bold mb-2">Artist Country</div>
        <select
          className="border rounded-md p-2 w-full"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((countryName) => (
            <option key={countryName} value={countryName}>
              {countryName}
            </option>
          ))}
        </select>
        {country && <div className="mt-2">Selected Country: {country}</div>}
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
