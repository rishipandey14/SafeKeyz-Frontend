import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar bg-base-300 shadow-sm px-4">

      <div className="flex justify-between items-center w-full">
        
        <Link to="/" className="text-2xl font-bold text-primary hover:text-secondary transition">
          SafeKeyz
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/about" className="hover:text-secondary transition">About Us</Link>
          <Link to="/contact" className="hover:text-secondary transition">Contact Us</Link>
          <Link to="/docs" className="hover:text-secondary transition">Docs</Link>
          <a href="https://github.com/" className="hover:text-secondary transition">GitHub</a>
        </div>

        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition"
          >
            <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img
                alt="User Avatar"
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
