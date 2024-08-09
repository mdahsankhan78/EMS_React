import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'; // Import useNavigate
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

const Expoupdate = () => {
    const { id } = useParams();
    const [data, setData] = useState({
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
    const [message, setMessage] = useState(''); // State for error or success message
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
  
    const getExpo = () =>{
      axios.get(`http://localhost:3500/get/expo/${id}`)
          .then(response => {console.log(response)
              setData(response.data)
          })
          .catch(error => console.log("Error fetching expo data:", error));
    }
      
    useEffect(() => {
        getExpo()
      }, [id]);

    const handleInput = (e) => {
        setData({...data , [e.target.name]: e.target.value})
    }

    const handleBoothChange = (index, e) => {
        const { name, value } = e.target;
        const newBoothSpaces = [...data.boothSpaces];
        newBoothSpaces[index][name] = value;
        setData({ ...data, boothSpaces: newBoothSpaces });
      };
    
      const handleSessionChange = (sessionIndex, speakerIndex, e) => {
        const { name, value } = e.target;
        const newSessions = [...data.sessions];
      
        if (name === 'speakers') {
          newSessions[sessionIndex].speakers[speakerIndex] = value;
        } 
        else if (name === 'topics') {
            newSessions[sessionIndex].topics[speakerIndex] = value;
          } 
          else {
          newSessions[sessionIndex][name] = value;
        }
      
        setData({ ...data, sessions: newSessions });
      };

      const addBoothSpace = () => {
        setData({
          ...data,
          boothSpaces: [...data.boothSpaces, { boothNumber: '', size: '', location: '', availabilityStatus: '', allocatedExhibitor: '' }]
        });
      };

      const addSession = () => {
        setData({
          ...data,
          sessions: [...data.sessions,  { sessiontitle: '', sessiontime: '', sessionlocation: '', sessiondescription: '', speakers: [''], topics : [''] }]
        });
      };

      const addSpeaker = (sessionIndex) => {
        const newSessions = [...data.sessions];
        newSessions[sessionIndex].speakers = newSessions[sessionIndex].speakers ? [...newSessions[sessionIndex].speakers, ''] : [''];
        setData({ ...data, sessions: newSessions });
      };
      const addTopic = (sessionIndex) => {
        const newSessions = [...data.sessions];
        newSessions[sessionIndex].topics = newSessions[sessionIndex].topics ? [...newSessions[sessionIndex].topics, ''] : [''];
        setData({ ...data, sessions: newSessions });
      };

      const handleSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3500/update/expo/${id}`, data)
            .then(response => {
                setMessage('Expo updated successfully!');
                navigate('/events'); // Redirect to expo list or any other route after successful update
            })
            .catch(error => {
                setMessage('Error updating expo.');
                console.error("There was an error updating the expo!", error);
            });
    };
      
  
  jQuery(document).ready(function( $ ) {
  
      var spinner = function () {
          setTimeout(function () {
              if ($('#spinner').length > 0) {
                  $('#spinner').removeClass('show');
              }
          }, 1);
      };
      spinner();
  
  
      // Sidebar Toggler
      $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
  })

  const scrollableStyle = {
    // width: '100%',
    height: '700px',
    overflowY: 'scroll',
    padding: '10px'
  };

  return (
    <>
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

<div className="container-fluid position-relative d-flex p-0">
{/* Spinner Start */}
<div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
<div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
<span className="sr-only">Loading...</span>
</div>
</div>
{/* Spinner End */}

{/* Sign Up Start */}
<div className="container-fluid">
<div className="row h-100 align-items-center justify-content-center bg-white" style={{ minHeight: '100vh' }}>
<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
    <div className="rounded p-4 p-sm-5 my-4 mx-3"style={{ background: 'rgba(6, 12, 34, 0.98)' }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
            
            <h1>Update Expo Event</h1>
        </div>
        <form onSubmit={handleSave}>
       

            <h3>Event Details</h3>
                <div className="form-floating mb-4">
                    <input required name='title' onChange={handleInput} value={data.title} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                    <label className="text-dark" htmlFor="floatingText">Title</label>
                </div>
                <div className="form-floating mb-4">
                    <input required name='date' onChange={handleInput} type="datetime-local" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                    <label className="text-dark" htmlFor="floatingInput">Date</label>
                </div>
                <div className="form-floating mb-4">
                    <input required name='location' onChange={handleInput} value={data.location} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                    <label className="text-dark" htmlFor="floatingPassword">Location</label>
                </div>
                <div className="form-floating mb-4">
                    <input required name='description' onChange={handleInput} value={data.description} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                    <label className="text-dark" htmlFor="floatingPassword">Description</label>
                </div>
                <div className="form-floating mb-4">
                    <input required name='theme' onChange={handleInput} value={data.theme} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                    <label className="text-dark" htmlFor="floatingPassword">Theme</label>
                    
                </div>
       
<div className="row">
        <div className="col-md-6" style={scrollableStyle}>
            
        {data.boothSpaces.map((booth, index) => (
        <div key={index} >
            <h3>Booth Space : {index+1}</h3>
            <div className="form-floating mb-4">
            <input required name='boothNumber' onChange={(e) => handleBoothChange(index, e)} value={booth.boothNumber} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Booth Number</label>
            

            </div>
            <div className="form-floating mb-4">
            <input required name='size' onChange={(e) => handleBoothChange(index, e)} value={booth.size} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Size</label>
            

            </div>
            <div className="form-floating mb-4">
            <input required name='location' onChange={(e) => handleBoothChange(index, e)} value={booth.location} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Location</label>
            

            </div>
            <div className="form-floating mb-4">
            <select required name='availabilityStatus' onChange={(e) => handleBoothChange(index, e)} value={booth.availabilityStatus} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password">
            <option value="" disabled selected>Select</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>

            </select>
            
            <label className="text-dark" htmlFor="floatingPassword">Availability Status</label>
            

            </div>
            <div className="form-floating mb-4">
            <input name='allocatedExhibitor' onChange={(e) => handleBoothChange(index, e)} value={booth.allocatedExhibitor} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" disabled={booth.availabilityStatus === "Available"}/>
            <label className="text-dark" htmlFor="floatingPassword">Allocated Exhibitor</label>
            

            </div>
        </div>
        ))}
            <button type="button" className="btn btn-primary py-3 w-100 mb-4" onClick={addBoothSpace}>Add another Booth Space</button>
        </div>
        
        <div className="col-md-6" style={scrollableStyle}>
        {data.sessions.map((session, sessionIndex) => (
        <div key={sessionIndex} >
            <h3>Session : {sessionIndex+1}</h3>
            <div className="form-floating mb-4">
            <input required name='sessiontitle' onChange={(e) => handleSessionChange(sessionIndex, null, e)} value={session.sessiontitle} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Title</label>
            

            </div>
            <div className="form-floating mb-4">
            <input required name='sessiontime' onChange={(e) => handleSessionChange(sessionIndex, null, e)} value={session.sessiontime} type="time" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Time</label>
            

            </div>
            <div className="form-floating mb-4">
            <input required name='sessionlocation' onChange={(e) => handleSessionChange(sessionIndex, null, e)} value={session.sessionlocation} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Location</label>
            

            </div>
            <div className="form-floating mb-4">
            <input required name='sessiondescription' onChange={(e) => handleSessionChange(sessionIndex, null, e)} value={session.sessiondescription} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Description</label>
            

            </div>
            {session.speakers.map((speaker, speakerIndex) => (
            <div className="form-floating mb-4">
            <input required name='speakers'  value={speaker} onChange={(e) => handleSessionChange(sessionIndex, speakerIndex, e)} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Speaker</label>
           

            </div>
             ))}
              <button type="button" className="btn btn-primary py-3 w-100" onClick={() => addSpeaker(sessionIndex)}><i className='fa fa-plus'></i></button> <br /> <br />

            {session.topics.map((topic, topicIndex) => (
            <div className="form-floating mb-4">
            <input required name='topics' value={topic} onChange={(e) => handleSessionChange(sessionIndex, topicIndex, e)} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
            <label className="text-dark" htmlFor="floatingPassword">Topic</label>
          
            </div>

            ))}
              <button type="button" className="btn btn-primary py-3 w-100" onClick={() => addTopic(sessionIndex)}><i className='fa fa-plus'></i></button> <br /> <br />
        </div>
        ))}
            <button type="button" className="btn btn-primary py-3 w-100 mb-4" onClick={addSession}>Add another Session</button>
        </div>
</div>
        <br />
        <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Save</button>
        {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}
        </form>
    </div>
</div>
</div>
</div>
{/* Sign Up End */}
</div>
    </>
  )
}

export default Expoupdate