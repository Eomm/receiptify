const API_URL = import.meta.env.VITE_API_URL

export const getStats = async ({ display, timeframe, limit }) => {
  const query = new URLSearchParams({
    limit,
    display,
    timeframe,
  })

  const url = `${API_URL}/api/spotify/top?${query}`
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  const data = await response.json()

  if (response.status >= 400) {
    throw data
  }

  return data
}
