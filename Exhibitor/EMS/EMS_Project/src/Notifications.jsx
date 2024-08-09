import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
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



const formatDate = (isoString) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
  const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);

  return `${date} ${time}`;
};

const Notifications = () => {
  
  const [request, setRequest] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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

const getNotes = async (userId) => {
  try {
      const response = await axios.get(`http://localhost:3500/list/notes/${userId}`);
      return response.data;
  } catch (error) {
      console.error(error);
      return []; 
  }
}
// console.log(user._id);


  useEffect(() => {
      const fetchNotes = async () => {
        const userId = user._id;
          const notesData = await getNotes(userId);
          setRequest(notesData);
      };

      fetchNotes();

      
  }, [[user]]);

  return (
    <>

    <section id="schedule" className="section-with-bg" style={{height:'100%'}}>
  <div className="container wow fadeInUp">

   
    <div className="section-header">
    <Link to='/'><i className="fa fa-arrow-left"></i>Back</Link>
      <h2>Notifications</h2>
    </div>

   


    <div className="tab-content row justify-content-center">

      <div role="tabpanel" className="col-lg-9 tab-pane fade show active">
        
      {Array.isArray(request) && request.filter(note => note.status !== 'Pending').length > 0 ? (
  request.filter(note => note.status !== 'Pending').map((note, index) => (
    <div className="row schedule-item" key={index}>
      <div className="col-md-2"><time>{formatDate(note.requestDate)}</time></div>
      <div className="col-md-10">
        <div className="speaker">
          <img src="/src/assets/img/venue-gallery/8.jpg" alt="Brenden Legros" />
        </div>
        <h4>{note.eventTitle}</h4>
        <p>Admin {note.status} your {note.eventTitle} ({note.boothNumber}) request</p>
      </div>
    </div>
  ))
) : (
  <p className='text-center'>No notifications available.</p>
)}

       
      </div>

     
    </div>
  </div>
</section>


    </>
  )
}

export default Notifications