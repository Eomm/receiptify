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
        <div className="grid grid-cols-3 gap-4">
        {statsData.map((item, index) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4 relative">
            <img
              src={item.images[0].url}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />
             <div className="absolute top-0 left-0 bg-teal-700 text-white font-semibold rounded-full p-2 m-2 border-2 border-rose-500">
              {index + 1}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">Popularity: {item.popularity}</p>
              <div className="flex flex-wrap mt-2">
                {item.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-teal-200 text-gray-800 rounded-full mr-2 mb-2 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <a
                href={item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 hover:underline hover:text-rose-400"
              >
                Spotify Profile
              </a>
            </div>
          </div>
        ))}
      </div>
        </ul>
      </div>
    </>
  );
};
