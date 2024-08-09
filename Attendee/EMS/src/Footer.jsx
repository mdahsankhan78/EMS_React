import React from 'react'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">

            <div className="col-lg-4 col-md-6 footer-info">
              <img src="src/assets/img/logo.png" alt="TheEvent" />
              <p>An event management system is a versatile platform that simplifies event planning and execution. It offers features like attendee registration, venue booking, and real-time updates, ensuring smooth coordination. The system also includes tools for budget tracking and performance analysis, along with a gallery showcasing event highlights and venues. This helps users efficiently organize and manage successful events.</p>
            </div>

            <div className="col-lg-4 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="fa fa-angle-right"></i> <a href="#">Home</a></li>
                <li><i className="fa fa-angle-right"></i> <a href="#about">About</a></li>
                <li><i className="fa fa-angle-right"></i> <a href="#speakers">Events</a></li>
                <li><i className="fa fa-angle-right"></i> <a href="#schedule">Event Schedules</a></li>
                <li><i className="fa fa-angle-right"></i> <a href="#hotels">Exhibitors</a></li>
              </ul>
            </div>


            <div className="col-lg-4 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                A108 Adam Street <br />
                New York, NY 535022<br />
                United States <br />
                <strong>Phone:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
              </p>

              <div className="social-links">
                <a href="www.twitter.com" target='blank' className="twitter"><i className="fa fa-twitter"></i></a>
                <a href="www.facebook.com" target='blank' className="facebook"><i className="fa fa-facebook"></i></a>
                <a href="www.instagram.com" target='blank' className="instagram"><i className="fa fa-instagram"></i></a>
                <a href="www.google.com" target='blank' className="google-plus"><i className="fa fa-google-plus"></i></a>
                <a href="www.linkedin.com" target='blank' className="linkedin"><i className="fa fa-linkedin"></i></a>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong>TheEvent</strong>. All Rights Reserved
        </div>
        
      </div>
    </footer>
  )
}

export default Footer