const API_URL = import.meta.env.VITE_API_URL

export const createLink = async ({ display, timeframe, limit }) => {
  const url = `${API_URL}/api/spotify/share`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      limit,
      display,
      timeframe,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  const data = await response.json()

  if (response.status >= 400) {
    throw data
  }

  return `${API_URL}/share/${data.shareId}`
}
