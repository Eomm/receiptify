import React, { useEffect, useState } from 'react';

import { Artist } from '../components/Artist';
import { Track } from '../components/Track';

import { getStats } from '../services/getStats'

export const StatsPage = () => {
  const [displayOption, setDisplayOption] = useState('tracks');
  const [aggregationTime, setAggregationTime] = useState('short_term');
  const [statsData, setStatsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatsData();
  }, [displayOption, aggregationTime]);

  const fetchStatsData = () => {
    setIsLoading(true);
    setError(null);

    getStats(displayOption, aggregationTime)
      .then((data) => {
        setStatsData(data.items);
      })
      .catch((error) => {
        setError(`Error fetching data [${error.message}]. Please try again later.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <div className="container mx-auto mt-8">
        {isLoading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : <ul>
          <div className="grid grid-cols-3 gap-4">
                {
                  statsData.map((item, index) => {
                    switch (item.type) {
                      case 'track':
                        return <Track key={index} track={item} rank={index} />;
                      case 'artist':
                        return <Artist key={index} artist={item} rank={index} />;
                    }
                  })
                }
          </div>
        </ul>}
      </div>
    </>
  );
};
