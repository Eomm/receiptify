import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  // todo: use hook to get user from context
  const user = null

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}
