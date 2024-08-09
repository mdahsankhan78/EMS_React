import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ExpoScedule = () => {

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

      
      const formatDate = (isoString) => {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
      
        const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
        const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
      
        return `${date} ${time}`;
      };


      if (Id) {
        nearestExpo = expo.find(e => e._id === Id);
      }
      else{
         nearestExpo = findNearestDateRecord(expo);

      }
      
      
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
                nearestExpo.sessions.map((session, index) => (
                  <div key={index} className="row schedule-item">
                    <div className="col-md-2">
                      <time>{session.sessiontime}</time>
                    </div>
                    <div className="col-md-10">
                      <div className="speaker">
                        <img src="/src/assets/img/venue-gallery/8.jpg" alt={session.speakers[0] || "Speaker"} />
                      </div>
                      <h4>{session.sessiontitle} <span>{session.speakers.join(', ')}</span></h4>
                      <p>{session.sessiondescription}</p>
                    </div>
                  </div>
                ))}
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