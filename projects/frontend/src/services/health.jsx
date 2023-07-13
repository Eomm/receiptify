const API_URL = import.meta.env.VITE_API_URL

export const getHealth = async () => {
  const response = await fetch(API_URL + '/health')
  const data = await response.json()
  return data
}
