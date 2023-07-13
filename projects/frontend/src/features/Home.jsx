import { useEffect, useState } from 'react'
import { getHealth } from '../services/health'

const API_URL = import.meta.env.VITE_API_URL

export const Home = () => {
  const [health, setHealth] = useState()

  useEffect(() => {
   getHealth().then((response) => setHealth(response))
  }, [])

  console.log(health)
  
  const handleClick = () => {
    window.location.href = API_URL + '/login/spotify'
  }

  return (
    <div className="grid h-screen place-items-center">
      <button className="border border-blue-700 rounded p-2" onClick={handleClick}>
        Login with Spotify
      </button>
    </div>
  )
}
