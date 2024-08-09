import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import useNavigate


const Register = () => {
  const [data, setData] = useState({ 
    "name": "",
    "compname": "",
    "designation": "",
    "address": "",
    "city": "",
    "country": "",
    "number": "",
    "email": "",
    "password": "",
    "webaddress": "",
    "nature": ""})
  const [message, setMessage] = useState(''); // State for error or success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInput = (e) => {
      setData({...data , [e.target.name]: e.target.value})
  }


  const handleSave = (e) => {
      e.preventDefault()


      axios.post('http://localhost:3500/attendeeregister', data)
      .then(response => {
        console.log(response);
        const { token } = response.data; // Destructure token from response


          if (token) {
            localStorage.setItem('Attendeetoken', token); // Save token to local storage
            setMessage('Registered successfully!'); // Set success message
            setTimeout(() => {
                navigate('/'); // Navigate to the homepage after a short delay
            }, 1000); // Adjust delay as needed
        }

      })
      .catch(error => {
        console.error(error);
        // Check for specific error and set the appropriate message
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data.message); // Show specific error message from the server
        } else {
          setMessage('Error registering user.'); // General error message
        }
      });
    }
    
    ///////////jquery

jQuery(document).ready(function( $ ) {

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
      $('.sidebar, .content').toggleClass("open");
      return false;
  });
})


  return (
   <>
   <link rel="stylesheet" href="/src/assets/css/bootstrap.min.css" />

    <div className="container-fluid position-relative d-flex p-0">
            {/* Spinner Start */}
            <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {/* Spinner End */}

            {/* Sign Up Start */}
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  bg-white">
                        <div className="rounded p-4 p-sm-5 my-4 mx-3" style={{ background: 'rgba(6, 12, 34, 0.98)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                
                                <h1 style={{ color: '#f82249' }}>Sign Up</h1>
                            </div>
                            <form action="" onSubmit={handleSave} encType='multipart/form-data'>
                           
                            <div className="row">

                            <div className="col-md-6">
                                <h3>Details</h3>
                                <div className="form-floating mb-3">
                                <input required name='compname' onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Company Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='address' onChange={handleInput} type="text" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='webaddress' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Web Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='city' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">City</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select required name='country' onChange={handleInput} class="form-select bg-white" id="floatingSelect"
                                    aria-label="Floating label select example">
                                    <option selected disabled>Select</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Canada">Canada</option>
                                    <option value="China">China</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Korea">South Korea</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                </select>
                                <label className="text-dark"for="floatingSelect">Select Country</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select required name='nature' onChange={handleInput} class="form-select bg-white" id="floatingSelect"
                                    aria-label="Floating label select example">
                                    <option selected disabled>Select</option>
                                    <option value="Chain Store">Chain Store</option>
                                    <option value="Buying House">Buying House</option>
                                    <option value="Importer">Importer</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label className="text-dark"for="floatingSelect">Nature of Business</label>
                            </div>

                         
                                </div>


                                <div className="col-md-6">
                                <h3>Personal Details</h3>
                                <div className="form-floating mb-3">
                                <input required name='name' onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark"htmlFor="floatingText">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='email' onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='password' onChange={handleInput} type="password" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark"htmlFor="floatingInput">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required name='number' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Your Number</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input required name='designation' onChange={handleInput} type="text" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark"htmlFor="floatingPassword">Designation</label>
                            </div>
                                </div>
                            </div>

                           


                           
                            
                            
                            
                            
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4" style={{ background: '#f82249' }}>Sign Up</button>
                            {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}
                            <p className="text-center mb-0">Already have an Account? <Link to="/login">Sign In</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sign Up End */}
        </div>

</>
  )
}

export default Register
