import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [data, setData] = useState({'name': '', 'email': '', 'password':''})
  const [message, setMessage] = useState(''); // State for error or success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInput = (e) => {
      setData({...data , [e.target.name]: e.target.value})
  }
  const handleSave = (e) => {
      e.preventDefault()
  
      axios.post('http://localhost:3500/registeradmin', data)
      .then(x => {console.log(x)
        const { token } = x.data; // Destructure token from response
          if (token) {
            localStorage.setItem('Admintoken', token); // Save token to local storage
            setMessage('Registered successfully!'); // Set success message
            setTimeout(() => {
                navigate('/'); 
            }, 1000); 
            }

      })
      .catch(x => {
        console.error(x);
        // Check for specific error and set the appropriate message
        if (x.response && x.response.status === 400) {
          setMessage(x.response.data.message); // Show specific error message from the server
        } else {
          setMessage('Error registering user.'); // General error message
        }
      })
    }
    console.log(data);
    
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
<link rel="stylesheet" href="./src/assets/css/bg-color.css" />

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
                <div className="row h-100 align-items-center justify-content-center bg-white" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                
                                <h3>Sign Up</h3>
                            </div>
                            <form action="" onSubmit={handleSave}>
                            <div className="form-floating mb-3">
                                <input name='name' onChange={handleInput} type="text" className="form-control bg-white" id="floatingText" placeholder="jhondoe" />
                                <label className="text-dark" htmlFor="floatingText">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input name='email' onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                                <label className="text-dark" htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input name='password' onChange={handleInput} type="password" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                                <label className="text-dark" htmlFor="floatingPassword">Password</label>
                            </div>
                            
                            
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign Up</button>
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
