import React from 'react'
import { Link } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [data, setData] = useState({'email': '', 'password':''})
    const [message, setMessage] = useState(''); // State for error or success message
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleInput = (e) => {
        setData({...data , [e.target.name]: e.target.value})
    }
    const handleSave = (e) => {
        e.preventDefault()
    
        axios.post('http://localhost:3500/login/attendee', data)
        .then(x => {
          console.log(x);
          const { token } = x.data; // Destructure token from response


          if (token) {
            localStorage.setItem('Attendeetoken', token); // Save token to local storage
            setMessage('Logged In successfully!'); // Set success message
            setTimeout(() => {
                navigate('/'); // Navigate to the homepage after a short delay
            }, 1000); // Adjust delay as needed
        }
          
  
        })
        .catch(x => {
          console.error(x);
          // Check for specific error and set the appropriate message
          if (x.response && x.response.status === 400) {
            setMessage(x.response.data.message); // Show specific error message from the server
          } 
          else if (x.response && x.response.status === 600) {
            setMessage(x.response.data.message); // Show specific error message from the server
          } 
          else {
            setMessage('Error logging in user.'); // General error message
          }
        })
      }
console.log(data);



  return (
    <>
    <link rel="stylesheet" href="/src/assets/css/bootstrap.min.css" />
    <div className="container-fluid position-relative d-flex p-0 bg-white" >
    

      {/* Sign In Start */}
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">
            <div className="rounded p-4 p-sm-5 my-4 mx-3" style={{ background: 'rgba(6, 12, 34, 0.98)' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                
                <h3>Sign In</h3>
              </div>
              <form action="" onSubmit={handleSave}>
              <div className="form-floating mb-3">
                <input name='email' onChange={handleInput} type="email" className="form-control bg-white" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input name='password' onChange={handleInput} type="password" className="form-control bg-white" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input name='check' onChange={handleInput} type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <Link to="">Forgot Password</Link>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
              {message && <p className="text-center text-danger">{message}</p>} {/* Display the message */}
              <p className="text-center mb-0">Don't have an Account? <Link to="/registeras">Sign Up</Link></p>
              </form>
            </div>
            
          </div>
          
        </div>
      </div>
      {/* Sign In End */}
    </div>
    </>
  )
}

export default Login