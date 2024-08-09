import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'; // Import useNavigate
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Widgets from './Widgets';
import Footer from './Footer';import { useNavigate } from 'react-router-dom'; // Import useNavigate
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

const getExpos = async () => {
    try {
        const response = await axios.get('http://localhost:3500/get/expo');
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}


  

const Expos = () => {

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

    const [expo, setExpo] = useState([])


    const fetchExpo = async () => {
        const expoData = await getExpos();
        setExpo(expoData);
        
    };

    useEffect(() => {
        fetchExpo();
    }, []);
    //   console.log(expo);

    const handleDelete = (id) => {
        // id.preventDefault()

        axios.delete(`http://localhost:3500/delete/expo/${id}`)
        .then(x => {
            console.log(x);
            fetchExpo();
        })
        .catch(err => console.log(err)
        )
    }
      

      const formatDate = (isoString) => {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
      
        const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
        const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
      
        return `${date} ${time}`;
      };
      
  return (
    <>
     <Sidebar/>
   <div className="content">
       
       <Navbar/>


{/* main content here */}
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

<div className="container-fluid pt-4 px-4">
           
    <div className="rounded h-100 p-4">
        <h6 className="mb-4">Expo Events</h6>
      <div className="table-responsive">
      <table className="table text-center table-bordered">
            {expo.length > 0 ?  
            (

                <>
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Location</th>
                            <th scope="col">Description</th>
                            <th scope="col">Theme</th>
                            <th scope="col">Date</th>
                            <th scope="col">Booths</th>
                            <th scope="col">Sessions</th>
                            <th scope="col">Attendees</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                            
                    <tbody>{
                                expo.map((expo, index) => (
                                    <tr key={index}>
                                        <th scope="row">{expo._id}</th>
                                        <td>{expo.title}</td>
                                        <td>{expo.location}</td>
                                        <td>{expo.description}</td>
                                        <td>{expo.theme}</td>
                                        <td>{formatDate(expo.date)}</td>
                                        <td>
                                        {expo.boothSpaces.map((booth, index)=>(
                                          <>
                                          <p key={index}>{booth.boothNumber}</p>
                                          <p key={index}>{booth.size}</p>
                                          <p key={index}>{booth.location}</p>
                                          <p key={index}>{booth.availabilityStatus}</p>
                                          <p key={index}>{booth.allocatedExhibitor}</p>
                                          <hr />
                                          </>
                                        ))
                                          
                                          }
                                        </td>
                                        <td>
                                        {expo.sessions.map((session, index)=>(
                                          <>
                                          <p key={index}>{session.sessiontitle}</p>
                                          <p key={index}>{session.sessiontime}</p>
                                          <p key={index}>{session.sessionlocation}</p>
                                          <p key={index}>{session.sessiondescription}</p>
                                          <p key={index}>{session.allocatedExhibitor}</p>
                                          {session.speakers.map((speaker,index)=>(
                                          <p key={index}>{speaker}</p>

                                          ))}
                                          {session.topics.map((topic,index)=>(
                                          <p key={index}>{topic}</p>

                                          ))}
                                          <hr />
                                          </>
                                        ))
                                          
                                          }
                                          
                                        </td>
                                        <td>
                                        {expo.attendees.map((attendee, index)=>(
                                          <>
                                          <p key={index}>{attendee.userId}</p>
                                          <p key={index}>{attendee.compname}</p>
                                          <hr />
                                          </>
                                        ))
                                          
                                          }
                                        </td>
                                        <td><Link to={`/update/expo/${expo._id}`}>Edit</Link><br /><Link onClick={()=>handleDelete(expo._id)}>Delete</Link></td>
                                    </tr>
                                ))
                        
                            }
                    </tbody>
                </>
            ) : (
                    <p  className='text-center'>No Expo available.</p>
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

export default Expos