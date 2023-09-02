import React, { useEffect, useState } from 'react';

import { Artist } from '../components/Artist';
import { Track } from '../components/Track';

import { useGetStats } from '../hook/useGetStats';

export const StatsPage = () => {
  const [displayOption, setDisplayOption] = useState('tracks');
  const [aggregationTime, setAggregationTime] = useState('short_term');
  const [displayLimit, setDisplayLimit] = useState('9');

  const { statsData, isLoading, error, fetchStatsData } = useGetStats();

  useEffect(() => {
    fetchStatsData(displayLimit, displayOption, aggregationTime);
  }, [displayOption, aggregationTime, displayLimit, fetchStatsData]);

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

            {/* Display limit */}
            <input
              className="text-black hover:text-white bg-rose-400 px-4 py-2 rounded-md"
              type="range"
              min="1"
              max="50"
              value={displayLimit}
              onChange={(e) => setDisplayLimit(e.target.value)}
            />
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
