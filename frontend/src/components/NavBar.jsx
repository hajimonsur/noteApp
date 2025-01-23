import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src="lex-logo.png" alt="Lex NoteApp" className="h-16 w-auto" />

        {/* Hamburger Icon */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-x-12`}
        >
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/notes"
              className="text-white hover:text-gray-200 transition-colors duration-300"
            >
              Notes
            </Link>
          </li>

          {/* Conditional Rendering */}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
