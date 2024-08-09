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
const getExhibitors = async () => {
    try {
        const response = await axios.get('http://localhost:3500/registerred/exhibitors');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const Exhibitors = () => {
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

    const [exhibitors, setExhibitors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const exhibitorData = await getExhibitors();
            setExhibitors(exhibitorData);
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
               <h6 className="mb-4">Exhibitors</h6>
             <div className="table-responsive">
             <table className="table">
                   {exhibitors.length > 0 ?  
                   (
       
                       <>
                           <thead>
                               <tr>
                                   {/* <th scope="col">#</th> */}
                                   <th scope="col">ID</th>
                                   <th scope="col">Company Name</th>
                                   <th scope="col">Address</th>
                                   <th scope="col">Web Address</th>
                                   <th scope="col">Company Number</th>
                                   <th scope="col">NTN Number</th>
                                   <th scope="col">City</th>
                                   <th scope="col">Nature</th>
                                   <th scope="col">Logo</th>
                                   <th scope="col">Name</th>
                                   <th scope="col">User Email</th>
                                   <th scope="col">User Number</th>
                                   <th scope="col">Designation</th>
                                   <th scope="col">CEO Name</th>
                                   <th scope="col">CEO Email</th>
                                   <th scope="col">CEO Number</th>
                                   <th scope="col">Products</th>
                               </tr>
                           </thead>
                                   
                           <tbody>{
                                       exhibitors.map((exhibitor, index) => (
                                           <tr key={index}>
                                               <th scope="row">{exhibitor._id}</th>
                                               <td>{exhibitor.compname}</td>
                                               <td>{exhibitor.address}</td>
                                               <td>{exhibitor.webaddress}</td>
                                               <td>{exhibitor.compnumber}</td>
                                               <td>{exhibitor.ntn}</td>
                                               <td>{exhibitor.city}</td>
                                               <td>{exhibitor.nature}</td>
                                               <td><img
                                                src={`http://localhost:3500/${exhibitor.logo}`}
                                                className="img-fluid"
                                                alt={exhibitor.compname}
                                            /></td>
                                               <td>{exhibitor.name}</td>
                                               <td>{exhibitor.useremail}</td>
                                               <td>{exhibitor.usernumber}</td>
                                               <td>{exhibitor.designation}</td>
                                               <td>{exhibitor.ceoname}</td>
                                               <td>{exhibitor.ceoemail}</td>
                                               <td>{exhibitor.ceonumber}</td>
                                               <td>{exhibitor.products}</td>
                                           </tr>
                                       ))
                               
                                   }
                           </tbody>
                       </>
                   ) : (
                           <p  className='text-center'>No Exhibitor available.</p>
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

export default Exhibitors