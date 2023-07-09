import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Link className="border border-blue-700 rounded p-2" to="/">Login with Spotify</Link>
    </div>
  )
}
