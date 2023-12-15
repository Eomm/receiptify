const API_URL = import.meta.env.VITE_API_URL

export const readStats = async (shareId) => {
  const response = await fetch(`${API_URL}/api/spotify/share/${shareId}`)

  const data = await response.json()

  if (response.status >= 400) {
    throw data
  }

  return data
}
