import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ContactUs = () => {
    const [data, setData] = useState({ 
        "name": "",
        "email": "",
        "subject": "",
        "message": ""})
      const [message, setMessage] = useState('');
    
      const handleInput = (e) => {
          setData({...data , [e.target.name]: e.target.value})
      }

      const handlesubmit = (e) => {
        e.preventDefault()
  
        axios.post('http://localhost:3500/contactus', data)
        .then(response => {
          console.log(response);
              setMessage('Form Submitted wait for Admin to response');
             
  
        })
        .catch(error =>  {console.log(error)
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message); // Show specific error message from the server
              } else {
                setMessage('Error registering user.'); // General error message
              }

        }
         );
      }
    //   console.log(data);
      

  return (
    <section id="contact" className="section-bg wow fadeInUp">
    <div className="container">
      <div className="section-header">
        <h2>Contact Us</h2>
        <p>Feel free to contact with us</p>
      </div>
      <div className="row contact-info">
        <div className="col-md-4">
          <div className="contact-address">
            <i className="ion-ios-location-outline"></i>
            <h3>Address</h3>
            <address>A108 Adam Street, NY 535022, USA</address>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-phone">
            <i className="ion-ios-telephone-outline"></i>
            <h3>Phone Number</h3>
            <p><a href="tel:+155895548855">+1 5589 55488 55</a></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-email">
            <i className="ion-ios-email-outline"></i>
            <h3>Email</h3>
            <p><a href="mailto:info@example.com">info@example.com</a></p>
          </div>
        </div>
      </div>
      <div className="form">
        <div id="sendmessage">Your message has been sent. Thank you!</div>
        <div id="errormessage"></div>
        <form className="contactForm">
          <div className="form-row">
            <div className="form-group col-md-6">
              <input name='name' onChange={handleInput} required type="text" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
              <div className="validation"></div>
            </div>
            <div className="form-group col-md-6">
              <input name='email' onChange={handleInput} required type="email" className="form-control" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
              <div className="validation"></div>
            </div>
          </div>
          <div className="form-group">
            <input name='subject' onChange={handleInput} required type="text" className="form-control" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
            <div className="validation"></div>
          </div>
          <div className="form-group">
            <textarea name='message' onChange={handleInput} required className="form-control" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
            <div className="validation"></div>
          </div>
          <div className="text-center"><button onClick={handlesubmit} type='submit'>Send Message</button></div><br />
          {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}

        </form>
      </div>
    </div>
  </section>
  )
}

export default ContactUs