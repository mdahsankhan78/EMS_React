import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; // Import useNavigate
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Widgets from './Widgets';
import Footer from './Footer';
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
const getAttendees = async () => {
    try {
        const response = await axios.get('http://localhost:3500/get/attendees');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const Attendees = () => {
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

    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const attendeeData = await getAttendees();
            setAttendees(attendeeData);
        };

        fetchData();
    }, []);


  return (


   <>
   
   <Sidebar/>

<div className="content">
    <Navbar/>

   
<div className="container-fluid pt-4 px-4">
           
           <div className="rounded h-100 p-4">
               <h6 className="mb-4">Attendees</h6>
             <div className="table-responsive">
             <table className="table">
                   {attendees.length > 0 ?  
                   (
       
                       <>
                           <thead>
                               <tr>
                                   {/* <th scope="col">#</th> */}
                                   <th scope="col">ID</th>
                                   <th scope="col">Name</th>
                                   <th scope="col">Company Name</th>
                                   <th scope="col">Designation</th>
                                   <th scope="col">Address</th>
                                   <th scope="col">City</th>
                                   <th scope="col">Country</th>
                                   <th scope="col">Number</th>
                                   <th scope="col">Email</th>
                                   <th scope="col">Web Address</th>
                                   <th scope="col">Nature</th>
                               </tr>
                           </thead>
                                   
                           <tbody>{
                                       attendees.map((attendee, index) => (
                                           <tr key={index}>
                                               <th scope="row">{attendee._id}</th>
                                               <td>{attendee.name}</td>
                                               <td>{attendee.compname}</td>
                                               <td>{attendee.designation}</td>
                                               <td>{attendee.address}</td>
                                               <td>{attendee.city}</td>
                                               <td>{attendee.country}</td>
                                               <td>{attendee.number}</td>
                                               <td>{attendee.email}</td>
                                               <td>{attendee.webaddress}</td>
                                               <td>{attendee.nature}</td>
                                           </tr>
                                       ))
                               
                                   }
                           </tbody>
                       </>
                   ) : (
                           <p  className='text-center'>No attendee available.</p>
                       )}
                                   {/* </tbody> */}
               </table>
             </div>
           </div>
                       
       </div>
       
       
       
       
       <Widgets/>

       <Footer/>
</div>
</>
  )
}

export default Attendees