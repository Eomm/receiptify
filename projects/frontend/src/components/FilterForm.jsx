import React, { useEffect, useState } from 'react';

import { createLink } from "../services/createLink";
import { ShareLink } from './ShareLink';

export const FilterForm = ({
  onInputChange
}) => {
  const [displayOption, setDisplayOption] = useState('tracks');
  const [aggregationTime, setAggregationTime] = useState('short_term');
  const [displayLimit, setDisplayLimit] = useState('9');

  useEffect(() => {
    onInputChange(displayLimit, displayOption, aggregationTime);
  }, [displayOption, aggregationTime, displayLimit, onInputChange]);

  return (
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
      <ShareLink onShare={async () => {
        const link = await createLink({
          display: displayOption,
          timeframe: aggregationTime,
          limit: displayLimit,
        })

        navigator.clipboard.writeText(link);
      }} />
    </nav>
  );
};
