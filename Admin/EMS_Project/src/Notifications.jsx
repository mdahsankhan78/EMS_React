import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import Widgets from './Widgets'
import axios from 'axios'
import { useEffect, useState } from 'react'
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


const getNotes = async () => {
    try {
        const response = await axios.get('http://localhost:3500/list/notes');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const getExhibitors = async () => {
    try {
        const response = await axios.get('http://localhost:3500/registerred/exhibitors');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

const formatDate = (isoString) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
  
    const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
    const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
  
    return `${date} ${time}`;
  };


  
const Notifications = () => {
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


   

    const [request, setRequest] = useState({});
    const [request2, setRequest2] = useState({});

    useEffect(() => {
        const fetchNotes = async () => {
            const notesData = await getNotes();
            const exhData = await getExhibitors();
            setRequest(notesData);
            setRequest2(exhData);
        };

        fetchNotes();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:3500/approve/${id}`);
            setRequest(request.map(note => note._id === id ? { ...note, status: 'Approved' } : note));
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:3500/reject/${id}`);
            setRequest(request.map(note => note._id === id ? { ...note, status: 'Rejected' } : note));
        } catch (error) {
            console.error(error);
        }
    }

    
   

  return (
    <>
     <Sidebar/>
   <div className="content">
       
       <Navbar/>


{/* main content here */}
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

<div className="container-fluid pt-4 px-4">
           
                    <div className="rounded h-100 p-4">
                        <h6 className="mb-4">Application Requests</h6>
                        <div className="table-responsive">
                        <table className="table">
                            
                          

                            {request.length > 0 ? (
                
                                <>
                                            <thead>
                                                <tr>
                                                    {/* <th scope="col">#</th> */}
                                                    <th scope="col">Event Title</th>
                                                    <th scope="col">Exhibitor ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Booth Number</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Request Time</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>{
                                    request.filter(note => note.status === 'Pending').map((note, index) => (
                
                                       
                                            
                                            
                                        <tr key={index}>
                                            <th scope="row">{note.eventTitle}</th>
                                            <td>{note.userId}</td>
                                            <td>{note.userName}</td>
                                            <td>{note.boothNumber}</td>
                                            <td>{note.status}</td>
                                            <td>{formatDate(note.requestDate)}</td>
                                            <td><Link onClick={() => handleApprove(note._id)}>Approve</Link><br /><Link onClick={() => handleReject(note._id)}>Reject</Link></td>
                                            {/* <td></td> */}
                                        </tr>
                                           
                                    
                                    ))
                                    }
                                    </tbody>  
                                </>
                                    ) : (
                                        <p  className='text-center'>No notes available.</p>
                                    )}
                
                
                
                <br />
                <h6 className="mb-4">Exhibitor Registrations</h6>
                            {request2.length > 0 ? (
                
                                <>
                                            <thead>
                                                <tr>
                                                    {/* <th scope="col">#</th> */}
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Number</th>
                                                    <th scope="col">Company Name</th>
                                                    {/* <th scope="col">Registration Time</th> */}
                                                    {/* <th scope="col" colSpan={2}>Action</th> */}
                                                </tr>
                                            </thead>
                                            
                                <tbody>{
                                            request2.map((note, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{note._id}</th>
                                                            <td>{note.name}</td>
                                                            <td>{note.useremail}</td>
                                                            <td>{note.usernumber}</td>
                                                            <td>{note.compname}</td>
                                                            {/* <td>{formatDate(note.date)}</td> */}
                                                           
                                                        </tr>
                                                ))
                                       
                                        }
                                </tbody>
                                </>
                                    ) : (
                                        <p  className='text-center'>No notes available.</p>
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

export default Notifications
