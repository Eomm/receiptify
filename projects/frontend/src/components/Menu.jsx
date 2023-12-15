import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../services/logout'

export const Menu = () => {
  const navigate = useNavigate()

  const logoutUser = () => {
    logout().then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenTime')
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  return <header className="bg-teal-700 py-4">
    <nav className="container mx-auto flex items-center justify-between">
      <h1 className="text-white font-bold text-2xl">
        <a href="/">Receiptify</a>
      </h1>
      <ul className="flex space-x-4 text-white">
        <li><a href="#" className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md">Home</a></li>
        <li><a href="#" className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md">How It Works</a></li>
        <li><a href="#" className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md">Privacy Policy</a></li>
        <li><Link className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md" onClick={logoutUser}>Logout</Link>
        </li>
      </ul>
    </nav>
  </header>
}