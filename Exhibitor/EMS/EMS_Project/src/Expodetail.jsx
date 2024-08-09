import React from 'react'
import Header from './Header'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('Exhibitortoken');
  // console.log(token);

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from localStorage
      localStorage.removeItem('Exhibitortoken');
      return false;
    }

    return true;
  } catch (error) {
    // In case of an error (e.g., invalid token), remove it from localStorage
    localStorage.removeItem('Exhibitortoken');
    return false;
  }
};

const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get('http://localhost:3500/getexhibitor', {
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



const Expodetail = () => {
// get user details

  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        if (isLoggedIn) {
          const token = localStorage.getItem('Exhibitortoken');
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

// console.log(user._id);
    const [message, setMessage] = useState(''); // State for error or success message
    const [selectedBooth, setSelectedBooth] = useState('');
    const { id } = useParams();
    const [expo, setExpo] = useState({
      title: '',
      date: '',
      location: '',
      description: '',
      theme: '',
      boothSpaces: [
        { boothNumber: '', size: '', location: '', availabilityStatus: '', allocatedExhibitor: '' }
      ],
      sessions: [
        { sessiontitle: '', sessiontime: '', sessionlocation: '', sessiondescription: '',  speakers: [''], topics: [''] }
      ]
    });
    const anyAvailable = expo.boothSpaces.some(booth => booth.availabilityStatus.toLowerCase() === 'available');

      
    useEffect(() => {
      axios.get(`http://localhost:3500/get/expo/${id}`)
        .then(response => {console.log(response)
            setExpo(response.data)
        })
        .catch(error => console.log("Error fetching expo data:", error));
    }, [id]);

    const formatDate = (isoString) => {
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
      const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
      const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
    
      return `${date} ${time}`;
    };

// work for sending request
const handleInput = (e) => {
  setSelectedBooth(e.target.value);
}


    
    const handleSubmit = (e) => {
      e.preventDefault()
      // const selectedBoothDetails = selectedBooth
      // if (selectedBoothDetails) {
        const newRequest = {
          eventId: id,
          eventTitle: expo.title,
          userId: user._id,
          userName: user.compname,
          boothNumber: selectedBooth,
          status: 'Pending'
          
        };
  
        // Send the request to the server
        axios.post('http://localhost:3500/request/booth', newRequest)
          .then(response => {
            console.log(response);
            setMessage('Request sent, wait for Admin to approve your request!'); // Set success message
            // Additional logic if needed
          })
          .catch(error => console.log("Error sending request:", error));
      // }
    };
  



  return (
    <>
   {/* <link rel="stylesheet" href="/src/assets/css/bootstrap.min.css" /> */}

    <Header/>

   {/* intro section */}
   <section id="intro">
  <div className="intro-container wow fadeIn" style={{marginTop: '120px'}}>
    <h1 className="mb-4 pb-0">{expo.title}<br /><span>{formatDate(expo.date)}</span><br /> {expo.location}</h1>
    {expo.boothSpaces && expo.boothSpaces.length > 0 && (
                <ul style={{color:'white'}}>
                  {expo.boothSpaces.map((booth, index) => (
                    booth.allocatedExhibitor && <li key={index}>Booth {booth.boothNumber} booked by {booth.allocatedExhibitor}</li>
                  ))}
                </ul>
              )}
    
   <div className="col-7">
      
      
      {anyAvailable ? (
        <>
          <select  class="form-control bg-white" onChange={handleInput}value={selectedBooth}>
          <option value="" disabled selected>Select Booth Number</option>
        {expo.boothSpaces.map((booth, index) => (
            
            
                <option key={index} value={booth.boothNumber}  disabled={booth.availabilityStatus.toLowerCase() === "booked"}>Booth : {booth.boothNumber}, Size : {booth.size}, Location : {booth.location}, Status : {booth.availabilityStatus} </option>
            
            ))}

        </select><br />
   
    <a onClick={handleSubmit} className="about-btn scrollto">Send Request</a>
    {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}
    </>
      )
    :(
        <p className='d-none'>nothing</p>
    )
    }
    </div>
  </div>
</section>

{/* Other INfo */}
<section id="schedule" className="section-with-bg">
  <div className="container wow fadeInUp">
    <div className="section-header">
      <h2>Other Information</h2>
    </div>
    <div className="tab-content row justify-content-center">

     
       
            <div className="row">
                <div className="col-md-4" style={{borderRight : '2px solid #f82249'}}>
                        <div className="section-header">
                            <h3 className='text-center'>Event Info</h3>
                        </div>
                
                    
            
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Title</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{expo.title} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Date</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{formatDate(expo.date)} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Location</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{expo.location} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Description</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{expo.description} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Theme</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{expo.theme} </h4>
                            </div>
                        </div>
                </div>


                <div className="col-md-4" style={{borderRight : '2px solid #f82249', height: '700px',
              overflowY: 'scroll', padding: '10px'}}>
                        <div className="section-header">
                            <h3 className='text-center'>Booth Info</h3>
                        </div>
                
                    
            
                        {expo.boothSpaces.map((booth, index)=> (
                          
                          <div key={index}>
                            <div className="section-header">
                          <strong><p className='mt-3'>Booth : {index+1}</p></strong>
                          </div>
                          <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Number</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{booth.boothNumber} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Size</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{booth.size} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Location</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{booth.location} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Status</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{booth.availabilityStatus} </h4>
                            </div>
                        </div>
                        <div className="row schedule-item text-center">
                            <div className="col-md-4">
                            <time>Exhibitor</time>
                            </div>
                            <div className="col-md-8">
                                
                                <h4>{booth.availabilityStatus ==='Available'  ? ('N/A') : (booth.allocatedExhibitor)} </h4>
                            </div>
                        </div>
                        </div>
                        ))}
                </div>


                <div className="col-md-4 p-3"  style={{ height: '700px',
              overflowY: 'scroll', padding: '10px'}}>
                        <div className="section-header">
                            <h3 className='text-center'>Sessions Info</h3>
                        </div>
                
                    
            
                        {expo.sessions.map((session, index) => (

                        <div key={index}>
                          <div className="section-header">
                          <strong><p className='mt-3'>Session : {index+1}</p></strong>
                          </div>
                        <div className="row schedule-item text-center">
                          <div className="col-md-4">
                          <time>Title</time>
                          </div>
                          <div className="col-md-8">
                              
                              <h4>{session.sessiontitle} </h4>
                          </div>
                        </div>
                        <div className="row schedule-item text-center">
                          <div className="col-md-4">
                          <time>Time</time>
                          </div>
                          <div className="col-md-8">
                              
                              <h4>{formatDate(session.sessiontime)} </h4>
                          </div>
                        </div>
                        <div className="row schedule-item text-center">
                          <div className="col-md-4">
                          <time>Location</time>
                          </div>
                          <div className="col-md-8">
                              
                              <h4>{session.sessionlocation} </h4>
                          </div>
                        </div>
                        <div className="row schedule-item text-center">
                          <div className="col-md-4">
                          <time>Description</time>
                          </div>
                          <div className="col-md-8">
                              
                              <h4>{session.sessiondescription} </h4>
                          </div>
                        </div>

                          <div className="row schedule-item text-center" >
                            <div className="col-md-4">
                            <time>Speakers</time>
                            </div>
                            <div className="col-md-8">
                          {session.speakers.map((speaker, index)=> (
                            
                            
                                
                                <h4 key={index}>{speaker} </h4>
                            
                          ))}
                            </div>
                          </div>

                          <div className="row schedule-item text-center" >
                            <div className="col-md-4">
                            <time>Topics</time>
                            </div>
                            <div className="col-md-8">
                          {session.topics.map((topic, index)=> (
                            
                            
                                
                                <h4 key={index}>{topic} </h4>
                            
                          ))}
                            </div>
                          </div>
                        </div>
                        ))}
                        
                </div>

                
            </div>
               
            
             


     
    </div>
  </div>
</section>
    </>
  )
}

export default Expodetail