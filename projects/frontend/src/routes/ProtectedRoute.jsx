import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('token')
  if (!token) {
    token = new URLSearchParams(window.location.search).get('token')

    if (token) {
      localStorage.setItem('token', token)
    }
  }

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}
