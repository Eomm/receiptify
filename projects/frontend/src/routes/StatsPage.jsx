import React, { useEffect, useState } from 'react';

import { getStats } from '../services/getStats'

export const StatsPage = () => {
  const [displayOption, setDisplayOption] = useState('tracks');
  const [aggregationTime, setAggregationTime] = useState('short_term');
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    fetchStatsData();
  }, [displayOption, aggregationTime]);

  const fetchStatsData = () => {
    getStats(displayOption, aggregationTime)
      .then((data) => setStatsData(data.items))
      .catch((error) => console.error('Error fetching data:', error)); // todo
  };

  return (
    <>
      <header className="bg-teal-200 py-4 sticky top-0">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="text-black text-2xl">Print recipe:</h1>
          <div className="flex space-x-4 text-white">
            {/* Display Option Input */}
            <select
              className="text-black hover:text-white bg-rose-400 px-4 py-2 rounded-md"
              value={displayOption}
              onChange={(e) => setDisplayOption(e.target.value)}
            >
              <option value="tracks">Top Tracks</option>
              <option value="artists">Top Artists</option>
              <option value="genres">Top Genres</option>
            </select>

            {/* Aggregation Time Input */}
            <select
              className="text-black hover:text-white bg-rose-400 px-4 py-2 rounded-md"
              value={aggregationTime}
              onChange={(e) => setAggregationTime(e.target.value)}
            >
              <option value="short_term">Last Month</option>
              <option value="medium_term">Last 6 Months</option>
              <option value="long_term">All Time</option>
            </select>
          </div>
        </nav>
      </header>

      {/* Display the fetched data in a list */}
      <div className="container mx-auto mt-16">
        <ul>
          {statsData.map((item, index) => (
            <li key={index} className="bg-gray-100 p-4 mb-2 rounded-md">
              <span className="font-bold">{index+1}</span>
              <span className="ml-4">{item.name}</span>
              <span className="ml-4">{item.popularity}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
