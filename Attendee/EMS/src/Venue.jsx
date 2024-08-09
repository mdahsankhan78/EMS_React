import React from 'react'

const Venue = () => {
  return (
    <section id="venue" className="wow fadeInUp">

<div className="container-fluid">

  <div className="section-header">
    <h2>Event Venue</h2>
    <p>Event venue location info and gallery</p>
  </div>

  <div className="row no-gutters">
    <div className="col-lg-6 venue-map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
    </div>

    <div className="col-lg-6 venue-info">
      <div className="row justify-content-center">
        <div className="col-11 col-lg-8">
          <h3>Downtown Conference Center, New York</h3>
          <p>The event management system gallery features a dedicated section for venue highlights, showcasing various event locations with detailed photos and videos to help users choose the perfect setting for their next event.</p>
        </div>
      </div>
    </div>
  </div>

</div>

<div className="container-fluid venue-gallery-container">
  <div className="row no-gutters">

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/1.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/1.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/2.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/2.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/3.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/3.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/4.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/4.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/5.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/5.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/6.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/6.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/7.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/7.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

    <div className="col-lg-3 col-md-4">
      <div className="venue-gallery">
        <a href="/src/assets/img/venue-gallery/8.jpg" className="venobox" data-gall="venue-gallery">
          <img src="/src/assets/img/venue-gallery/8.jpg" alt="" className="img-fluid" />
        </a>
      </div>
    </div>

  </div>
</div>

</section>
  )
}

export default Venue