import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NearestExpo = () => {

    const [expo, setExpo] = useState([])

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

      const nearestExpo = findNearestDateRecord(expo);
  return (
    <>
    
    {/* intro section */}
    {nearestExpo ? (
    <>
    <section id="intro">
  <div className="intro-container wow fadeIn">
    <h1 className="mb-4 pb-0">{nearestExpo.title}<br /><span>{formatDate(nearestExpo.date)}</span><br /> {nearestExpo.location}</h1>
    <p className="mb-4 pb-0">
    {nearestExpo.boothSpaces && nearestExpo.boothSpaces.length > 0 && (
                <ul>
                  {nearestExpo.boothSpaces.map((booth, index) => (
                    booth.allocatedExhibitor && <li key={index}>Booth {booth.boothNumber} booked by {booth.allocatedExhibitor}</li>
                  ))}
                </ul>
              )}

    </p>
    {/* <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a> */}
    <a href="#about" className="about-btn scrollto">About The Event</a>
  </div>
</section>

<section id="about">
<div className="container">
  <div className="row">
    <div className="col-lg-6">
      <h2>About The Event</h2>
      <p>{nearestExpo.description} <br />
      Theme : {nearestExpo.theme}
      </p>
    </div>
    <div className="col-lg-3">
      <h3>Where</h3>
      <p>{nearestExpo.location}</p>
    </div>
    <div className="col-lg-3">
      <h3>When</h3>
      <p>{formatDate(nearestExpo.date)}</p>
    </div>
  </div>
</div>
</section>
    </>
) 
:(
  <>
  <section id="intro">
    <div className="intro-container wow fadeIn">
      <h1 className="mb-4 pb-0">No nearest Event <br /><span></span> </h1>
      
      <p className="mb-4 pb-0">
      Coming soon

      </p>
    </div>
    </section>

    {/* <section id="about">
    <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h2>About The Event</h2>
        <p>{nearestExpo.description} <br />
        Theme : {nearestExpo.theme}
        </p>
      </div>
      <div className="col-lg-3">
        <h3>Where</h3>
        <p>{nearestExpo.location}</p>
      </div>
      <div className="col-lg-3">
        <h3>When</h3>
        <p>{formatDate(nearestExpo.date)}</p>
      </div>
    </div>
    </div>
</section> */}
  </>
)}

    </>
  )
}

export default NearestExpo