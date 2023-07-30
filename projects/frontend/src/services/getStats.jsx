const API_URL = import.meta.env.VITE_API_URL

export const getStats = async (display, timing) => {
  const response = await fetch(`${API_URL}/api/spotify/top?display=${display}&timeframe=${timing}`)
  const data = await response.json()
  return data
}
