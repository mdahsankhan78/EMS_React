import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('Attendeetoken');
  console.log(token);

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from localStorage
      localStorage.removeItem('Attendeetoken');
      return false;
    }

    return true;
  } catch (error) {
    // In case of an error (e.g., invalid token), remove it from localStorage
    localStorage.removeItem('Attendeetoken');
    return false;
  }

  
};

const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get('http://localhost:3500/get/attendee', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;// Adjust based on your API response
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const Header = () => {
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        if (isLoggedIn) {
          const token = localStorage.getItem('Attendeetoken');
          fetchUserDetails(token).then(userData => {
            if (userData) {
              setUser(userData);
            }
          });
        };
    }, []);

    const logout=()=>{
      localStorage.removeItem('Attendeetoken');
      setTimeout(() => {
        navigate('/login'); // Navigate to the homepage after a short delay
    }, 1000);
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

      // Inline styles
  const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: 'rgba(6, 12, 34, 0.98)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    listStyle: 'none',
    padding: '5',
    margin: '0',
    // border : '2px solid #f8234a',
    borderRadius : '25px'
  };

  const dropdownMenuItemStyle = {
    padding: '8px 16px',
    textAlign : 'center'

  };

  const dropdownMenuLinkStyle = {
    textDecoration: 'none',
    color: '#333',
  };


  return (
    <>
    
 
  <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
       {/* <h1><a href="#main">C<span>o</span>nf</a></h1> */}
        <Link to="/" class="scrollto"><img src="/src/assets/img/logo.png" alt="" title=""/></Link>
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active"><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#speakers">Events</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#venue">Venue</a></li>
          <li><a href="#hotels">Exhibitors</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
          <li class="buy-tickets">
          {isLoggedIn ? (
                <Link onClick={toggleDropdown}>{user ? user.name : 'Profile'}</Link>
              ) : (
                <Link to="/registeras">Register</Link>
              )}
               {dropdownOpen && (
                <ul style={dropdownMenuStyle}>
                  <li style={dropdownMenuItemStyle}>
                    <Link to="/profile" >Profile</Link>
                  </li>
                  <li style={dropdownMenuItemStyle}>
                    <Link to="/bookmarked/sessions">Bookmarks</Link>
                  </li>
                  <li style={dropdownMenuItemStyle}>
                    <Link onClick={logout}>Logout</Link>
                  </li>
                </ul>
              )}
          </li>
        </ul>
      </nav>
    </div>
  </header>
    </>
  
  )
}

export default Header