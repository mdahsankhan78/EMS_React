import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('Attendeetoken');
  // console.log(token);

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

const ExpoScedule = () => {
  
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
        };
    }, []);

/////schedule work

    const [expo, setExpo] = useState([])
    const [Id, setId] = useState('')
    var nearestExpo

const handleClick =(id) =>{
  setId(id)
  // console.log(Id);
}

    useEffect(()=> {
        axios.get("http://localhost:3500/get/expo")
        .then(x => setExpo(x.data))
        .catch(err => console.log(err))
      
      })

      const findNearestDateRecord = (records) => {
        if (!Array.isArray(records) || records.length === 0) return null;
    
        const now = new Date();
        let nearestRecord = records[0];
        let smallestDiff = Math.abs(new Date(records[0].date) - now);
    
        records.forEach((record) => {
          const recordDate = new Date(record.date);
          const diff = Math.abs(recordDate - now);
    
          if (diff < smallestDiff) {
            nearestRecord = record;
            smallestDiff = diff;
          }
        });
    
        return nearestRecord;
      };


      if (Id) {
        nearestExpo = expo.find(e => e._id === Id);
      }
      else{
         nearestExpo = findNearestDateRecord(expo);

      }
      

////bookmark work
      const Bookmark = (sessionId) => {

        if(isLoggedIn){
          const bookmark = {
            session_Id: sessionId,
            userId: user._id,
          };
    
          // Send the request to the server
          axios.post('http://localhost:3500/bookmark/session', bookmark)
            .then(response => {
              console.log(response);
              setIsLoggedIn(isUserLoggedIn())
            if (isLoggedIn) {
              const token = localStorage.getItem('Attendeetoken');
              fetchUserDetails(token).then(userData => {
                if (userData) {
                  setUser(userData);
                }
              });
            };
            })
            .catch(error => console.log("Error sending request:", error));
        }
        else{
            navigate('/login'); 
        }

         
        // }
      };
      
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
     
    <section id="schedule" className="section-with-bg">
  <div className="container wow fadeInUp">
    <div className="section-header">
      <h2>Event Schedule</h2>
      <p>Here is our event schedule</p>
    </div>

   

   

    <div className="tab-content row justify-content-center">

      <div role="tabpanel" className="col-lg-9 tab-pane fade show active" id="day-1">
       
      {expo ? (
      <ul class="nav nav-tabs" role="tablist">

        {
          
          expo.map((expo, index) => (
            <li class="nav-item">
            <a class="nav-link"  onClick={() => handleClick(expo._id)} role="tab" data-toggle="tab">Event {index+1}</a>  
          </li>

          ))
        }
         
         
        </ul>

      ) :
      (
        <p>nope</p>
      )}
      
      {nearestExpo ? (
              <div>
                <h3 className='text-center'>{nearestExpo.title}</h3>
                {
                nearestExpo.sessions.map((session, index) => 
                  {
                // Check if the current session is in the bookmarked sessions
                  const isBookmarked = user?.bookmarkedSessions?.some(bookmarkedSession => 
                    bookmarkedSession._id.toString() === session._id.toString()
                  );
                  return (

                  
                  <div key={index} className="row schedule-item">
                    <div className="col-md-2">
                      <time>{session.sessiontime}</time>
                    </div>
                    <div className="col-md-10">
                      <div className="speaker">
                        <img src="/src/assets/img/venue-gallery/8.jpg" alt={session.speakers[0] || "Speaker"} />
                      </div>
                      <h4>{session.sessiontitle} <span>{session.speakers.join(', ')}</span>

                      {isBookmarked ? (
                        <a onClick={() => DeleteBookmark(session._id)}><i className='fa fa-star' style={{float: 'right'}} title='Bookmark Session'></i></a>
                      ) :
                      (
                        <a onClick={() => Bookmark(session._id)}><i className='fa fa-star-o' style={{float: 'right'}} title='Bookmark Session'></i></a>
                      )}
                      
                      </h4>
                      <p>{session.sessiondescription}</p>
                    </div>
                  </div>
                )}
                )}
                </div>
               
              ): (
                <p>No upcoming events</p>
              )}
      </div>

     
    </div>
  </div>
</section>

    </>
  )
}

export default ExpoScedule