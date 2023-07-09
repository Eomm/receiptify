import { Route, Routes } from 'react-router-dom'
import { Home } from './features/Home'
import './index.css'
import { ProtectedRoute } from './routes/ProtectedRoute'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login/spotify/callback"
          element={
            <ProtectedRoute>
              <div>Login OK</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}
