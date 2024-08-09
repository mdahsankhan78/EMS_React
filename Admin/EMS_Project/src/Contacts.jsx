import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Widgets from './Widgets';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
const getContacts = async () => {
    try {
        const response = await axios.get('http://localhost:3500/get/contacts');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const Contacts = () => {
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

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const contactsData = await getContacts();
            setContacts(contactsData);
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
               <h6 className="mb-4">Contacts Us form submitted by Exhibitors and Attendees</h6>
             <div className="table-responsive">
             <table className="table">
                   {contacts.length > 0 ?  
                   (
       
                       <>
                           <thead>
                               <tr>
                                   {/* <th scope="col">#</th> */}
                                   <th scope="col">Name</th>
                                   <th scope="col">Email</th>
                                   <th scope="col">Subject</th>
                                   <th scope="col">Message</th>
                               </tr>
                           </thead>
                                   
                           <tbody>{
                                       contacts.map((contact, index) => (
                                           <tr key={index}>
                                               <td>{contact.name}</td>
                                               <td>{contact.email}</td>
                                               <td>{contact.subject}</td>
                                               <td>{contact.message}</td>
                                           </tr>
                                       ))
                               
                                   }
                           </tbody>
                       </>
                   ) : (
                           <p  className='text-center'>No contact available.</p>
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

export default Contacts