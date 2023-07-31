const API_URL = import.meta.env.VITE_API_URL

export const getStats = async (display, timing) => {
  const query = new URLSearchParams({
    display,
    timeframe: timing,
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
