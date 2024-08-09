import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('Attendeetoken');
  console.log(token);

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from localStorage
      localStorage.removeItem('Attendeetoken');
      return false;
    }

    return true;
  } catch (error) {
    // In case of an error (e.g., invalid token), remove it from localStorage
    localStorage.removeItem('Attendeetoken');
    return false;
  }

  
};
  
  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:3500/get/attendee', {
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




const Bookmarked = () => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

        useEffect(() => {
            setIsLoggedIn(isUserLoggedIn())
            if (isLoggedIn) {
            const token = localStorage.getItem('Attendeetoken');
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
    // console.log(user);

    const DeleteBookmark = async (sessionId) => {
        try {
          const token = localStorage.getItem('Attendeetoken');
          await axios.delete(`http://localhost:3500/bookmark/remove/${sessionId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
           // Update state to remove the deleted bookmark
           setUser(prevUser => ({
            ...prevUser,
            bookmarkedSessions: prevUser.bookmarkedSessions.filter(session => session._id !== sessionId)
          }));
        } catch (error) {
          console.error('Error deleting bookmark:', error);
        }
      };
  return (
    <>

    <section id="schedule" className="section-with-bg" style={{height:'100%'}}>
  <div className="container wow fadeInUp">

   
    <div className="section-header">
    <Link to='/'><i className="fa fa-arrow-left"></i>Back</Link>
      <h2>Bookmarked Sessions</h2>
    </div>

   


    <div className="tab-content row justify-content-center">

      <div role="tabpanel" className="col-lg-9 tab-pane fade show active">
        
      {user && user.bookmarkedSessions && user.bookmarkedSessions.length > 0 ? (
  user.bookmarkedSessions.map((bookmark, index) => (
    <div className="row schedule-item" key={index}>
      <div className="col-md-2"><time>{bookmark.sessiontime}</time></div>
      <div className="col-md-10">
        <div className="speaker">
          <img src="/src/assets/img/venue-gallery/8.jpg" alt="Brenden Legros" />
        </div>
        <h4>{bookmark.sessiontitle}</h4>

        <a  onClick={() => DeleteBookmark(bookmark._id)}><i className='fa fa-star' style={{float: 'right'}} title='Bookmark Session'></i></a>

        <p>{bookmark.sessionlocation}</p>
        <p>{bookmark.sessiondescription}</p>
        <p style={{marginLeft: '67px'}}><strong>Speakers</strong> : 
            {bookmark.speakers.map((speaker, index) => (
            <p>{index+1}.{speaker}
            </p>
            ))}
        </p>
        <p style={{marginLeft: '67px'}}><strong>Topics</strong> : 
            {bookmark.topics.map((topic, index) => (
            <p>{index+1}.{topic}
            </p>
            ))}
        </p>
        
      </div>
    </div>
  ))
) : (
  <p className='text-center'>No bookmarks available.</p>
)}

       
      </div>

     
    </div>
  </div>
</section>


    </>
  )
}

export default Bookmarked