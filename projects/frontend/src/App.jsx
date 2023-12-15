import { Route, Routes } from 'react-router-dom'

import './app.css'

import { Home } from './features/Home'
import { Menu } from './components/Menu'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PageNotFound } from './routes/PageNotFound'
import { StatsPage } from './routes/StatsPage'


export const App = () => {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login/success"
          element={
            <ProtectedRoute>
              <StatsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
