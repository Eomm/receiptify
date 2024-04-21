import React, { useEffect } from 'react';

import { DisplayList } from '../components/DisplayList';

import { FilterForm } from '../components/FilterForm';

export const SpotifyPage = ({ showControls, statsFetcher }) => {

  const { statsData, isLoading, error, fetchStatsData } = statsFetcher();

  // Fetch data on page load if controls are hidden (i.e. on the share page)
  useEffect(() => {
    if (!showControls) {
      const currentUrl = new URL(window.location.href)
      const shareId = currentUrl.pathname.split('/', 3).pop();
      fetchStatsData(shareId);
    }
  }, []);

  return (
    <>
      {showControls && <header className="bg-teal-200 py-4 sticky top-0 z-1">
        <FilterForm onInputChange={fetchStatsData} />
      </header>}

      {/* Display the fetched data in a list */}
      <div className="container mx-auto mt-8">
        {isLoading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : <DisplayList data={statsData} />}
      </div>
    </>
  );
};
