import React from 'react';

import { Artist } from '../components/Artist';
import { Track } from '../components/Track';

import { FilterForm } from '../components/FilterForm';

import { useGetStats } from '../hook/useGetStats';

export const StatsPage = () => {

  const { statsData, isLoading, error, fetchStatsData } = useGetStats();

  return (
    <>
      <header className="bg-teal-200 py-4 sticky top-0 z-1">
        <FilterForm onInputChange={fetchStatsData} />
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
