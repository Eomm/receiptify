const API_URL = import.meta.env.VITE_API_URL

export const logout = async () => {

  const url = `${API_URL}/logout`
  const response = await fetch(url, {
    method: 'POST',
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