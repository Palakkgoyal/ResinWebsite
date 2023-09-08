import React from 'react'
import "./Navbar.css"

import { useState } from 'react';
import useAuthChange from "../../js/useAuthChange"
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import LoginDialogBox from '../LoginDialogBox/LoginDialogBox';

const Navbar = () => {
  const [showAuthForm, setShowAuthForm] = useState(false)
  const user = useAuthChange()
  const navigate = useNavigate()

  function handleShowForm() {
    setShowAuthForm(prev => !prev)
  }

  return (
    <div>
      <header className="nav_container">
        <h2 className="logo">Mahi Arts</h2>
        <nav>
          <ul className="nav_list_container">
            <li>
              <Link to={"/"} className="nav_links">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/gallery"} className="nav_links">
                Gallery
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="nav_links">
                About
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="nav_links">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav_icons_container">
          <AiOutlineShoppingCart className="nav_icons" />
          <FiMenu className="nav_icons menu_icon" />
          <div>
            <button 
              className="login_btn" 
              onClick={() => user? navigate("/profile") : handleShowForm()}
            >
              <FaUserCircle />
            </button>
          </div>
        </div>
      </header>
      {showAuthForm && <LoginDialogBox handleShowForm={handleShowForm} />}
    </div>
  )
}

export default Navbar
