import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const storedToken = localStorage.getItem('token')
  const inputToken = new URLSearchParams(window.location.search).get('token')

  if (!storedToken && !inputToken) {
    // not allowed
    return <Navigate to="/" replace />
  }

  if (inputToken) {
    // insert/update token
    localStorage.setItem('token', inputToken || storedToken)
    localStorage.setItem('tokenTime', new Date().getTime())
  }

  return children
}
