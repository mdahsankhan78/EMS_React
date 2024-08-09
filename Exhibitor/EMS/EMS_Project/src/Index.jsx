import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Expo from './Expo.jsx'
import NearestExpo from './NearestExpo.jsx'
import ExpoScedule from './ExpoScedule.jsx'
import Exhibitors from './Exhibitors.jsx'
import Venue from './Venue.jsx'
import ContactUs from './ContactUs.jsx'
const Index = () => {
  return (
    <>
    
<Header/>
    <NearestExpo/>

{/* main section */}
<main id="main">
 

{/* speakers section */}
<Expo/>
  
</main>

{/* event schedule */}

<ExpoScedule/>

{/*==========================
    Venue Section
  ============================*/}
<Venue/>

{/*==========================
  Hotels Section
============================*/}
<Exhibitors/>

{/*==========================
  Gallery Section
============================*/}
<section id="gallery" className="wow fadeInUp">

<div className="container">
  <div className="section-header">
    <h2>Gallery</h2>
    <p>Check our gallery from the recent events</p>
  </div>
</div>

<div className="owl-carousel gallery-carousel">
  <a href="/src/assets/img/gallery/1.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/1.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/2.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/2.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/3.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/3.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/4.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/4.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/5.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/5.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/6.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/6.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/7.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/7.jpg" alt="" /></a>
  <a href="/src/assets/img/gallery/8.jpg" className="venobox" data-gall="gallery-carousel"><img src="/src/assets/img/gallery/8.jpg" alt="" /></a>
</div>

</section>



{/*==========================
  Contact Section
============================*/}
<ContactUs/>

<Footer/>

    </>
  )
}

export default Index
