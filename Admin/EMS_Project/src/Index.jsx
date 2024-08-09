import React, { useEffect } from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Widgets from './Widgets'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Data from './Data'
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
  
const Index = () => {
    jQuery(document).ready(function( $ ) {

       

        // Sidebar Toggler
        $('.sidebar-toggler').click(function () {
          $('.sidebar, .content').toggleClass("open");
          return false;
      });

    })
    
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
          }
          else{
              navigate('/login'); 
          }
      }, []);

   
  return (
    
<>

<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

<Sidebar/>
<div className="content">
       
       <Navbar/>
{/* Sale & Revenue Start */}
<Data/>
{/* Sale & Revenue End */}




{/* Recent Sales Start */}

{/* Recent Sales End */}


<Widgets/>

<Footer/>


   </div>

</>
    
  )
}

export default Index