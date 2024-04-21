import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/logout';
import { HiMenu, HiX } from 'react-icons/hi';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = () => {
    logout()
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTime');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-teal-700 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-white font-bold text-2xl">
          <a href="/">Receiptify</a>
        </h1>

        <div className="lg:hidden" onClick={toggleMenu}>
          {isOpen
            ? <HiX className="text-white text-3xl" /> //
            : <HiMenu className="text-white text-3xl" />}
        </div>

        <ul className={`lg:flex ${isOpen ? 'block' : 'hidden'} flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-white`}>
          <li><a href="#" className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md">Home</a></li>
          <li><a href="#" className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md">How It Works</a></li>
          <li><a href="#" className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md">Privacy Policy</a></li>
          <li>
            <Link className="bg-rose-400 hover:bg-rose-600 px-8 py-4 rounded-md" onClick={logoutUser}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
