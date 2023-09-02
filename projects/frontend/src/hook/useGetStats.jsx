import { useCallback, useState } from "react";
import { getStats } from "../services/getStats";

export const useGetStats = () => {
  const [statsData, setStatsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStatsData = useCallback((displayLimit, displayOption, aggregationTime) => {
    setIsLoading(true);
    setError(null);

    getStats({
      limit: displayLimit,
      display: displayOption,
      timeframe: aggregationTime,
    })
      .then((data) => {
        setStatsData(data.items);
      })
      .catch((error) => {
        setError(`Error fetching data [${error.message}]. Please try again later.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { statsData, isLoading, error, fetchStatsData }
}