import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import NotesList from './NotesList';
import { Link } from 'react-router-dom'; // Import useNavigate
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';



const isUserLoggedIn = () => {
    const token = localStorage.getItem('Admintoken');
    // console.log(token);
  
    if (!token) {
      return false;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
  
      if (decodedToken.exp < currentTime) {
        // Token has expired, remove it from localStorage
        localStorage.removeItem('Admintoken');
        return false;
      }
  
      return true;
    } catch (error) {
      // In case of an error (e.g., invalid token), remove it from localStorage
      localStorage.removeItem('Admintoken');
      return false;
    }
  };

  

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:3500/getadmin', {
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

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

      useEffect(() => {
          setIsLoggedIn(isUserLoggedIn())
          if (isLoggedIn) {
            const token = localStorage.getItem('Admintoken');
            fetchUserDetails(token).then(userData => {
              if (userData) {
                setUser(userData);
              }
            });
          };
      }, []);
   
      const logout = () => {
        localStorage.removeItem('Admintoken');
        setTimeout(() => {
          navigate('/login'); 
      }, 1000); 
    
      }

  return (
    <>
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

       {/* Navbar Start */}
       <nav className="navbar navbar-expand navbar-dark sticky-top px-4 py-0">
            <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
            </a>
            <a href="#" className="sidebar-toggler flex-shrink-0">
                <i className="fa fa-bars"></i>
            </a>
           
            <div className="navbar-nav align-items-center ms-auto">
                
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <i className="fa fa-bell me-lg-2"></i>
                        <span className="d-none d-lg-inline-flex">Notification</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0">
                       
                       <NotesList/>
                        <hr className="dropdown-divider" />
                        <Link to="/notifications" className="dropdown-item text-center">See all notifications</Link>
                    </div>
                </div>
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img className="rounded-circle me-lg-2" src="./src/assets/img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} />

                        {isLoggedIn ? (
                       <span className="d-none d-lg-inline-flex">{user ? user.name : 'Profile'}</span>
                    ) : (
                        <span className="d-none d-lg-inline-flex">Register</span>
                    )}
                    </a>
                    <div className="dropdown-menu dropdown-menu-end border-0 rounded-0 rounded-bottom m-0">
                        <a onClick={logout} className="dropdown-item">Log Out</a>
                    </div>
                </div>
            </div>
        </nav>
        {/* Navbar End*/}
    </>
  )
}
export default Navbar