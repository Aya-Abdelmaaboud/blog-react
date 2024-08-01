import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../icons";

export default function Navbar({ isLoggedIn, handleIsLoggedIn }) {
  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      handleIsLoggedIn(false);
    });
  };
  return (
    <div className="navbar bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown text-black">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">
                <FontAwesomeIcon icon="home" />
                Home
              </Link>
            </li>
            <li>
            {isLoggedIn && (
              <Link to="/post/new">
                <FontAwesomeIcon icon="plus" />
                Add Post
              </Link>
            )}
          </li>            
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Blog System</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">
              <FontAwesomeIcon icon="home" />
              Home
            </Link>
          </li>
          <li>
            {isLoggedIn && (
              <Link to="/post/new">
                <FontAwesomeIcon icon="plus" />
                Add Post
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul>
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="btn bg-black text-white"
              >
                Logout
              </button>
            ) : (
              <button className="btn bg-black text-white">
                <Link to="/login">Login</Link>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
