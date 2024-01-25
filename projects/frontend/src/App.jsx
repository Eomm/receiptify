import { Route, Routes } from 'react-router-dom'

import './app.css'

import { Home } from './features/Home'
import { Menu } from './components/Menu'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PageNotFound } from './routes/PageNotFound'
import { SpotifyPage } from './routes/SpotifyPage'

import { useGetStats } from './hook/useGetStats';
import { useSharedStats } from './hook/useSharedStats';


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
              <SpotifyPage
                showControls={true}
                statsFetcher={useGetStats}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/share/*" element={
          <SpotifyPage
            showControls={false}
            statsFetcher={useSharedStats}
          />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
