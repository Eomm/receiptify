import { useCallback, useState } from "react";
import { readStats } from "../services/readStats";

export const useSharedStats = () => {
  const [statsData, setStatsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStatsData = useCallback((shareId) => {
    setIsLoading(true);
    setError(null);

    readStats(shareId)
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