import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Expo = () => {
    const [expo, setExpo] = useState([])

    useEffect(()=> {
        axios.get("http://localhost:3500/get/expo")
        .then(x => setExpo(x.data))
        .catch(err => console.log(err))
      
      })

      const formatDate = (isoString) => {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
      
        const date = new Date(isoString).toLocaleDateString(undefined, dateOptions);
        const time = new Date(isoString).toLocaleTimeString(undefined, timeOptions);
      
        return `${date} ${time}`;
      };
      
  return (

    
    <>
    <section id="speakers" className="wow fadeInUp">
    <div className="container">
      <div className="section-header">
        <h2>Expos</h2>
        <p>Here are some of our upcoming events</p>
      </div>

      <div className="row">

{expo.length>0?(
  expo.map((x) => {

    // Check if all boothSpaces are booked
const allBooked = x.boothSpaces.every(booth => booth.availabilityStatus.toLowerCase() === 'booked');

   return <div className="col-lg-4 col-md-6">
   
<div className="speaker">
<img src="/src/assets/img/event.jpg" alt="Speaker 1" className="img-fluid" />
<div className="details">
 <h3><Link to={`/details/expo/${x._id}`}>{x.title}</Link></h3>
 <p>{formatDate(x.date)}</p>
 <div className="social">
      
         <Link to={`/details/expo/${x._id}`}>See Details</Link>
       
       
       
       
   </div>
 </div>
</div>

</div>
 })
) : (
  <p className='text-center'>No upcoming event.</p>
)
}
       
      </div>
    </div>
  </section>
  </>
  )
}

export default Expo